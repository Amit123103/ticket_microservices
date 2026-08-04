from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Any

from sqlalchemy import DateTime, String, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class ServiceHeartbeat(Base):
    __tablename__ = "service_heartbeat"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    service_name: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    status: Mapped[str] = mapped_column(String(32), nullable=False, server_default=text("'ok'"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))


@dataclass(frozen=True, slots=True)
class Station:
    code: str
    name: str
    city: str
    state: str
    country: str
    latitude: float
    longitude: float


@dataclass(frozen=True, slots=True)
class TrainCatalogEntry:
    train_id: str
    name: str
    from_station: str
    to_station: str
    departure: str
    arrival: str
    classes: tuple[str, ...]
    amenities: tuple[str, ...]
    base_fare: int
    popularity_score: int
    tags: tuple[str, ...]


@dataclass(frozen=True, slots=True)
class SearchResult:
    train_id: str
    name: str
    from_station: str
    to_station: str
    departure: str
    arrival: str
    classes: tuple[str, ...]
    amenities: tuple[str, ...]
    base_fare: int
    popularity_score: int
    match_reason: str


@dataclass(frozen=True, slots=True)
class SearchRequest:
    from_station: str
    to_station: str
    travel_date: str
    passenger_count: int = 1
    train_class: str | None = None
    max_fare: int | None = None
    require_amenity: str | None = None


@dataclass(frozen=True, slots=True)
class SearchSummary:
    query: dict[str, Any]
    results: list[dict[str, Any]]
    total: int
