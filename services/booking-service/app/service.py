from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from hashlib import sha256
from typing import Protocol
from uuid import uuid4

from .models import BookingCancellation, BookingHold, BookingReservation, OutboxEvent
from .repository import BookingRepository


@dataclass(slots=True)
class BookingHoldCommand:
    user_id: str
    train_id: str
    journey_date: str
    passenger_count: int
    idempotency_key: str


@dataclass(slots=True)
class ConfirmBookingCommand:
    hold_id: str
    payment_reference: str


class InventoryClient(Protocol):
    async def reserve_seats(self, command: dict[str, object]) -> dict[str, object]:
        ...

    async def release_hold(self, lock_id: str) -> dict[str, object]:
        ...


class BookingService:
    def __init__(self, repository: BookingRepository, inventory_client: InventoryClient) -> None:
        self._repository = repository
        self._inventory_client = inventory_client

    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "booking-service"}

    async def create_hold(self, command: BookingHoldCommand) -> dict[str, object]:
        if command.passenger_count <= 0:
            raise ValueError("passenger_count must be positive")

        existing = await self._repository.get_hold_by_idempotency_key(command.idempotency_key)
        if existing is not None:
            return self._hold_payload(existing)

        inventory_response = await self._inventory_client.reserve_seats(
            {
                "train_id": command.train_id,
                "journey_date": command.journey_date,
                "passenger_count": command.passenger_count,
                "idempotency_key": command.idempotency_key,
            }
        )
        if inventory_response.get("status") == "waitlisted":
            return {
                "status": "waitlisted",
                "available": inventory_response.get("available", 0),
                "seat_numbers": [],
            }

        seat_numbers = list(inventory_response["seat_numbers"])
        hold = BookingHold(
            hold_id=f"hold_{uuid4().hex[:16]}",
            idempotency_key=command.idempotency_key,
            inventory_lock_id=str(inventory_response["lock_id"]),
            user_id=command.user_id,
            train_id=command.train_id,
            journey_date=command.journey_date,
            passenger_count=command.passenger_count,
            coach_code="SL",
            seat_numbers=seat_numbers,
            status="held",
            expires_at=datetime.now(timezone.utc) + timedelta(minutes=5),
        )
        await self._repository.create_hold(hold)
        await self._repository.create_outbox_event(
            OutboxEvent(
                event_id=f"evt_{uuid4().hex[:16]}",
                aggregate_type="booking_hold",
                aggregate_id=hold.hold_id,
                event_type="booking.hold.created",
                payload={"hold_id": hold.hold_id, "user_id": hold.user_id, "train_id": hold.train_id},
                status="pending",
            )
        )
        await self._repository.commit()
        return self._hold_payload(hold)

    async def confirm_booking(self, command: ConfirmBookingCommand) -> dict[str, object]:
        hold = await self._repository.get_hold_by_id(command.hold_id)
        if hold is None:
            raise LookupError("hold not found")
        if hold.expires_at <= datetime.now(timezone.utc):
            raise RuntimeError("hold expired")

        booking_id = f"booking_{sha256(f'{hold.hold_id}:{command.payment_reference}'.encode()).hexdigest()[:16]}"
        reservation = BookingReservation(
            booking_id=booking_id,
            hold_id=hold.hold_id,
            user_id=hold.user_id,
            payment_reference=command.payment_reference,
            status="confirmed",
            payload={
                "train_id": hold.train_id,
                "journey_date": hold.journey_date,
                "passenger_count": hold.passenger_count,
                "seat_numbers": hold.seat_numbers,
            },
        )
        await self._repository.create_reservation(reservation)
        await self._repository.create_outbox_event(
            OutboxEvent(
                event_id=f"evt_{uuid4().hex[:16]}",
                aggregate_type="booking_reservation",
                aggregate_id=reservation.booking_id,
                event_type="booking.confirmed",
                payload={"booking_id": booking_id, "hold_id": hold.hold_id},
                status="pending",
            )
        )
        await self._repository.commit()
        return {
            "booking_id": booking_id,
            "status": reservation.status,
            "hold_id": hold.hold_id,
            "payment_reference": command.payment_reference,
        }

    async def cancel_booking(self, booking_id: str) -> dict[str, str]:
        reservation = await self._repository.get_reservation_by_booking_id(booking_id)
        if reservation is None:
            return {"booking_id": booking_id, "status": "cancelled"}
        hold = await self._repository.get_hold_by_id(reservation.hold_id)
        if hold is not None:
            await self._inventory_client.release_hold(hold.inventory_lock_id)
            await self._repository.update_hold_status(hold.hold_id, "cancelled")
        await self._repository.create_cancellation(
            BookingCancellation(booking_id=booking_id, hold_id=reservation.hold_id, status="cancelled")
        )
        await self._repository.commit()
        return {"booking_id": booking_id, "status": "cancelled"}

    def _hold_payload(self, hold: BookingHold) -> dict[str, object]:
        return {
            "hold_id": hold.hold_id,
            "status": hold.status,
            "user_id": hold.user_id,
            "train_id": hold.train_id,
            "journey_date": hold.journey_date,
            "passenger_count": hold.passenger_count,
            "coach_code": hold.coach_code,
            "seat_numbers": hold.seat_numbers,
            "expires_at": hold.expires_at.isoformat(),
        }
