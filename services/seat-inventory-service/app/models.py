from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, Integer, JSON, String, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class ServiceHeartbeat(Base):
    __tablename__ = "service_heartbeat"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    service_name: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    status: Mapped[str] = mapped_column(String(32), nullable=False, server_default=text("'ok'"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))


class TrainSeat(Base):
    __tablename__ = "train_seats"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    train_id: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    coach_code: Mapped[str] = mapped_column(String(16), nullable=False, index=True)
    seat_number: Mapped[str] = mapped_column(String(16), nullable=False, index=True)
    seat_class: Mapped[str] = mapped_column(String(32), nullable=False, index=True)
    is_reserved: Mapped[bool] = mapped_column(nullable=False, server_default=text("false"))
    is_holdable: Mapped[bool] = mapped_column(nullable=False, server_default=text("true"))
    attributes: Mapped[dict[str, object]] = mapped_column(JSON, nullable=False, server_default=text("'{}'"))


class SeatHold(Base):
    __tablename__ = "seat_holds"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    lock_id: Mapped[str] = mapped_column(String(64), nullable=False, unique=True, index=True)
    train_id: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    journey_date: Mapped[str] = mapped_column(String(16), nullable=False, index=True)
    passenger_count: Mapped[int] = mapped_column(Integer, nullable=False)
    coach_code: Mapped[str] = mapped_column(String(16), nullable=False)
    seat_numbers: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, server_default=text("'held'"))
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))
