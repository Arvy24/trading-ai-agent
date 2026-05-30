"use client";

import { useEffect, useState } from "react";

interface Signal {
  id: string;
  symbol: string;
  action: "BUY" | "SELL" | "HOLD";
  confidence: number;
  created_at: string;
}

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSignals = async () => {
      try {
        const res = await fetch("/api/signals");
        const data = await res.json();
        setSignals(data.signals || []);
      } catch (err) {
        console.error("Failed to load signals", err);
      }
      setLoading(false);
    };

    loadSignals();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Trading Signals</h1>

      {loading ? (
        <p>Loading signals...</p>
      ) : signals.length === 0 ? (
        <p>No signals yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Symbol</th>
                <th className="p-3">Action</th>
                <th className="p-3">Confidence</th>
                <th className="p-3">Time</th>
              </tr>
            </thead>

            <tbody>
              {signals.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3 font-medium">{s.symbol}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        s.action === "BUY"
                          ? "bg-green-600"
                          : s.action === "SELL"
                          ? "bg-red-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {s.action}
                    </span>
                  </td>

                  <td className="p-3">{s.confidence}%</td>

                  <td className="p-3 text-gray-500">
                    {new Date(s.created_at).toLocaleString()}
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
