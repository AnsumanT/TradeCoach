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

        last_trade = trades[-1] if trades else None
        recent_trades = trades[-10:]

        recent_trade_summary = ""

        for index, trade in enumerate(recent_trades, start=1):
            recent_trade_summary += f"""
Trade #{index}
Symbol: {trade.symbol}
Side: {trade.side}
Quantity: {trade.quantity}
Entry Price: {trade.entry_price}
Exit Price: {trade.exit_price}
PnL: {trade.pnl}
Commission: {trade.commission}
Order Type: {trade.order_type}
Entry Time: {trade.entry_time}
Exit Time: {trade.exit_time}

"""

        if last_trade:
            last_trade_summary = f"""
Symbol: {last_trade.symbol}
Side: {last_trade.side}
Quantity: {last_trade.quantity}
Entry Price: {last_trade.entry_price}
Exit Price: {last_trade.exit_price}
PnL: {last_trade.pnl}
Commission: {last_trade.commission}
Order Type: {last_trade.order_type}
Entry Time: {last_trade.entry_time}
Exit Time: {last_trade.exit_time}
"""
        else:
            last_trade_summary = "No trades available."

        prompt = f"""
You are TradeCoach AI.

You are a professional trader, trading psychologist and risk management coach.

Your job is NOT to repeat the numbers.

Your job is to coach the trader like a mentor.

==========================
OVERALL STATISTICS
==========================

Total Trades: {analytics.total_trades}

Winning Trades: {analytics.winning_trades}

Losing Trades: {analytics.losing_trades}

Win Rate: {analytics.win_rate:.2f}%

Profit Factor: {analytics.profit_factor:.2f}

Average Win: {analytics.average_win:.2f}

Average Loss: {analytics.average_loss:.2f}

Total PnL: {analytics.total_pnl:.2f}

==========================
LAST CLOSED TRADE
==========================

{last_trade_summary}

==========================
LAST 10 TRADES
==========================

{recent_trade_summary}

Return your response in Markdown.

# 📊 Executive Summary

Summarize the trader's performance in 4-5 sentences.

# 🔍 Last Trade Review

Review ONLY the last trade.

Mention:
- Entry quality
- Exit quality
- Risk management
- Biggest mistake
- Biggest positive
- Confidence score out of 10

# 📈 Recent Trading Pattern

Review the last 10 trades.

Mention:
- Recurring mistakes
- Recurring strengths
- Revenge trading if observed
- Emotional trading if observed
- Overtrading if observed
- Risk consistency

# 🏆 Trader Report Card

Give scores out of 10.

| Category | Score |
|----------|-------|
| Discipline | ?/10 |
| Risk Management | ?/10 |
| Execution | ?/10 |
| Emotional Control | ?/10 |
| Consistency | ?/10 |

Explain every score.

# 💪 Strengths

List the trader's strengths.

# ⚠ Biggest Weaknesses

List the trader's biggest weaknesses.

# 🧠 Trading Psychology

Explain the trader's likely mindset.

# 💰 Risk Management

Evaluate the trader's risk management.

# 🎯 Personalized Improvement Plan

Provide exactly five improvements.

Explain WHY each improvement matters.

# 🚀 Tomorrow's Mission

Provide exactly three concrete actions for the next trading session.

Do not provide generic trading advice.

Base every observation ONLY on the statistics and trade history above.

Respond like an experienced human trading mentor.
"""

        try:
            response = client.models.generate_content(
                model="gemini-3-flash-preview",
                contents=prompt,
            )

            feedback = response.text

        except Exception as e:
            print(f"Gemini Error: {e}")

            feedback = f"""
# 🤖 AI Coach Temporarily Unavailable

The Gemini API could not generate a response.

Reason:
{str(e)}

Your trading analytics are still available.

Please try again later or configure another Gemini API key.
"""

        return {
            "analytics": analytics,
            "ai_feedback": feedback,
        }