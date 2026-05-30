export default function Layout({ children }) {
  return (
    <div class="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside class="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <h1 class="text-xl font-bold mb-6">Trading AI Agent</h1>

        <nav class="flex flex-col space-y-2">
          <a href="/" class="nav-link">📊 Dashboard</a>
          <a href="/signals" class="nav-link">📈 Signals</a>
          <a href="/trades" class="nav-link">💼 Trades</a>
          <a href="/chat" class="nav-link">🤖 AI Chat</a>
          <a href="/live" class="nav-link">📡 Live Market</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main class="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
