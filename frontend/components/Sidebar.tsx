import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-6">
      <h2 className="text-xl font-bold mb-6">ARVY Trading AI</h2>

      <nav className="flex flex-col gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/signals">Signals</Link>
        <Link href="/trades">Trades</Link>
      </nav>
    </div>
  );
}
