from pathlib import Path
import os
import sys

import httpx
sys.path.append(str(Path(__file__).resolve().parents[3]))

from shared.runtime import build_app
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from .api import router
from .models import Base
from .core.config import settings


testing_mode = os.getenv("TESTING", "0") == "1"
engine = None if testing_mode else create_async_engine(settings.database_url, pool_pre_ping=True)
session_factory = None if engine is None else async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


class HttpInventoryClient:
    def __init__(self, base_url: str) -> None:
        self._base_url = base_url.rstrip("/")

    async def reserve_seats(self, command: dict[str, object]) -> dict[str, object]:
        async with httpx.AsyncClient(base_url=self._base_url, timeout=10.0) as client:
            response = await client.post("/inventory/lock", json=command)
            response.raise_for_status()
            return response.json()

    async def release_hold(self, lock_id: str) -> dict[str, object]:
        async with httpx.AsyncClient(base_url=self._base_url, timeout=10.0) as client:
            response = await client.post(f"/inventory/release/{lock_id}")
            response.raise_for_status()
            return response.json()


def create_app():
    app = build_app(
        service_name=settings.service_name,
        service_version=settings.service_version,
        router=router,
    )

    app.state.session_factory = session_factory
    app.state.inventory_client = HttpInventoryClient(settings.inventory_service_url)

    if engine is not None:
        @app.on_event("startup")
        async def create_tables() -> None:
            async with engine.begin() as connection:
                await connection.run_sync(Base.metadata.create_all)

        @app.on_event("shutdown")
        async def dispose_engine() -> None:
            await engine.dispose()

    return app


app = create_app()
