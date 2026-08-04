class AdminServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "admin-service"}
