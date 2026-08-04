from pathlib import Path
import os
import sys

for project_root in Path(__file__).resolve().parents:
    if (project_root / "shared").is_dir():
        sys.path.append(str(project_root))
        break

from shared.runtime import build_app
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from .api import router
from .models import Base
from .core.config import settings


testing_mode = os.getenv("TESTING", "0") == "1"
engine = None if testing_mode else create_async_engine(settings.database_url, pool_pre_ping=True)
session_factory = None if engine is None else async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


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

        @app.on_event("shutdown")
        async def dispose_engine() -> None:
            await engine.dispose()

    return app


app = create_app()
