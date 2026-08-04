from __future__ import annotations

import asyncio

import httpx

from app.main import app


def test_healthz() -> None:
    async def run_request() -> dict[str, str]:
        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
            response = await client.get("/gateway/healthz")
            assert response.status_code == 200
            return response.json()

    assert asyncio.run(run_request())["status"] == "ok"
