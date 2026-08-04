class TrainServiceService:
    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "train-service"}
