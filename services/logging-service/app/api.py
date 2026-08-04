from fastapi import APIRouter


router = APIRouter(prefix="/logging", tags=["logging-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "logging-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "logging-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "logging-service", "version": "1.0.0"}
