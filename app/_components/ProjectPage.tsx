import type { DesignSlug, Locale, Project, SiteContent } from "@/lib/site-content";
import { DESIGN_DEFINITIONS } from "@/app/_designs/registry";

type Props = {
  content: SiteContent;
  project: Project;
  projects: Project[];
  locale: Locale;
  design?: DesignSlug;
  variantPath?: string;
};

export async function ProjectPage({ content, project, projects, locale, design = content.activeDesign, variantPath }: Props) {
  const definition = DESIGN_DEFINITIONS[design];
  const { default: Detail } = await definition.loadProject();
  return <Detail content={content} project={project} projects={projects} locale={locale} design={design} variantPath={variantPath} />;
}
