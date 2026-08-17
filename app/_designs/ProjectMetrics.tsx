import { pick, type Locale, type Project } from "@/lib/site-content";

export function ProjectMetrics({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const metrics = project.metrics.filter(
    (metric) => metric.value.trim() && pick(metric.label, locale).trim(),
  );
  if (!metrics.length) return null;
  return (
    <dl className="public-project-metrics">
      {metrics.map((metric, index) => (
        <div key={`${project.id}-metric-${index}`}>
          <dt>{pick(metric.label, locale)}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
