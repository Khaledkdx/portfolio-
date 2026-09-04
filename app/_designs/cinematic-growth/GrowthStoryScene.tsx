"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pick, type Locale, type SiteContent } from "@/lib/site-content";
import { ScrollScrubCanvas } from "../scroll-world-atlas/ScrollScrubCanvas";
import styles from "./cinematic-growth.module.css";

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

export function GrowthStoryScene({ content, locale }: { content: SiteContent; locale: Locale }) {
  const reduced = useReducedMotion();

  return (
    <section className={styles.story} id="story" aria-labelledby="growth-story-title">
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
      <ScrollScrubCanvas
        desktop={companyCollapseFrames.desktop}
        mobile={companyCollapseFrames.mobile}
        className={styles.storyStage}
        stageClassName={styles.cinematicScrubFrame}
        canvasClassName={styles.cinematicScrubCanvas}
        posterClassName={styles.cinematicScrubPoster}
      >
        <motion.div
          className={styles.storyOutcomeCard}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <span>{pick(content.growthStory.intervention, locale)}</span>
          <strong>{pick(content.growthStory.result, locale)}</strong>
        </motion.div>
      </ScrollScrubCanvas>
    </section>
  );
}
