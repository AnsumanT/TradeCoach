import os

from dotenv import load_dotenv
from google import genai

from app.models.trade import Trade
from app.services.analytics import AnalyticsService

load_dotenv()


class AICoachService:

    @staticmethod
    def generate(trades: list[Trade]):

        analytics = AnalyticsService.calculate(trades)

        client = genai.Client(
            api_key=os.getenv("GEMINI_API_KEY")
        )

        prompt = f"""
You are an expert trading psychologist and professional trading coach.

Analyze the following trading performance.

Statistics:

Total Trades: {analytics.total_trades}
Winning Trades: {analytics.winning_trades}
Losing Trades: {analytics.losing_trades}
Win Rate: {analytics.win_rate}%
Profit Factor: {analytics.profit_factor}
Average Win: {analytics.average_win}
Average Loss: {analytics.average_loss}
Total PnL: {analytics.total_pnl}

Give your response in markdown with these sections:

## Overall Performance

## Strengths

## Weaknesses

## Psychological Mistakes

## Risk Management Advice

## 5 Actionable Improvements
"""

        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt,
        )

        return {
            "analytics": analytics,
            "ai_feedback": response.text
        }