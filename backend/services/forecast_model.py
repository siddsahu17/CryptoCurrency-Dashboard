import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
import warnings

warnings.filterwarnings("ignore")

def predict_next_days(prices_data: list, days_to_predict: int = 7):
    """
    Takes a list of [timestamp, price] and predicts the next 'days_to_predict' prices.
    Uses a simple ARIMA model.
    """
    if not prices_data or len(prices_data) < 10:
        return {"error": "Not enough data to forecast"}

    # Extract prices
    df = pd.DataFrame(prices_data, columns=["timestamp", "price"])
    df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
    df.set_index("timestamp", inplace=True)
    
    series = df["price"]
    
    # Fit ARIMA model (1,1,1) is a basic starting point for non-stationary data
    try:
        model = ARIMA(series, order=(1, 1, 1))
        model_fit = model.fit()
        
        # Forecast
        forecast_result = model_fit.forecast(steps=days_to_predict)
        
        # Create future dates
        last_date = series.index[-1]
        future_dates = [last_date + pd.Timedelta(days=i+1) for i in range(days_to_predict)]
        
        result = []
        for date, price in zip(future_dates, forecast_result):
            result.append({
                "date": date.strftime("%Y-%m-%d"),
                "predicted_price": round(price, 2)
            })
            
        return result
    except Exception as e:
        return {"error": f"Forecasting failed: {str(e)}"}
