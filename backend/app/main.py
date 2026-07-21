from fastapi import FastAPI

from app.config.settings import settings
from app.routers.trades import router as trades_router

app = FastAPI(
    title="TradeCoach API",
    version="1.0.0"
)

app.include_router(trades_router)

@app.get("/")
def root():
    return {
        "message": "TradeCoach Backend Running 🚀"
    }


@app.get("/config-test")
def config_test():
    return {
        "api_key_found": bool(settings.DELTA_API_KEY),
        "secret_found": bool(settings.DELTA_API_SECRET),
        "base_url": settings.DELTA_BASE_URL
    }