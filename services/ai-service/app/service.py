class AiServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "ai-service"}
