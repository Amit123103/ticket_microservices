class PricingServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "pricing-service"}
