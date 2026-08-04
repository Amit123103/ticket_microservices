from __future__ import annotations

from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
from pydantic import BaseModel, Field

from .repository import BookingRepository
from .service import BookingHoldCommand, BookingService, ConfirmBookingCommand


router = APIRouter(prefix="/bookings", tags=["booking-service"])


class HoldRequest(BaseModel):
    user_id: str
    train_id: str
    journey_date: str
    passenger_count: int = Field(gt=0)


class ConfirmRequest(BaseModel):
    hold_id: str
    payment_reference: str


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "booking-service"}


async def get_booking_service(request: Request):
    session_factory = request.app.state.session_factory
    async with session_factory() as session:
        yield BookingService(BookingRepository(session), request.app.state.inventory_client)


@router.post("/hold", status_code=status.HTTP_201_CREATED)
async def hold(
    payload: HoldRequest,
    service: BookingService = Depends(get_booking_service),
    idempotency_key: str | None = Header(default=None, alias="Idempotency-Key"),
) -> dict[str, object]:
    if idempotency_key is None:
        raise HTTPException(status_code=400, detail="missing_idempotency_key")
    try:
        return await service.create_hold(
            BookingHoldCommand(
                user_id=payload.user_id,
                train_id=payload.train_id,
                journey_date=payload.journey_date,
                passenger_count=payload.passenger_count,
                idempotency_key=idempotency_key,
            )
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.post("/confirm")
async def confirm(
    payload: ConfirmRequest,
    service: BookingService = Depends(get_booking_service),
) -> dict[str, object]:
    try:
        return await service.confirm_booking(
            ConfirmBookingCommand(
                hold_id=payload.hold_id,
                payment_reference=payload.payment_reference,
            )
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


@router.post("/cancel/{booking_id}")
async def cancel(
    booking_id: str,
    service: BookingService = Depends(get_booking_service),
) -> dict[str, str]:
    return await service.cancel_booking(booking_id)
