from fastapi import APIRouter


router = APIRouter(prefix="/pnr", tags=["pnr-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "pnr-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "pnr-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "pnr-service", "version": "1.0.0"}
