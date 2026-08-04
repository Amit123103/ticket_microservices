class LoggingServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "logging-service"}
