from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ask_ai(question, trades):
    messages = [
        {"role": "system", "content": "You are a trading assistant. Analyze trades and give insights."},
        {"role": "user", "content": f"User question: {question}\n\nUser trades: {trades}"}
    ]

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_tokens=300
    )

    return response.choices[0].message.content
