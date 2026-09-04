"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Compass, Mail, Map, MessageCircle, RadioTower, Route } from "lucide-react";
import { useMemo } from "react";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import type { DesignProps } from "../types";
import { languageHref, n, projectHref, publishedProjects, whatsappHref } from "../types";
import { ScrollScrubCanvas } from "./ScrollScrubCanvas";
import styles from "./scroll-world-atlas.module.css";

const companyCollapseFrames = {
  desktop: {
    basePath: "/scroll-scrub/company-collapse/desktop",
    count: 192,
    poster: "/scroll-scrub/company-collapse/desktop/poster.webp",
  },
  mobile: {
    basePath: "/scroll-scrub/company-collapse/mobile",
    count: 96,
    poster: "/scroll-scrub/company-collapse/mobile/poster.webp",
  },
};

const atlasLabels = {
  en: {
    nav: ["Signal", "World", "Cases", "Work", "Proof", "Contact"],
    atlas: "Scroll World Atlas",
    mapLine: "A miniature operating map for business growth.",
    worldEyebrow: "Falling company → growth route",
    route: "Growth route",
    approach: "Operating route",
    experience: "Experience terrain",
    skills: "Tool signals",
    campaigns: "Case study stations",
    caseProblem: "Problem",
    caseResponse: "Response",
    caseValue: "Value",
    proof: "Proof layer",
    proofEmpty: "Reviews are ready in the CMS. Add verified quotes and they will appear here as moving proof cards.",
    companies: "Operating around real teams",
    contact: "Open a growth route",
    email: "Email",
    whatsapp: "WhatsApp",
    read: "Open station",
    lang: "العربية",
  },
  ar: {
    nav: ["الإشارة", "العالم", "الحالات", "الأعمال", "الإثبات", "التواصل"],
    atlas: "أطلس عالم النمو",
    mapLine: "خريطة تشغيل مصغّرة لتحويل تعطّل الأعمال إلى مسار نمو.",
    worldEyebrow: "شركة تهبط ← مسار نمو",
    route: "مسار النمو",
    approach: "مسار التشغيل",
    experience: "خريطة الخبرات",
    skills: "إشارات الأدوات",
    campaigns: "محطات دراسات الحالة",
    caseProblem: "الأزمة",
    caseResponse: "الحل",
    caseValue: "القيمة",
    proof: "طبقة الإثبات",
    proofEmpty: "قسم الآراء جاهز من لوحة التحكم. أضف آراء موثقة وستظهر هنا كبطاقات إثبات متحركة.",
    companies: "تشغيل مع فرق وشركات حقيقية",
    contact: "افتح مسار نمو",
    email: "البريد",
    whatsapp: "واتساب",
    read: "فتح المحطة",
    lang: "English",
  },
} as const;

export default function ScrollWorldAtlas({ content, locale, design, variantPath }: DesignProps) {
  const text = atlasLabels[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const isAr = locale === "ar";
  const reduceMotion = useReducedMotion();
  const projects = publishedProjects(content);
  const visibleReviews = content.reviews.items
    .filter((review) => review.visible)
    .sort((a, b) => a.order - b.order);
  const visibleCompanies = content.companies.items.filter((company) => company.visible);
  const orbitItems = useMemo(
    () =>
      (content.services.length ? content.services : content.approach)
        .slice(0, 5)
        .map((item, index) => ({ id: item.id, title: pick(item.title, locale), index })),
    [content.approach, content.services, locale],
  );
  const storyProblems = content.growthStory.problems.slice(0, 4);
  const routeStages = [
    ...storyProblems.map((problem, index) => ({
      id: problem.id,
      eyebrow: index === 0 ? (isAr ? "الهبوط" : "Falling") : (isAr ? "احتكاك" : "Friction"),
      title: pick(problem.title, locale),
      body: pick(problem.description, locale),
      state: "down",
    })),
    {
      id: "intervention",
      eyebrow: isAr ? "التدخل" : "Intervention",
      title: pick(content.growthStory.intervention, locale),
      body: pick(content.growthStory.result, locale),
      state: "up",
    },
  ];

  return (
    <main className={`${styles.atlas} ${isAr ? styles.rtl : ""}`} dir={dir} lang={locale}>
      <nav className={styles.routeRail} aria-label={isAr ? "تنقل التصميم" : "Design navigation"}>
        {text.nav.map((item, index) => (
          <a href={`#${["signal", "world", "campaigns", "work", "proof", "contact"][index]}`} key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item}
          </a>
        ))}
      </nav>

      <section className={styles.hero} id="signal">
        <div className={styles.heroCopy}>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <Compass size={17} aria-hidden /> {text.atlas}
          </motion.p>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
            {pick(content.profile.headline, locale)}
          </motion.h1>
          <motion.div className={styles.heroIntro} initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }}>
            <b>{pick(content.profile.role, locale)}</b>
            <span>{pick(content.profile.intro, locale)}</span>
          </motion.div>
          <div className={styles.heroActions}>
            <a href="#world"><Route size={16} aria-hidden /> {text.route}</a>
            <Link href={languageHref({ content, locale, design, variantPath })}>{text.lang}</Link>
          </div>
        </div>

        <div className={styles.signalMap} aria-label={isAr ? "صورة خالد محاطة بمدارات القدرات" : "Khalid portrait surrounded by capability orbits"}>
          <motion.div
            className={styles.orbitField}
            animate={reduceMotion ? {} : { rotate: isAr ? -360 : 360 }}
            transition={{ duration: 34, ease: "linear", repeat: Infinity }}
          >
            {orbitItems.map((item) => (
              <span key={item.id} className={styles[`orbit${item.index + 1}` as keyof typeof styles]}>
                {item.title}
              </span>
            ))}
          </motion.div>
          <motion.div className={styles.portraitSignal} initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}>
            <PortraitImage content={content} sizes="(max-width: 760px) 78vw, 36vw" priority />
          </motion.div>
          <div className={styles.mapCard}>
            <RadioTower size={18} aria-hidden />
            <span>{text.mapLine}</span>
          </div>
        </div>
      </section>

      <AtlasTransition
        reduceMotion={reduceMotion}
        reverse={isAr}
        from={isAr ? "من الإشارة" : "from signal"}
        to={isAr ? "إلى مشهد التعطّل" : "to the bottleneck scene"}
      />

      <section className={styles.world} id="world">
        <div className={styles.worldCopy}>
          <p>{text.worldEyebrow}</p>
          <h2>{pick(content.growthStory.title, locale)}</h2>
          <span>{pick(content.growthStory.intro, locale)}</span>
        </div>
        <ScrollScrubCanvas
          desktop={companyCollapseFrames.desktop}
          mobile={companyCollapseFrames.mobile}
          className={styles.scrubScene}
          stageClassName={styles.worldStage}
          canvasClassName={styles.scrubCanvas}
          posterClassName={styles.scrubPoster}
        >
          <div className={styles.scrubHud} aria-hidden="true">
            <span>{isAr ? "سكرول للتحكم في المشهد" : "scroll to scrub the scene"}</span>
            <b>{isAr ? "من الهبوط إلى مسار نمو" : "from decline to a growth route"}</b>
          </div>
          <div className={styles.stageGrid}>
            {routeStages.map((stage, index) => (
              <motion.article
                key={stage.id}
                className={stage.state === "up" ? styles.stageUp : styles.stageDown}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24) }}
              >
                <small>{stage.eyebrow}</small>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </motion.article>
            ))}
          </div>
        </ScrollScrubCanvas>
      </section>

      <AtlasTransition
        reduceMotion={reduceMotion}
        reverse={isAr}
        from={isAr ? "من التشخيص" : "from diagnosis"}
        to={isAr ? "إلى الحملات" : "to campaigns"}
        accent="signal"
      />

      <section className={styles.campaigns} id="campaigns">
        <div className={styles.sectionHead}>
          <p>{text.campaigns}</p>
          <h2>{pick(content.labels.work, locale)}</h2>
        </div>
        <div className={styles.stationLine}>
          {projects.map((project, index) => (
            <Link className={styles.station} href={projectHref(project, { locale, variantPath })} key={project.id}>
              <span>{n(index)}</span>
              <b>{pick(project.title, locale)}</b>
              <small>{pick(project.description, locale) || pick(project.summary, locale)}</small>
              <dl>
                <div>
                  <dt>{text.caseProblem}</dt>
                  <dd>{pick(project.challenge, locale)}</dd>
                </div>
                <div>
                  <dt>{text.caseResponse}</dt>
                  <dd>{pick(project.solution, locale)}</dd>
                </div>
                <div>
                  <dt>{text.caseValue}</dt>
                  <dd>{pick(project.outcome, locale)}</dd>
                </div>
              </dl>
            </Link>
          ))}
        </div>
      </section>

      <AtlasTransition
        reduceMotion={reduceMotion}
        reverse={isAr}
        from={isAr ? "من الطلب" : "from demand"}
        to={isAr ? "إلى النظام" : "to the operating system"}
        accent="blue"
      />

      <section className={styles.work} id="work">
        <div className={styles.sectionHead}>
          <p>{pick(content.labels.services, locale)}</p>
          <h2>{pick(content.labels.services, locale)}</h2>
        </div>
        <div className={styles.capabilityMap}>
          {content.services.map((service, index) => (
            <article key={service.id}>
              <span>{service.number || n(index)}</span>
              <h3>{pick(service.title, locale)}</h3>
              <p>{pick(service.description, locale)}</p>
            </article>
          ))}
        </div>
        {content.skills.length ? (
          <div className={styles.skillSignals} aria-label={text.skills}>
            <span>{text.skills}</span>
            {content.skills.map((skill) => <b key={skill}>{skill}</b>)}
          </div>
        ) : null}
      </section>

      <AtlasTransition
        reduceMotion={reduceMotion}
        reverse={isAr}
        from={isAr ? "من التشغيل" : "from operating"}
        to={isAr ? "إلى طريقة العمل" : "to the working method"}
        accent="blue"
      />

      <section className={styles.approach} aria-labelledby="atlas-approach-title">
        <div className={styles.sectionHead}>
          <p>{text.approach}</p>
          <h2 id="atlas-approach-title">{pick(content.labels.approach, locale)}</h2>
        </div>
        <div className={styles.routeSteps}>
          {content.approach.map((step, index) => (
            <motion.article
              key={step.id}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.42, delay: Math.min(index * 0.06, 0.24) }}
            >
              <span>{n(index)}</span>
              <h3>{pick(step.title, locale)}</h3>
              <p>{pick(step.description, locale)}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <AtlasTransition
        reduceMotion={reduceMotion}
        reverse={isAr}
        from={isAr ? "من الطريقة" : "from method"}
        to={isAr ? "إلى الإثبات" : "to proof"}
      />

      <section className={styles.proof} id="proof">
        <div className={styles.sectionHead}>
          <p>{text.proof}</p>
          <h2>{pick(content.reviews.heading, locale)}</h2>
          <span>{pick(content.reviews.intro, locale)}</span>
        </div>
        <div className={styles.reviewTrack}>
          {visibleReviews.length ? (
            visibleReviews.slice(0, 6).map((review, index) => (
              <motion.article
                key={review.id}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <QuoteMark />
                <p>{pick(review.quote, locale)}</p>
                <b>{pick(review.author, locale)}</b>
                <small>{pick(review.role, locale)}{review.company ? ` · ${review.company}` : ""}</small>
              </motion.article>
            ))
          ) : (
            <article className={styles.reviewEmpty}>
              <QuoteMark />
              <p>{text.proofEmpty}</p>
            </article>
          )}
        </div>
        {visibleCompanies.length ? (
          <div className={styles.companyBand}>
            <span>{text.companies}</span>
            {visibleCompanies.slice(0, 8).map((company) => (
              <a key={company.id} href={company.website || undefined} target={company.website ? "_blank" : undefined} rel={company.website ? "noreferrer" : undefined}>
                {company.logoUrl ? <Image src={company.logoUrl} alt={pick(company.alt, locale)} width={90} height={42} unoptimized /> : null}
                {company.showName ? <b>{pick(company.name, locale) || company.website || company.id}</b> : null}
              </a>
            ))}
          </div>
        ) : null}
      </section>

      <AtlasTransition
        reduceMotion={reduceMotion}
        reverse={isAr}
        from={isAr ? "من الإثبات" : "from proof"}
        to={isAr ? "إلى الخبرات" : "to experience"}
        accent="signal"
      />

      <section className={styles.experience} aria-labelledby="atlas-experience-title">
        <div className={styles.sectionHead}>
          <p>{text.experience}</p>
          <h2 id="atlas-experience-title">{pick(content.labels.experience, locale)}</h2>
        </div>
        <div className={styles.experiencePath}>
          {content.experiences.map((item, index) => (
            <motion.article
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, x: isAr ? 28 : -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.28) }}
            >
              <span>{item.period || n(index)}</span>
              <div>
                <h3>{pick(item.role, locale)}</h3>
                <b>{item.company}</b>
              </div>
              <p>{pick(item.summary, locale)}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <AtlasTransition
        reduceMotion={reduceMotion}
        reverse={isAr}
        from={isAr ? "من الخبرات" : "from experience"}
        to={isAr ? "إلى التواصل" : "to contact"}
      />

      <section className={styles.contact} id="contact">
        <Map size={34} aria-hidden />
        <h2>{text.contact}</h2>
        <p>{pick(content.labels.contactCopy, locale)}</p>
        <small>{pick(content.profile.availability, locale)}</small>
        <div>
          <a href={`mailto:${content.profile.email}`}><Mail size={18} aria-hidden /> {text.email}<ArrowUpRight size={15} aria-hidden /></a>
          <a href={whatsappHref(content)} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden /> {text.whatsapp}<ArrowUpRight size={15} aria-hidden /></a>
        </div>
      </section>
    </main>
  );
}

function AtlasTransition({
  reduceMotion,
  reverse,
  from,
  to,
  accent = "lime",
}: {
  reduceMotion: boolean | null;
  reverse: boolean;
  from: string;
  to: string;
  accent?: "lime" | "signal" | "blue";
}) {
  const path = reverse
    ? "M742 96 C612 18 554 172 448 116 C337 58 294 202 158 96"
    : "M158 96 C288 18 346 172 452 116 C563 58 606 202 742 96";
  return (
    <motion.div
      className={`${styles.transitionGate} ${styles[`gate${accent[0].toUpperCase()}${accent.slice(1)}` as keyof typeof styles]}`}
      initial={reduceMotion ? false : { opacity: 0.35, y: 18 }}
      whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.45 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-hidden="true"
    >
      <span>{from}</span>
      <svg viewBox="0 0 900 190" preserveAspectRatio="none">
        <motion.path
          d={path}
          pathLength={1}
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
        />
        {[0, 1, 2, 3].map((index) => (
          <motion.circle
            key={index}
            cx={reverse ? 742 - index * 194 : 158 + index * 194}
            cy={index % 2 ? 118 : 96}
            r="9"
            initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.55 }}
            transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.11 }}
          />
        ))}
      </svg>
      <span>{to}</span>
    </motion.div>
  );
}

function QuoteMark() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <path fill="currentColor" d="M13 6v9.6c0 5.8-3.1 9.1-8.8 10.4l-.9-3.7c2.7-.8 4.2-2.3 4.5-4.6H3V6h10Zm16 0v9.6c0 5.8-3.1 9.1-8.8 10.4l-.9-3.7c2.7-.8 4.2-2.3 4.5-4.6H19V6h10Z" />
    </svg>
  );
}
