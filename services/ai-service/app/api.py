from fastapi import APIRouter


router = APIRouter(prefix="/ai", tags=["ai-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "ai-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "ai-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "ai-service", "version": "1.0.0"}
