# Production Checklist

- Multi-region deployment with active-active search and active-passive booking controls
- Postgres PITR, Redis persistence, Kafka replication, and object storage versioning
- WAF, bot protection, and rate limits at the gateway
- OpenTelemetry traces from gateway to downstream services
- Chaos tests for broker outage, database failover, and payment webhook retries
