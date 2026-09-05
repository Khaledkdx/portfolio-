import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CircuitBoard, Mail, MessageCircle } from "lucide-react";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { pick } from "@/lib/site-content";
import { ProjectMetrics } from "../ProjectMetrics";
import { projectDetailData, type ProjectDetailProps } from "../types";
import { Reveal } from "./MotionPrimitives";
import styles from "./project.module.css";

const copy = {
  en: { back: "Back to the system", challenge: "Business pressure", solution: "System response", implementation: "How it was built", value: "Value returned", gallery: "System views", tools: "Tools and signals", links: "Explore the work", previous: "Previous system", next: "Next system", contact: "Build the next system", email: "Email", whatsapp: "WhatsApp" },
  ar: { back: "العودة إلى النظام", challenge: "ضغط الأعمال", solution: "استجابة النظام", implementation: "كيف تم التنفيذ", value: "القيمة المستعادة", gallery: "مشاهد النظام", tools: "الأدوات والإشارات", links: "استكشف العمل", previous: "النظام السابق", next: "النظام التالي", contact: "ابنِ النظام التالي", email: "البريد", whatsapp: "واتساب" },
} as const;

export default function AgenticProject(props: ProjectDetailProps) {
  const { content, project, locale } = props;
  const { images, links, base, projectUrl, previous, next, dir } = projectDetailData(props);
  const t = copy[locale];
  const cover = images[0];
  const languageHref = props.variantPath ? `${props.variantPath}/projects/${project.slug}?locale=${locale === "ar" ? "en" : "ar"}` : `/${locale === "ar" ? "en" : "ar"}/projects/${project.slug}`;
  return (
    <main className={styles.shell} dir={dir}>
      <div className={styles.grid} aria-hidden />
      <nav className={styles.nav}><Link href={base}><ArrowLeft size={17} />{t.back}</Link><span>AGENTIC / CASE</span><Link href={languageHref}>{locale === "ar" ? "EN" : "ع"}</Link></nav>
      <header className={styles.hero}>
        <div className={styles.heroCopy}><span>{pick(project.eyebrow, locale)}</span><h1>{pick(project.title, locale)}</h1><p>{pick(project.description, locale)}</p><ProjectMetrics project={project} locale={locale} /></div>
        <div className={styles.heroIndex}><CircuitBoard size={42} aria-hidden /><span>{String(props.projects.findIndex((item) => item.id === project.id) + 1).padStart(2, "0")}</span><small>SYSTEM RECORD</small></div>
      </header>
      {cover ? <section className={styles.cover}><ProjectPicture image={cover} locale={locale} priority sizes="100vw" /></section> : null}
      <section className={styles.systemMap}>
        <Reveal className={styles.challenge}><span>01</span><h2>{t.challenge}</h2><p>{pick(project.challenge, locale)}</p></Reveal>
        <div className={styles.connector} aria-hidden><i /><b>DIAGNOSE</b><i /></div>
        <Reveal className={styles.solution}><span>02</span><h2>{t.solution}</h2><p>{pick(project.solution, locale)}</p></Reveal>
        {pick(project.implementation, locale).trim() ? <Reveal className={styles.implementation}><span>03</span><h2>{t.implementation}</h2><p>{pick(project.implementation, locale)}</p></Reveal> : null}
        <div className={styles.connector} aria-hidden><i /><b>AUTOMATE</b><i /></div>
        <Reveal className={styles.outcome}><span>04</span><h2>{t.value}</h2><p>{pick(project.outcome, locale)}</p></Reveal>
      </section>
      {images.length > 1 ? <section className={styles.gallery}><div className={styles.sectionHead}><span>VISUAL PROOF</span><h2>{t.gallery}</h2></div><div className={styles.galleryGrid}>{images.slice(1).map((image, index) => <ProjectPicture key={image.id} image={image} locale={locale} className={index % 3 === 0 ? styles.wide : styles.standard} sizes="(max-width: 760px) 100vw, 50vw" />)}</div></section> : null}
      <section className={styles.resources}>
        <div><span>SYSTEM STACK</span><h2>{t.tools}</h2><div className={styles.tools}>{project.tools.map((tool) => <b key={tool}>{tool}</b>)}</div></div>
        {links.length ? <div><span>EXTERNAL SIGNALS</span><h2>{t.links}</h2><div className={styles.links}>{links.map((link) => <a href={link.url} key={link.id} target="_blank" rel="noreferrer">{pick(link.label, locale)}<ArrowUpRight size={16} /></a>)}</div></div> : null}
      </section>
      <section className={styles.contact}><div><span>NEXT BOTTLENECK</span><h2>{t.contact}</h2></div><div><a href={`mailto:${content.profile.email}`}><Mail size={18} />{t.email}</a><a href={`https://wa.me/${content.profile.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={18} />{t.whatsapp}</a></div></section>
      <footer className={styles.nextPrev}>{previous ? <Link href={projectUrl(previous.slug)}><ArrowLeft /><span>{t.previous}<b>{pick(previous.title, locale)}</b></span></Link> : <span />}{next ? <Link href={projectUrl(next.slug)}><span>{t.next}<b>{pick(next.title, locale)}</b></span><ArrowRight /></Link> : <span />}</footer>
    </main>
  );
}

