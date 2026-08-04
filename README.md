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

## Scope

The platform is organized as a production-oriented scaffold with a concrete vertical slice and repeatable service templates. That lets teams evolve individual services without breaking platform-wide conventions.