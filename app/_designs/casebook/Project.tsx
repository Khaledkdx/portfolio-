import Link from "next/link";
import { pick } from "@/lib/site-content";
import { ProjectMetrics } from "../ProjectMetrics";
import type { ProjectDetailProps } from "../types";
import { n, projectDetailData } from "../types";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import styles from "./project.module.css";

export default function CasebookProject(props: ProjectDetailProps) {
  const { content, locale, project } = props;
  const { images, links, previous, next, projectUrl, dir } = projectDetailData(props);
  const cover = images[0];
  return (
    <main className={styles.page} dir={dir} data-layout="mag">
      <nav className={styles.nav} aria-label="Project"><Link href={props.variantPath || "/" + locale}>← {locale === "ar" ? "رجوع" : "Back"}</Link><span>Magazine Casebook · 05</span></nav>
      <section className={styles.hero}>
        <div className={styles.copy}><p className={styles.eyebrow}>Editorial Campaign Casebook</p><h1>{pick(project.title, locale)}</h1><p>{pick(project.description, locale) || pick(project.summary, locale)}</p></div>
        {cover ? <ProjectPicture image={cover} locale={locale} className={styles.cover} priority sizes="(max-width: 760px) 94vw, 46vw" /> : null}
      </section>
      <section className={styles.body}>{[[locale === "ar" ? "الأزمة" : "Challenge", project.challenge],[locale === "ar" ? "الحل" : "Solution", project.solution],[locale === "ar" ? "التنفيذ" : "Implementation", project.implementation],[locale === "ar" ? "القيمة" : "Business value", project.outcome]].map(([label, text], index) => pick(text, locale).trim() ? <article className={styles.section} key={String(label)}><span>{n(index)}</span><h2>{String(label)}</h2><p>{pick(text, locale)}</p></article> : null)}</section>
      <div className={styles.metrics}><ProjectMetrics project={project} locale={locale} /></div>
      {images.length > 1 ? <section className={styles.gallery} aria-label={locale === "ar" ? "صور المشروع" : "Project images"}>{images.slice(1).map((image) => <ProjectPicture key={image.id} image={image} locale={locale} className={styles.galleryImage} />)}</section> : null}
      <section className={styles.tools}><h2>{locale === "ar" ? "الأدوات والروابط" : "Tools & links"}</h2><div>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>{links.length ? <p>{links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{pick(link.label, locale)}</a>)}</p> : null}</section>
      <nav className={styles.projectNav} aria-label="More projects">{previous ? <Link href={projectUrl(previous.slug)}>← {pick(previous.title, locale)}</Link> : <span />}{next ? <Link href={projectUrl(next.slug)}>{pick(next.title, locale)} →</Link> : <span />}</nav>
      <footer className={styles.cta}><h2>{locale === "ar" ? "عندك مشكلة شبه دي؟" : "Got a similar bottleneck?"}</h2><a href={"mailto:" + content.profile.email}>{content.profile.email}</a></footer>
    </main>
  );
}
