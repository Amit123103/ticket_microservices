class ConfigurationServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "configuration-service"}
