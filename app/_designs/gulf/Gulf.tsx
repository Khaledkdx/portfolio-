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
import s from "./gulf.module.css";
import { ProjectMetrics } from "../ProjectMetrics";

export default function Gulf(props: DesignProps) {
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
        <a href="#top" className={s.brand}>
          <i />
          KM
        </a>
        <div>
          <a href="#work">{pick(content.labels.work, locale)}</a>
          <a href="#services">{pick(content.labels.services, locale)}</a>
          <Link href={languageHref(props)}>
            {locale === "en" ? "عربي" : "EN"}
          </Link>
        </div>
      </nav>
      <header className={s.hero}>
        <div className={s.arch}>
          <div>
            <Image
              src={content.profile.portrait}
              alt={content.profile.name}
              width={900}
              height={1200}
              priority
              unoptimized
            />
          </div>
          <span>UAE / KSA / REMOTE</span>
        </div>
        <div className={s.copy}>
          <p>{pick(content.profile.role, locale)}</p>
          <h1>{pick(content.profile.headline, locale)}</h1>
          <p>{pick(content.profile.intro, locale)}</p>
          <a href="#work">
            {pick(content.labels.work, locale)} <span>↙</span>
          </a>
        </div>
        <span className={s.vertical}>BUSINESS GROWTH — 2026</span>
      </header>
      <section className={s.method}>
        <header>
          <span>01</span>
          <h2>{pick(content.labels.approach, locale)}</h2>
        </header>
        <div>
          {content.approach.map((item, i) => (
            <article key={item.id}>
              <div className={s.door}>
                <span>{n(i)}</span>
              </div>
              <h3>{pick(item.title, locale)}</h3>
              <p>{pick(item.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={s.services} id="services">
        <header>
          <span>02</span>
          <h2>{pick(content.labels.services, locale)}</h2>
        </header>
        <div>
          {content.services.map((service) => (
            <article key={service.id}>
              <div className={s.gateway}>
                <span>{service.number}</span>
              </div>
              <h3>{pick(service.title, locale)}</h3>
              <p>{pick(service.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={s.work} id="work">
        <header>
          <span>03</span>
          <h2>{pick(content.labels.work, locale)}</h2>
        </header>
        <div className={s.courtyard}>
          {projects.map((project, i) => {
            const images = projectImages(project);
            const links = projectLinks(project);
            return (
              <article key={project.id}>
                {images[0] && (
                  <Image
                    style={{
                      width: "100%",
                      height: 270,
                      objectFit: "cover",
                      marginBottom: 22,
                      borderRadius: "110px 110px 0 0",
                    }}
                    src={images[0].url}
                    alt={pick(images[0].alt, locale)}
                    width={800}
                    height={500}
                    unoptimized
                  />
                )}
                <div className={s.caseTop}>
                  <span>{n(i)}</span>
                  <p>{pick(project.eyebrow, locale)}</p>
                </div>
                <h3>{pick(project.title, locale)}</h3>
                <p>{pick(project.summary, locale)}</p>
                <ProjectMetrics project={project} locale={locale} />
                {links.map((link) => (
                  <a
                    style={{
                      display: "inline-block",
                      margin: "14px 12px 0 0",
                      borderBottom: "1px solid",
                      paddingBottom: 4,
                      fontSize: 12,
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
                  <div>
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
                  </div>
                </details>
              </article>
            );
          })}
        </div>
      </section>
      <section className={s.experience}>
        <h2>{pick(content.labels.experience, locale)}</h2>
        {content.experiences.map((item) => (
          <article key={item.id}>
            <span>{item.period}</span>
            <div>
              <b>{item.company}</b>
              <h3>{pick(item.role, locale)}</h3>
            </div>
            <p>{pick(item.summary, locale)}</p>
          </article>
        ))}
      </section>
      <footer className={s.footer} id="contact">
        <div className={s.footerArch}>
          <i />
        </div>
        <div>
          <p>{pick(content.profile.availability, locale)}</p>
          <h2>{pick(content.labels.contact, locale)}</h2>
          <p>{pick(content.labels.contactCopy, locale)}</p>
          <span>
            <a href={`mailto:${content.profile.email}`}>
              {content.profile.email} ↗
            </a>
            <a href={whatsappHref(content)} target="_blank" rel="noreferrer">
              WhatsApp ↗
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
