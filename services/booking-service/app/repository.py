from __future__ import annotations

from collections.abc import Sequence
from datetime import datetime

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import BookingCancellation, BookingHold, BookingReservation, OutboxEvent


class BookingRepository:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_hold_by_idempotency_key(self, idempotency_key: str) -> BookingHold | None:
        result = await self._session.execute(
            select(BookingHold).where(BookingHold.idempotency_key == idempotency_key)
        )
        return result.scalar_one_or_none()

    async def get_hold_by_id(self, hold_id: str) -> BookingHold | None:
        result = await self._session.execute(select(BookingHold).where(BookingHold.hold_id == hold_id))
        return result.scalar_one_or_none()

    async def create_hold(self, hold: BookingHold) -> BookingHold:
        self._session.add(hold)
        await self._session.flush()
        return hold

    async def update_hold_status(self, hold_id: str, status: str) -> int:
        result = await self._session.execute(
            select(BookingHold).where(BookingHold.hold_id == hold_id)
        )
        hold = result.scalar_one_or_none()
        if hold is None:
            return 0
        hold.status = status
        await self._session.flush()
        return 1

    async def create_reservation(self, reservation: BookingReservation) -> BookingReservation:
        self._session.add(reservation)
        await self._session.flush()
        return reservation

    async def get_reservation_by_booking_id(self, booking_id: str) -> BookingReservation | None:
        result = await self._session.execute(
            select(BookingReservation).where(BookingReservation.booking_id == booking_id)
        )
        return result.scalar_one_or_none()

    async def create_cancellation(self, cancellation: BookingCancellation) -> BookingCancellation:
        self._session.add(cancellation)
        await self._session.flush()
        return cancellation

    async def create_outbox_event(self, event: OutboxEvent) -> OutboxEvent:
        self._session.add(event)
        await self._session.flush()
        return event

    async def commit(self) -> None:
        await self._session.commit()

    async def rollback(self) -> None:
        await self._session.rollback()

    async def delete_expired_holds(self, now: datetime) -> int:
        result = await self._session.execute(delete(BookingHold).where(BookingHold.expires_at < now))
        return int(result.rowcount or 0)

    async def list_pending_events(self) -> Sequence[OutboxEvent]:
        result = await self._session.execute(select(OutboxEvent).where(OutboxEvent.status == "pending"))
        return result.scalars().all()
