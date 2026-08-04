from fastapi import APIRouter


router = APIRouter(prefix="/train", tags=["train-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "train-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "train-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "train-service", "version": "1.0.0"}
