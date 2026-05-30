import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "Chat API is working" });
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Send message to FastAPI AI Agent
    const fastapiRes = await fetch("http://localhost:8000/ai-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!fastapiRes.ok) {
      return NextResponse.json(
        { error: "FastAPI error", status: fastapiRes.status },
        { status: 500 }
      );
    }

    const data = await fastapiRes.json();

    return NextResponse.json({
      reply: data.reply, // reply from FastAPI AI agent
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
