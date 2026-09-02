import type { Metadata } from "next";
import {
  Alexandria,
  Archivo_Black,
  Barlow_Condensed,
  Cairo,
  Changa,
  Cormorant_Garamond,
  Fraunces,
  IBM_Plex_Sans_Arabic,
  Instrument_Sans,
  JetBrains_Mono,
  Marcellus,
  Newsreader,
  Noto_Kufi_Arabic,
  Noto_Sans_Arabic,
  Sora,
  Tajawal,
  Unbounded, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const arabic = IBM_Plex_Sans_Arabic({ variable: "--font-arabic", subsets: ["arabic"], weight: ["400", "500", "600", "700"] });
const archivo = Archivo_Black({ variable: "--font-archivo", subsets: ["latin"], weight: "400" });
const changa = Changa({ variable: "--font-changa", subsets: ["arabic", "latin"], weight: ["500", "700"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600"] });
const tajawal = Tajawal({ variable: "--font-tajawal", subsets: ["arabic"], weight: ["300", "500"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["400", "600", "700"] });
const kufi = Noto_Kufi_Arabic({ variable: "--font-kufi", subsets: ["arabic"], weight: ["400", "600"] });
const marcellus = Marcellus({ variable: "--font-marcellus", subsets: ["latin"], weight: "400" });
const alexandria = Alexandria({ variable: "--font-alexandria", subsets: ["arabic", "latin"], weight: ["400", "600", "700"] });
const barlow = Barlow_Condensed({ variable: "--font-barlow", subsets: ["latin"], weight: ["500", "700", "800"] });
const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic", "latin"], weight: ["400", "700"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], weight: ["400", "600"] });
const notoArabic = Noto_Sans_Arabic({ variable: "--font-noto-arabic", subsets: ["arabic"], weight: ["400", "600"] });
const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"], weight: ["500", "700", "800"] });

export const metadata: Metadata = {
  title: "Khalid Mohamad — Business Growth & Automation",
  description: "Business growth, performance marketing and practical AI automation for teams across the UAE, KSA and beyond.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${instrument.variable} ${newsreader.variable} ${jetbrains.variable} ${arabic.variable} ${archivo.variable} ${changa.variable} ${cormorant.variable} ${tajawal.variable} ${sora.variable} ${kufi.variable} ${marcellus.variable} ${alexandria.variable} ${barlow.variable} ${cairo.variable} ${fraunces.variable} ${notoArabic.variable} ${unbounded.variable}`}>
        {children}
      </body>
    </html>
  );
}
