from __future__ import annotations

import asyncio
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone

import httpx

from app.api import get_booking_service
from app.main import app
from app.models import BookingHold, BookingReservation, OutboxEvent
from app.service import BookingHoldCommand, BookingService, ConfirmBookingCommand


@dataclass
class FakeBookingRepository:
    holds: dict[str, BookingHold] = field(default_factory=dict)
    outbox_events: list[OutboxEvent] = field(default_factory=list)
    reservations: dict[str, BookingReservation] = field(default_factory=dict)

    async def get_hold_by_idempotency_key(self, idempotency_key: str):
        for hold in self.holds.values():
            if hold.idempotency_key == idempotency_key:
                return hold
        return None

    async def get_hold_by_id(self, hold_id: str):
        return self.holds.get(hold_id)

    async def create_hold(self, hold: BookingHold):
        self.holds[hold.hold_id] = hold
        return hold

    async def create_reservation(self, reservation: BookingReservation):
        self.reservations[reservation.booking_id] = reservation
        return reservation

    async def create_outbox_event(self, event: OutboxEvent):
        self.outbox_events.append(event)
        return event

    async def commit(self):
        return None

    async def rollback(self):
        return None


@dataclass
class FakeInventoryClient:
    lock_counter: int = 0
    released: list[str] = field(default_factory=list)

    async def reserve_seats(self, command: dict[str, object]):
        self.lock_counter += 1
        passenger_count = int(command["passenger_count"])
        return {
            "lock_id": f"lock-{self.lock_counter}",
            "status": "held",
            "seat_numbers": [f"{index + 1}A" for index in range(passenger_count)],
            "coach_code": "SL",
            "expires_at": datetime.now(timezone.utc).isoformat(),
        }

    async def release_hold(self, lock_id: str):
        self.released.append(lock_id)
        return {"lock_id": lock_id, "status": "released"}


def test_booking_service_creates_and_confirms_hold() -> None:
    repository = FakeBookingRepository()
    inventory_client = FakeInventoryClient()
    service = BookingService(repository, inventory_client)

    hold_payload = asyncio.run(
        service.create_hold(
            BookingHoldCommand(
                user_id="user-1",
                train_id="train-1",
                journey_date="2026-08-10",
                passenger_count=2,
                idempotency_key="idem-1",
            )
        )
    )
    assert hold_payload["status"] == "held"
    assert len(hold_payload["seat_numbers"]) == 2

    hold_record = next(iter(repository.holds.values()))
    hold_record.expires_at = datetime.now(timezone.utc) + timedelta(minutes=5)

    booking_payload = asyncio.run(
        service.confirm_booking(
            ConfirmBookingCommand(
                hold_id=hold_record.hold_id,
                payment_reference="pay-1",
            )
        )
    )
    assert booking_payload["status"] == "confirmed"
    assert booking_payload["hold_id"] == hold_record.hold_id


def test_booking_hold_requires_idempotency_key() -> None:
    repository = FakeBookingRepository()
    inventory_client = FakeInventoryClient()
    service = BookingService(repository, inventory_client)

    async def override_booking_service():
        return service

    app.dependency_overrides.clear()
    app.dependency_overrides[get_booking_service] = override_booking_service

    async def run_request() -> int:
        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
            response = await client.post(
                "/bookings/hold",
                json={
                    "user_id": "user-1",
                    "train_id": "train-1",
                    "journey_date": "2026-08-10",
                    "passenger_count": 1,
                },
            )
            return response.status_code

    assert asyncio.run(run_request()) == 400
    app.dependency_overrides.clear()