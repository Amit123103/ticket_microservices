# Train Ticket Booking Platform

Production-grade microservices platform for large-scale rail ticket search, booking, payments, seat inventory, notifications, analytics, and operations.

This repository is bootstrapped from a generator so the full platform can be expanded consistently across services, infrastructure, and frontend.

## What is included

- FastAPI-based microservice templates with independent databases
- Critical domain services for auth, search, availability, booking, payment, and notifications
- Next.js frontend scaffold with TypeScript, Tailwind, ShadCN-ready structure, Redux Toolkit, React Query, and Socket.IO client hooks
- Docker, Kubernetes, Helm, Terraform, and GitHub Actions scaffolding
- Architecture, security, observability, testing, and production-readiness documentation

## Bootstrap

Run the generator to materialize the repository layout:

```powershell
python .\tools\bootstrap_platform.py
```

## Run the project

### Prerequisites

- Docker Desktop with Docker Compose v2
- Python 3.11 or later (only required to run tests locally)

### Run the payment-service vertical slice

From the repository root, start the service together with its PostgreSQL and Redis dependencies:

```powershell
docker compose -f .\services\payment-service\docker-compose.yml up --build
```

The API is available at `http://localhost:8110`. Confirm it is running with:

```powershell
Invoke-RestMethod http://localhost:8110/payments/healthz
```

Stop the stack with:

```powershell
docker compose -f .\services\payment-service\docker-compose.yml down
```

### Start shared infrastructure only

To start the repository-wide PostgreSQL, Redis, and Kafka containers without an application service:

```powershell
docker compose up -d
```

Stop those containers with:

```powershell
docker compose down
```

### Run payment-service tests locally

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install -r .\services\payment-service\requirements.txt
$env:TESTING = "1"
.\.venv\Scripts\python -m pytest -q .\services\payment-service\tests
```


## Scope

The platform is organized as a production-oriented scaffold with a concrete vertical slice and repeatable service templates. That lets teams evolve individual services without breaking platform-wide conventions.

