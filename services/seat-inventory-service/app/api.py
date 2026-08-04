from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, Field

from .repository import SeatInventoryRepository
from .service import SeatInventoryService, SeatLockCommand


router = APIRouter(prefix="/inventory", tags=["seat-inventory-service"])


class SeatLockRequest(BaseModel):
    train_id: str
    journey_date: str
    passenger_count: int = Field(gt=0)
    idempotency_key: str


async def get_inventory_service(request: Request):
    session_factory = request.app.state.session_factory
    if session_factory is None:
        raise RuntimeError("inventory service is not configured")
    async with session_factory() as session:
        yield SeatInventoryService(SeatInventoryRepository(session))


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "seat-inventory-service"}


@router.post("/lock", status_code=status.HTTP_201_CREATED)
async def lock(payload: SeatLockRequest, service: SeatInventoryService = Depends(get_inventory_service)) -> dict[str, object]:
    return await service.lock_seats(
        SeatLockCommand(
            train_id=payload.train_id,
            journey_date=payload.journey_date,
            passenger_count=payload.passenger_count,
            idempotency_key=payload.idempotency_key,
        )
    )


@router.post("/release/{lock_id}")
async def release(lock_id: str, service: SeatInventoryService = Depends(get_inventory_service)) -> dict[str, str]:
    return await service.release_hold(lock_id)
