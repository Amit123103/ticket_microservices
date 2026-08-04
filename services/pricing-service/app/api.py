from fastapi import APIRouter


router = APIRouter(prefix="/pricing", tags=["pricing-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "pricing-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "pricing-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "pricing-service", "version": "1.0.0"}
