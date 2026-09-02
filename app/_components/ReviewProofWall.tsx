"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  DESIGN_NAMES,
  pick,
  type DesignSlug,
  type Locale,
  type Review,
  type SiteContent,
} from "@/lib/site-content";
import { cn } from "@/lib/utils";

type Props = {
  content: SiteContent;
  locale: Locale;
  design: DesignSlug;
  variantPath?: string;
};

function reviewProjectHref(review: Review, locale: Locale, variantPath?: string) {
  if (!review.projectSlug) return "";
  if (variantPath) return `${variantPath}/projects/${encodeURIComponent(review.projectSlug)}?locale=${locale}`;
  return `/${locale}/projects/${encodeURIComponent(review.projectSlug)}`;
}

export function ReviewProofWall({ content, locale, design, variantPath }: Props) {
  const reviews = useMemo(
    () =>
      content.reviews.items
        .filter((review) => review.visible && pick(review.quote, locale).trim())
        .sort((a, b) => a.order - b.order),
    [content.reviews.items, locale],
  );
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const label = locale === "ar" ? "آراء موثقة" : "Verified reviews";
  const nextLabel = locale === "ar" ? "الرأي التالي" : "Next review";
  const previousLabel = locale === "ar" ? "الرأي السابق" : "Previous review";

  if (!reviews.length) return null;

  const move = (steps: number) => {
    setActive((current) => (current + steps + reviews.length) % reviews.length);
  };
  const group: Variants = reduced
    ? {}
    : { show: { transition: { staggerChildren: 0.085, delayChildren: 0.06 } } };
  const item: Variants = reduced
    ? {}
    : {
        hidden: { opacity: 0, y: 22, rotate: dir === "rtl" ? -1.2 : 1.2 },
        show: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section
      className={cn("review-proof-wall", `review-proof-wall--${design}`)}
      dir={dir}
      aria-labelledby="review-proof-heading"
      data-design={design}
    >
      <div className="review-proof-shell">
        <header className="review-proof-copy">
          <span>{label} / {DESIGN_NAMES[design]}</span>
          <h2 id="review-proof-heading">{pick(content.reviews.heading, locale)}</h2>
          <p>{pick(content.reviews.intro, locale)}</p>
        </header>

        <motion.div
          className="review-proof-stack"
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, amount: 0.25 }}
          variants={group}
        >
          {reviews.map((review, index) => {
            const offset = index - active;
            const wrapped = offset > reviews.length / 2 ? offset - reviews.length : offset < -reviews.length / 2 ? offset + reviews.length : offset;
            const centered = wrapped === 0;
            const href = reviewProjectHref(review, locale, variantPath);
            const cardPosition = {
              x: `calc(${wrapped} * var(--review-card-step))`,
              y: centered ? -26 : Math.abs(wrapped) * 12,
              rotate: reduced || centered ? 0 : wrapped > 0 ? 3 : -3,
              scale: centered ? 1 : 0.9,
              opacity: Math.abs(wrapped) > 2 ? 0 : centered ? 1 : 0.55,
              zIndex: 20 - Math.abs(wrapped),
            };
            return (
              <motion.article
                key={review.id}
                className={cn("review-proof-card", centered && "is-center")}
                variants={item}
                animate={cardPosition}
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 150, damping: 20 }}
                onClick={() => setActive(index)}
                tabIndex={0}
                role="button"
                aria-label={`${pick(review.author, locale)}: ${pick(review.quote, locale)}`}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActive(index);
                  }
                }}
              >
                <div className="review-proof-avatar">
                  {review.avatarUrl ? (
                    <Image src={review.avatarUrl} alt={pick(review.avatarAlt, locale)} width={72} height={72} unoptimized />
                  ) : (
                    <span aria-hidden="true">{pick(review.author, locale).slice(0, 1).toUpperCase()}</span>
                  )}
                </div>
                <blockquote>{pick(review.quote, locale)}</blockquote>
                <footer>
                  <b>{pick(review.author, locale)}</b>
                  <span>{pick(review.role, locale)}{review.company ? ` · ${review.company}` : ""}</span>
                </footer>
                {href && centered ? <Link href={href}>{locale === "ar" ? "فتح المشروع" : "Open project"} ↗</Link> : null}
              </motion.article>
            );
          })}
        </motion.div>

        <div className="review-proof-controls" aria-label={locale === "ar" ? "التحكم في الآراء" : "Review controls"}>
          <button type="button" onClick={() => move(dir === "rtl" ? 1 : -1)} aria-label={previousLabel}>
            <ChevronLeftIcon aria-hidden="true" />
          </button>
          <span>{String(active + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => move(dir === "rtl" ? -1 : 1)} aria-label={nextLabel}>
            <ChevronRightIcon aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
