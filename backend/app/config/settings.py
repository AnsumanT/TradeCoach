from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DELTA_API_KEY: str
    DELTA_API_SECRET: str
    DELTA_BASE_URL: str = "https://api.delta.exchange"

    GEMINI_API_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

settings = Settings()