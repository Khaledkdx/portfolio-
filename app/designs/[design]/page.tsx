import { notFound } from "next/navigation";
import { Portfolio } from "@/app/_components/Portfolio";
import { readSiteContent } from "@/lib/data";
import { requireOwner } from "@/lib/owner-auth";
import { isDesignSlug, type Locale } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function DesignPreview({ params, searchParams }: { params: Promise<{ design: string }>; searchParams: Promise<{ locale?: string }> }) {
  const [{ design }, query] = await Promise.all([params, searchParams]);
  if (!isDesignSlug(design)) notFound();
  await requireOwner(`/designs/${design}`);
  const content = await readSiteContent();
  const locale: Locale = query.locale === "ar" ? "ar" : "en";
  return <Portfolio content={content} locale={locale} design={design} preview />;
}
