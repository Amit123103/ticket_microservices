from __future__ import annotations

import asyncio
from dataclasses import dataclass

import httpx

from app.main import app


@dataclass
class ResponseStub:
    payload: dict[str, object]

    def raise_for_status(self) -> None:
        return None

    def json(self) -> dict[str, object]:
        return self.payload


class FakeClient:
    async def get(self, url: str, params=None):
        if url == "/search/stations/autocomplete":
            return ResponseStub({"query": params["query"], "results": [{"code": "NDLS"}]})
        if url == "/search/routes/trending":
            return ResponseStub({"limit": params["limit"], "results": [{"train_id": "train_1004"}]})
        return ResponseStub({"status": "ok"})

    async def post(self, url: str, json=None, headers=None):
        if url == "/search/trains":
            return ResponseStub({"total": 1, "results": [{"train_id": "train_1001"}]})
        if url == "/bookings/hold":
            return ResponseStub({"hold_id": "hold_1", "status": "held"})
        if url == "/bookings/confirm":
            return ResponseStub({"booking_id": "booking_1", "status": "confirmed"})
        return ResponseStub({"booking_id": "booking_1", "status": "cancelled"})


def test_gateway_search_proxy_routes() -> None:
    app.dependency_overrides.clear()
    app.state.search_client = FakeClient()
    app.state.booking_client = FakeClient()
    app.state.gateway_service = app.state.gateway_service.__class__(app.state.search_client, app.state.booking_client)

    async def run_request() -> dict[str, object]:
        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
            response = await client.get("/gateway/search/stations/autocomplete", params={"query": "New"})
            assert response.status_code == 200
            return response.json()

    payload = asyncio.run(run_request())
    assert payload["results"][0]["code"] == "NDLS"


def test_gateway_booking_hold_proxy_requires_idempotency_key() -> None:
    app.dependency_overrides.clear()
    app.state.search_client = FakeClient()
    app.state.booking_client = FakeClient()
    app.state.gateway_service = app.state.gateway_service.__class__(app.state.search_client, app.state.booking_client)

    async def run_request() -> int:
        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
            response = await client.post(
                "/gateway/bookings/hold",
                json={"user_id": "u1", "train_id": "train_1001", "journey_date": "2026-08-10", "passenger_count": 1},
            )
            return response.status_code

    assert asyncio.run(run_request()) == 400