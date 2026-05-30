from dotenv import load_dotenv
load_dotenv()
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from db import supabase
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# -------------------------
# CORS
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Root
# -------------------------
@app.get("/")
def root():
    return {"message": "Backend is running!"}

# -------------------------
# Test DB
# -------------------------
@app.get("/test-db")
def test_db():
    try:
        data = supabase.table("user").select("*").limit(1).execute()
        return {"status": "success", "data": data.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# -------------------------
# Create User
# -------------------------
class UserCreate(BaseModel):
    email: str
    name: str

@app.post("/create-user")
def create_user(user: UserCreate):
    try:
        data = supabase.table("user").insert({
            "email": user.email,
            "name": user.name
        }).execute()
        return {"status": "success", "data": data.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# -------------------------
# Login User
# -------------------------
class UserLogin(BaseModel):
    email: str

@app.post("/login")
def login(user: UserLogin):
    try:
        result = supabase.table("user").select("*").eq("email", user.email).execute()

        if len(result.data) == 0:
            return {"status": "error", "message": "User not found"}

        return {"status": "success", "data": result.data[0]}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# -------------------------
# Get All Users
# -------------------------
@app.get("/get-users")
def get_users():
    try:
        result = supabase.table("user").select("*").execute()
        return {"status": "success", "data": result.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# -------------------------
# Save Trade
# -------------------------
class TradeCreate(BaseModel):
    user_id: int
    symbol: str
    entry_price: float
    exit_price: Optional[float] = None
    profit: Optional[float] = None

@app.post("/save-trade")
def save_trade(trade: TradeCreate):
    try:
        data = supabase.table("trade").insert({
            "user_id": trade.user_id,
            "symbol": trade.symbol,
            "entry_price": trade.entry_price,
            "exit_price": trade.exit_price,
            "profit": trade.profit
        }).execute()

        return {"status": "success", "data": data.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# -------------------------
# Get Trades for a User
# -------------------------
@app.get("/get-trades")
def get_trades(user_id: int):
    try:
        result = supabase.table("trade").select("*").eq("user_id", user_id).execute()
        return {"status": "success", "data": result.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}
# -------------------------
# Save Signal
# -------------------------
class SignalCreate(BaseModel):
    user_id: int
    symbol: str
    signal_type: str
    confidence: Optional[float] = None

@app.post("/save-signal")
def save_signal(signal: SignalCreate):
    try:
        data = supabase.table("signal").insert({
            "user_id": signal.user_id,
            "symbol": signal.symbol,
            "signal_type": signal.signal_type,
            "confidence": signal.confidence
        }).execute()

        return {"status": "success", "data": data.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}
# -------------------------
# Get Signals for a User
# -------------------------
@app.get("/get-signals")
def get_signals(user_id: int):
    try:
        result = supabase.table("signal").select("*").eq("user_id", user_id).execute()
        return {"status": "success", "data": result.data}
    except Exception as e:
        return {"status": "error", "message": str(e)}
from ai import client
from fastapi import Body

# -------------------------
# AI Trading Agent
# -------------------------
@app.post("/ai-agent")
def ai_agent(
    user_id: int = Body(...),
    question: str = Body(...)
):
    try:
        # Fetch user trades
        trades = supabase.table("trade").select("*").eq("user_id", user_id).execute().data

        # Fetch user signals
        signals = supabase.table("signal").select("*").eq("user_id", user_id).execute().data

        # Build AI prompt
        prompt = f"""
        You are an AI trading assistant.

        User ID: {user_id}

        Recent Trades:
        {trades}

        Recent Signals:
        {signals}

        User Question:
        {question}

        Provide:
        - Clear trading insight
        - Risk management advice
        - If appropriate, generate a new signal (buy/sell/hold)
        - Keep the answer simple and actionable
        """

        # Call OpenAI
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )

        ai_reply = response.choices[0].message.content

        return {"status": "success", "reply": ai_reply}

    except Exception as e:
        return {"status": "error", "message": str(e)}
import json
import re

def extract_json(text):
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        return None
    try:
        return json.loads(match.group())
    except:
        return None
