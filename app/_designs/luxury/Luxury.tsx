import Image from "next/image";
import Link from "next/link";
import { DESIGN_NAMES, pick } from "@/lib/site-content";
import {
  languageHref,
  n,
  projectImages,
  projectLinks,
  publishedProjects,
  whatsappHref,
  type DesignProps,
} from "../types";
import s from "./luxury.module.css";

export default function Luxury(props: DesignProps) {
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
          <Link href="/designs">Design lab</Link>
          <span>{DESIGN_NAMES[design]}</span>
        </div>
      )}
      <nav className={s.nav}>
        <a href="#top">Khalid Mohamad</a>
        <div>
          <a href="#work">{pick(content.labels.work, locale)}</a>
          <Link href={languageHref(props)}>
            {locale === "en" ? "العربية" : "English"}
          </Link>
        </div>
      </nav>
      <header className={s.hero}>
        <div className={s.copy}>
          <p>{pick(content.profile.role, locale)}</p>
          <h1>{pick(content.profile.headline, locale)}</h1>
          <p className={s.intro}>{pick(content.profile.intro, locale)}</p>
          <a href="#contact">
            {locale === "ar" ? "لنبدأ حوارًا" : "Begin a conversation"}{" "}
            <span>↗</span>
          </a>
        </div>
        <figure>
          <Image
            src={content.profile.portrait}
            alt={content.profile.name}
            width={900}
            height={1200}
            priority
            unoptimized
          />
          <figcaption>Portrait / Dubai / 2026</figcaption>
        </figure>
      </header>
      <section className={s.philosophy} id="services">
        <p>{locale === "ar" ? "الممارسة" : "The practice"}</p>
        <h2>{pick(content.labels.services, locale)}</h2>
        <div>
          {content.services.map((service) => (
            <article key={service.id}>
              <span>{service.number}</span>
              <h3>{pick(service.title, locale)}</h3>
              <p>{pick(service.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={s.work} id="work">
        <header>
          <span>{locale === "ar" ? "مختارات" : "A considered selection"}</span>
          <h2>{pick(content.labels.work, locale)}</h2>
        </header>
        {projects.map((project, i) => {
          const images = projectImages(project);
          const links = projectLinks(project);
          return (
            <article key={project.id}>
              <div className={s.art}>
                <span>{n(i)}</span>
                {images[0] && (
                  <Image
                    src={images[0].url}
                    alt={pick(images[0].alt, locale)}
                    width={1400}
                    height={900}
                    unoptimized
                  />
                )}
              </div>
              <div className={s.caseCopy}>
                <p>{pick(project.eyebrow, locale)}</p>
                <h3>{pick(project.title, locale)}</h3>
                <p>{pick(project.summary, locale)}</p>
                {links.map((link) => (
                  <a
                    style={{
                      display: "inline-block",
                      margin: "18px 18px 0 0",
                      borderBottom: "1px solid",
                      paddingBottom: 5,
                      fontSize: 13,
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
                  <summary>{pick(content.labels.viewCase, locale)}</summary>
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
      </section>
      <section className={s.method}>
        <h2>{pick(content.labels.approach, locale)}</h2>
        <div>
          {content.approach.map((item) => (
            <article key={item.id}>
              <h3>{pick(item.title, locale)}</h3>
              <p>{pick(item.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className={s.footer} id="contact">
        <p>{pick(content.profile.availability, locale)}</p>
        <h2>{pick(content.labels.contact, locale)}</h2>
        <a href={`mailto:${content.profile.email}`}>{content.profile.email}</a>
        <a href={whatsappHref(content)} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <small>Business growth, with intention.</small>
      </footer>
    </main>
  );
}
