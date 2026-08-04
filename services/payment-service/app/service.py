class PaymentServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "payment-service"}
