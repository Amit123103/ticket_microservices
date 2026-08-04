class CancellationServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "cancellation-service"}
