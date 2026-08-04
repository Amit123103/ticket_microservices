from fastapi import APIRouter


router = APIRouter(prefix="/gateway", tags=["gateway-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "gateway-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "gateway-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "gateway-service", "version": "1.0.0"}
