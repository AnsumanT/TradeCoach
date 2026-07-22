from app.models.trade import Trade
from app.services.analytics import AnalyticsService


class CoachService:

    @staticmethod
    def generate(trades: list[Trade]):
        analytics = AnalyticsService.calculate(trades)

        suggestions = []

        if analytics.win_rate < 40:
            suggestions.append(
                "Your win rate is low. Focus on taking fewer, higher-quality trades."
            )

        if analytics.profit_factor < 1.5:
            suggestions.append(
                "Your profit factor can be improved by letting winning trades run longer."
            )

        if analytics.average_loss < -5:
            suggestions.append(
                "Your losing trades are relatively large. Consider using tighter stop losses."
            )

        return {
            "analytics": analytics,
            "coach_feedback": suggestions,
        }