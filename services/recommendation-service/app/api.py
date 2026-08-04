from fastapi import APIRouter


router = APIRouter(prefix="/recommendation", tags=["recommendation-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "recommendation-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "recommendation-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "recommendation-service", "version": "1.0.0"}
