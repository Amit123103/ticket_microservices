from datetime import date
from fastapi import APIRouter, Query


router = APIRouter(prefix="/search", tags=["search-service"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "search-service"}


@router.get("/trains")
async def trains(
    from_station: str = Query(..., min_length=2),
    to_station: str = Query(..., min_length=2),
    travel_date: date = Query(...),
) -> dict[str, object]:
    return {
        "query": {"from": from_station, "to": to_station, "date": travel_date.isoformat()},
        "results": [
            {
                "train_id": "train_1001",
                "name": "Rajdhani Express",
                "departure": "08:00",
                "arrival": "16:30",
                "fares": [1200, 1800, 2500],
            }
        ],
    }
