from __future__ import annotations

from collections.abc import Sequence
from datetime import datetime

from sqlalchemy import and_, delete, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from .models import SeatHold, TrainSeat


class SeatInventoryRepository:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def find_available_seats(
        self,
        train_id: str,
        journey_date: str,
        passenger_count: int,
    ) -> Sequence[TrainSeat]:
        result = await self._session.execute(
            select(TrainSeat)
            .where(TrainSeat.train_id == train_id)
            .where(TrainSeat.is_reserved.is_(False))
            .where(TrainSeat.is_holdable.is_(True))
            .order_by(TrainSeat.coach_code.asc(), TrainSeat.seat_number.asc())
            .limit(passenger_count)
        )
        return result.scalars().all()

    async def create_hold(self, hold: SeatHold) -> SeatHold:
        self._session.add(hold)
        await self._session.flush()
        return hold

    async def reserve_seats(self, train_id: str, seat_numbers: Sequence[str]) -> int:
        result = await self._session.execute(
            update(TrainSeat)
            .where(TrainSeat.train_id == train_id)
            .where(TrainSeat.seat_number.in_(seat_numbers))
            .values(is_reserved=True)
        )
        return int(result.rowcount or 0)

    async def release_seats(self, train_id: str, seat_numbers: Sequence[str]) -> int:
        result = await self._session.execute(
            update(TrainSeat)
            .where(TrainSeat.train_id == train_id)
            .where(TrainSeat.seat_number.in_(seat_numbers))
            .values(is_reserved=False)
        )
        return int(result.rowcount or 0)

    async def get_hold(self, lock_id: str) -> SeatHold | None:
        result = await self._session.execute(select(SeatHold).where(SeatHold.lock_id == lock_id))
        return result.scalar_one_or_none()

    async def delete_expired_holds(self, now: datetime) -> list[SeatHold]:
        result = await self._session.execute(select(SeatHold).where(SeatHold.expires_at < now))
        expired = result.scalars().all()
        if expired:
            await self._session.execute(delete(SeatHold).where(SeatHold.expires_at < now))
        return expired

    async def commit(self) -> None:
        await self._session.commit()

    async def rollback(self) -> None:
        await self._session.rollback()
