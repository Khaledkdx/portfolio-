import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Portfolio } from "@/app/_components/Portfolio";
import { readSiteContent } from "@/lib/data";
import { isLocale, pick, type Locale } from "@/lib/site-content";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: value } = await params;
  const locale: Locale = isLocale(value) ? value : "en";
  const content = await readSiteContent();
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const title = `${content.profile.name} — ${pick(content.profile.role, locale)}`;
  const description = pick(content.profile.intro, locale);
  const ogImage = `${protocol}://${host}/og.png`;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}`, languages: { en: "/en", ar: "/ar" } },
    openGraph: { title, description, type: "website", locale: locale === "ar" ? "ar_AE" : "en_US", images: [{ url: ogImage, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await readSiteContent();
  return <Portfolio content={content} locale={locale} />;
}
