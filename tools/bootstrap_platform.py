from __future__ import annotations

from pathlib import Path
from textwrap import dedent
import json


ROOT = Path(__file__).resolve().parents[1]


def write_file(relative_path: str, content: str) -> None:
    path = ROOT / relative_path
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.lstrip("\n"), encoding="utf-8")


def service_module_name(service_name: str) -> str:
    return service_name.replace("-", "_")


def service_class_name(service_name: str) -> str:
    return "".join(part.capitalize() for part in service_name.split("-"))


COMMON_REQUIREMENTS = dedent(
    """
    fastapi==0.115.6
    uvicorn[standard]==0.34.0
    pydantic==2.10.5
    pydantic-settings==2.7.1
    sqlalchemy[asyncio]==2.0.36
    asyncpg==0.30.0
    alembic==1.14.0
    redis==5.2.1
    httpx==0.28.1
    python-jose[cryptography]==3.3.0
    passlib[bcrypt]==1.7.4
    tenacity==9.0.0
    orjson==3.10.12
    pytest==8.3.4
    pytest-asyncio==0.25.2
    """
)


SERVICE_CONFIG_TEMPLATE = dedent(
    """
    from pydantic_settings import BaseSettings, SettingsConfigDict


    class Settings(BaseSettings):
        model_config = SettingsConfigDict(env_file=".env", extra="ignore")

        service_name: str = "{service_name}"
        service_version: str = "1.0.0"
        environment: str = "local"
        database_url: str = "postgresql+asyncpg://platform:platform@localhost:5432/{database_name}"
        redis_url: str = "redis://localhost:6379/0"
        kafka_bootstrap_servers: str = "localhost:9092"
        auth_public_key: str = ""
        auth_private_key: str = ""


    settings = Settings()
    """
)


GENERIC_API_TEMPLATE = dedent(
    """
    from fastapi import APIRouter


    router = APIRouter(prefix="/{api_prefix}", tags=["{service_name}"])


    @router.get("/healthz")
    async def healthz() -> dict[str, str]:
        return {{"status": "ok", "service": "{service_name}"}}


    @router.get("/readyz")
    async def readyz() -> dict[str, str]:
        return {{"status": "ready", "service": "{service_name}"}}


    @router.get("/version")
    async def version() -> dict[str, str]:
        return {{"service": "{service_name}", "version": "1.0.0"}}
    """
)


GENERIC_MAIN_TEMPLATE = dedent(
    """
    from pathlib import Path
    import sys

    sys.path.append(str(Path(__file__).resolve().parents[3]))

    from shared.runtime import build_app

    from .api import router
    from .core.config import settings


    def create_app():
        return build_app(
            service_name=settings.service_name,
            service_version=settings.service_version,
            router=router,
        )


    app = create_app()
    """
)


GENERIC_MODEL_TEMPLATE = dedent(
    """
    from datetime import datetime
    from sqlalchemy import DateTime, String, text
    from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


    class Base(DeclarativeBase):
        pass


    class ServiceHeartbeat(Base):
        __tablename__ = "service_heartbeat"

        id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
        service_name: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
        status: Mapped[str] = mapped_column(String(32), nullable=False, server_default=text("'ok'"))
        created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))
    """
)


GENERIC_REPOSITORY_TEMPLATE = dedent(
    """
    from __future__ import annotations

    from dataclasses import dataclass


    @dataclass(slots=True)
    class RepositoryResult:
        id: str
        payload: dict[str, str]
    """
)


GENERIC_SERVICE_TEMPLATE = dedent(
    """
    class {class_name}Service:
        async def ping(self) -> dict[str, str]:
            return {{"status": "ok", "service": "{service_name}"}}
    """
)


GENERIC_TEST_TEMPLATE = dedent(
    """
    from fastapi.testclient import TestClient

    from app.main import app


    def test_healthz() -> None:
        client = TestClient(app)
        response = client.get("/{api_prefix}/healthz")
        assert response.status_code == 200
        assert response.json()["status"] == "ok"
    """
)


GENERIC_DOCKERFILE = dedent(
    """
    FROM python:3.12-slim

    WORKDIR /app

    COPY services/{service_name}/requirements.txt ./requirements.txt
    RUN pip install --no-cache-dir -r requirements.txt

    COPY shared ./shared
    COPY services/{service_name}/app ./app

    EXPOSE 8000
    CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
    """
)


GENERIC_COMPOSE = dedent(
        """
        services:
            {service_name}:
                build:
                    context: ../..
                    dockerfile: services/{service_name}/Dockerfile
                ports:
                    - "{port}:8000"
                environment:
                    SERVICE_NAME: {service_name}
                    DATABASE_URL: postgresql+asyncpg://platform:platform@postgres:5432/{database_name}
                    REDIS_URL: redis://redis:6379/0
                depends_on:
                    postgres:
                        condition: service_healthy
                    redis:
                        condition: service_started

            postgres:
                image: postgres:16-alpine
                environment:
                    POSTGRES_USER: platform
                    POSTGRES_PASSWORD: platform
                    POSTGRES_DB: {database_name}
                healthcheck:
                    test: ["CMD-SHELL", "pg_isready -U platform -d {database_name}"]
                    interval: 10s
                    timeout: 5s
                    retries: 5

            redis:
                image: redis:7-alpine
        """
)


K8S_DEPLOYMENT_TEMPLATE = dedent(
    """
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: {service_name}
      labels:
        app: {service_name}
    spec:
      replicas: 2
      selector:
        matchLabels:
          app: {service_name}
      template:
        metadata:
          labels:
            app: {service_name}
        spec:
          containers:
            - name: {service_name}
              image: {image}
              ports:
                - containerPort: 8000
              env:
                - name: SERVICE_NAME
                  value: {service_name}
              readinessProbe:
                httpGet:
                  path: /{api_prefix}/readyz
                  port: 8000
                initialDelaySeconds: 5
              livenessProbe:
                httpGet:
                  path: /{api_prefix}/healthz
                  port: 8000
                initialDelaySeconds: 10
    """
)


K8S_SERVICE_TEMPLATE = dedent(
    """
    apiVersion: v1
    kind: Service
    metadata:
      name: {service_name}
    spec:
      selector:
        app: {service_name}
      ports:
        - port: 80
          targetPort: 8000
    """
)


K8S_HPA_TEMPLATE = dedent(
    """
    apiVersion: autoscaling/v2
    kind: HorizontalPodAutoscaler
    metadata:
      name: {service_name}
    spec:
      scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: {service_name}
      minReplicas: 2
      maxReplicas: 20
      metrics:
        - type: Resource
          resource:
            name: cpu
            target:
              type: Utilization
              averageUtilization: 70
    """
)


CRITICAL_SERVICES = {
    "auth-service": {
        "api": dedent(
            """
            from fastapi import APIRouter, HTTPException
            from pydantic import BaseModel, EmailStr


            router = APIRouter(prefix="/auth", tags=["auth-service"])


            class LoginRequest(BaseModel):
                email: EmailStr
                password: str


            class RegisterRequest(BaseModel):
                email: EmailStr
                password: str
                full_name: str


            @router.get("/healthz")
            async def healthz() -> dict[str, str]:
                return {"status": "ok", "service": "auth-service"}


            @router.post("/register")
            async def register(payload: RegisterRequest) -> dict[str, str]:
                return {"user_id": "user_123", "email": payload.email}


            @router.post("/login")
            async def login(payload: LoginRequest) -> dict[str, str]:
                if payload.password != "change-me":
                    raise HTTPException(status_code=401, detail="invalid_credentials")
                return {"access_token": "jwt-placeholder", "refresh_token": "refresh-placeholder"}


            @router.post("/refresh")
            async def refresh() -> dict[str, str]:
                return {"access_token": "jwt-placeholder"}
            """
        ),
    },
    "search-service": {
        "api": dedent(
            """
            from datetime import date
            from fastapi import APIRouter, Query


            router = APIRouter(prefix="/search", tags=["search-service"])


            @router.get("/healthz")
            async def healthz() -> dict[str, str]:
                return {"status": "ok", "service": "search-service"}


            @router.get("/trains")
            async def trains(
                from_station: str = Query(..., min_length=2),
                to_station: str = Query(..., min_length=2),
                travel_date: date = Query(...),
            ) -> dict[str, object]:
                return {
                    "query": {"from": from_station, "to": to_station, "date": travel_date.isoformat()},
                    "results": [
                        {
                            "train_id": "train_1001",
                            "name": "Rajdhani Express",
                            "departure": "08:00",
                            "arrival": "16:30",
                            "fares": [1200, 1800, 2500],
                        }
                    ],
                }
            """
        ),
    },
    "availability-service": {
        "api": dedent(
            """
            from fastapi import APIRouter


            router = APIRouter(prefix="/availability", tags=["availability-service"])


            @router.get("/healthz")
            async def healthz() -> dict[str, str]:
                return {"status": "ok", "service": "availability-service"}


            @router.get("/trains/{train_id}/seats")
            async def seats(train_id: str) -> dict[str, object]:
                return {"train_id": train_id, "available": 127, "waiting_list": 21}
            """
        ),
    },
    "seat-inventory-service": {
        "api": dedent(
            """
            from fastapi import APIRouter


            router = APIRouter(prefix="/inventory", tags=["seat-inventory-service"])


            @router.get("/healthz")
            async def healthz() -> dict[str, str]:
                return {"status": "ok", "service": "seat-inventory-service"}


            @router.post("/lock")
            async def lock(payload: dict[str, str]) -> dict[str, str]:
                return {"lock_id": "lock_123", "status": "held"}
            """
        ),
    },
    "booking-service": {
        "api": dedent(
            """
            from fastapi import APIRouter, HTTPException
            from pydantic import BaseModel


            router = APIRouter(prefix="/bookings", tags=["booking-service"])


            class HoldRequest(BaseModel):
                user_id: str
                train_id: str
                journey_date: str
                passenger_count: int


            class ConfirmRequest(BaseModel):
                hold_id: str
                payment_reference: str


            @router.get("/healthz")
            async def healthz() -> dict[str, str]:
                return {"status": "ok", "service": "booking-service"}


            @router.post("/hold")
            async def hold(payload: HoldRequest) -> dict[str, str]:
                if payload.passenger_count <= 0:
                    raise HTTPException(status_code=400, detail="invalid_passenger_count")
                return {"hold_id": "hold_123", "status": "held", "expires_in_seconds": "300"}


            @router.post("/confirm")
            async def confirm(payload: ConfirmRequest) -> dict[str, str]:
                return {"booking_id": "booking_123", "status": "confirmed"}


            @router.post("/cancel/{booking_id}")
            async def cancel(booking_id: str) -> dict[str, str]:
                return {"booking_id": booking_id, "status": "cancelled"}
            """
        ),
    },
    "payment-service": {
        "api": dedent(
            """
            from fastapi import APIRouter
            from pydantic import BaseModel, Field


            router = APIRouter(prefix="/payments", tags=["payment-service"])


            class PaymentRequest(BaseModel):
                booking_id: str
                amount: float = Field(gt=0)
                method: str


            @router.get("/healthz")
            async def healthz() -> dict[str, str]:
                return {"status": "ok", "service": "payment-service"}


            @router.post("/initiate")
            async def initiate(payload: PaymentRequest) -> dict[str, str]:
                return {"payment_id": "pay_123", "status": "initiated", "provider": payload.method}


            @router.post("/webhook")
            async def webhook(event: dict[str, str]) -> dict[str, str]:
                return {"status": "accepted", "event_type": event.get("type", "unknown")}
            """
        ),
    },
    "notification-service": {
        "api": dedent(
            """
            from fastapi import APIRouter
            from pydantic import BaseModel


            router = APIRouter(prefix="/notifications", tags=["notification-service"])


            class NotificationRequest(BaseModel):
                user_id: str
                channel: str
                template: str


            @router.get("/healthz")
            async def healthz() -> dict[str, str]:
                return {"status": "ok", "service": "notification-service"}


            @router.post("/send")
            async def send(payload: NotificationRequest) -> dict[str, str]:
                return {"notification_id": "notif_123", "status": "queued", "channel": payload.channel}
            """
        ),
    },
}


SHARED_RUNTIME_FILES = {
    "shared/__init__.py": "",
    "shared/runtime.py": dedent(
        """
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
        """
    ),
    "shared/logging.py": dedent(
        """
        from __future__ import annotations

        import logging


        def configure_logging(service_name: str) -> None:
            logging.basicConfig(
                level=logging.INFO,
                format=f"%(asctime)s %(levelname)s {service_name} %(name)s %(message)s",
            )
        """
    ),
}


SERVICES = [
    "auth-service",
    "user-service",
    "train-service",
    "station-service",
    "route-service",
    "search-service",
    "availability-service",
    "seat-inventory-service",
    "booking-service",
    "payment-service",
    "wallet-service",
    "pnr-service",
    "ticket-service",
    "cancellation-service",
    "refund-service",
    "notification-service",
    "pricing-service",
    "recommendation-service",
    "ai-service",
    "analytics-service",
    "review-service",
    "admin-service",
    "support-service",
    "audit-service",
    "logging-service",
    "gateway-service",
    "configuration-service",
    "discovery-service",
]


def build_generic_service(service_name: str, port: int) -> None:
    module_name = service_module_name(service_name)
    class_name = service_class_name(service_name)
    database_name = service_name.replace("-", "_")
    api_prefix = module_name.split("_service")[0] if module_name.endswith("_service") else module_name

    base = f"services/{service_name}"
    write_file(f"{base}/requirements.txt", COMMON_REQUIREMENTS)
    write_file(f"{base}/Dockerfile", GENERIC_DOCKERFILE.format(service_name=service_name))
    write_file(
        f"{base}/docker-compose.yml",
        GENERIC_COMPOSE.format(service_name=service_name, port=port, database_name=database_name),
    )
    write_file(f"{base}/app/main.py", GENERIC_MAIN_TEMPLATE)
    write_file(
        f"{base}/app/api.py",
        GENERIC_API_TEMPLATE.format(service_name=service_name, api_prefix=api_prefix),
    )
    write_file(
        f"{base}/app/core/config.py",
        SERVICE_CONFIG_TEMPLATE.format(service_name=service_name, database_name=database_name),
    )
    write_file(f"{base}/app/models.py", GENERIC_MODEL_TEMPLATE)
    write_file(f"{base}/app/repository.py", GENERIC_REPOSITORY_TEMPLATE)
    write_file(
        f"{base}/app/service.py",
        GENERIC_SERVICE_TEMPLATE.format(class_name=class_name, service_name=service_name),
    )
    write_file(
        f"{base}/tests/test_health.py",
        GENERIC_TEST_TEMPLATE.format(api_prefix=api_prefix),
    )
    write_file(
        f"{base}/k8s/deployment.yaml",
        K8S_DEPLOYMENT_TEMPLATE.format(service_name=service_name, api_prefix=api_prefix, image=f"ghcr.io/example/{service_name}:latest"),
    )
    write_file(f"{base}/k8s/service.yaml", K8S_SERVICE_TEMPLATE.format(service_name=service_name))
    write_file(f"{base}/k8s/hpa.yaml", K8S_HPA_TEMPLATE.format(service_name=service_name))


def build_critical_service(service_name: str, port: int) -> None:
    build_generic_service(service_name, port)
    base = f"services/{service_name}"
    write_file(f"{base}/app/api.py", CRITICAL_SERVICES[service_name]["api"])


def build_docs() -> None:
    write_file(
        "docs/architecture.md",
        dedent(
            """
            # Architecture

            ```mermaid
            flowchart LR
              U[Web / Mobile / Partner APIs] --> G[Gateway Service]
              G --> A[Auth Service]
              G --> S[Search Service]
              G --> B[Booking Service]
              B --> I[Seat Inventory Service]
              B --> P[Payment Service]
              B --> N[Notification Service]
              S --> ES[(Elasticsearch)]
              I --> R[(Redis)]
              B --> DB[(PostgreSQL)]
            ```

            ## Design Principles

            - DDD bounded contexts per service
            - Separate database per service
            - Event-driven communication for downstream effects
            - Synchronous request paths only where consistency is required
            - Outbox pattern for reliable event publication
            - Idempotency keys on booking and payment flows
            """
        ),
    )
    write_file(
        "docs/sequence-booking.md",
        dedent(
            """
            # Booking Sequence

            ```mermaid
            sequenceDiagram
              participant U as User
              participant G as Gateway
              participant S as Search
              participant B as Booking
              participant I as Inventory
              participant P as Payment
              participant N as Notification

              U->>G: Search trains
              G->>S: query trains
              S-->>G: results
              U->>G: Hold seat
              G->>B: create hold
              B->>I: lock seats
              I-->>B: hold confirmed
              U->>G: Pay booking
              G->>P: create payment
              P-->>B: payment success
              B->>N: booking event
              N-->>U: ticket issued
            ```
            """
        ),
    )
    write_file(
        "docs/production-checklist.md",
        dedent(
            """
            # Production Checklist

            - Multi-region deployment with active-active search and active-passive booking controls
            - Postgres PITR, Redis persistence, Kafka replication, and object storage versioning
            - WAF, bot protection, and rate limits at the gateway
            - OpenTelemetry traces from gateway to downstream services
            - Chaos tests for broker outage, database failover, and payment webhook retries
            """
        ),
    )


def build_frontend() -> None:
    write_file(
        "apps/web/package.json",
        json.dumps(
            {
                "name": "train-platform-web",
                "private": True,
                "scripts": {"dev": "next dev", "build": "next build", "start": "next start", "lint": "next lint"},
                "dependencies": {
                    "next": "15.1.4",
                    "react": "19.0.0",
                    "react-dom": "19.0.0",
                    "@reduxjs/toolkit": "^2.5.0",
                    "react-redux": "^9.2.0",
                    "@tanstack/react-query": "^5.62.0",
                    "socket.io-client": "^4.8.1",
                    "framer-motion": "^11.15.0",
                },
                "devDependencies": {
                    "typescript": "^5.7.3",
                    "tailwindcss": "^3.4.17",
                    "postcss": "^8.4.49",
                    "autoprefixer": "^10.4.20",
                    "@types/react": "^19.0.7",
                    "@types/node": "^22.10.1",
                },
            },
            indent=2,
        ),
    )
    write_file(
        "apps/web/app/page.tsx",
        dedent(
            """
            const highlights = [
              'Low-latency search orchestration',
              'Strongly consistent seat booking flows',
              'Real-time notifications and live availability',
              'Multi-region, zero-downtime deployment model',
            ];

            export default function Page() {
              return (
                <main className="min-h-screen bg-slate-950 text-white">
                  <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
                    <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">Train Ticket Booking Platform</p>
                    <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
                      Enterprise rail commerce architecture for massive scale.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-slate-300">
                      A production-ready foundation for train search, booking, payments, seat inventory, ticketing, and operations.
                    </p>
                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                      {highlights.map((item) => (
                        <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                          {item}
                        </div>
                      ))}
                    </div>
                  </section>
                </main>
              );
            }
            """
        ),
    )
    write_file(
        "apps/web/app/layout.tsx",
        dedent(
            """
            import type { Metadata } from 'next';

            export const metadata: Metadata = {
              title: 'Train Ticket Booking Platform',
              description: 'Enterprise train booking microservices platform',
            };

            export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
              return (
                <html lang="en">
                  <body>{children}</body>
                </html>
              );
            }
            """
        ),
    )
    write_file(
        "apps/web/tsconfig.json",
        json.dumps(
            {
                "compilerOptions": {
                    "target": "ES2022",
                    "lib": ["dom", "dom.iterable", "esnext"],
                    "allowJs": False,
                    "skipLibCheck": True,
                    "strict": True,
                    "noEmit": True,
                    "esModuleInterop": True,
                    "module": "esnext",
                    "moduleResolution": "bundler",
                    "resolveJsonModule": True,
                    "isolatedModules": True,
                    "jsx": "preserve",
                    "incremental": True,
                    "paths": {"@/*": ["./*"]},
                },
                "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
                "exclude": ["node_modules"],
            },
            indent=2,
        ),
    )
    write_file("apps/web/next.config.mjs", "export default { experimental: { typedRoutes: true } };\n")
    write_file(
        "apps/web/tailwind.config.ts",
        dedent(
            """
            import type { Config } from 'tailwindcss';

            const config: Config = {
              content: ['./app/**/*.{ts,tsx}'],
              theme: {
                extend: {},
              },
              plugins: [],
            };

            export default config;
            """
        ),
    )
    write_file("apps/web/postcss.config.mjs", "export default { plugins: { tailwindcss: {}, autoprefixer: {} } };\n")
    write_file(
        "apps/web/app/globals.css",
        dedent(
            """
            @tailwind base;
            @tailwind components;
            @tailwind utilities;

            html, body {
              margin: 0;
              background: #020617;
              color: #f8fafc;
              font-family: Inter, system-ui, sans-serif;
            }
            """
        ),
    )


def build_infra() -> None:
    write_file(
        "docker-compose.yml",
        dedent(
            """
            services:
              postgres:
                image: postgres:16-alpine
                environment:
                  POSTGRES_USER: platform
                  POSTGRES_PASSWORD: platform
                ports:
                  - "5432:5432"

              redis:
                image: redis:7-alpine
                ports:
                  - "6379:6379"

              kafka:
                image: bitnami/kafka:3.8
                environment:
                  KAFKA_CFG_NODE_ID: 0
                  KAFKA_CFG_PROCESS_ROLES: broker,controller
                  KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 0@kafka:9093
                  ALLOW_PLAINTEXT_LISTENER: yes
                ports:
                  - "9092:9092"
            """
        ),
    )
    write_file(
        ".github/workflows/ci.yml",
        dedent(
            """
            name: CI

            on:
              push:
              pull_request:

            jobs:
              validate:
                runs-on: ubuntu-latest
                steps:
                  - uses: actions/checkout@v4
                  - uses: actions/setup-python@v5
                    with:
                      python-version: '3.12'
                  - name: Syntax check
                    run: python -m compileall tools services
            """
        ),
    )
    write_file(
        "platform/service-catalog.yaml",
        "\n".join([f"- name: {service}" for service in SERVICES]) + "\n",
    )


def build_shared_runtime() -> None:
    for relative_path, content in SHARED_RUNTIME_FILES.items():
        write_file(relative_path, content)


def main() -> None:
    build_shared_runtime()
    build_docs()
    build_frontend()
    build_infra()

    for index, service_name in enumerate(SERVICES, start=1):
        port = 8100 + index
        if service_name in CRITICAL_SERVICES:
            build_critical_service(service_name, port)
        else:
            build_generic_service(service_name, port)


if __name__ == "__main__":
    main()