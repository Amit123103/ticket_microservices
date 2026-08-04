class WalletServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "wallet-service"}
