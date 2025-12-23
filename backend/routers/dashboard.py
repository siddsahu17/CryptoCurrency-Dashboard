from fastapi import APIRouter, Query
from services.data_service import get_market_data, get_coin_history

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/market")
async def get_market(currency: str = "usd", limit: int = 20):
    """Get market data for top coins."""
    return get_market_data(currency, limit)

@router.get("/history/{coin_id}")
async def get_history(coin_id: str, days: str = "30"):
    """Get historical price data for a coin."""
    return get_coin_history(coin_id, days)
