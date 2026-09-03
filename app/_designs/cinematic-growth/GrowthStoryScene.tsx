"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { pick, type Locale, type SiteContent } from "@/lib/site-content";
import styles from "./cinematic-growth.module.css";

export function GrowthStoryScene({ content, locale }: { content: SiteContent; locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0.08, 0.42, 0.82], [70, 34, -88]);
  const rawRotate = useTransform(scrollYProgress, [0.08, 0.42, 0.82], [-7, -4, 0]);
  const buildingY = useSpring(rawY, { stiffness: 95, damping: 24 });
  const buildingRotate = useSpring(rawRotate, { stiffness: 90, damping: 22 });
  const routeLength = useTransform(scrollYProgress, [0.32, 0.78], [0, 1]);
  const liftOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);

  return (
    <section ref={sectionRef} className={styles.story} id="story" aria-labelledby="growth-story-title">
      <div className={styles.storyCopy}>
        <span className={styles.eyebrow}>{pick(content.growthStory.eyebrow, locale)}</span>
        <h2 id="growth-story-title">{pick(content.growthStory.title, locale)}</h2>
        <p>{pick(content.growthStory.intro, locale)}</p>
        <ol className={styles.problemList}>
          {content.growthStory.problems.map((problem, index) => (
            <motion.li key={problem.id} initial={reduced ? false : { opacity: 0, x: locale === "ar" ? 22 : -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ delay: index * 0.08 }}>
              <b>{String(index + 1).padStart(2, "0")}</b><div><h3>{pick(problem.title, locale)}</h3><p>{pick(problem.description, locale)}</p></div>
            </motion.li>
          ))}
        </ol>
      </div>
      <div className={styles.storyStage} aria-hidden="true">
        <div className={styles.stageGrid} />
        <div className={styles.fallLabels}><span>LEADS ↓</span><span>TIME ↓</span><span>CLARITY ↓</span></div>
        <svg className={styles.growthRoute} viewBox="0 0 520 760" fill="none">
          <motion.path d="M80 650 C180 610 120 505 248 468 C370 432 310 320 430 252 C478 224 460 126 490 72" pathLength="1" style={{ pathLength: reduced ? 1 : routeLength }} />
        </svg>
        <motion.div className={styles.building} style={reduced ? undefined : { y: buildingY, rotate: buildingRotate }}>
          <div className={styles.buildingTop}>K/</div>
          {Array.from({ length: 15 }, (_, index) => <i key={index} />)}
        </motion.div>
        <motion.div className={styles.liftSignal} style={reduced ? undefined : { opacity: liftOpacity }}>
          <span>{pick(content.growthStory.intervention, locale)}</span>
          <strong>{pick(content.growthStory.result, locale)}</strong>
        </motion.div>
      </div>
    </section>
  );
}
