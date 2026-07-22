from app.integrations.delta.client import DeltaClient
from app.mappers.trade_mapper import TradeMapper


class TradeService:

    def __init__(self):
        self.client = DeltaClient()

    def get_trades(self):
        response = self.client.get_order_history()

        orders = response.get("result", [])

        trades = [
            TradeMapper.from_delta_order(order)
            for order in orders
            if order.get("state") == "closed"
        ]

        return trades