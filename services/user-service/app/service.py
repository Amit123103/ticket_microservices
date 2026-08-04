class UserServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "user-service"}
