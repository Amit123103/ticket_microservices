from fastapi import APIRouter


router = APIRouter(prefix="/discovery", tags=["discovery-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "discovery-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "discovery-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "discovery-service", "version": "1.0.0"}
