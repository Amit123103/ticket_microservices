class StationServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "station-service"}
