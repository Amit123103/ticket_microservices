from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    service_name: str = "notification-service"
    service_version: str = "1.0.0"
    environment: str = "local"
    database_url: str = "postgresql+asyncpg://platform:platform@localhost:5432/notification_service"
    redis_url: str = "redis://localhost:6379/0"
    kafka_bootstrap_servers: str = "localhost:9092"
    auth_public_key: str = ""
    auth_private_key: str = ""


settings = Settings()
