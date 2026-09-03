import Link from "next/link";
import { pick } from "@/lib/site-content";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { ProjectMetrics } from "../ProjectMetrics";
import type { ProjectDetailProps } from "../types";
import { projectDetailData } from "../types";
import styles from "./project.module.css";

export default function ModularCubesProject(props: ProjectDetailProps) {
  const { locale, project, content } = props;
  const { images, links, dir, previous, next, projectUrl } = projectDetailData(props);
  const blocks = [
    [locale === "ar" ? "المشكلة" : "Problem block", project.challenge],
    [locale === "ar" ? "التركيب" : "Build block", project.solution],
    [locale === "ar" ? "التنفيذ" : "Ops block", project.implementation],
    [locale === "ar" ? "القيمة" : "Value block", project.outcome],
  ] as const;

  return (
    <main className={styles.page} dir={dir}>
      <nav className={styles.nav}><Link href={props.variantPath ?? `/${locale}`}>← {locale === "ar" ? "رجوع" : "Back"}</Link><span>cube assembly</span></nav>
      <header className={styles.assemblyHero}>
        <section className={styles.blockTitle}><b>{pick(project.eyebrow, locale)}</b><h1>{pick(project.title, locale)}</h1><p>{pick(project.description, locale)}</p></section>
        <section className={styles.stackModel}>{images[0] ? <ProjectPicture image={images[0]} locale={locale} className={styles.coverCube} priority /> : null}<i /><i /><i /><i /></section>
      </header>
      <section className={styles.blockMap}>{blocks.map(([label, text], index) => <article key={label} className={styles[`block${index + 1}` as keyof typeof styles]}><small>{String(index + 1).padStart(2, "0")}</small><h2>{label}</h2><p>{pick(text, locale)}</p></article>)}</section>
      <div className={styles.metrics}><ProjectMetrics project={project} locale={locale} /></div>
      {images.length > 1 ? <section className={styles.parts}>{images.slice(1).map((image) => <ProjectPicture key={image.id} image={image} locale={locale} className={styles.part} />)}</section> : null}
      <section className={styles.inventory}>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}{links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{pick(link.label, locale)}</a>)}</section>
      <nav className={styles.next}>{previous ? <Link href={projectUrl(previous.slug)}>← {pick(previous.title, locale)}</Link> : <span />}{next ? <Link href={projectUrl(next.slug)}>{pick(next.title, locale)} →</Link> : <span />}</nav>
      <footer className={styles.footer}>{content.profile.email}</footer>
    </main>
  );
}
