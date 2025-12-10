from fastapi import APIRouter
from services.chatbot_service import ask_chatbot

router = APIRouter()

@router.post("/")
def chat(payload: dict):
    return ask_chatbot(payload["message"])