class RefundServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "refund-service"}
