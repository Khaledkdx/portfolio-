"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { DESIGN_NAMES, DESIGN_SLUGS, pick, type DesignSlug, type Locale, type SiteContent } from "@/lib/site-content";
import { languageHref } from "@/app/_designs/types";

type Props = {
  content: SiteContent;
  locale: Locale;
  design: DesignSlug;
  preview?: boolean;
  variantPath?: string;
};

export function PortfolioIdentity({ content, locale, design, preview, variantPath }: Props) {
  const reduced = useReducedMotion();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const switchUrl = languageHref({ content, locale, design, preview, variantPath });

  return (
    <motion.header
      className="portfolio-identity"
      dir={dir}
      initial={reduced ? false : { opacity: 0, y: -14 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      aria-label={locale === "ar" ? "هوية الموقع" : "Site identity"}
    >
      <Link href={variantPath ?? `/${locale}`} className="portfolio-identity__name">
        <span>{content.profile.name}</span>
        <small>{pick(content.profile.role, locale)}</small>
      </Link>
      <div className="portfolio-identity__meta">
        <span>{String(DESIGN_SLUGS.indexOf(design) + 1).padStart(2, "0")} / 12</span>
        <b>{DESIGN_NAMES[design]}</b>
      </div>
      <nav className="portfolio-identity__links" aria-label={locale === "ar" ? "روابط سريعة" : "Quick links"}>
        <a href={`mailto:${content.profile.email}`}>{locale === "ar" ? "البريد" : "Email"}</a>
        <Link href={switchUrl}>{locale === "ar" ? "EN" : "AR"}</Link>
      </nav>
    </motion.header>
  );
}
