from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DELTA_API_KEY: str
    DELTA_API_SECRET: str
    DELTA_BASE_URL: str = "https://api.delta.exchange"

    class Config:
        env_file = ".env"

settings = Settings()