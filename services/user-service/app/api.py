from fastapi import APIRouter


router = APIRouter(prefix="/user", tags=["user-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "user-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "user-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "user-service", "version": "1.0.0"}
