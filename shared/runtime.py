from __future__ import annotations

import logging
import time
from collections.abc import Callable

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware


class RequestContextMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable):
        start = time.perf_counter()
        request_id = request.headers.get("x-request-id", f"req-{int(start * 1000)}")
        response = await call_next(request)
        response.headers["x-request-id"] = request_id
        response.headers["x-process-time-ms"] = f"{(time.perf_counter() - start) * 1000:.2f}"
        return response


def build_app(*, service_name: str, service_version: str, router) -> FastAPI:
    app = FastAPI(
        title=service_name,
        version=service_version,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
    )
    app.add_middleware(GZipMiddleware, minimum_size=1024)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(RequestContextMiddleware)

    @app.get("/metrics", tags=[service_name])
    async def metrics() -> JSONResponse:
        return JSONResponse(
            {"service": service_name, "uptime": "available", "version": service_version}
        )

    app.include_router(router)
    return app
