import hashlib
import hmac
import time

from app.config.settings import settings


def get_timestamp() -> str:
    """
    Returns current Unix timestamp in seconds.
    """
    return str(int(time.time()))


def generate_signature(
    method: str,
    path: str,
    query_string: str = "",
    payload: str = "",
) -> tuple[str, str]:
    """
    Generates Delta Exchange request signature.

    Signature Format:
    METHOD + TIMESTAMP + PATH + QUERY_STRING + PAYLOAD
    """

    timestamp = get_timestamp()

    if query_string:
        query_string = "?" + query_string

    message = (
        method.upper()
        + timestamp
        + path
        + query_string
        + payload
    )

    signature = hmac.new(
        settings.DELTA_API_SECRET.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()

    return signature, timestamp


def get_headers(
    method: str,
    path: str,
    query_string: str = "",
    payload: str = "",
) -> dict:
    """
    Returns authenticated headers required by Delta Exchange.
    """

    signature, timestamp = generate_signature(
        method,
        path,
        query_string,
        payload,
    )

    return {
        "api-key": settings.DELTA_API_KEY,
        "timestamp": timestamp,
        "signature": signature,
        "User-Agent": "TradeCoach/1.0",
        "Content-Type": "application/json",
    }