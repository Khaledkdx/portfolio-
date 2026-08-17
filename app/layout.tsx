import type { Metadata } from "next";
import { Figtree, IBM_Plex_Sans_Arabic, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const arabic = IBM_Plex_Sans_Arabic({ variable: "--font-arabic", subsets: ["arabic"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Khalid Mohamad — Business Growth & Automation",
  description: "Business growth, performance marketing and practical AI automation for teams across the UAE, KSA and beyond.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${newsreader.variable} ${jetbrains.variable} ${arabic.variable}`}>
        {children}
      </body>
    </html>
  );
}
