from pathlib import Path
import sys

sys.path.append(str(Path(__file__).resolve().parents[3]))

from shared.runtime import build_app

from .api import router
from .core.config import settings
from .repository import SearchRepository
from .service import SearchService


def create_app():
    app = build_app(
        service_name=settings.service_name,
        service_version=settings.service_version,
        router=router,
    )

    app.state.search_service = SearchService(SearchRepository.seeded())
    return app


app = create_app()
