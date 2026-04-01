from openai import OpenAI
import json

# API KEY (leave empty for GitHub safety)
API_KEY = "your-api-key-here"
client = None
if API_KEY:
    client = OpenAI(api_key=API_KEY)

# 🔹 Load offline knowledge base
with open("knowledge_base.json", "r", encoding="utf-8") as f:
    knowledge_base = json.load(f)


def offline_response(message):
    msg = message.lower()

    for item in knowledge_base:
        if item["question"] in msg:
            return item["answer"]

    return "I am currently running in offline mode 🤖. Please ask another question."


def get_response(message):

    # Try Online AI
    if client:
        try:
            response = client.responses.create(
                model="gpt-4o-mini",
                input=message
            )
            return response.output[0].content[0].text

        except Exception as e:
            print("ONLINE AI FAILED:", e)

    # Fallback to offline knowledge
    return offline_response(message)