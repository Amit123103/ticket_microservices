from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from uuid import uuid4

from .models import SeatHold
from .repository import SeatInventoryRepository


@dataclass(slots=True)
class SeatLockCommand:
    train_id: str
    journey_date: str
    passenger_count: int
    idempotency_key: str


class SeatInventoryService:
    def __init__(self, repository: SeatInventoryRepository) -> None:
        self._repository = repository

    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "seat-inventory-service"}

    async def lock_seats(self, command: SeatLockCommand) -> dict[str, object]:
        available_seats = await self._repository.find_available_seats(
            command.train_id,
            command.journey_date,
            command.passenger_count,
        )
        if len(available_seats) < command.passenger_count:
            return {"status": "waitlisted", "available": len(available_seats), "seat_numbers": []}

        chosen_seats = list(available_seats)
        seat_numbers = [seat.seat_number for seat in chosen_seats]
        coach_code = chosen_seats[0].coach_code
        await self._repository.reserve_seats(command.train_id, seat_numbers)
        hold = SeatHold(
            lock_id=f"lock_{uuid4().hex[:16]}",
            train_id=command.train_id,
            journey_date=command.journey_date,
            passenger_count=command.passenger_count,
            coach_code=coach_code,
            seat_numbers=seat_numbers,
            status="held",
            expires_at=datetime.now(timezone.utc) + timedelta(minutes=5),
        )
        await self._repository.create_hold(hold)
        await self._repository.commit()
        return {
            "lock_id": hold.lock_id,
            "status": hold.status,
            "train_id": hold.train_id,
            "journey_date": hold.journey_date,
            "coach_code": hold.coach_code,
            "seat_numbers": hold.seat_numbers,
            "expires_at": hold.expires_at.isoformat(),
        }

    async def release_hold(self, lock_id: str) -> dict[str, str]:
        hold = await self._repository.get_hold(lock_id)
        if hold is None:
            return {"lock_id": lock_id, "status": "not_found"}
        await self._repository.release_seats(hold.train_id, hold.seat_numbers)
        await self._repository.commit()
        return {"lock_id": lock_id, "status": "released"}
