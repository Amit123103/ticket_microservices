from __future__ import annotations

from dataclasses import asdict, dataclass
from hashlib import sha256
from typing import Protocol
from uuid import uuid4

from .models import PaymentRefund, PaymentTransaction, PaymentWebhookEvent
from .repository import PaymentRepository


@dataclass(slots=True)
class PaymentInitiateCommand:
    booking_id: str
    amount: int
    method: str
    provider: str
    idempotency_key: str


@dataclass(slots=True)
class RefundCommand:
    payment_id: str
    amount: int
    reason: str


class PaymentProvider(Protocol):
    async def initiate(self, command: PaymentInitiateCommand) -> dict[str, object]:
        ...

    def verify_webhook(self, payload: dict[str, object], signature: str) -> bool:
        ...

    async def refund(self, payment: PaymentTransaction, command: RefundCommand) -> dict[str, object]:
        ...


class StripeProvider:
    async def initiate(self, command: PaymentInitiateCommand) -> dict[str, object]:
        return {
            "provider_reference": f"stripe_{uuid4().hex[:18]}",
            "status": "authorized",
            "redirect_url": f"https://pay.stripe.test/checkout/{command.idempotency_key}",
        }

    def verify_webhook(self, payload: dict[str, object], signature: str) -> bool:
        expected = sha256(f"stripe:{payload.get('event_type', '')}:{payload.get('event_id', '')}".encode()).hexdigest()
        return signature == expected

    async def refund(self, payment: PaymentTransaction, command: RefundCommand) -> dict[str, object]:
        return {
            "provider_reference": f"stripe_refund_{uuid4().hex[:18]}",
            "status": "refunded",
            "payment_id": payment.payment_id,
        }


class RazorpayProvider:
    async def initiate(self, command: PaymentInitiateCommand) -> dict[str, object]:
        return {
            "provider_reference": f"razorpay_{uuid4().hex[:18]}",
            "status": "authorized",
            "checkout_id": f"order_{command.idempotency_key}",
        }

    def verify_webhook(self, payload: dict[str, object], signature: str) -> bool:
        expected = sha256(f"razorpay:{payload.get('event_type', '')}:{payload.get('event_id', '')}".encode()).hexdigest()
        return signature == expected

    async def refund(self, payment: PaymentTransaction, command: RefundCommand) -> dict[str, object]:
        return {
            "provider_reference": f"razorpay_refund_{uuid4().hex[:18]}",
            "status": "refunded",
            "payment_id": payment.payment_id,
        }


class PaypalProvider:
    async def initiate(self, command: PaymentInitiateCommand) -> dict[str, object]:
        return {
            "provider_reference": f"paypal_{uuid4().hex[:18]}",
            "status": "authorized",
            "approval_url": f"https://pay.paypal.test/checkout/{command.idempotency_key}",
        }

    def verify_webhook(self, payload: dict[str, object], signature: str) -> bool:
        expected = sha256(f"paypal:{payload.get('event_type', '')}:{payload.get('event_id', '')}".encode()).hexdigest()
        return signature == expected

    async def refund(self, payment: PaymentTransaction, command: RefundCommand) -> dict[str, object]:
        return {
            "provider_reference": f"paypal_refund_{uuid4().hex[:18]}",
            "status": "refunded",
            "payment_id": payment.payment_id,
        }


class PaymentService:
    def __init__(self, repository: PaymentRepository, providers: dict[str, PaymentProvider]) -> None:
        self._repository = repository
        self._providers = providers

    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "payment-service"}

    async def initiate_payment(self, command: PaymentInitiateCommand) -> dict[str, object]:
        existing = await self._repository.get_payment_by_idempotency_key(command.idempotency_key)
        if existing is not None:
            return self._payment_payload(existing)

        provider = self._provider(command.provider)
        provider_result = await provider.initiate(command)
        payment = PaymentTransaction(
            payment_id=f"pay_{uuid4().hex[:16]}",
            booking_id=command.booking_id,
            idempotency_key=command.idempotency_key,
            provider=command.provider,
            method=command.method,
            amount=command.amount,
            currency="INR",
            status=str(provider_result.get("status", "initiated")),
            provider_reference=str(provider_result["provider_reference"]),
            payload={"provider_result": provider_result, "command": asdict(command)},
        )
        await self._repository.create_payment(payment)
        await self._repository.commit()
        return self._payment_payload(payment)

    async def handle_webhook(self, provider_name: str, payload: dict[str, object], signature: str) -> dict[str, object]:
        provider = self._provider(provider_name)
        if not provider.verify_webhook(payload, signature):
            raise ValueError("invalid_signature")
        event = PaymentWebhookEvent(
            event_id=f"evt_{uuid4().hex[:16]}",
            provider=provider_name,
            event_type=str(payload.get("event_type", "unknown")),
            signature=signature,
            payload=payload,
            status="accepted",
        )
        await self._repository.create_webhook_event(event)

        payment = None
        provider_reference = payload.get("provider_reference")
        if isinstance(provider_reference, str):
            payment = await self._repository.get_payment_by_provider_reference(provider_reference)
        if payment is not None and payload.get("event_type") in {"payment.succeeded", "payment.authorized"}:
            await self._repository.update_payment_status(payment.payment_id, "succeeded", provider_reference=str(provider_reference) if provider_reference else None)
        await self._repository.commit()
        return {"status": "accepted", "event_type": event.event_type, "provider": provider_name}

    async def refund_payment(self, command: RefundCommand) -> dict[str, object]:
        payment = await self._repository.get_payment_by_id(command.payment_id)
        if payment is None:
            raise LookupError("payment not found")
        provider = self._provider(payment.provider)
        provider_result = await provider.refund(payment, command)
        refund = PaymentRefund(
            refund_id=f"refund_{uuid4().hex[:16]}",
            payment_id=payment.payment_id,
            provider=payment.provider,
            amount=command.amount,
            reason=command.reason,
            status=str(provider_result.get("status", "initiated")),
            provider_reference=str(provider_result.get("provider_reference")),
            payload={"provider_result": provider_result},
        )
        await self._repository.create_refund(refund)
        await self._repository.update_payment_status(payment.payment_id, "refunded")
        await self._repository.commit()
        return {
            "refund_id": refund.refund_id,
            "payment_id": payment.payment_id,
            "status": refund.status,
            "provider": refund.provider,
        }

    def _provider(self, provider_name: str) -> PaymentProvider:
        provider = self._providers.get(provider_name)
        if provider is None:
            raise ValueError(f"unsupported_provider:{provider_name}")
        return provider

    @staticmethod
    def _payment_payload(payment: PaymentTransaction) -> dict[str, object]:
        return {
            "payment_id": payment.payment_id,
            "booking_id": payment.booking_id,
            "provider": payment.provider,
            "method": payment.method,
            "amount": payment.amount,
            "currency": payment.currency,
            "status": payment.status,
            "provider_reference": payment.provider_reference,
        }
