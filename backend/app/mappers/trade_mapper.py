from app.models.trade import Trade


class TradeMapper:

    @staticmethod
    def from_delta_order(order: dict) -> Trade:
        metadata = order.get("meta_data", {})

        return Trade(
            id=order["id"],
            symbol=order["product_symbol"],
            side=order["side"],
            quantity=float(order["size"]),
            entry_price=float(metadata.get("entry_price", order.get("average_fill_price") or 0)),
            exit_price=float(metadata["avg_exit_price"]) if metadata.get("avg_exit_price") else None,
            pnl=float(metadata.get("pnl", 0)),
            commission=float(order.get("paid_commission", 0)),
            entry_time=order["created_at"],
            exit_time=order["updated_at"],
            order_type=order.get("order_type"),
        )