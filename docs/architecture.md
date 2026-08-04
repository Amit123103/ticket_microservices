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
