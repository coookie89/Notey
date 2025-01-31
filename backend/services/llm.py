from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

def generate_markdown_notes(text: str):
    client = OpenAI(
        base_url="https://api.groq.com/openai/v1",
        api_key=os.getenv("GROQ_API_KEY")
    )

    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=
            [
                {"role": "system", "content": "Summarize and format as Markdown notes."},
                {"role": "user", "content": text}
            ]
    )

    return response.choices[0].message.content
