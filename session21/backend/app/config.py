from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "OpsPulse API"
    database_url: str = "postgresql+psycopg://opspulse:opspulse@localhost:5432/opspulse"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
