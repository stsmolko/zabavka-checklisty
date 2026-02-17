import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Podujatia na Slovensku - Event Aggregator",
  description: "Moderný agregátor podujatí na Slovensku. Nájdite najlepšie akcie, festivaly a udalosti vo vašom okolí.",
  keywords: ["podujatia", "slovensko", "akcie", "festivaly", "udalosti", "events"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
