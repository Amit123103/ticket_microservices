from __future__ import annotations

from fastapi import APIRouter, Depends, Query, Request
from pydantic import BaseModel, Field

from .models import SearchRequest
from .repository import SearchRepository
from .service import SearchService


router = APIRouter(prefix="/search", tags=["search-service"])


class TrainSearchRequest(BaseModel):
    from_station: str = Field(min_length=2)
    to_station: str = Field(min_length=2)
    travel_date: str
    passenger_count: int = Field(default=1, ge=1)
    train_class: str | None = None
    max_fare: int | None = Field(default=None, ge=0)
    require_amenity: str | None = None


def get_search_service(request: Request) -> SearchService:
    return request.app.state.search_service


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "search-service"}


@router.get("/stations/autocomplete")
async def autocomplete(query: str = Query(..., min_length=1), service: SearchService = Depends(get_search_service)) -> dict[str, object]:
    return {"query": query, "results": await service.autocomplete_station(query)}


@router.get("/stations/nearby")
async def nearby(
    latitude: float = Query(...),
    longitude: float = Query(...),
    radius_km: float = Query(default=150.0, ge=1.0),
    service: SearchService = Depends(get_search_service),
) -> dict[str, object]:
    return {
        "latitude": latitude,
        "longitude": longitude,
        "radius_km": radius_km,
        "results": await service.nearby_stations(latitude, longitude, radius_km),
    }


@router.get("/routes/trending")
async def trending(limit: int = Query(default=5, ge=1, le=20), service: SearchService = Depends(get_search_service)) -> dict[str, object]:
    return {"limit": limit, "results": await service.trending_routes(limit)}


@router.post("/trains")
async def trains(payload: TrainSearchRequest, service: SearchService = Depends(get_search_service)) -> dict[str, object]:
    return await service.search_trains(
        SearchRequest(
            from_station=payload.from_station,
            to_station=payload.to_station,
            travel_date=payload.travel_date,
            passenger_count=payload.passenger_count,
            train_class=payload.train_class,
            max_fare=payload.max_fare,
            require_amenity=payload.require_amenity,
        )
    )
