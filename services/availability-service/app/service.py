class AvailabilityServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "availability-service"}
