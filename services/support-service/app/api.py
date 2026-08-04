from fastapi import APIRouter


router = APIRouter(prefix="/support", tags=["support-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "support-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "support-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "support-service", "version": "1.0.0"}
