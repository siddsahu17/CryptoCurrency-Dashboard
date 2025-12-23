from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from services.llm_service import get_chat_response

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatMessage(BaseModel):
    user: str
    bot: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

@router.post("/message")
async def chat(request: ChatRequest):
    """Interacts with the LLM chatbot."""
    response = get_chat_response(request.message, [h.dict() for h in request.history])
    return {"response": response}
