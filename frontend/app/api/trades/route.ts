import { NextResponse } from "next/server";

export async function GET() {
  // Placeholder data — replace with Supabase or your backend later
  const trades = [
    {
      id: "1",
      symbol: "AAPL",
      side: "BUY",
      entry: 150.25,
      exit: 158.40,
      profit: 8.15,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      symbol: "BTC-USD",
      side: "SELL",
      entry: 68000,
      exit: null,
      profit: null,
      created_at: new Date().toISOString(),
    },
  ];

  return NextResponse.json({ trades });
}
