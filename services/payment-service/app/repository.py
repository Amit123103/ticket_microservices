from __future__ import annotations

from datetime import datetime

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from .models import PaymentRefund, PaymentTransaction, PaymentWebhookEvent


class PaymentRepository:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_payment_by_idempotency_key(self, idempotency_key: str) -> PaymentTransaction | None:
        result = await self._session.execute(
            select(PaymentTransaction).where(PaymentTransaction.idempotency_key == idempotency_key)
        )
        return result.scalar_one_or_none()

    async def get_payment_by_id(self, payment_id: str) -> PaymentTransaction | None:
        result = await self._session.execute(select(PaymentTransaction).where(PaymentTransaction.payment_id == payment_id))
        return result.scalar_one_or_none()

    async def get_payment_by_provider_reference(self, provider_reference: str) -> PaymentTransaction | None:
        result = await self._session.execute(
            select(PaymentTransaction).where(PaymentTransaction.provider_reference == provider_reference)
        )
        return result.scalar_one_or_none()

    async def get_webhook_event_by_id(self, event_id: str) -> PaymentWebhookEvent | None:
        result = await self._session.execute(
            select(PaymentWebhookEvent).where(PaymentWebhookEvent.event_id == event_id)
        )
        return result.scalar_one_or_none()

    async def create_payment(self, payment: PaymentTransaction) -> PaymentTransaction:
        self._session.add(payment)
        await self._session.flush()
        return payment

    async def create_webhook_event(self, event: PaymentWebhookEvent) -> PaymentWebhookEvent:
        self._session.add(event)
        await self._session.flush()
        return event

    async def create_refund(self, refund: PaymentRefund) -> PaymentRefund:
        self._session.add(refund)
        await self._session.flush()
        return refund

    async def update_payment_status(self, payment_id: str, status: str, provider_reference: str | None = None) -> int:
        values: dict[str, object] = {"status": status}
        if provider_reference is not None:
            values["provider_reference"] = provider_reference
        result = await self._session.execute(
            update(PaymentTransaction).where(PaymentTransaction.payment_id == payment_id).values(**values)
        )
        return int(result.rowcount or 0)

    async def commit(self) -> None:
        await self._session.commit()

    async def rollback(self) -> None:
        await self._session.rollback()
