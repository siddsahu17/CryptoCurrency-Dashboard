import requests
import pandas as pd

COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3"

def get_market_data(currency: str = "usd", limit: int = 10):
    """
    Fetches market data for the top cryptocurrencies.
    """
    url = f"{COINGECKO_BASE_URL}/coins/markets"
    params = {
        "vs_currency": currency,
        "order": "market_cap_desc",
        "per_page": limit,
        "page": 1,
        "sparkline": "false"
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching market data: {e}")
        return []

def get_coin_history(coin_id: str, days: str = "30"):
    """
    Fetches historical price data for a specific coin.
    """
    url = f"{COINGECKO_BASE_URL}/coins/{coin_id}/market_chart"
    params = {
        "vs_currency": "usd",
        "days": days,
        "interval": "daily"
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        # Format data commonly used for charts/analysis: [timestamp, price]
        prices = data.get("prices", [])
        return prices
    except Exception as e:
        print(f"Error fetching history for {coin_id}: {e}")
        return []

def search_news(query: str = "cryptocurrency"):
    """
    Fetches crypto news. 
    Note: CoinGecko doesn't have a direct 'news' endpoint that is free/easy for general search in the same way.
    We might use a different API or just the status updates if needed.
    For this demo, we'll try to use a news-like endpoint or mock it if unavailable.
    CoinGecko has 'status_updates'.
    Alternatively, we can use a free news API like NewsAPI.org but that requires a key.
    For now, I'll return mock news or use CoinGecko status updates.
    """
    # Using CoinGecko status updates as a proxy for "news"
    url = f"{COINGECKO_BASE_URL}/status_updates"
    try:
        response = requests.get(url) 
        # CoinGecko status updates might be empty or specific. 
        # If this fails/is poor, we can mock.
        if response.status_code == 200:
            return response.json().get("status_updates", [])
        return []
    except:
        return []
