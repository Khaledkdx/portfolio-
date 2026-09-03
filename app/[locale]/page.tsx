import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Portfolio } from "@/app/_components/Portfolio";
import { readSiteContent } from "@/lib/data";
import { DESIGN_NAMES, DESIGN_SLUGS, isLocale, pick, type Locale } from "@/lib/site-content";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ locale?: string }>;
};

function variantIndex(value: string): number | null {
  if (value !== "1") return null;
  return Number(value) - 1;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale: value } = await params;
  const query = await searchParams;
  const index = variantIndex(value);
  const locale: Locale = isLocale(value) ? value : query.locale === "ar" ? "ar" : "en";
  const content = await readSiteContent();
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const design = index === null ? null : DESIGN_SLUGS[index];
  const title = design
    ? `${content.profile.name} — ${DESIGN_NAMES[design]}`
    : `${content.profile.name} — ${pick(content.profile.role, locale)}`;
  const description = pick(content.profile.intro, locale);
  const ogImage = `${protocol}://${host}/og.png`;
  return {
    title,
    description,
    alternates: index === null
      ? { canonical: `/${locale}`, languages: { en: "/en", ar: "/ar" } }
      : { canonical: `/${value}`, languages: { en: `/${value}?locale=en`, ar: `/${value}?locale=ar` } },
    openGraph: { title, description, type: "website", locale: locale === "ar" ? "ar_AE" : "en_US", images: [{ url: ogImage, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function LocalePage({ params, searchParams }: PageProps) {
  const [{ locale: value }, query] = await Promise.all([params, searchParams]);
  const index = variantIndex(value);
  if (!isLocale(value) && index === null) notFound();
  const content = await readSiteContent();
  if (index !== null) {
    const locale: Locale = query.locale === "ar" ? "ar" : "en";
    return <Portfolio content={content} locale={locale} design={DESIGN_SLUGS[index]} variantPath={`/${value}`} />;
  }
  return <Portfolio content={content} locale={value as Locale} />;
}
