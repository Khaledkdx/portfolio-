import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { pick } from "@/lib/site-content";
import { ProjectMetrics } from "../ProjectMetrics";
import type { ProjectDetailProps } from "../types";
import { projectDetailData } from "../types";
import styles from "./project.module.css";

export default function CinematicProject(props: ProjectDetailProps) {
  const { content, project, locale, variantPath } = props;
  const { images, links, previous, next, base, projectUrl, dir } = projectDetailData(props);
  return <main className={styles.page} dir={dir} lang={locale}>
    <nav className={styles.nav}><Link href={base}><span>K/</span>{content.profile.name}</Link><Link href={variantPath ? `${variantPath}/projects/${project.slug}?locale=${locale === "ar" ? "en" : "ar"}` : `/${locale === "ar" ? "en" : "ar"}/projects/${project.slug}`}>{locale === "ar" ? "EN" : "ع"}</Link></nav>
    <header className={styles.hero}>
      <div className={styles.heroCopy}><span>{pick(project.eyebrow, locale)}</span><h1>{pick(project.title, locale)}</h1><p>{pick(project.description, locale)}</p>{links.length > 0 && <div className={styles.links}>{links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{pick(link.label, locale)} <ArrowUpRight /></a>)}</div>}</div>
      <div className={styles.caseIndex}><b>CASE</b><strong>{String(project.order).padStart(2, "0")}</strong></div>
    </header>
    {images[0] && <ProjectPicture image={images[0]} locale={locale} priority className={`${styles.cover} project-picture-caption`} sizes="100vw" />}
    <ProjectMetrics project={project} locale={locale} />
    <section className={styles.analysis}>
      <article><span>01 / {pick(content.labels.challenge, locale)}</span><h2>{pick(content.labels.challenge, locale)}</h2><p>{pick(project.challenge, locale)}</p></article>
      <article><span>02 / {pick(content.labels.solution, locale)}</span><h2>{pick(content.labels.solution, locale)}</h2><p>{pick(project.solution, locale)}</p></article>
      {pick(project.implementation, locale).trim() && <article><span>03 / {locale === "ar" ? "التنفيذ" : "Implementation"}</span><h2>{locale === "ar" ? "كيف بُني النظام" : "How the system was built"}</h2><p>{pick(project.implementation, locale)}</p></article>}
      <article className={styles.outcome}><span>04 / {pick(content.labels.outcome, locale)}</span><h2>{pick(content.labels.outcome, locale)}</h2><p>{pick(project.outcome, locale)}</p></article>
    </section>
    {images.length > 1 && <section className={styles.gallery}>{images.slice(1).map((image, index) => <ProjectPicture key={image.id} image={image} locale={locale} className={`${styles[`image${(index % 3) + 1}`]} project-picture-caption`} sizes="(max-width:760px) 100vw, 70vw" />)}</section>}
    <section className={styles.tools}><span>{locale === "ar" ? "الأدوات والنظام" : "TOOLS & SYSTEM"}</span><div>{project.tools.map((tool) => <b key={tool}>{tool}</b>)}</div></section>
    <footer className={styles.footer}><div>{previous && <Link href={projectUrl(previous.slug)}>{locale === "ar" ? <ArrowRight /> : <ArrowLeft />}<span><small>{locale === "ar" ? "السابق" : "Previous"}</small>{pick(previous.title, locale)}</span></Link>}</div><div>{next && <Link href={projectUrl(next.slug)}><span><small>{locale === "ar" ? "التالي" : "Next"}</small>{pick(next.title, locale)}</span>{locale === "ar" ? <ArrowLeft /> : <ArrowRight />}</Link>}</div></footer>
  </main>;
}
