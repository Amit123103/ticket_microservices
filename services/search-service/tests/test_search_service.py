from __future__ import annotations

import asyncio

import httpx

from app.main import app


def test_station_autocomplete() -> None:
    async def run_request() -> dict[str, object]:
        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
            response = await client.get("/search/stations/autocomplete", params={"query": "New"})
            assert response.status_code == 200
            return response.json()

    payload = asyncio.run(run_request())
    assert payload["results"]
    assert payload["results"][0]["code"] == "NDLS"


def test_train_search_with_filters() -> None:
    async def run_request() -> dict[str, object]:
        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
            response = await client.post(
                "/search/trains",
                json={
                    "from_station": "NDLS",
                    "to_station": "BCT",
                    "travel_date": "2026-08-12",
                    "passenger_count": 2,
                    "train_class": "2A",
                    "max_fare": 1500,
                    "require_amenity": "wifi",
                },
            )
            assert response.status_code == 200
            return response.json()

    payload = asyncio.run(run_request())
    assert payload["total"] == 1
    assert payload["results"][0]["train_id"] == "train_1001"
    assert "class-match" in payload["results"][0]["match_reason"]