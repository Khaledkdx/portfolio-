import {
  projectImages,
  projectLinks,
  type DesignSlug,
  type Locale,
  type Project,
  type SiteContent,
} from "@/lib/site-content";

export { projectImages, projectLinks };

export type DesignProps = {
  content: SiteContent;
  locale: Locale;
  design: DesignSlug;
  preview?: boolean;
  variantPath?: string;
};

export type ProjectDetailProps = DesignProps & {
  project: Project;
  projects: Project[];
};

export function publishedProjects(content: SiteContent): Project[] {
  return content.projects
    .filter((project) => project.status === "published")
    .sort((a, b) => a.order - b.order);
}

export function languageHref({
  locale,
  preview,
  variantPath,
  design,
}: DesignProps): string {
  const nextLocale = locale === "en" ? "ar" : "en";
  if (variantPath) return `${variantPath}?locale=${nextLocale}`;
  if (preview) return `/designs/${design}?locale=${nextLocale}`;
  return `/${nextLocale}`;
}

export function projectHref(
  project: Project,
  { locale, variantPath }: Pick<DesignProps, "locale" | "variantPath">,
): string {
  if (variantPath)
    return `${variantPath}/projects/${encodeURIComponent(project.slug)}?locale=${locale}`;
  return `/${locale}/projects/${encodeURIComponent(project.slug)}`;
}

export function whatsappHref(content: SiteContent): string {
  return `https://wa.me/${content.profile.whatsapp}`;
}

export function n(value: number): string {
  return String(value + 1).padStart(2, "0");
}

export function projectDetailData({ project, projects, locale, variantPath }: ProjectDetailProps) {
  const images = projectImages(project);
  const links = projectLinks(project);
  const index = projects.findIndex((item) => item.id === project.id);
  const base = variantPath ?? `/${locale}`;
  const query = variantPath ? `?locale=${locale}` : "";
  const projectUrl = (slug: string) => `${base}/projects/${encodeURIComponent(slug)}${query}`;
  return {
    images,
    links,
    index,
    base,
    query,
    projectUrl,
    previous: index > 0 ? projects[index - 1] : null,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : null,
    dir: locale === "ar" ? "rtl" as const : "ltr" as const,
  };
}
