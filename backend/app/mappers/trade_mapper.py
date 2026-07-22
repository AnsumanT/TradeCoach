from app.models.trade import Trade


class TradeMapper:

    @staticmethod
    def from_delta_order(order: dict) -> Trade:
        metadata = order.get("meta_data", {})

        return Trade(
            id=order["id"],
            symbol=order["product_symbol"],
            side=order["side"],
            quantity=float(order.get("size") or 0),
            entry_price=float(
                metadata.get("entry_price")
                or order.get("average_fill_price")
                or 0
            ),
            exit_price=float(
                metadata.get("avg_exit_price")
                or order.get("average_fill_price")
                or 0
            ),
            pnl=float(metadata.get("pnl") or 0),
            commission=float(order.get("paid_commission") or 0),
            entry_time=order["created_at"],
            exit_time=order["updated_at"],
            order_type=order.get("order_type"),
        )