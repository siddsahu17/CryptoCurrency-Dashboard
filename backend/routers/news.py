from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.data_service import search_news
from services.llm_service import summarize_news

router = APIRouter(prefix="/news", tags=["News"])

class SummarizeRequest(BaseModel):
    content: str

@router.get("/latest")
async def get_latest_news():
    """Fetches the latest crypto status updates/news."""
    news = search_news()
    if not news:
        return {"message": "No recent news found", "data": []}
    return news

@router.post("/summarize")
async def summarize_news_article(request: SummarizeRequest):
    """Summarizes a given text content."""
    summary = summarize_news(request.content)
    return {"summary": summary}
