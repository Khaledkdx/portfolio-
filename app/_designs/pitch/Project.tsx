import Link from "next/link";
import { pick } from "@/lib/site-content";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { ProjectMetrics } from "../ProjectMetrics";
import type { ProjectDetailProps } from "../types";
import { projectDetailData } from "../types";
import styles from "./project.module.css";

export default function PitchProject(props: ProjectDetailProps) {
  const { locale, project, content } = props;
  const { images, links, dir, previous, next, projectUrl } = projectDetailData(props);
  const slides = [
    ["02", locale === "ar" ? "المشكلة" : "The problem", project.challenge],
    ["03", locale === "ar" ? "الخطة" : "The move", project.solution],
    ["04", locale === "ar" ? "التنفيذ" : "Execution", project.implementation],
    ["05", locale === "ar" ? "القيمة" : "Business value", project.outcome],
  ] as const;

  return (
    <main className={styles.page} dir={dir}>
      <nav className={styles.deckNav}><Link href={props.variantPath ?? `/${locale}`}>← {locale === "ar" ? "رجوع" : "Back"}</Link><span>slide 01 / case</span></nav>
      <header className={styles.titleSlide}><div><b>{pick(project.eyebrow, locale)}</b><h1>{pick(project.title, locale)}</h1><p>{pick(project.description, locale)}</p></div>{images[0] ? <ProjectPicture image={images[0]} locale={locale} className={styles.deckImage} priority /> : null}</header>
      <section className={styles.slides}>{slides.map(([num, label, text]) => <article key={num}><span>{num}</span><h2>{label}</h2><p>{pick(text, locale)}</p></article>)}</section>
      <div className={styles.metrics}><ProjectMetrics project={project} locale={locale} /></div>
      {images.length > 1 ? <section className={styles.filmstrip}>{images.slice(1).map((image) => <ProjectPicture key={image.id} image={image} locale={locale} className={styles.frame} />)}</section> : null}
      <section className={styles.bigLinks}>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}{links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{pick(link.label, locale)} ↗</a>)}</section>
      <nav className={styles.next}>{previous ? <Link href={projectUrl(previous.slug)}>← {pick(previous.title, locale)}</Link> : <span />}{next ? <Link href={projectUrl(next.slug)}>{pick(next.title, locale)} →</Link> : <span />}</nav>
      <footer className={styles.footer}>{content.profile.email}</footer>
    </main>
  );
}
