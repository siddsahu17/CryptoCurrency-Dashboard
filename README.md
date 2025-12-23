# CryptoCurrency Dashboard & Analytics Platform

A comprehensive cryptocurrency analysis platform featuring real-time data visualization, news summarization, interactive chat, and predictive analytics.

## Project Architecture

The project is divided into four main modules:

1.  **News Summarizer**: Aggregates and summarizes the latest cryptocurrency news using AI to provide concise market updates.
2.  **AI Chatbot**: An interactive assistant capable of answering questions about crypto trends, terminology, and specific coin data using OpenAI's LLM.
3.  **Crypto Visual Dashboard**: A frontend-heavy module for real-time price tracking, charting, and market data visualization.
4.  **Time Series Forecasting**: Advanced analytics module using historical data to predict future price movements (ARIMA/Prophet/LSTM).

## Tech Stack

-   **Frontend**: HTML/JS (Dashboard visuals)
-   **Backend**: FastAPI (Python)
-   **AI/ML**: OpenAI GPT (for Summarizer & Chatbot), Time Series libraries (Statsmodels/Prophet)
-   **Data**: Crypto APIs (e.g., CoinGecko, Binance)

## Getting Started

### Prerequisites

-   Python 3.9+
-   Node.js (for frontend tooling if applicable)
-   OpenAI API Key

### Installation

1.  Clone the repository.
2.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Set up environment variables:
    -   Create a `.env` file.
    -   Add `OPENAI_API_KEY=your_key_here`.

### Running the Application

Start the FastAPI server:
```bash
uvicorn main:app --reload
```
