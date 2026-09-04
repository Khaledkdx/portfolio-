"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Mail, Megaphone, Pause, Play, Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick, projectImages } from "@/lib/site-content";
import type { DesignProps } from "../types";
import { languageHref, projectHref, publishedProjects, whatsappHref } from "../types";
import { GrowthStoryScene } from "./GrowthStoryScene";
import styles from "./cinematic-growth.module.css";

const orbitLabels = ["Marketing", "Automation", "Business Development", "Problem Solving"];

export default function CinematicGrowth({ content, locale, design, preview, variantPath }: DesignProps) {
  const reduced = useReducedMotion();
  const [motionPaused, setMotionPaused] = useState(false);
  const pauseMotion = reduced || motionPaused;
  const projects = publishedProjects(content);
  const reviews = content.reviews.items.filter((item) => item.visible).sort((a, b) => a.order - b.order);
  const companies = content.companies.items.filter((item) => item.visible);
  const campaignProjects = projects.filter((project) => {
    const searchable = [
      project.id,
      pick(project.eyebrow, "en"),
      pick(project.title, "en"),
      pick(project.summary, "en"),
      ...project.tools,
    ].join(" ").toLowerCase();
    return /(campaign|marketing|media|ads|meta|google|tiktok|snapchat|content|creative)/.test(searchable);
  });
  const langHref = languageHref({ content, locale, design, preview, variantPath });

  return (
    <main className={`${styles.page} ${pauseMotion ? styles.paused : ""}`} dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <a className={styles.skip} href="#work">{locale === "ar" ? "انتقل إلى الأعمال" : "Skip to work"}</a>
      <nav className={styles.nav} aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}>
        <Link className={styles.brand} href={variantPath ?? `/${locale}`}><span>K/</span><b>{content.profile.name}</b></Link>
        <div className={styles.navLinks}><a href="#story">{locale === "ar" ? "القصة" : "Story"}</a><a href="#work">{pick(content.labels.work, locale)}</a><a href="#contact">{locale === "ar" ? "تواصل" : "Contact"}</a></div>
        <div className={styles.navActions}><button type="button" onClick={() => setMotionPaused((value) => !value)} aria-label={motionPaused ? "Play motion" : "Pause motion"}>{motionPaused ? <Play size={16} /> : <Pause size={16} />}</button><Link href={langHref}>{locale === "ar" ? "EN" : "ع"}</Link></div>
      </nav>

      <section className={styles.hero}>
        <motion.div className={styles.heroCopy} initial={reduced ? false : "hidden"} animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.span className={styles.eyebrow} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>{pick(content.profile.role, locale)}</motion.span>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } }}>{pick(content.profile.headline, locale)}</motion.h1>
          <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>{pick(content.profile.intro, locale)}</motion.p>
          <motion.div className={styles.heroActions} variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}><a className={styles.primaryCta} href="#work">{pick(content.labels.viewCase, locale)} <ArrowDownRight /></a><a className={styles.textCta} href={`mailto:${content.profile.email}`}>{pick(content.labels.email, locale)} <ArrowUpRight /></a></motion.div>
        </motion.div>
        <div className={styles.portraitScene}>
          <motion.div className={styles.halo} animate={pauseMotion ? undefined : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} />
          <motion.figure className={styles.portraitFrame} initial={reduced ? false : { opacity: 0, scale: .9, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}><PortraitImage content={content} className={styles.portrait} sizes="(max-width: 800px) 88vw, 42vw" priority /><figcaption><i /> {locale === "ar" ? "متاح للمشاريع" : "Available for projects"}</figcaption></motion.figure>
          <div className={styles.orbit}>
            {orbitLabels.map((label, index) => <motion.span key={label} className={styles[`orbit${index + 1}`]} animate={pauseMotion ? undefined : { y: [0, index % 2 ? 10 : -10, 0], rotate: [0, index % 2 ? 2 : -2, 0] }} transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}>{label}</motion.span>)}
          </div>
        </div>
        <div className={styles.scrollCue}><span>SCROLL TO TRACE THE SYSTEM</span><i /></div>
      </section>

      <GrowthStoryScene content={content} locale={locale} />

      <section className={styles.method} id="method">
        <header><span className={styles.eyebrow}>{pick(content.labels.approach, locale)}</span><h2>{locale === "ar" ? "النمو ليس حيلة. إنه نظام قرارات." : "Growth is not a trick. It is a decision system."}</h2></header>
        <div className={styles.methodRail}>{content.approach.map((step, index) => <motion.article key={step.id} initial={reduced ? false : { opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .1 }}><span>0{index + 1}</span><h3>{pick(step.title, locale)}</h3><p>{pick(step.description, locale)}</p></motion.article>)}</div>
      </section>

      <section className={styles.services}>
        <header><span className={styles.eyebrow}>{pick(content.labels.services, locale)}</span><h2>{locale === "ar" ? "أربط التخصصات التي تتعامل معها الشركات عادةً بشكل منفصل." : "I connect the disciplines businesses usually treat separately."}</h2></header>
        <div className={styles.serviceStack}>{content.services.map((service, index) => <motion.article key={service.id} whileHover={reduced ? undefined : { x: locale === "ar" ? -10 : 10 }}><span>{service.number}</span><h3>{pick(service.title, locale)}</h3><p>{pick(service.description, locale)}</p><i>{String(index + 1).padStart(2, "0")}</i></motion.article>)}</div>
        <div className={styles.skills}>{content.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      </section>

      <section className={styles.campaigns} aria-labelledby="campaigns-title">
        <div className={styles.campaignIntro}>
          <span className={styles.eyebrow}>{locale === "ar" ? "الحملات والنمو" : "CAMPAIGNS & GROWTH"}</span>
          <h2 id="campaigns-title">{locale === "ar" ? "الحملة ليست إعلانًا فقط. هي قرار، رسالة، مسار، ثم تحسين." : "A campaign is not just an ad. It is a decision, a message, a route, then optimization."}</h2>
          <p>{locale === "ar" ? "هذا الجزء يوضح أين تظهر خبرة شراء الإعلانات، بحث السوق، المحتوى، وتحوير الرسالة داخل نظام النمو." : "This section makes the campaign work visible: media buying, market research, creative direction and message refinement inside the growth system."}</p>
        </div>
        <div className={styles.campaignRail}>
          {(campaignProjects.length ? campaignProjects : projects.slice(0, 3)).map((project, index) => (
            <motion.article
              key={project.id}
              initial={reduced ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ delay: index * 0.08 }}
            >
              <Megaphone aria-hidden="true" />
              <span>{String(index + 1).padStart(2, "0")} / {pick(project.eyebrow, locale)}</span>
              <h3>{pick(project.title, locale)}</h3>
              <p>{pick(project.solution, locale)}</p>
              <Link href={projectHref(project, { locale, variantPath })}>{pick(content.labels.viewCase, locale)} <ArrowUpRight /></Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.work} id="work">
        <header><span className={styles.eyebrow}>{pick(content.labels.work, locale)}</span><h2>{locale === "ar" ? "المشكلة أولًا. ثم النظام. ثم الأثر." : "Problem first. System next. Business value last."}</h2></header>
        <div className={styles.projectGrid}>{projects.map((project, index) => { const cover = projectImages(project)[0]; return <motion.article key={project.id} className={styles.projectCard} initial={reduced ? false : { opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }}>
          <Link href={projectHref(project, { locale, variantPath })}>
            <div className={styles.projectVisual}>{cover ? <Image src={cover.url} alt={pick(cover.alt, locale)} fill sizes="(max-width: 800px) 100vw, 55vw" unoptimized /> : <div className={styles.projectFallback}><span>{String(index + 1).padStart(2, "0")}</span><i /><i /></div>}<b>{pick(project.eyebrow, locale)}</b></div>
            <div className={styles.projectCopy}><span>CASE / {String(index + 1).padStart(2, "0")}</span><h3>{pick(project.title, locale)}</h3><p>{pick(project.summary, locale)}</p><strong>{pick(content.labels.viewCase, locale)} <ArrowUpRight /></strong></div>
          </Link>
        </motion.article>; })}</div>
      </section>

      <section className={styles.proof}>
        <div className={styles.experience}><span className={styles.eyebrow}>{pick(content.labels.experience, locale)}</span>{content.experiences.map((item) => <article key={item.id}><div><h3>{pick(item.role, locale)}</h3><b>{item.company}</b></div><p>{pick(item.summary, locale)}</p></article>)}</div>
        {companies.length > 0 && <div className={styles.companyRail}><h2>{pick(content.companies.heading, locale)}</h2><div>{companies.map((company) => <a key={company.id} href={company.website || undefined} target={company.website ? "_blank" : undefined} rel={company.website ? "noreferrer" : undefined}>{company.logoUrl && <Image src={company.logoUrl} alt={pick(company.alt, locale)} width={120} height={54} unoptimized />}{company.showName && <span>{pick(company.name, locale)}</span>}</a>)}</div></div>}
        <div className={styles.reviews}>
          <header><span className={styles.eyebrow}>REVIEWS</span><h2>{pick(content.reviews.heading, locale)}</h2><p>{pick(content.reviews.intro, locale)}</p></header>
          {reviews.length > 0 ? (
            <div>{reviews.map((review, index) => <motion.blockquote key={review.id} initial={reduced ? false : { opacity: 0, rotate: index % 2 ? 2 : -2, y: 35 }} whileInView={{ opacity: 1, rotate: index % 2 ? 1 : -1, y: 0 }} viewport={{ once: true }}><p>“{pick(review.quote, locale)}”</p><footer><b>{pick(review.author, locale)}</b><span>{pick(review.role, locale)}{review.company ? ` · ${review.company}` : ""}</span></footer></motion.blockquote>)}</div>
          ) : (
            <div className={styles.reviewEmpty}>
              <Quote aria-hidden="true" />
              <b>{locale === "ar" ? "قسم الآراء جاهز" : "Review section is ready"}</b>
              <p>{locale === "ar" ? "أضف رأيًا حقيقيًا وفعّله من لوحة التحكم ليظهر هنا بدل هذه الحالة المؤقتة." : "Add a verified quote in the admin panel and make it visible to replace this temporary state."}</p>
            </div>
          )}
        </div>
      </section>

      <footer className={styles.contact} id="contact"><span className={styles.eyebrow}>{locale === "ar" ? "المشكلة التالية" : "THE NEXT BOTTLENECK"}</span><h2>{pick(content.labels.contact, locale)}</h2><p>{pick(content.labels.contactCopy, locale)}</p><div><a href={`mailto:${content.profile.email}`}><Mail /> {content.profile.email}</a><a href={whatsappHref(content)} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight /></a></div><small>{pick(content.profile.availability, locale)}</small></footer>
    </main>
  );
}
