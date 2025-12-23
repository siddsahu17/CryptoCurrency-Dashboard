from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.data_service import get_coin_history
from services.forecast_model import predict_next_days

router = APIRouter(prefix="/forecast", tags=["Forecast"])

class ForecastRequest(BaseModel):
    coin_id: str
    days_to_predict: int = 7

@router.post("/predict")
async def predict_price(request: ForecastRequest):
    """
    Fetches historical data for the coin and predicts future prices.
    """
    # 1. Fetch historical data (need enough data for ARIMA, e.g., 90 days)
    history = get_coin_history(request.coin_id, days="90")
    
    if not history:
        raise HTTPException(status_code=404, detail="Could not fetch historical data for this coin.")
        
    # 2. Run prediction
    prediction = predict_next_days(history, request.days_to_predict)
    
    if isinstance(prediction, dict) and "error" in prediction:
        raise HTTPException(status_code=500, detail=prediction["error"])
        
    return {"coin_id": request.coin_id, "forecast": prediction}
