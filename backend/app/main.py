from fastapi import FastAPI

from app.config.settings import settings
from app.routers.trades import router as trades_router
from app.routers.trade_router import router as trade_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TradeCoach API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(trade_router)

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