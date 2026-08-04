class RecommendationServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "recommendation-service"}
