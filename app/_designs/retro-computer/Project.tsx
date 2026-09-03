import Link from "next/link";
import { pick } from "@/lib/site-content";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { ProjectMetrics } from "../ProjectMetrics";
import type { ProjectDetailProps } from "../types";
import { projectDetailData } from "../types";
import styles from "./project.module.css";

export default function RetroComputerProject(props: ProjectDetailProps) {
  const { locale, project, content } = props;
  const { images, links, dir, previous, next, projectUrl } = projectDetailData(props);
  const files = [
    ["problem.txt", project.challenge],
    ["solution.app", project.solution],
    ["runbook.sys", project.implementation],
    ["value.log", project.outcome],
  ] as const;

  return (
    <main className={styles.page} dir={dir}>
      <nav className={styles.menu}><Link href={props.variantPath ?? `/${locale}`}>← {locale === "ar" ? "رجوع" : "Back"}</Link><span>KDX_OS 9.0</span></nav>
      <header className={styles.crt}>
        <div className={styles.window}><div className={styles.windowBar}><i /><i /><i /></div><b>{pick(project.eyebrow, locale)}</b><h1>{pick(project.title, locale)}</h1><p>{pick(project.description, locale)}</p></div>
        {images[0] ? <ProjectPicture image={images[0]} locale={locale} className={styles.desktopImage} priority /> : null}
      </header>
      <section className={styles.files}>{files.map(([label, text]) => <article key={label}><h2>{label}</h2><p>{pick(text, locale)}</p></article>)}</section>
      <div className={styles.metrics}><ProjectMetrics project={project} locale={locale} /></div>
      {images.length > 1 ? <section className={styles.windows}>{images.slice(1).map((image) => <ProjectPicture key={image.id} image={image} locale={locale} className={styles.windowImage} />)}</section> : null}
      <section className={styles.dock}>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}{links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{pick(link.label, locale)}</a>)}</section>
      <nav className={styles.next}>{previous ? <Link href={projectUrl(previous.slug)}>← {pick(previous.title, locale)}</Link> : <span />}{next ? <Link href={projectUrl(next.slug)}>{pick(next.title, locale)} →</Link> : <span />}</nav>
      <footer className={styles.footer}>{content.profile.email}</footer>
    </main>
  );
}
