from fastapi import APIRouter


router = APIRouter(prefix="/wallet", tags=["wallet-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "wallet-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "wallet-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "wallet-service", "version": "1.0.0"}
