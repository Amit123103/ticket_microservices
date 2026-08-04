class AnalyticsServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "analytics-service"}
