import "./globals.css";

export const metadata = {
  title: "Trading AI Agent",
  description: "Dashboard for your trading AI system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
