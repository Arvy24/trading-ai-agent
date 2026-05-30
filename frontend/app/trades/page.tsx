"use client";

import { useEffect, useState } from "react";

interface Trade {
  id: string;
  symbol: string;
  side: "BUY" | "SELL";
  entry: number;
  exit: number | null;
  profit: number | null;
  created_at: string;
}

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrades = async () => {
      try {
        const res = await fetch("/api/trades");
        const data = await res.json();
        setTrades(data.trades || []);
      } catch (err) {
        console.error("Failed to load trades", err);
      }
      setLoading(false);
    };

    loadTrades();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trade History</h1>

      {loading ? (
        <p>Loading trades...</p>
      ) : trades.length === 0 ? (
        <p>No trades yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Symbol</th>
                <th className="p-3">Side</th>
                <th className="p-3">Entry</th>
                <th className="p-3">Exit</th>
                <th className="p-3">P/L</th>
                <th className="p-3">Opened</th>
              </tr>
            </thead>

            <tbody>
              {trades.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="p-3 font-medium">{t.symbol}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        t.side === "BUY" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {t.side}
                    </span>
                  </td>

                  <td className="p-3">£{t.entry.toFixed(2)}</td>
                  <td className="p-3">
                    {t.exit ? `£${t.exit.toFixed(2)}` : "—"}
                  </td>

                  <td
                    className={`p-3 font-bold ${
                      t.profit === null
                        ? "text-gray-500"
                        : t.profit >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {t.profit === null ? "—" : `£${t.profit.toFixed(2)}`}
                  </td>

                  <td className="p-3 text-gray-500">
                    {new Date(t.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
