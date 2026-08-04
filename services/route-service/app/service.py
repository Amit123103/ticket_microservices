class RouteServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "route-service"}
