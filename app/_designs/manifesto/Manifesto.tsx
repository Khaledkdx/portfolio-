import Image from "next/image";
import Link from "next/link";
import { pick, projectImages } from "@/lib/site-content";
import { PortraitImage } from "@/app/_components/PortraitImage";
import type { DesignProps } from "../types";
import { languageHref, n, projectHref, publishedProjects, whatsappHref } from "../types";
import styles from "./manifesto.module.css";

export default function Manifesto({ content, locale, design, preview, variantPath }: DesignProps) {
  const projects = publishedProjects(content);
  const languageUrl = languageHref({ content, locale, design, preview, variantPath });
  return (
    <main className={styles.page} dir={locale === "ar" ? "rtl" : "ltr"} data-layout="poster">
      <a className={styles.skip} href="#work">Skip to work</a>
      <nav className={styles.nav} aria-label="Portfolio">
        <Link href={variantPath || "/" + locale} className={styles.brand}><span>K/02</span><b>{content.profile.name}</b></Link>
        <div>
          <a href="#method">{locale === "ar" ? "المنهج" : "Method"}</a>
          <a href="#services">{locale === "ar" ? "الخدمات" : "Services"}</a>
          <a href="#work">{locale === "ar" ? "الأعمال" : "Work"}</a>
          <Link href={languageUrl}>{locale === "ar" ? "EN" : "AR"}</Link>
        </div>
      </nav>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Street Poster Wall · wild campaign wall</p>
          <h1 id="hero-title">{pick(content.profile.headline, locale)}</h1>
          <p className={styles.lead}>{pick(content.profile.intro, locale)}</p>
          <div className={styles.actions}>
            <a href="#work">{locale === "ar" ? "شوف طريقة الحل" : "See the problem-solving flow"}</a>
            <a href={whatsappHref(content)} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className={styles.heroVisual} aria-label={content.profile.name}>
          <div className={styles.portraitShell}>
            <PortraitImage content={content} className={styles.portraitImage} sizes="(max-width: 760px) 88vw, 42vw" priority />
          </div>
          <div className={styles.signature} aria-hidden="true"><span>02</span><b>Creative Agency Manifesto</b></div>
        </div>
      </section>
      <section className={styles.method} id="method">
        <header><span>{locale === "ar" ? "خطوة بخطوة" : "Step by step"}</span><h2>{locale === "ar" ? "من المشكلة إلى نظام نمو" : "From bottleneck to growth system"}</h2></header>
        <div className={styles.methodGrid}>{content.approach.map((step, index) => <article key={step.id}><b>{n(index)}</b><h3>{pick(step.title, locale)}</h3><p>{pick(step.description, locale)}</p></article>)}</div>
      </section>
      <section className={styles.services} id="services">
        <header><span>{locale === "ar" ? "قدرات" : "Capabilities"}</span><h2>{pick(content.profile.role, locale)}</h2></header>
        <div className={styles.serviceGrid}>{content.services.map((service) => <article key={service.id}><b>{service.number}</b><h3>{pick(service.title, locale)}</h3><p>{pick(service.description, locale)}</p></article>)}</div>
      </section>
      <section className={styles.work} id="work">
        <header><span>{locale === "ar" ? "مشاريع" : "Projects"}</span><h2>{locale === "ar" ? "كل مشروع صفحة تحكي الأزمة والحل" : "Every project opens into the problem and the fix"}</h2></header>
        <div className={styles.projectGrid}>{projects.map((project, index) => { const cover = projectImages(project)[0]; return <article className={styles.projectCard} key={project.id}><Link href={projectHref(project, { locale, variantPath })}>{cover ? <figure className={styles.projectImage}><Image src={cover.url} alt={pick(cover.alt, locale)} fill sizes="(max-width: 760px) 92vw, 30vw" unoptimized /></figure> : null}<span>{n(index)} · {pick(project.eyebrow, locale)}</span><h3>{pick(project.title, locale)}</h3><p>{pick(project.summary, locale)}</p><b>{locale === "ar" ? "افتح المشروع" : "Open case"}</b></Link></article>; })}</div>
      </section>
      <section className={styles.cta} id="contact"><span>{locale === "ar" ? "جاهز للحوار" : "Ready for the brief"}</span><h2>{pick(content.profile.availability, locale)}</h2><div><a href={"mailto:" + content.profile.email}>{content.profile.email}</a><a href={whatsappHref(content)} target="_blank" rel="noreferrer">+{content.profile.whatsapp}</a></div></section>
    </main>
  );
}
