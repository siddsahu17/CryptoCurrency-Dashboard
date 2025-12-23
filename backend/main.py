from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import news, chat, dashboard, forecast

app = FastAPI(
    title="Crypto Dashboard API",
    description="Backend for Crypto News, Chat, Dashboard, and Forecasting",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:5500",  # Live Server default
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for development ease
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(news.router)
app.include_router(chat.router)
app.include_router(dashboard.router)
app.include_router(forecast.router)

@app.get("/")
async def root():
    return {"message": "Crypto Dashboard Backend is Running!"}
