from fastapi import APIRouter
from pydantic import BaseModel, Field


router = APIRouter(prefix="/payments", tags=["payment-service"])


class PaymentRequest(BaseModel):
    booking_id: str
    amount: float = Field(gt=0)
    method: str


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "payment-service"}


@router.post("/initiate")
async def initiate(payload: PaymentRequest) -> dict[str, str]:
    return {"payment_id": "pay_123", "status": "initiated", "provider": payload.method}


@router.post("/webhook")
async def webhook(event: dict[str, str]) -> dict[str, str]:
    return {"status": "accepted", "event_type": event.get("type", "unknown")}
