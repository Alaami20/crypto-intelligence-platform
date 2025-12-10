from chatbot.chatbot_core import generate_chat_response

def ask_chatbot(message):
    return {"reply": generate_chat_response(message)}
