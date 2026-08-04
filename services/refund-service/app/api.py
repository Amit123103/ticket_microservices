from fastapi import APIRouter


router = APIRouter(prefix="/refund", tags=["refund-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "refund-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "refund-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "refund-service", "version": "1.0.0"}
