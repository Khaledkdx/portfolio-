"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Logos3 } from "@/components/ui/logos3";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import {
  languageHref,
  n,
  projectHref,
  publishedProjects,
  whatsappHref,
  type DesignProps,
} from "../types";
import s from "./stagger-proof.module.css";

const storyKeys = ["challenge", "solution", "outcome"] as const;

export default function StaggerProof(props: DesignProps) {
  const { content, locale } = props;
  const projects = publishedProjects(content);
  const reduced = useReducedMotion();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const proofCards = [
    {
      label: locale === "ar" ? "الأزمة" : "Friction",
      title: pick(content.labels.challenge, locale),
      text: projects[0] ? pick(projects[0].challenge, locale) : pick(content.profile.intro, locale),
    },
    {
      label: locale === "ar" ? "النظام" : "System",
      title: pick(content.labels.solution, locale),
      text: projects[0] ? pick(projects[0].solution, locale) : pick(content.labels.contactCopy, locale),
    },
    {
      label: locale === "ar" ? "الإثبات" : "Proof",
      title: pick(content.labels.outcome, locale),
      text: projects[0] ? pick(projects[0].outcome, locale) : pick(content.profile.availability, locale),
    },
  ];
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
  const group: Variants = reduced
    ? {}
    : { show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };
  const item: Variants = reduced
    ? {}
    : {
        hidden: { opacity: 0, y: 28, rotate: dir === "rtl" ? -1.5 : 1.5 },
        show: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <main className={s.page} dir={dir}>
      <a className={s.skip} href="#main">
        {locale === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>

      <nav className={s.nav} aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"}>
        <Link href={props.variantPath ?? `/${locale}`} className={s.mark}>
          <span>K</span>
          <b>{content.profile.name}</b>
        </Link>
        <div>
          <a href="#story">{locale === "ar" ? "القصة" : "Story"}</a>
          <a href="#work">{pick(content.labels.work, locale)}</a>
          <a href="#contact">{pick(content.labels.contact, locale)}</a>
          <Link href={languageHref(props)}>{locale === "ar" ? "EN" : "عربي"}</Link>
        </div>
      </nav>

      <section className={s.hero} id="main">
        <motion.div
          className={s.heroCopy}
          initial={reduced ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={s.kicker}>{locale === "ar" ? "استوديو إثبات النمو / 032" : "Stagger Proof Studio / 032"}</p>
          <h1>{content.profile.name}</h1>
          <p className={s.lead}>{pick(content.profile.headline, locale)}</p>
          <div className={s.actions}>
            <a href="#work">{pick(content.labels.viewCase, locale)}</a>
            <a href={whatsappHref(content)} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </motion.div>

        <motion.div
          className={s.stack}
          initial={reduced ? false : "hidden"}
          animate="show"
          variants={group}
          aria-label={locale === "ar" ? "قصة مختصرة عن طريقة العمل" : "Short proof story"}
        >
          <motion.figure className={s.portraitCard} variants={item}>
            <PortraitImage content={content} sizes="(max-width: 760px) 82vw, 36vw" priority />
          </motion.figure>
          {proofCards.map((card, index) => (
            <motion.article
              key={card.label}
              className={s.proofCard}
              variants={item}
              whileHover={reduced ? undefined : { y: -8, rotate: dir === "rtl" ? -1 : 1 }}
            >
              <span>{n(index)} / {card.label}</span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className={s.story} id="story">
        <header>
          <span>{locale === "ar" ? "قصة النمو" : "Growth story"}</span>
          <h2>{locale === "ar" ? "الموقع يمشي كدليل: مشكلة، قرار، نظام." : "The page reads like proof: problem, decision, system."}</h2>
        </header>
        <div className={s.storyRail}>
          {storyKeys.map((key, index) => (
            <motion.article
              key={key}
              initial={reduced ? false : { opacity: 0, x: dir === "rtl" ? -32 : 32 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.44, delay: index * 0.08 }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{pick(content.labels[key], locale)}</h3>
              <p>{projects[index] ? pick(projects[index][key === "outcome" ? "outcome" : key], locale) : pick(content.approach[index]?.description ?? content.profile.intro, locale)}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={s.services} aria-labelledby="stagger-services">
        <header>
          <span>{locale === "ar" ? "القدرات" : "Capabilities"}</span>
          <h2 id="stagger-services">{pick(content.labels.services, locale)}</h2>
        </header>
        <div>
          {content.services.map((service, index) => (
            <article key={service.id}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h3>{pick(service.title, locale)}</h3>
              <p>{pick(service.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={s.work} id="work">
        <header>
          <span>{locale === "ar" ? "إثبات العمل" : "Proof wall"}</span>
          <h2>{pick(content.labels.work, locale)}</h2>
        </header>
        <motion.div className={s.workGrid} initial={reduced ? false : "hidden"} whileInView={reduced ? undefined : "show"} viewport={{ once: true, amount: 0.15 }} variants={group}>
          {projects.map((project, index) => (
            <motion.article key={project.id} variants={item} className={index % 3 === 1 ? s.tallCard : ""}>
              <Link href={projectHref(project, props)}>
                <span>{String(index + 1).padStart(2, "0")} / {pick(project.eyebrow, locale)}</span>
                <h3>{pick(project.title, locale)}</h3>
                <p>{pick(project.summary, locale)}</p>
                <b>{pick(content.labels.viewCase, locale)} ↗</b>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <Logos3
        className="stagger-company-rail"
        eyebrow={locale === "ar" ? "الشركات والشعارات" : "LOGOS & TRUST"}
        heading={pick(content.companies.heading, locale)}
        logos={companies}
        locale={locale}
      />

      <footer className={s.contact} id="contact">
        <span>{locale === "ar" ? "افتح قناة" : "Open channel"}</span>
        <h2>{pick(content.labels.contact, locale)}</h2>
        <p>{pick(content.labels.contactCopy, locale)}</p>
        <div>
          <a href={`mailto:${content.profile.email}`}>{content.profile.email}</a>
          <a href={whatsappHref(content)} target="_blank" rel="noreferrer">{pick(content.labels.whatsapp, locale)}</a>
        </div>
      </footer>
    </main>
  );
}
