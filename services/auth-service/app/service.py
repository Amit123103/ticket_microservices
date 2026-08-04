class AuthServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "auth-service"}
