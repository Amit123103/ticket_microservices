from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(prefix="/notifications", tags=["notification-service"])


class NotificationRequest(BaseModel):
    user_id: str
    channel: str
    template: str


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "notification-service"}


@router.post("/send")
async def send(payload: NotificationRequest) -> dict[str, str]:
    return {"notification_id": "notif_123", "status": "queued", "channel": payload.channel}
