class AuditServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "audit-service"}
