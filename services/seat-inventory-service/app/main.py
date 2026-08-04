from pathlib import Path
import os
import sys

sys.path.append(str(Path(__file__).resolve().parents[3]))

from shared.runtime import build_app
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from .api import router
from .models import Base, TrainSeat
from .core.config import settings


testing_mode = os.getenv("TESTING", "0") == "1"
engine = None if testing_mode else create_async_engine(settings.database_url, pool_pre_ping=True)
session_factory = None if engine is None else async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


def seed_seats() -> list[TrainSeat]:
    seat_rows: list[TrainSeat] = []
    for index in range(1, 41):
        seat_rows.append(
            TrainSeat(
                train_id="train_1001",
                coach_code="SL",
                seat_number=f"{index}A",
                seat_class="sleeper",
                is_reserved=False,
                is_holdable=True,
                attributes={"family_friendly": index <= 4, "women_reserved": index <= 6},
            )
        )
    return seat_rows


def create_app():
    app = build_app(
        service_name=settings.service_name,
        service_version=settings.service_version,
        router=router,
    )

    app.state.session_factory = session_factory

    if engine is not None:
        @app.on_event("startup")
        async def create_tables() -> None:
            async with engine.begin() as connection:
                await connection.run_sync(Base.metadata.create_all)
            async with session_factory() as session:
                existing = await session.execute(select(func.count(TrainSeat.id)))
                # seed is intentionally best-effort; empty DBs get a baseline train.
                if existing.scalar_one() == 0:
                    session.add_all(seed_seats())
                    await session.commit()

        @app.on_event("shutdown")
        async def dispose_engine() -> None:
            await engine.dispose()

    return app


app = create_app()
