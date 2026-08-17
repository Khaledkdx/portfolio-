import type { DesignSlug, Locale, Project, SiteContent } from "@/lib/site-content";

export type DesignProps = {
  content: SiteContent;
  locale: Locale;
  design: DesignSlug;
  preview?: boolean;
  variantPath?: string;
};

export function publishedProjects(content: SiteContent): Project[] {
  return content.projects
    .filter((project) => project.status === "published")
    .sort((a, b) => a.order - b.order);
}

export function languageHref({ locale, preview, variantPath, design }: DesignProps): string {
  const nextLocale = locale === "en" ? "ar" : "en";
  if (variantPath) return `${variantPath}?locale=${nextLocale}`;
  if (preview) return `/designs/${design}?locale=${nextLocale}`;
  return `/${nextLocale}`;
}

export function whatsappHref(content: SiteContent): string {
  return `https://wa.me/${content.profile.whatsapp}`;
}

export function n(value: number): string {
  return String(value + 1).padStart(2, "0");
}
