from __future__ import annotations

from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
from pydantic import BaseModel, Field

from .repository import PaymentRepository
from .service import (
    PaymentInitiateCommand,
    PaymentService,
    PaypalProvider,
    RazorpayProvider,
    RefundCommand,
    StripeProvider,
)


router = APIRouter(prefix="/payments", tags=["payment-service"])


class PaymentRequest(BaseModel):
    booking_id: str
    amount: int = Field(gt=0, description="Amount in the currency's smallest unit (paise for INR).")
    method: str
    provider: str = Field(default="stripe")


class RefundRequest(BaseModel):
    payment_id: str
    amount: int = Field(gt=0, description="Amount in the currency's smallest unit (paise for INR).")
    reason: str = Field(min_length=3)


async def get_payment_service(request: Request):
    session_factory = request.app.state.session_factory
    if session_factory is None:
        raise RuntimeError("payment service is not configured")
    async with session_factory() as session:
        yield PaymentService(
            PaymentRepository(session),
            {
                "stripe": StripeProvider(),
                "razorpay": RazorpayProvider(),
                "paypal": PaypalProvider(),
            },
        )


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "payment-service"}


@router.post("/initiate", status_code=status.HTTP_201_CREATED)
async def initiate(
    payload: PaymentRequest,
    service: PaymentService = Depends(get_payment_service),
    idempotency_key: str | None = Header(default=None, alias="Idempotency-Key"),
) -> dict[str, object]:
    if idempotency_key is None:
        raise HTTPException(status_code=400, detail="missing_idempotency_key")
    try:
        return await service.initiate_payment(
            PaymentInitiateCommand(
                booking_id=payload.booking_id,
                amount=payload.amount,
                method=payload.method,
                provider=payload.provider,
                idempotency_key=idempotency_key,
            )
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.post("/webhook")
async def webhook(
    event: dict[str, object],
    service: PaymentService = Depends(get_payment_service),
    provider: str = Header(default="stripe", alias="X-Payment-Provider"),
    signature: str = Header(default="", alias="X-Webhook-Signature"),
) -> dict[str, object]:
    try:
        return await service.handle_webhook(provider, event, signature)
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=str(exc)) from exc


@router.post("/refund")
async def refund(payload: RefundRequest, service: PaymentService = Depends(get_payment_service)) -> dict[str, object]:
    try:
        return await service.refund_payment(
            RefundCommand(payment_id=payload.payment_id, amount=payload.amount, reason=payload.reason)
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
