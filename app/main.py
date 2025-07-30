from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
from pydantic import BaseModel
import requests

# Request model
class MoodRequest(BaseModel):
    mood: str
    type: str = "movie"
    location: str | None = None
    language: str | None = None

# FastAPI app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Templates
templates = Jinja2Templates(directory="app/templates")
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Load environment
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
QLOO_API_KEY = os.getenv("QLOO_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

# Entity URNs
URN_MAP = {
    "movie": "urn:entity:movie",
    "artist": "urn:entity:artist",
    "music": "urn:entity:artist",
    "book": "urn:entity:book",
    "brand": "urn:entity:brand",
    "destination": "urn:entity:place",
    "person": "urn:entity:person",
    "podcast": "urn:entity:podcast",
    "tv_show": "urn:entity:tv_show",
}

# Get recommendations from Qloo
def get_qloo_recommendations(keyword: str, entity_type: str, location: str | None = None, language: str | None = None):
    url = "https://hackathon.api.qloo.com/search"
    headers = {
        "X-Api-Key": QLOO_API_KEY,
        "Content-Type": "application/json"
    }
    params = {
        "query": keyword,
        "type": entity_type
    }
    if location:
        params["location"] = location
    if language:
        params["language"] = language

    response = requests.get(url, headers=headers, params=params)


    if response.status_code != 200:
        raise Exception(f"Qloo API error: {response.text}")

    data = response.json()
    recommendations = [
        {
            "name": item.get("name", "Untitled"),
            "description": item.get("properties", {}).get("short_description", ""),
            "image_url": item.get("properties", {}).get("image", {}).get("url"),
            "imdb_id": item.get("properties", {}).get("external", {}).get("imdb", {}).get("id"),
            "imdb_rating": item.get("properties", {}).get("external", {}).get("imdb", {}).get("user_rating"),
            "release_year": item.get("properties", {}).get("release_year")
        }
        for item in data.get("results", [])[:10]
    ]

    return recommendations

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/recommend/json")
async def get_recommendations_json(payload: MoodRequest):
    mood = payload.mood
    entity_urn = URN_MAP.get(payload.type, "urn:entity:movie")
    language = payload.language or "English"

    # Extract keywords
    prompt_keywords = f"Extract 3 short keyword phrases for search based on this mood and location:\nMood: \"{mood}\"\nLocation: \"{payload.location or 'Global'}\""

    response_keywords = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You extract keywords."},
            {"role": "user", "content": prompt_keywords}
        ],
        temperature=0,
        max_tokens=20
    )
    keywords = response_keywords.choices[0].message.content.strip()

    # Generate mood description in the specified language
    prompt_intro = (
        f"Write one friendly sentence describing this mood in {language}:\n\"{mood}\""
    )
    response_intro = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You write mood descriptions."},
            {"role": "user", "content": prompt_intro}
        ],
        temperature=0.7,
        max_tokens=40
    )
    mood_intro = response_intro.choices[0].message.content.strip()

    recommendations = get_qloo_recommendations(keywords, entity_urn, payload.location)

    # Fallback recommendations if none found and type is destination
    if not recommendations and payload.type == "destination":
     city = payload.location or "your area"
     recommendations = [
        {
            "name": f"{city} Botanical Garden",
            "description": f"Relax and rejuvenate in nature near {city}.",
            "image_url": f"https://source.unsplash.com/random/400x600/?garden,{city}",
            "type": "destination"
        },
        {
            "name": f"{city} Café Street",
            "description": f"Discover cozy spots for reflection in {city}.",
            "image_url": f"https://source.unsplash.com/random/400x600/?cafe,{city}",
            "type": "destination"
        }
    ]


    return {
        "keywords": keywords,
        "mood_intro": mood_intro,
        "recommendations": recommendations
    }
