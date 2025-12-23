# CryptoCurrency Dashboard & Analytics Platform

A comprehensive cryptocurrency analysis platform featuring real-time data visualization, news summarization, interactive chat, and predictive analytics.

## Project Architecture

The project is backend is built with **FastAPI** and is divided into four main modules:

1.  **News Summarizer**: Aggregates cryptocurrency news (via CoinGecko status updates) and uses OpenAI to provide concise summaries.
2.  **AI Chatbot**: An interactive assistant powered by OpenAI GPT-3.5-turbo capable of answering questions about crypto trends and general inquiries.
3.  **Crypto Visual Dashboard**: Provides real-time market data (Top Coins) and historical price charts using the CoinGecko API.
4.  **Time Series Forecasting**: Uses ARIMA (AutoRegressive Integrated Moving Average) models from `statsmodels` to predict future price movements based on historical data.

## Tech Stack

-   **Backend**: FastAPI (Python)
-   **AI/LLM**: OpenAI GPT-3.5 Turbo
-   **Forecasting**: statsmodels (ARIMA)
-   **Data Provider**: CoinGecko API (No API Key required for basic plan)
-   **Frontend**: HTML/JS (In progress)

## Directory Structure

```text
backend/
├── main.py                 # Application entry point & CORS config
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (OpenAI Key)
├── routers/                # API Endpoints
│   ├── news.py             # News & Summarization routes
│   ├── chat.py             # AI Chat routes
│   ├── dashboard.py        # Market Data routes
│   └── forecast.py         # Prediction routes
└── services/               # Business Logic
    ├── llm_service.py      # OpenAI Client & Wrapper
    ├── data_service.py     # CoinGecko API Wrapper
    └── forecast_model.py   # ARIMA Prediction Logic
```

## Getting Started

### Prerequisites

-   Python 3.9+
-   OpenAI API Key

### Installation

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Set up environment variables:
    -   Create a `.env` file in the `backend/` directory.
    -   Add your OpenAI API Key:
        ```
        OPENAI_API_KEY=sk-your_actual_key_here
        ```

### Running the Application

Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.
You can access the interactive API documentation (Swagger UI) at `http://localhost:8000/docs`.

## API Endpoints Overview

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **News** | `GET` | `/news/latest` | Fetch latest crypto updates |
| | `POST` | `/news/summarize` | Summarize given text |
| **Chat** | `POST` | `/chat/message` | Send message to AI Chatbot |
| **Dashboard** | `GET` | `/dashboard/market` | Get top coins market data |
| | `GET` | `/dashboard/history/{id}` | Get historical prices for a coin |
| **Forecast** | `POST` | `/forecast/predict` | Predict future prices for a coin |
