from pydantic import BaseModel


class TradeAnalytics(BaseModel):
    total_trades: int
    winning_trades: int
    losing_trades: int

    win_rate: float

    total_pnl: float

    average_win: float
    average_loss: float

    profit_factor: float