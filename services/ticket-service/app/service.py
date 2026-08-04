class TicketServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "ticket-service"}
