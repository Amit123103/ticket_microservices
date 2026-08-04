from fastapi import APIRouter


router = APIRouter(prefix="/ticket", tags=["ticket-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "ticket-service"}


@router.get("/readyz")
async def readyz() -> dict[str, str]:
    return {"status": "ready", "service": "ticket-service"}


@router.get("/version")
async def version() -> dict[str, str]:
    return {"service": "ticket-service", "version": "1.0.0"}
