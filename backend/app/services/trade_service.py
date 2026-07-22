from app.integrations.delta.client import DeltaClient
from app.mappers.trade_mapper import TradeMapper


class TradeService:

    def __init__(self):
        self.client = DeltaClient()

    def get_trades(self):
        response = self.client.get_order_history()

        orders = response.get("result", [])

        trades = []

        for order in orders:

            # Ignore everything except completed trades
            if order.get("state") != "closed":
                continue

            # Ignore cancelled TP/SL bracket orders (extra safety)
            if (
                order.get("bracket_order")
                and order.get("state") == "cancelled"
            ):
                continue

            trades.append(
                TradeMapper.from_delta_order(order)
            )

        return trades