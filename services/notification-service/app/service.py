class NotificationServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "notification-service"}
