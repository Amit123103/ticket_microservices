from __future__ import annotations

from dataclasses import dataclass
from math import radians, sin, cos, sqrt, atan2

from .models import SearchRequest, SearchResult, Station, TrainCatalogEntry


@dataclass(slots=True)
class SearchRepository:
    stations: tuple[Station, ...]
    catalog: tuple[TrainCatalogEntry, ...]

    @classmethod
    def seeded(cls) -> SearchRepository:
        stations = (
            Station("NDLS", "New Delhi", "Delhi", "Delhi", "IN", 28.6429, 77.2195),
            Station("BCT", "Mumbai Central", "Mumbai", "Maharashtra", "IN", 18.9696, 72.8205),
            Station("CSTM", "Chhatrapati Shivaji Maharaj Terminus", "Mumbai", "Maharashtra", "IN", 18.9398, 72.8355),
            Station("SBC", "KSR Bengaluru City", "Bengaluru", "Karnataka", "IN", 12.9777, 77.5669),
            Station("MAS", "Chennai Central", "Chennai", "Tamil Nadu", "IN", 13.0827, 80.2757),
            Station("HWH", "Howrah Junction", "Kolkata", "West Bengal", "IN", 22.5849, 88.3426),
        )
        catalog = (
            TrainCatalogEntry(
                train_id="train_1001",
                name="Rajdhani Express",
                from_station="NDLS",
                to_station="BCT",
                departure="08:00",
                arrival="16:30",
                classes=("1A", "2A", "3A"),
                amenities=("meal", "wifi", "berth", "ac"),
                base_fare=1200,
                popularity_score=98,
                tags=("premium", "long-distance"),
            ),
            TrainCatalogEntry(
                train_id="train_1002",
                name="Shatabdi Express",
                from_station="NDLS",
                to_station="SBC",
                departure="06:10",
                arrival="14:45",
                classes=("CC", "EC"),
                amenities=("meal", "wifi", "chair-car"),
                base_fare=950,
                popularity_score=91,
                tags=("day-train", "fast"),
            ),
            TrainCatalogEntry(
                train_id="train_1003",
                name="Duronto Express",
                from_station="BCT",
                to_station="MAS",
                departure="19:30",
                arrival="10:15",
                classes=("SL", "3A", "2A"),
                amenities=("berth", "ac"),
                base_fare=780,
                popularity_score=84,
                tags=("overnight", "popular"),
            ),
            TrainCatalogEntry(
                train_id="train_1004",
                name="Vande Bharat Express",
                from_station="NDLS",
                to_station="HWH",
                departure="15:00",
                arrival="23:20",
                classes=("CC", "EC"),
                amenities=("wifi", "meal", "ac", "chair-car"),
                base_fare=1320,
                popularity_score=100,
                tags=("premium", "high-speed"),
            ),
        )
        return cls(stations=stations, catalog=catalog)

    def autocomplete_station(self, query: str) -> list[dict[str, object]]:
        normalized = query.strip().lower()
        if not normalized:
            return []
        matches = [
            station
            for station in self.stations
            if normalized in station.code.lower() or normalized in station.name.lower() or normalized in station.city.lower()
        ]
        return [self._station_payload(station) for station in matches[:10]]

    def nearby_stations(self, latitude: float, longitude: float, radius_km: float = 150.0) -> list[dict[str, object]]:
        nearby: list[tuple[float, Station]] = []
        for station in self.stations:
            distance = self._distance(latitude, longitude, station.latitude, station.longitude)
            if distance <= radius_km:
                nearby.append((distance, station))
        nearby.sort(key=lambda item: item[0])
        return [self._station_payload(station, distance) for distance, station in nearby]

    def search_trains(self, request: SearchRequest) -> list[SearchResult]:
        matches: list[SearchResult] = []
        for entry in self.catalog:
            if entry.from_station != request.from_station or entry.to_station != request.to_station:
                continue
            if request.train_class and request.train_class not in entry.classes:
                continue
            if request.max_fare is not None and entry.base_fare > request.max_fare:
                continue
            if request.require_amenity and request.require_amenity not in entry.amenities:
                continue
            matches.append(
                SearchResult(
                    train_id=entry.train_id,
                    name=entry.name,
                    from_station=entry.from_station,
                    to_station=entry.to_station,
                    departure=entry.departure,
                    arrival=entry.arrival,
                    classes=entry.classes,
                    amenities=entry.amenities,
                    base_fare=entry.base_fare,
                    popularity_score=entry.popularity_score,
                    match_reason=self._match_reason(entry, request),
                )
            )
        matches.sort(key=lambda item: (-item.popularity_score, item.base_fare, item.departure))
        return matches

    def trending_routes(self, limit: int = 5) -> list[dict[str, object]]:
        ranked = sorted(self.catalog, key=lambda item: (-item.popularity_score, item.base_fare))
        return [
            {
                "train_id": entry.train_id,
                "name": entry.name,
                "route": f"{entry.from_station}-{entry.to_station}",
                "popularity_score": entry.popularity_score,
                "base_fare": entry.base_fare,
            }
            for entry in ranked[:limit]
        ]

    @staticmethod
    def _station_payload(station: Station, distance_km: float | None = None) -> dict[str, object]:
        payload: dict[str, object] = {
            "code": station.code,
            "name": station.name,
            "city": station.city,
            "state": station.state,
            "country": station.country,
            "latitude": station.latitude,
            "longitude": station.longitude,
        }
        if distance_km is not None:
            payload["distance_km"] = round(distance_km, 2)
        return payload

    @staticmethod
    def _distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        radius = 6371.0
        dlat = radians(lat2 - lat1)
        dlon = radians(lon2 - lon1)
        a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        return radius * c

    @staticmethod
    def _match_reason(entry: TrainCatalogEntry, request: SearchRequest) -> str:
        parts = ["route-match"]
        if request.train_class and request.train_class in entry.classes:
            parts.append("class-match")
        if request.require_amenity and request.require_amenity in entry.amenities:
            parts.append("amenity-match")
        if request.max_fare is not None and entry.base_fare <= request.max_fare:
            parts.append("fare-match")
        return "+".join(parts)
