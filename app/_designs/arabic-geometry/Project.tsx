import Link from "next/link";
import { pick } from "@/lib/site-content";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { ProjectMetrics } from "../ProjectMetrics";
import type { ProjectDetailProps } from "../types";
import { projectDetailData } from "../types";
import styles from "./project.module.css";

export default function ArabicGeometryProject(props: ProjectDetailProps) {
  const { content, locale, project } = props; const { images, links, previous, next, projectUrl, dir } = projectDetailData(props);
  return <main className={styles.page} dir={dir}><nav className={styles.nav}><Link href={props.variantPath ?? `/${locale}`}>← {locale === "ar" ? "العودة" : "Back"}</Link><span>Arabic Folio</span></nav>
    <header className={styles.tughra}><div><span>{pick(project.eyebrow, locale)}</span><h1>{pick(project.title, locale)}</h1><p>{pick(project.description, locale)}</p></div>{images[0] && <ProjectPicture image={images[0]} locale={locale} className={styles.cover} priority />}</header>
    <section className={styles.scroll}>{[["01", locale === "ar" ? "الأزمة" : "Challenge", project.challenge],["02", locale === "ar" ? "الحل" : "Solution", project.solution],["03", locale === "ar" ? "القيمة" : "Value", project.outcome]].map(([num,label,text]) => <article key={num as string}><b>{num as string}</b><h2>{label as string}</h2><p>{pick(text, locale)}</p></article>)}</section>
    <div className={styles.metrics}><ProjectMetrics project={project} locale={locale} /></div>{images.length>1 && <section className={styles.gallery}>{images.slice(1).map((image)=><ProjectPicture key={image.id} image={image} locale={locale} className={styles.tile}/>)}</section>}
    <section className={styles.tools}><h2>{locale === "ar" ? "الأدوات" : "Tools"}</h2>{project.tools.map(t=><span key={t}>{t}</span>)}{links.map(l=><a key={l.id} href={l.url} target="_blank" rel="noreferrer">{pick(l.label, locale)}</a>)}</section>
    <nav className={styles.next}>{previous?<Link href={projectUrl(previous.slug)}>← {pick(previous.title, locale)}</Link>:<span/>}{next?<Link href={projectUrl(next.slug)}>{pick(next.title, locale)} →</Link>:<span/>}</nav><footer>{content.profile.email}</footer></main>;
}
