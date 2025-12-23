import os
from openai import OpenAI
from dotenv import load_dotenv



api_key = os.getenv("OPENAI_API_KEY")
client = None
if api_key:
    client = OpenAI(api_key=api_key)
else:
    print("Warning: OPENAI_API_KEY not found in environment variables.")

def get_client():
    global client
    if not client:
        # Try finding it again (in case env vars changed or just to be safe)
        key = os.getenv("OPENAI_API_KEY")
        if key:
            client = OpenAI(api_key=key)
    return client

def get_chat_response(message: str, history: list = None) -> str:
    """
    Generates a response from the LLM based on user message and history.
    """
    messages = [{"role": "system", "content": "You are a helpful cryptocurrency assistant. You can answer questions about market trends, coin details, and general crypto concepts."}]
    
    if history:
        for turn in history:
            messages.append({"role": "user", "content": turn["user"]})
            messages.append({"role": "assistant", "content": turn["bot"]})
            
    messages.append({"role": "user", "content": message})

    client = get_client()
    if not client:
        return "Error: OpenAI API Key is missing. Please check your backend/.env file."

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error communicating with AI: {str(e)}"

def summarize_news(text: str) -> str:
    """
    Summarizes the given news text.
    """
    client = get_client()
    if not client:
        return "Error: OpenAI API Key is missing."

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a concise news summarizer. Summarize the following crypto news article in 2-3 bullet points."},
                {"role": "user", "content": text}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error summarizing news: {str(e)}"
