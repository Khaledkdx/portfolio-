"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { ProjectMetrics } from "../ProjectMetrics";
import { pick } from "@/lib/site-content";
import { projectDetailData, type ProjectDetailProps } from "../types";
import s from "./project.module.css";

export default function StaggerProofProject(props: ProjectDetailProps) {
  const { content, locale, project } = props;
  const d = projectDetailData(props);
  const reduced = useReducedMotion();
  const cards = [
    { tag: "01", title: content.labels.challenge, text: project.challenge },
    { tag: "02", title: content.labels.solution, text: project.solution },
    { tag: "03", title: content.labels.outcome, text: project.outcome },
  ];
  const group: Variants = reduced
    ? {}
    : { show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } } };
  const item: Variants = reduced
    ? {}
    : {
        hidden: { opacity: 0, y: 24, rotate: d.dir === "rtl" ? -1.2 : 1.2 },
        show: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <main className={s.page} dir={d.dir}>
      <nav className={s.nav}>
        <Link href={`${d.base}${d.query}`}>← Stagger Proof</Link>
        <span>{String(d.index + 1).padStart(2, "0")} / {pick(project.eyebrow, locale)}</span>
      </nav>

      <header className={s.hero}>
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.46 }}>
          <p>{locale === "ar" ? "ملف إثبات العمل" : "Proof file"}</p>
          <h1>{pick(project.title, locale)}</h1>
          <div>{pick(project.description, locale)}</div>
        </motion.div>
        <motion.aside initial={reduced ? false : "hidden"} animate="show" variants={group}>
          {d.images[0] ? (
            <motion.div variants={item}>
              <ProjectPicture image={d.images[0]} locale={locale} priority className={s.cover} sizes="(max-width: 760px) 90vw, 42vw" />
            </motion.div>
          ) : (
            <motion.div className={s.placeholder} variants={item}>K/{String(d.index + 1).padStart(2, "0")}</motion.div>
          )}
          <motion.div className={s.brief} variants={item}>
            <b>{locale === "ar" ? "الفكرة" : "The point"}</b>
            <p>{pick(project.summary, locale)}</p>
          </motion.div>
        </motion.aside>
      </header>

      {project.metrics.length ? (
        <section className={s.metrics}>
          <ProjectMetrics project={project} locale={locale} />
        </section>
      ) : null}

      <motion.section className={s.proof} initial={reduced ? false : "hidden"} whileInView={reduced ? undefined : "show"} viewport={{ once: true, amount: 0.25 }} variants={group}>
        {cards.map((card) => (
          <motion.article key={card.tag} variants={item}>
            <span>{card.tag}</span>
            <h2>{pick(card.title, locale)}</h2>
            <p>{pick(card.text, locale)}</p>
          </motion.article>
        ))}
        {pick(project.implementation, locale).trim() ? (
          <motion.article className={s.wide} variants={item}>
            <span>04</span>
            <h2>{locale === "ar" ? "التنفيذ" : "Implementation"}</h2>
            <p>{pick(project.implementation, locale)}</p>
          </motion.article>
        ) : null}
      </motion.section>

      {d.images.length > 1 ? (
        <section className={s.gallery}>
          <header>
            <span>{locale === "ar" ? "الصور والشرح" : "Image notes"}</span>
            <h2>{locale === "ar" ? "كل صورة لها سياقها." : "Every image keeps its context."}</h2>
          </header>
          <div>
            {d.images.slice(1).map((image, index) => (
              <article key={image.id}>
                <b>{String(index + 2).padStart(2, "0")}</b>
                <ProjectPicture image={image} locale={locale} sizes="(max-width: 760px) 92vw, 48vw" />
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className={s.delivery}>
        <div>
          <span>{locale === "ar" ? "الأدوات" : "Tools"}</span>
          <ul>{project.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </div>
        {d.links.length ? (
          <aside>
            {d.links.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noreferrer">
                {pick(link.label, locale)} ↗
              </a>
            ))}
          </aside>
        ) : null}
      </section>

      <footer className={s.footer}>
        {d.previous ? <Link href={d.projectUrl(d.previous.slug)}>← {pick(d.previous.title, locale)}</Link> : <span />}
        {d.next ? <Link href={d.projectUrl(d.next.slug)}>{pick(d.next.title, locale)} →</Link> : <Link href={`${d.base}${d.query}`}>{locale === "ar" ? "العودة للأعمال" : "Back to work"} →</Link>}
      </footer>
    </main>
  );
}
