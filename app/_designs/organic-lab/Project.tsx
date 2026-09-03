import Link from "next/link";
import { pick } from "@/lib/site-content";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { ProjectMetrics } from "../ProjectMetrics";
import type { ProjectDetailProps } from "../types";
import { projectDetailData } from "../types";
import styles from "./project.module.css";

export default function OrganicLabProject(props: ProjectDetailProps) {
  const { locale, project, content } = props;
  const { images, links, dir, previous, next, projectUrl } = projectDetailData(props);
  const cycle = [
    [locale === "ar" ? "التربة" : "Soil", project.challenge],
    [locale === "ar" ? "البذرة" : "Seed", project.solution],
    [locale === "ar" ? "الرعاية" : "Cultivation", project.implementation],
    [locale === "ar" ? "النمو" : "Growth", project.outcome],
  ] as const;

  return (
    <main className={styles.page} dir={dir}>
      <nav className={styles.nav}><Link href={props.variantPath ?? `/${locale}`}>← {locale === "ar" ? "رجوع" : "Back"}</Link><span>organic case</span></nav>
      <header className={styles.fieldHero}>
        {images[0] ? <ProjectPicture image={images[0]} locale={locale} className={styles.leafCover} priority /> : null}
        <div><b>{pick(project.eyebrow, locale)}</b><h1>{pick(project.title, locale)}</h1><p>{pick(project.description, locale)}</p></div>
      </header>
      <section className={styles.growthPath}>{cycle.map(([label, text]) => <article key={label}><i /><h2>{label}</h2><p>{pick(text, locale)}</p></article>)}</section>
      <div className={styles.metrics}><ProjectMetrics project={project} locale={locale} /></div>
      {images.length > 1 ? <section className={styles.specimens}>{images.slice(1).map((image) => <ProjectPicture key={image.id} image={image} locale={locale} className={styles.specimen} />)}</section> : null}
      <section className={styles.nutrients}><h2>{locale === "ar" ? "مغذيات النظام" : "System nutrients"}</h2>{project.tools.map((tool) => <span key={tool}>{tool}</span>)}{links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{pick(link.label, locale)}</a>)}</section>
      <nav className={styles.next}>{previous ? <Link href={projectUrl(previous.slug)}>← {pick(previous.title, locale)}</Link> : <span />}{next ? <Link href={projectUrl(next.slug)}>{pick(next.title, locale)} →</Link> : <span />}</nav>
      <footer className={styles.footer}>{content.profile.email}</footer>
    </main>
  );
}
