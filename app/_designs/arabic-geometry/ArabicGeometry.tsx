import Image from "next/image";
import Link from "next/link";
import { pick, projectImages } from "@/lib/site-content";
import { PortraitImage } from "@/app/_components/PortraitImage";
import type { DesignProps } from "../types";
import { languageHref, n, projectHref, publishedProjects, whatsappHref } from "../types";
import styles from "./arabic-geometry.module.css";

export default function ArabicGeometry({ content, locale, design, preview, variantPath }: DesignProps) {
  const projects = publishedProjects(content);
  const languageUrl = languageHref({ content, locale, design, preview, variantPath });
  return <main className={styles.page} dir={locale === "ar" ? "rtl" : "ltr"}>
    <a className={styles.skip} href="#folio">Skip to work</a>
    <aside className={styles.rail}><Link href={variantPath ?? `/${locale}`}>Khalid</Link><a href="#method">{locale === "ar" ? "المنهج" : "Method"}</a><a href="#folio">{locale === "ar" ? "الأعمال" : "Work"}</a><Link href={languageUrl}>{locale === "ar" ? "EN" : "AR"}</Link></aside>
    <section className={styles.manuscript}>
      <div className={styles.calligraphy}><span>نمو</span><h1>{pick(content.profile.headline, locale)}</h1><p>{pick(content.profile.intro, locale)}</p><a href={whatsappHref(content)} target="_blank" rel="noreferrer">WhatsApp</a></div>
      <figure className={styles.arch}><PortraitImage content={content} className={styles.portrait} sizes="(max-width: 760px) 90vw, 40vw" priority /><figcaption>{content.profile.name}</figcaption></figure>
      <div className={styles.seal}>01</div>
    </section>
    <section id="method" className={styles.courtyard}>{content.approach.map((step, index) => <article key={step.id}><b>{n(index)}</b><h2>{pick(step.title, locale)}</h2><p>{pick(step.description, locale)}</p></article>)}</section>
    <section className={styles.gates}>{content.services.map((service) => <article key={service.id}><span>{service.number}</span><h2>{pick(service.title, locale)}</h2><p>{pick(service.description, locale)}</p></article>)}</section>
    <section id="folio" className={styles.folio}>{projects.map((project, index) => { const cover = projectImages(project)[0]; return <Link key={project.id} href={projectHref(project,{locale,variantPath})} className={styles.folioPage}>{cover && <Image src={cover.url} alt={pick(cover.alt, locale)} fill sizes="(max-width:760px) 88vw, 28vw" unoptimized />}<span>{n(index)}</span><h2>{pick(project.title, locale)}</h2><p>{pick(project.summary, locale)}</p></Link>; })}</section>
    <footer className={styles.majlis}><h2>{pick(content.profile.availability, locale)}</h2><a className={styles.mail} href={`mailto:${content.profile.email}`}>{content.profile.email}</a></footer>
  </main>;
}
