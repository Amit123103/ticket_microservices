from __future__ import annotations

from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
from pydantic import BaseModel, Field

from .service import GatewayProxyService


router = APIRouter(prefix="/gateway", tags=["gateway-service"])


class TrainSearchRequest(BaseModel):
    from_station: str = Field(min_length=2)
    to_station: str = Field(min_length=2)
    travel_date: str
    passenger_count: int = Field(default=1, ge=1)
    train_class: str | None = None
    max_fare: int | None = Field(default=None, ge=0)
    require_amenity: str | None = None


class HoldRequest(BaseModel):
    user_id: str
    train_id: str
    journey_date: str
    passenger_count: int = Field(gt=0)


class ConfirmRequest(BaseModel):
    hold_id: str
    payment_reference: str


def get_gateway_service(request: Request) -> GatewayProxyService:
    return request.app.state.gateway_service


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "gateway-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "gateway-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "gateway-service", "version": "1.0.0"}


@router.get("/search/stations/autocomplete")
async def search_autocomplete(query: str, service: GatewayProxyService = Depends(get_gateway_service)) -> dict[str, object]:
    return await service.proxy_get(service.search_client, "/search/stations/autocomplete", params={"query": query})


@router.get("/search/routes/trending")
async def search_trending(limit: int = 5, service: GatewayProxyService = Depends(get_gateway_service)) -> dict[str, object]:
    return await service.proxy_get(service.search_client, "/search/routes/trending", params={"limit": limit})


@router.post("/search/trains")
async def search_trains(payload: TrainSearchRequest, service: GatewayProxyService = Depends(get_gateway_service)) -> dict[str, object]:
    return await service.proxy_post(service.search_client, "/search/trains", payload.model_dump())


@router.post("/bookings/hold", status_code=status.HTTP_201_CREATED)
async def booking_hold(
    payload: HoldRequest,
    service: GatewayProxyService = Depends(get_gateway_service),
    idempotency_key: str | None = Header(default=None, alias="Idempotency-Key"),
) -> dict[str, object]:
    if idempotency_key is None:
        raise HTTPException(status_code=400, detail="missing_idempotency_key")
    return await service.proxy_post(
        service.booking_client,
        "/bookings/hold",
        payload.model_dump(),
        headers={"Idempotency-Key": idempotency_key},
    )


@router.post("/bookings/confirm")
async def booking_confirm(payload: ConfirmRequest, service: GatewayProxyService = Depends(get_gateway_service)) -> dict[str, object]:
    return await service.proxy_post(service.booking_client, "/bookings/confirm", payload.model_dump())


@router.post("/bookings/cancel/{booking_id}")
async def booking_cancel(booking_id: str, service: GatewayProxyService = Depends(get_gateway_service)) -> dict[str, object]:
    return await service.proxy_post(service.booking_client, f"/bookings/cancel/{booking_id}", {})
