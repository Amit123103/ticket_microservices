from fastapi import APIRouter


router = APIRouter(prefix="/analytics", tags=["analytics-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "analytics-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "analytics-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "analytics-service", "version": "1.0.0"}
