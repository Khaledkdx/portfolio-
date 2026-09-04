import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass, ExternalLink, Layers, Route } from "lucide-react";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import { ProjectMetrics } from "../ProjectMetrics";
import type { ProjectDetailProps } from "../types";
import { projectDetailData } from "../types";
import styles from "./atlas-project.module.css";

const detailCopy = {
  en: {
    back: "Back to atlas",
    route: "Route dossier",
    summary: "Short summary",
    description: "Full description",
    challenge: "The drop",
    solution: "The route up",
    implementation: "Operating path",
    value: "Business value",
    gallery: "Field notes",
    tools: "Tools and channels",
    links: "External links",
    previous: "Previous station",
    next: "Next station",
  },
  ar: {
    back: "العودة للأطلس",
    route: "ملف المسار",
    summary: "الملخص المختصر",
    description: "الوصف الكامل",
    challenge: "منطقة الهبوط",
    solution: "مسار الصعود",
    implementation: "خط التشغيل",
    value: "القيمة التجارية",
    gallery: "ملاحظات ميدانية",
    tools: "الأدوات والقنوات",
    links: "روابط خارجية",
    previous: "المحطة السابقة",
    next: "المحطة التالية",
  },
} as const;

export default function ScrollWorldAtlasProject(props: ProjectDetailProps) {
  const { content, project, locale } = props;
  const { images, links, previous, next, projectUrl, base, dir } = projectDetailData(props);
  const t = detailCopy[locale];
  const isAr = locale === "ar";
  const dossier = [
    { id: "summary", label: t.summary, value: pick(project.summary, locale) },
    { id: "description", label: t.description, value: pick(project.description, locale) },
    { id: "challenge", label: t.challenge, value: pick(project.challenge, locale) },
    { id: "solution", label: t.solution, value: pick(project.solution, locale) },
    { id: "implementation", label: t.implementation, value: pick(project.implementation, locale) },
    { id: "value", label: t.value, value: pick(project.outcome, locale) },
  ].filter((item) => item.value.trim());

  return (
    <main className={`${styles.project} ${isAr ? styles.rtl : ""}`} dir={dir} lang={locale}>
      <nav className={styles.topbar}>
        <Link href={base}><Compass size={17} aria-hidden /> {t.back}</Link>
        <span>{t.route}</span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p>{pick(project.eyebrow, locale)}</p>
          <h1>{pick(project.title, locale)}</h1>
          <span>{pick(project.description, locale) || pick(project.summary, locale)}</span>
          <ProjectMetrics project={project} locale={locale} />
        </div>
        <div className={styles.heroVisual}>
          {images[0] ? (
            <ProjectPicture image={images[0]} locale={locale} priority className={styles.coverFigure} sizes="(max-width: 860px) 100vw, 46vw" />
          ) : (
            <div className={styles.portraitFallback}>
              <PortraitImage content={content} sizes="(max-width: 860px) 100vw, 42vw" priority />
            </div>
          )}
        </div>
      </header>

      <section className={styles.dossier} aria-labelledby="case-study-dossier-title">
        <div>
          <span>{t.route}</span>
          <h2 id="case-study-dossier-title">{pick(project.eyebrow, locale)}</h2>
        </div>
        <dl>
          {dossier.map((item, index) => (
            <div key={item.id}>
              <dt><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.routeMap} aria-label={isAr ? "مسار حل المشروع" : "Project solution route"}>
        <article className={styles.drop}>
          <span>01</span>
          <h2>{t.challenge}</h2>
          <p>{pick(project.challenge, locale)}</p>
        </article>
        <article className={styles.bridge}>
          <Route size={26} aria-hidden />
          <h2>{t.solution}</h2>
          <p>{pick(project.solution, locale)}</p>
        </article>
        {pick(project.implementation, locale).trim() ? (
          <article>
            <span>03</span>
            <h2>{t.implementation}</h2>
            <p>{pick(project.implementation, locale)}</p>
          </article>
        ) : null}
        <article className={styles.lift}>
          <span>04</span>
          <h2>{t.value}</h2>
          <p>{pick(project.outcome, locale)}</p>
        </article>
      </section>

      {images.length > 1 ? (
        <section className={styles.gallery}>
          <div>
            <Layers size={20} aria-hidden />
            <h2>{t.gallery}</h2>
          </div>
          <div className={styles.galleryGrid}>
            {images.slice(1).map((image, index) => (
              <ProjectPicture key={image.id} image={image} locale={locale} className={index % 2 ? styles.tallFrame : styles.wideFrame} />
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.metaGrid}>
        <div>
          <h2>{t.tools}</h2>
          <div className={styles.tools}>
            {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        </div>
        {links.length ? (
          <div>
            <h2>{t.links}</h2>
            <div className={styles.links}>
              {links.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer">
                  {pick(link.label, locale)} <ExternalLink size={15} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <footer className={styles.nextPrev}>
        {previous ? <Link href={projectUrl(previous.slug)}><ArrowLeft size={17} aria-hidden /> {t.previous}<b>{pick(previous.title, locale)}</b></Link> : <span />}
        {next ? <Link href={projectUrl(next.slug)}>{t.next}<b>{pick(next.title, locale)}</b><ArrowRight size={17} aria-hidden /></Link> : <span />}
      </footer>
    </main>
  );
}
