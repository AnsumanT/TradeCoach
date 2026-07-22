import httpx

from app.config.settings import settings
from app.integrations.delta.auth import get_headers


class DeltaClient:
    def __init__(self):
        self.base_url = settings.DELTA_BASE_URL
        self.client = httpx.Client(timeout=30.0)

    def request(
        self,
        method: str,
        endpoint: str,
        query_string: str = "",
        payload: str = "",
    ):
        headers = get_headers(
            method=method,
            path=endpoint,
            query_string=query_string,
            payload=payload,
        )

        url = f"{self.base_url}{endpoint}"

        if query_string:
            url = f"{url}?{query_string}"

        response = self.client.request(
            method=method,
            url=url,
            headers=headers,
            data=payload,
        )

        print("STATUS CODE :", response.status_code)
        print("RESPONSE    :", response.text)
        print("=" * 60)

        return response.json()

    def get_products(self):
        return self.request(
            method="GET",
            endpoint="/v2/products",
        )

    def get_positions(self):
        return self.request(
            method="GET",
            endpoint="/v2/positions",
        )

    def get_order_history(self):
        """
        Fetch ALL order history using Delta pagination.
        """

        all_orders = []
        after = None

        while True:
            query = "page_size=100"

            if after:
                query += f"&after={after}"

            response = self.request(
                method="GET",
                endpoint="/v2/orders/history",
                query_string=query,
            )

            if not response.get("success"):
                break

            orders = response.get("result", [])

            if not orders:
                break

            all_orders.extend(orders)

            after = response.get("meta", {}).get("after")

            print(f"Fetched {len(orders)} orders. Total = {len(all_orders)}")

            if not after:
                break

        return {
            "success": True,
            "result": all_orders,
        }

    def get_fills(self):
        return self.request(
            method="GET",
            endpoint="/v2/fills",
            query_string="page_size=100",
        )

    def get_balances(self):
        return self.request(
            method="GET",
            endpoint="/v2/wallet/balances",
        )