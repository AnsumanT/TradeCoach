from fastapi import APIRouter

from app.integrations.delta.client import DeltaClient

router = APIRouter(
    prefix="/trades",
    tags=["Trades"],
)

client = DeltaClient()


@router.get("/products")
def get_products():
    data = client.get_products()

    if isinstance(data, dict) and "result" in data:
        data["result"] = data["result"][:10]

    return data


@router.get("/balances")
def get_balances():
    return client.get_balances()


@router.get("/positions")
def get_positions():
    return client.get_positions()

@router.get("/orders/history")
def get_order_history():
    return client.get_order_history()

@router.get("/fills")
def get_fills():
    return client.get_fills()