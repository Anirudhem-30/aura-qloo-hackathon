# Aura 🌐🎭  
**Cultural Mood-Based Recommendations Platform**  
 Submission for the [Qloo Hackathon](https://hackathon.qloo.com)

---

## 🌟 Overview

**Aura** is a full-stack AI-powered web application that generates cultural recommendations based on your mood, location, and preferred content type (movies, music, destinations, etc.). It intelligently bridges the gap between emotions and experiences using Qloo’s API and OpenAI’s GPT model.

---

## 🔮 Features

- 🎭 **Mood-Based Search** – Get curated suggestions based on how you feel.
- 📍 **City-Aware Results** – Tailors recommendations by location (e.g., Bangalore, San Jose, New York).
- 🧠 **Keyword Extraction using GPT-3.5** – Converts mood into search-friendly terms.
- 🎬 **Cultural Content Variety** – Explore movies, artists, books, podcasts, and destinations.
- 🌐 **Multilingual Friendly** – Summaries/descriptions in your preferred language.
- ⚡ **FastAPI + Next.js** – Full-stack performance with modern tooling.

---

## 🧱 Tech Stack

| Frontend       | Backend         | AI/ML              | APIs          |
|----------------|-----------------|--------------------|---------------|
| Next.js (TS)   | FastAPI (Python) | OpenAI GPT-3.5     | Qloo API      |
| Tailwind CSS   | Pydantic        |                    | dotenv/env    |

---

## 🖼️ Screenshots

<img width="2487" height="1352" alt="image" src="https://github.com/user-attachments/assets/2d6a0e75-768e-458d-96e8-e54a5ee86bf0" />


---

## 🚀 Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/Anirudhem-30/aura-qloo-hackathon.git
cd aura-qloo-hackathon
```

### 2. Backend Setup (FastAPI)
```bash
cd app
python -m venv venv
source venv/Scripts/activate      # Windows
# or
source venv/bin/activate          # macOS/Linux

pip install -r requirements.txt
```
Create a .env file inside the app/ folder:
```
OPENAI_API_KEY=your_openai_key
QLOO_API_KEY=your_qloo_key
```
Then run:
```
uvicorn main:app --reload
```
### 3. Frontend Setup (Next.js)
```bash
cd ../aura-frontend
npm install
npm run dev
```
🌐 URLs
Frontend: http://localhost:3000
Backend API: http://localhost:8000

🛡️ Security
.env file is excluded via .gitignore
API keys are securely loaded using os.getenv() on the backend

📄 License
This project is submitted for the Qloo Hackathon and complies with OpenAI and Qloo API usage policies.
For demonstration and non-commercial use only.
```
👤 Author
Made with ❤️ by Anirudh Esthuri
```
