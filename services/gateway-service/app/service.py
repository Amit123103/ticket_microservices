class GatewayServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "gateway-service"}
