import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ProjectPage } from "@/app/_components/ProjectPage";
import { publishedProjects } from "@/app/_designs/types";
import { readSiteContent } from "@/lib/data";
import { DESIGN_NAMES, DESIGN_SLUGS, isLocale, pick, projectBySlug, type Locale } from "@/lib/site-content";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ locale?: string }>;
};

const getContent = cache(readSiteContent);

function variantIndex(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;
  const index = Number(value) - 1;
  return DESIGN_SLUGS[index] ? index : null;
}

async function resolve(props: PageProps) {
  const [{ locale: value, slug }, query, content] = await Promise.all([
    props.params,
    props.searchParams,
    getContent(),
  ]);
  const index = variantIndex(value);
  if (/^\d+$/.test(value) && index === null) return null;
  if (!isLocale(value) && index === null) return null;
  const locale: Locale = isLocale(value) ? value : query.locale === "ar" ? "ar" : "en";
  const project = projectBySlug(content, slug);
  if (!project) return null;
  return {
    content,
    project,
    projects: publishedProjects(content),
    locale,
    design: index === null ? content.activeDesign : DESIGN_SLUGS[index],
    variantPath: index === null ? undefined : `/${value}`,
  };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const data = await resolve(props);
  if (!data) return {};
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const cover = data.project.images[0]?.url;
  const image = cover ? `${protocol}://${host}${cover}` : `${protocol}://${host}/og.png`;
  const title = `${pick(data.project.title, data.locale)} — ${data.content.profile.name}`;
  const description = pick(data.project.summary, data.locale);
  const designName = DESIGN_NAMES[data.design];
  return {
    title,
    description,
    alternates: data.variantPath
      ? { canonical: `${data.variantPath}/projects/${data.project.slug}`, languages: { en: `${data.variantPath}/projects/${data.project.slug}?locale=en`, ar: `${data.variantPath}/projects/${data.project.slug}?locale=ar` } }
      : { canonical: `/${data.locale}/projects/${data.project.slug}`, languages: { en: `/en/projects/${data.project.slug}`, ar: `/ar/projects/${data.project.slug}` } },
    openGraph: { title, description, type: "article", locale: data.locale === "ar" ? "ar_AE" : "en_US", siteName: designName, images: [{ url: image, alt: pick(data.project.images[0]?.alt ?? data.project.title, data.locale) }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ProjectRoute(props: PageProps) {
  const data = await resolve(props);
  if (!data) notFound();
  return <ProjectPage {...data} />;
}
