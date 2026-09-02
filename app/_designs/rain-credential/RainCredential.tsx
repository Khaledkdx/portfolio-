"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SparkBadge } from "@/components/ui/spark-badge";
import { Logos3 } from "@/components/ui/logos3";
import { pick } from "@/lib/site-content";
import {
  languageHref,
  n,
  projectHref,
  publishedProjects,
  whatsappHref,
  type DesignProps,
} from "../types";
import s from "./rain-credential.module.css";

export default function RainCredential(props: DesignProps) {
  const { content, locale } = props;
  const projects = publishedProjects(content);
  const companies = content.companies.items
    .filter((company) => company.visible && company.logoUrl)
    .map((company) => ({
      id: company.id,
      image: company.logoUrl,
      description: pick(company.alt, locale),
      name: pick(company.name, locale),
      showName: company.showName,
      href: company.website || undefined,
    }));
  const reduced = useReducedMotion();
  const reveal = reduced
    ? { initial: false as const, whileInView: undefined }
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <main className={s.page} dir={locale === "ar" ? "rtl" : "ltr"}>
      <a className={s.skip} href="#main">
        {locale === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <nav className={s.nav} aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"}>
        <Link href={props.variantPath ?? `/${locale}`} className={s.brand}>
          <span>K/</span><b>{content.profile.name}</b>
        </Link>
        <div className={s.navLinks}>
          <a href="#work">{pick(content.labels.work, locale)}</a>
          <a href="#capabilities">{pick(content.labels.services, locale)}</a>
          <a href="#contact">{pick(content.labels.contact, locale)}</a>
          <Link href={languageHref(props)}>{locale === "ar" ? "EN" : "عربي"}</Link>
        </div>
      </nav>

      <section className={s.hero} id="main">
        <motion.div
          className={s.heroCopy}
          initial={reduced ? false : { opacity: 0, x: locale === "ar" ? 28 : -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={s.eyebrow}><i /> VERIFIED GROWTH OPERATOR / 031</p>
          <h1>{pick(content.profile.headline, locale)}</h1>
          <p className={s.intro}>{pick(content.profile.intro, locale)}</p>
          <div className={s.heroActions}>
            <a href="#work">{locale === "ar" ? "افتح ملف الأعمال" : "Open the field record"}<span>↘</span></a>
            <a href={whatsappHref(content)} target="_blank" rel="noreferrer">WhatsApp ↗</a>
          </div>
        </motion.div>

        <motion.div
          className={s.badgeStage}
          initial={reduced ? false : { opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.72, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <SparkBadge sourceUrl="/spark-badge" />
          <span className={s.stageIndex}>IDENTITY / AUTHORITY / MOTION</span>
        </motion.div>

        <aside className={s.heroRail}>
          <span>{locale === "ar" ? "الموقع" : "LOCATION"}<b>UAE / KSA / REMOTE</b></span>
          <span>{locale === "ar" ? "النطاق" : "FIELD"}<b>GROWTH × AUTOMATION</b></span>
          <span>{locale === "ar" ? "الحالة" : "STATUS"}<b className={s.online}>AVAILABLE</b></span>
        </aside>
      </section>

      <Logos3
        className="rain-company-rail"
        eyebrow={locale === "ar" ? "شركاء في العمل" : "TRUSTED IN THE FIELD"}
        heading={pick(content.companies.heading, locale)}
        logos={companies}
        locale={locale}
      />

      <section className={s.trace} aria-label={locale === "ar" ? "منهج العمل" : "Operating method"}>
        <header><span>01 / SIGNAL TRACE</span><h2>{locale === "ar" ? "من المشكلة إلى نظام يعمل." : "From friction to a system that moves."}</h2></header>
        <div className={s.traceGrid}>
          {content.approach.map((step, index) => (
            <motion.article
              key={step.id}
              {...reveal}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.42, delay: index * 0.07 }}
            >
              <div><span>{n(index)}</span><i /></div>
              <h3>{pick(step.title, locale)}</h3>
              <p>{pick(step.description, locale)}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={s.work} id="work">
        <header><span>02 / FIELD RECORDS</span><h2>{pick(content.labels.work, locale)}</h2><p>{locale === "ar" ? "أعمال موثقة حول المشكلة والقرار والقيمة التجارية." : "Documented work: the friction, the decision and the business value."}</p></header>
        <div className={s.records}>
          {projects.map((project, index) => (
            <motion.article key={project.id} {...reveal} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
              <Link href={projectHref(project, props)}>
                <div className={s.recordMeta}><span>REC-{String(index + 1).padStart(3, "0")}</span><i>{pick(project.eyebrow, locale)}</i></div>
                <h3>{pick(project.title, locale)}</h3>
                <p>{pick(project.summary, locale)}</p>
                <div className={s.recordBottom}><span>{project.tools.slice(0, 3).join(" / ")}</span><b>{locale === "ar" ? "فتح الملف" : "Open record"} ↗</b></div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={s.capabilities} id="capabilities">
        <header><span>03 / CAPABILITY ARRAY</span><h2>{pick(content.labels.services, locale)}</h2></header>
        <div className={s.capGrid}>
          {content.services.map((service, index) => (
            <article key={service.id}>
              <span>{n(index)}</span><div><h3>{pick(service.title, locale)}</h3><p>{pick(service.description, locale)}</p></div>
            </article>
          ))}
        </div>
        <div className={s.toolBand} aria-label={locale === "ar" ? "المهارات والأدوات" : "Skills and tools"}>
          {content.skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>

      <footer className={s.contact} id="contact">
        <span>04 / OPEN CHANNEL</span>
        <h2>{pick(content.labels.contact, locale)}</h2>
        <p>{pick(content.labels.contactCopy, locale)}</p>
        <div>
          <a href={`mailto:${content.profile.email}`}>{content.profile.email} ↗</a>
          <a href={whatsappHref(content)} target="_blank" rel="noreferrer">WHATSAPP ↗</a>
        </div>
        <small>KHALID MOHAMAD · BUSINESS GROWTH &amp; AUTOMATION</small>
      </footer>
    </main>
  );
}
