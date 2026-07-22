from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Trade(BaseModel):
    id: int
    symbol: str

    side: str
    quantity: float

    entry_price: float
    exit_price: Optional[float] = None

    pnl: float
    commission: float

    entry_time: datetime
    exit_time: Optional[datetime] = None

    order_type: Optional[str] = None