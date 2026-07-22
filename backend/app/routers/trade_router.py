from fastapi import APIRouter

from app.services.trade_service import TradeService
from app.services.analytics import AnalyticsService
from app.services.behavior_service import BehaviorService
from app.services.coach_service import CoachService
from app.services.ai_coach_service import AICoachService

router = APIRouter(prefix="/trades", tags=["Trades"])

trade_service = TradeService()


@router.get("")
def get_trades():
    return trade_service.get_trades()

@router.get("/analytics")
def get_trade_analytics():
    trades = trade_service.get_trades()
    return AnalyticsService.calculate(trades)

@router.get("/behavior")
def get_behavior():
    trades = trade_service.get_trades()
    return BehaviorService.analyze(trades)

@router.get("/coach")
def get_coach():
    trades = trade_service.get_trades()
    return CoachService.generate(trades)

@router.get("/ai-coach")
def ai_coach():
    trades = trade_service.get_trades()
    return AICoachService.generate(trades)