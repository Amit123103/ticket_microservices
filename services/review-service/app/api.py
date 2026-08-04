from fastapi import APIRouter


router = APIRouter(prefix="/review", tags=["review-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "review-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "review-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "review-service", "version": "1.0.0"}
