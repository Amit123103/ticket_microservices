class SearchServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "search-service"}
