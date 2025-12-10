import openai
from utils.config import settings

openai.api_key = settings.OPENAI_API_KEY

def ask_openai(context, user_message):
    messages = [
        {"role": "system", "content": "You are a crypto trading assistant."},
        {"role": "user", "content": context + "\\nUser: " + user_message},
    ]

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=messages
    )

    return response["choices"][0]["message"]["content"]
