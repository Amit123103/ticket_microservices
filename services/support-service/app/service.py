class SupportServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "support-service"}
