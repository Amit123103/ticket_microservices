from fastapi import APIRouter


router = APIRouter(prefix="/station", tags=["station-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "station-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "station-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "station-service", "version": "1.0.0"}
