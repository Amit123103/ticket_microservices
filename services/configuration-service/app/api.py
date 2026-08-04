from fastapi import APIRouter


router = APIRouter(prefix="/configuration", tags=["configuration-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "configuration-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "configuration-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "configuration-service", "version": "1.0.0"}
