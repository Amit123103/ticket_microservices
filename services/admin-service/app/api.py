from fastapi import APIRouter


router = APIRouter(prefix="/admin", tags=["admin-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "admin-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "admin-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "admin-service", "version": "1.0.0"}
