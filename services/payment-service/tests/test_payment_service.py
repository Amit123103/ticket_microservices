from __future__ import annotations

import asyncio
from dataclasses import dataclass, field
from datetime import datetime

import httpx

from app.api import get_payment_service
from app.main import app
from app.models import PaymentRefund, PaymentTransaction, PaymentWebhookEvent
from app.service import PaymentInitiateCommand, PaymentService, RefundCommand


@dataclass
class ResponseStub:
    payload: dict[str, object]

    def raise_for_status(self) -> None:
        return None

    def json(self) -> dict[str, object]:
        return self.payload


@dataclass
class FakePaymentRepository:
    payments_by_idempotency: dict[str, PaymentTransaction] = field(default_factory=dict)
    payments_by_id: dict[str, PaymentTransaction] = field(default_factory=dict)
    payments_by_provider_reference: dict[str, PaymentTransaction] = field(default_factory=dict)
    webhooks: list[PaymentWebhookEvent] = field(default_factory=list)
    refunds: list[PaymentRefund] = field(default_factory=list)

    async def get_payment_by_idempotency_key(self, idempotency_key: str):
        return self.payments_by_idempotency.get(idempotency_key)

    async def get_payment_by_id(self, payment_id: str):
        return self.payments_by_id.get(payment_id)

    async def get_payment_by_provider_reference(self, provider_reference: str):
        return self.payments_by_provider_reference.get(provider_reference)


    async def get_webhook_event_by_id(self, event_id: str):
        return next((event for event in self.webhooks if event.event_id == event_id), None)
    async def create_payment(self, payment: PaymentTransaction):
        self.payments_by_idempotency[payment.idempotency_key] = payment
        self.payments_by_id[payment.payment_id] = payment
        self.payments_by_provider_reference[payment.provider_reference or ""] = payment
        return payment

    async def create_webhook_event(self, event: PaymentWebhookEvent):
        self.webhooks.append(event)
        return event

    async def create_refund(self, refund: PaymentRefund):
        self.refunds.append(refund)
        return refund

    async def update_payment_status(self, payment_id: str, status: str, provider_reference: str | None = None):
        payment = self.payments_by_id[payment_id]
        payment.status = status
        if provider_reference is not None:
            payment.provider_reference = provider_reference
        return 1

    async def commit(self):
        return None

    async def rollback(self):
        return None


class FakeProvider:
    async def initiate(self, command: PaymentInitiateCommand) -> dict[str, object]:
        return {
            "provider_reference": f"fake_{command.idempotency_key}",
            "status": "authorized",
        }

    def verify_webhook(self, payload: dict[str, object], signature: str) -> bool:
        from hashlib import sha256

        expected = sha256(f"fake:{payload.get('event_type', '')}:{payload.get('event_id', '')}".encode()).hexdigest()
        return signature == expected

    async def refund(self, payment: PaymentTransaction, command: RefundCommand) -> dict[str, object]:
        return {
            "provider_reference": f"fake_refund_{payment.payment_id}",
            "status": "refunded",
        }


def test_payment_initiation_and_refund_flow() -> None:
    repository = FakePaymentRepository()
    service = PaymentService(repository, {"stripe": FakeProvider(), "razorpay": FakeProvider(), "paypal": FakeProvider()})

    async def override_payment_service():
        return service

    app.dependency_overrides.clear()
    app.dependency_overrides[get_payment_service] = override_payment_service

    async def run_flow() -> dict[str, object]:
        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
            initiate = await client.post(
                "/payments/initiate",
                headers={"Idempotency-Key": "idem-1"},
                json={
                    "booking_id": "booking_1",
                    "amount": 1200,
                    "method": "upi",
                    "provider": "stripe",
                },
            )
            assert initiate.status_code == 201
            payment = initiate.json()

            webhook = await client.post(
                "/payments/webhook",
                headers={
                    "X-Payment-Provider": "stripe",
                    "X-Webhook-Signature": __import__("hashlib").sha256(f"fake:payment.succeeded:evt_1".encode()).hexdigest(),
                },
                json={
                    "event_id": "evt_1",
                    "event_type": "payment.succeeded",
                    "provider_reference": payment["provider_reference"],
                },
            )
            assert webhook.status_code == 200

            refund = await client.post(
                "/payments/refund",
                json={
                    "payment_id": payment["payment_id"],
                    "amount": 1200,
                    "reason": "customer_requested",
                },
            )
            assert refund.status_code == 200
            return {"payment": payment, "refund": refund.json()}

    payload = asyncio.run(run_flow())
    assert payload["payment"]["status"] in {"authorized", "succeeded"}
    assert payload["refund"]["status"] == "refunded"
    app.dependency_overrides.clear()


def test_payment_requires_idempotency_key() -> None:
    repository = FakePaymentRepository()
    service = PaymentService(repository, {"stripe": FakeProvider(), "razorpay": FakeProvider(), "paypal": FakeProvider()})

    async def override_payment_service():
        return service

    app.dependency_overrides.clear()
    app.dependency_overrides[get_payment_service] = override_payment_service

    async def run_request() -> int:
        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
            response = await client.post(
                "/payments/initiate",
                json={"booking_id": "booking_1", "amount": 1200, "method": "upi", "provider": "stripe"},
            )
            return response.status_code

    assert asyncio.run(run_request()) == 400
    app.dependency_overrides.clear()

def test_payment_rejects_over_refund_and_deduplicates_webhook() -> None:
    repository = FakePaymentRepository()
    service = PaymentService(repository, {"stripe": FakeProvider()})

    async def run_flow() -> None:
        payment = await service.initiate_payment(
            PaymentInitiateCommand(
                booking_id="booking_1",
                amount=1200,
                method="upi",
                provider="stripe",
                idempotency_key="idem-1",
            )
        )
        event = {
            "event_id": "evt_1",
            "event_type": "payment.succeeded",
            "provider_reference": payment["provider_reference"],
        }
        signature = __import__("hashlib").sha256(b"fake:payment.succeeded:evt_1").hexdigest()
        await service.handle_webhook("stripe", event, signature)
        await service.handle_webhook("stripe", event, signature)
        assert len(repository.webhooks) == 1

        try:
            await service.refund_payment(
                RefundCommand(payment_id=str(payment["payment_id"]), amount=1201, reason="customer_requested")
            )
        except ValueError as exc:
            assert str(exc) == "refund_amount_exceeds_payment"
        else:
            raise AssertionError("expected an over-refund to be rejected")

    asyncio.run(run_flow())
