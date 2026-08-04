from fastapi import APIRouter


router = APIRouter(prefix="/route", tags=["route-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "route-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "route-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "route-service", "version": "1.0.0"}
