from fastapi import APIRouter


router = APIRouter(prefix="/audit", tags=["audit-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "audit-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "audit-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "audit-service", "version": "1.0.0"}
