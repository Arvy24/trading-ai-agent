import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Trading AI Agent",
  description: "AI-powered trading dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-gray-100">
        
        {/* SIDEBAR */}
        <aside className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col gap-6">
          <h1 className="text-2xl font-bold">ARVY Trading</h1>

          <nav className="flex flex-col gap-4 text-lg">
            <Link href="/" className="hover:text-blue-400">Dashboard</Link>
            <Link href="/trades" className="hover:text-blue-400">Trades</Link>
            <Link href="/signals" className="hover:text-blue-400">Signals</Link>
            <Link href="/ai-chat" className="hover:text-blue-400">AI Chat</Link>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8">
          {children}
        </main>

      </body>
    </html>
  );
}
