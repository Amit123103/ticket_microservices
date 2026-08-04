from fastapi import APIRouter


router = APIRouter(prefix="/cancellation", tags=["cancellation-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "cancellation-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "cancellation-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "cancellation-service", "version": "1.0.0"}
