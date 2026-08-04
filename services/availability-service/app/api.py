from fastapi import APIRouter


router = APIRouter(prefix="/availability", tags=["availability-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "availability-service"}


@router.get("/trains/{train_id}/seats")
async def seats(train_id: str) -> dict[str, object]:
    return {"train_id": train_id, "available": 127, "waiting_list": 21}
