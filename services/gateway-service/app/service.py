from __future__ import annotations

from collections.abc import Mapping
from typing import Any, Protocol


class HttpxLikeClient(Protocol):
    async def get(self, url: str, params: Mapping[str, Any] | None = None): ...

    async def post(self, url: str, json: Mapping[str, Any] | None = None, headers: Mapping[str, str] | None = None): ...


class GatewayProxyService:
    def __init__(self, search_client: HttpxLikeClient, booking_client: HttpxLikeClient) -> None:
        self._search_client = search_client
        self._booking_client = booking_client

    async def ping(self) -> dict[str, str]:
        return {"status": "ok", "service": "gateway-service"}

    async def proxy_get(self, client: HttpxLikeClient, path: str, params: dict[str, Any] | None = None) -> dict[str, Any]:
        response = await client.get(path, params=params)
        response.raise_for_status()
        return response.json()

    async def proxy_post(
        self,
        client: HttpxLikeClient,
        path: str,
        payload: dict[str, Any],
        headers: dict[str, str] | None = None,
    ) -> dict[str, Any]:
        response = await client.post(path, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()

    @property
    def search_client(self) -> HttpxLikeClient:
        return self._search_client

    @property
    def booking_client(self) -> HttpxLikeClient:
        return self._booking_client
