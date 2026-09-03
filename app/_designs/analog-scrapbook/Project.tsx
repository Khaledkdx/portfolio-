import Link from "next/link";
import { pick } from "@/lib/site-content";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { ProjectMetrics } from "../ProjectMetrics";
import type { ProjectDetailProps } from "../types";
import { projectDetailData } from "../types";
import styles from "./project.module.css";

export default function AnalogScrapbookProject(props: ProjectDetailProps) {
  const { locale, project, content } = props;
  const { images, links, dir, previous, next, projectUrl } = projectDetailData(props);
  const notes = [
    [locale === "ar" ? "قبل" : "Before", project.challenge],
    [locale === "ar" ? "الفكرة" : "Idea", project.solution],
    [locale === "ar" ? "التنفيذ" : "Making", project.implementation],
    [locale === "ar" ? "بعد" : "After", project.outcome],
  ] as const;

  return (
    <main className={styles.page} dir={dir}>
      <nav className={styles.nav}><Link href={props.variantPath ?? `/${locale}`}>← {locale === "ar" ? "رجوع" : "Back"}</Link><span>scrapbook case</span></nav>
      <header className={styles.deskHero}>
        <div className={styles.paper}><b>{pick(project.eyebrow, locale)}</b><h1>{pick(project.title, locale)}</h1><p>{pick(project.description, locale)}</p></div>
        {images[0] ? <ProjectPicture image={images[0]} locale={locale} className={styles.polaroidCover} priority /> : null}
      </header>
      <section className={styles.pinboard}>{notes.map(([label, text], index) => <article key={label} data-note={index}><h2>{label}</h2><p>{pick(text, locale)}</p></article>)}</section>
      <div className={styles.metrics}><ProjectMetrics project={project} locale={locale} /></div>
      {images.length > 1 ? <section className={styles.clippings}>{images.slice(1).map((image) => <ProjectPicture key={image.id} image={image} locale={locale} className={styles.clipping} />)}</section> : null}
      <section className={styles.toolbox}><h2>{locale === "ar" ? "القصاصات المستخدمة" : "Working clippings"}</h2>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}{links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{pick(link.label, locale)}</a>)}</section>
      <nav className={styles.next}>{previous ? <Link href={projectUrl(previous.slug)}>← {pick(previous.title, locale)}</Link> : <span />}{next ? <Link href={projectUrl(next.slug)}>{pick(next.title, locale)} →</Link> : <span />}</nav>
      <footer className={styles.footer}>{content.profile.email}</footer>
    </main>
  );
}
