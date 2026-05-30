import { NextResponse } from "next/server";

export async function GET() {
  const signals = [
    {
      id: "1",
      symbol: "AAPL",
      action: "BUY",
      confidence: 82,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      symbol: "TSLA",
      action: "SELL",
      confidence: 74,
      created_at: new Date().toISOString(),
    },
  ];

  return NextResponse.json({ signals });
}
