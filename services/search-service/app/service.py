from __future__ import annotations

from dataclasses import asdict

from .models import SearchRequest
from .repository import SearchRepository


class SearchService:
    def __init__(self, repository: SearchRepository) -> None:
        self._repository = repository

    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "search-service"}

    async def autocomplete_station(self, query: str) -> list[dict[str, object]]:
        return self._repository.autocomplete_station(query)

    async def nearby_stations(self, latitude: float, longitude: float, radius_km: float = 150.0) -> list[dict[str, object]]:
        return self._repository.nearby_stations(latitude, longitude, radius_km)

    async def search_trains(self, request: SearchRequest) -> dict[str, object]:
        results = self._repository.search_trains(request)
        return {
            "query": {
                "from": request.from_station,
                "to": request.to_station,
                "date": request.travel_date,
                "passenger_count": request.passenger_count,
                "class": request.train_class,
                "max_fare": request.max_fare,
                "require_amenity": request.require_amenity,
            },
            "total": len(results),
            "results": [self._result_payload(item) for item in results],
        }

    async def trending_routes(self, limit: int = 5) -> list[dict[str, object]]:
        return self._repository.trending_routes(limit)

    @staticmethod
    def _result_payload(result) -> dict[str, object]:
        payload = asdict(result)
        payload["classes"] = list(result.classes)
        payload["amenities"] = list(result.amenities)
        return payload
