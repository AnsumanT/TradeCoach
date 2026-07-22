from app.models.trade import Trade
from app.models.trade_analytics import TradeAnalytics


class AnalyticsService:

    @staticmethod
    def calculate(trades: list[Trade]) -> TradeAnalytics:

        total_trades = len(trades)

        winning = [t for t in trades if t.pnl > 0]
        losing = [t for t in trades if t.pnl < 0]

        winning_trades = len(winning)
        losing_trades = len(losing)

        win_rate = (
            (winning_trades / total_trades) * 100
            if total_trades
            else 0
        )

        total_pnl = sum(t.pnl for t in trades)

        average_win = (
            sum(t.pnl for t in winning) / winning_trades
            if winning_trades
            else 0
        )

        average_loss = (
            sum(t.pnl for t in losing) / losing_trades
            if losing_trades
            else 0
        )

        gross_profit = sum(t.pnl for t in winning)
        gross_loss = abs(sum(t.pnl for t in losing))

        profit_factor = (
            gross_profit / gross_loss
            if gross_loss
            else 0
        )

        return TradeAnalytics(
            total_trades=total_trades,
            winning_trades=winning_trades,
            losing_trades=losing_trades,
            win_rate=round(win_rate, 2),
            total_pnl=round(total_pnl, 2),
            average_win=round(average_win, 2),
            average_loss=round(average_loss, 2),
            profit_factor=round(profit_factor, 2),
        )
    
    @staticmethod
    def get_equity_curve(trades: list[Trade]):

        equity = 0
        curve = []

        for index, trade in enumerate(trades, start=1):
            equity += trade.pnl

            curve.append({
                "trade": index,
                "equity": round(equity, 2)
            })

        return curve
    
    @staticmethod
    def get_win_loss_chart(trades: list[Trade]):

        wins = len([t for t in trades if t.pnl > 0])
        losses = len([t for t in trades if t.pnl < 0])

        return {
            "wins": wins,
            "losses": losses
        }