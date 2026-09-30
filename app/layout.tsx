import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Bias Test | A judgment stress test",
  description: "Four difficult decisions. A closer look at the assumptions behind them.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
