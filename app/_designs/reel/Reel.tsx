import Image from "next/image";
import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { ReviewProofWall } from "@/app/_components/ReviewProofWall";
import { DESIGN_NAMES, pick } from "@/lib/site-content";
import {
  languageHref,
  n,
  projectHref,
  projectImages,
  projectLinks,
  publishedProjects,
  whatsappHref,
  type DesignProps,
} from "../types";
import s from "./reel.module.css";
import { ProjectMetrics } from "../ProjectMetrics";

export default function Reel(props: DesignProps) {
  const { content, locale, design, preview } = props;
  const projects = publishedProjects(content);
  return (
    <main
      className={s.page}
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      id="top"
    >
      {preview && (
        <div className={s.preview}>
          <Link href="/designs">LAB</Link>
          <span>{DESIGN_NAMES[design]}</span>
        </div>
      )}
      <nav className={s.nav}>
        <a href="#top">KHALID®</a>
        <div>
          <a href="#work">{locale === "ar" ? "الأعمال" : "REEL"}</a>
          <Link href={languageHref(props)}>
            {locale === "en" ? "عربي" : "EN"}
          </Link>
        </div>
      </nav>
      <header className={`${s.frame} ${s.hero}`}>
        <div className={s.words} aria-hidden="true">
          <span>MARKETING</span>
          <span>CONTENT</span>
          <span>AUTOMATION</span>
        </div>
        <div className={s.heroPhoto}>
          <PortraitImage content={content} fill={false} sizes="(max-width: 760px) 100vw, 36vw" priority />
        </div>
        <div className={s.heroCopy}>
          <p>{pick(content.profile.role, locale)}</p>
          <h1>{pick(content.profile.headline, locale)}</h1>
          <a href="#work">
            {locale === "ar" ? "شاهد الأعمال" : "PLAY THE REEL"} ↓
          </a>
        </div>
        <span className={s.counter}>FRAME 01 / 04</span>
      </header>
      <section className={`${s.frame} ${s.services}`} id="services">
        <p>FRAME 02 / CAPABILITIES</p>
        <h2>{pick(content.labels.services, locale)}</h2>
        <div>
          {content.services.map((service, i) => (
            <article key={service.id}>
              <span>{n(i)}</span>
              <h3>{pick(service.title, locale)}</h3>
              <p>{pick(service.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={s.work} id="work">
        <header className={s.frame}>
          <span>FRAME 03 / SELECTED REEL</span>
          <h2>{pick(content.labels.work, locale)}</h2>
          <p>
            {locale === "ar"
              ? "اسحب أو مرّر لاستكشاف الأعمال"
              : "Scroll sideways through the work"}{" "}
            →
          </p>
        </header>
        <div className={s.reel}>
          {projects.map((project, i) => {
            const images = projectImages(project);
            const links = projectLinks(project);
            return (
              <article key={project.id}>
                <div className={s.poster}>
                  <b>{n(i)}</b>
                  <span>{project.tools.slice(0, 3).join(" · ")}</span>
                  {images[0] && (
                    <Image
                      src={images[0].url}
                      alt={pick(images[0].alt, locale)}
                      width={1200}
                      height={900}
                      unoptimized
                    />
                  )}
                </div>
                <div>
                  <p>{pick(project.eyebrow, locale)}</p>
                  <Link href={projectHref(project, props)}><h3>{pick(project.title, locale)}</h3></Link>
                  <p>{pick(project.summary, locale)}</p>
                  <ProjectMetrics project={project} locale={locale} />
                  {links.map((link) => (
                    <a
                      style={{
                        display: "inline-block",
                        margin: "16px 10px 0 0",
                        border: "2px solid",
                        padding: "9px 12px",
                        fontSize: 11,
                      }}
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {pick(link.label, locale)} ↗
                    </a>
                  ))}
                  <details>
                    <summary>{pick(content.labels.viewCase, locale)} +</summary>
                    <section>
                      <p>
                        <b>{pick(content.labels.challenge, locale)}</b>
                        {pick(project.challenge, locale)}
                      </p>
                      <p>
                        <b>{pick(content.labels.solution, locale)}</b>
                        {pick(project.solution, locale)}
                      </p>
                      <p>
                        <b>{pick(content.labels.outcome, locale)}</b>
                        {pick(project.outcome, locale)}
                      </p>
                    </section>
                  </details>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <ReviewProofWall content={content} locale={locale} design={design} variantPath={props.variantPath} />
      <section className={`${s.frame} ${s.process}`}>
        <p>BEHIND THE WORK</p>
        <h2>{pick(content.labels.approach, locale)}</h2>
        <div>
          {content.approach.map((item, i) => (
            <article key={item.id}>
              <span>{n(i)}</span>
              <h3>{pick(item.title, locale)}</h3>
              <p>{pick(item.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className={`${s.frame} ${s.footer}`} id="contact">
        <span>FINAL FRAME</span>
        <h2>{pick(content.labels.contact, locale)}</h2>
        <p>{pick(content.labels.contactCopy, locale)}</p>
        <div>
          <a href={`mailto:${content.profile.email}`}>EMAIL ↗</a>
          <a href={whatsappHref(content)} target="_blank" rel="noreferrer">
            WHATSAPP ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
