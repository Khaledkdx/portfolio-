import Link from "next/link";
import { pick } from "@/lib/site-content";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { ProjectMetrics } from "../ProjectMetrics";
import type { ProjectDetailProps } from "../types";
import { projectDetailData } from "../types";
import styles from "./project.module.css";

export default function FutureSignalProject(props: ProjectDetailProps) {
  const { locale, project, content } = props;
  const { images, links, dir, previous, next, projectUrl } = projectDetailData(props);
  const signals = [
    [locale === "ar" ? "رصد الأزمة" : "Signal 01", project.challenge],
    [locale === "ar" ? "بناء المسار" : "Signal 02", project.solution],
    [locale === "ar" ? "تشغيل النظام" : "Signal 03", project.implementation],
    [locale === "ar" ? "تأكيد القيمة" : "Signal 04", project.outcome],
  ] as const;

  return (
    <main className={styles.page} dir={dir}>
      <nav className={styles.nav}><Link href={props.variantPath ?? `/${locale}`}>← {locale === "ar" ? "رجوع" : "Back"}</Link><span>FS / telemetry</span></nav>
      <header className={styles.telemetryHero}>
        <div className={styles.hudText}><small>{pick(project.eyebrow, locale)}</small><h1>{pick(project.title, locale)}</h1><p>{pick(project.description, locale)}</p></div>
        <aside className={styles.signalPanel}><span>LIVE</span>{project.tools.slice(0, 5).map((tool) => <b key={tool}>{tool}</b>)}</aside>
        {images[0] ? <ProjectPicture image={images[0]} locale={locale} className={styles.monitor} priority /> : null}
      </header>
      <section className={styles.telemetry}>{signals.map(([label, text]) => <article key={label}><h2>{label}</h2><p>{pick(text, locale)}</p></article>)}</section>
      <div className={styles.metrics}><ProjectMetrics project={project} locale={locale} /></div>
      {images.length > 1 ? <section className={styles.dataWall}>{images.slice(1).map((image) => <ProjectPicture key={image.id} image={image} locale={locale} className={styles.dataShot} />)}</section> : null}
      <section className={styles.launch}>{links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{pick(link.label, locale)} ↗</a>)}</section>
      <nav className={styles.next}>{previous ? <Link href={projectUrl(previous.slug)}>← {pick(previous.title, locale)}</Link> : <span />}{next ? <Link href={projectUrl(next.slug)}>{pick(next.title, locale)} →</Link> : <span />}</nav>
      <footer className={styles.footer}>{content.profile.email}</footer>
    </main>
  );
}
