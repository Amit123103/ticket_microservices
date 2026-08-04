class PnrServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "pnr-service"}
