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
import s from "./casebook.module.css";
import { ProjectMetrics } from "../ProjectMetrics";

export default function Casebook(props: DesignProps) {
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
      <div className={s.progress} aria-hidden="true" />
      <header className={s.masthead}>
        <div>
          <span>THE GROWTH CASEBOOK</span>
          <Link href={languageHref(props)}>
            {locale === "en" ? "النسخة العربية" : "English edition"}
          </Link>
        </div>
        <h1>KHALID</h1>
        <nav>
          <span>ISSUE 05</span>
          <a href="#work">CASE STUDIES</a>
          <a href="#services">CAPABILITIES</a>
          <span>DUBAI / 2026</span>
        </nav>
      </header>
      <section className={s.cover}>
        <div className={s.lead}>
          <p>{pick(content.profile.role, locale)}</p>
          <h2>{pick(content.profile.headline, locale)}</h2>
          <p>{pick(content.profile.intro, locale)}</p>
        </div>
        <figure>
          <PortraitImage content={content} fill={false} sizes="(max-width: 760px) 100vw, 38vw" priority />
          <figcaption>
            Portrait of an operator working across growth, marketing and
            systems.
          </figcaption>
        </figure>
        <aside>
          <b>INSIDE</b>
          {projects.slice(0, 3).map((project, i) => (
            <a key={project.id} href={`#case-${i}`}>
              <span>{n(i)}</span>
              {pick(project.title, locale)}
            </a>
          ))}
        </aside>
      </section>
      <section className={s.services} id="services">
        <header>
          <span>THE PRACTICE</span>
          <h2>{pick(content.labels.services, locale)}</h2>
        </header>
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
          <p>FIELD NOTES / SELECTED WORK</p>
          <h2>{pick(content.labels.work, locale)}</h2>
        </header>
        {projects.map((project, i) => {
          const images = projectImages(project);
          const links = projectLinks(project);
          return (
            <article
              id={`case-${i}`}
              key={project.id}
              className={i % 2 ? s.reverse : ""}
            >
              <div className={s.caseHead}>
                <span>CASE {n(i)}</span>
                <p>{pick(project.eyebrow, locale)}</p>
                <Link href={projectHref(project, props)}><h3>{pick(project.title, locale)}</h3></Link>
                <blockquote>“{pick(project.summary, locale)}”</blockquote>
                <ProjectMetrics project={project} locale={locale} />
                {links.length > 0 && (
                  <div className={s.sources}>
                    <b>{locale === "ar" ? "مصادر العدد" : "ISSUE SOURCES"}</b>
                    {links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pick(link.label, locale)} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <div className={s.spread}>
                  {images.length > 0 ? (
                    <>
                      <Image
                        className={s.leadImage}
                        src={images[0].url}
                        alt={pick(images[0].alt, locale)}
                        width={1200}
                        height={800}
                        unoptimized
                      />
                      {images.slice(1).map((image) => (
                        <Image
                          key={image.id}
                          src={image.url}
                          alt={pick(image.alt, locale)}
                          width={500}
                          height={360}
                          unoptimized
                        />
                      ))}
                    </>
                  ) : (
                    <div className={s.placeholder}>CASE / {n(i)}</div>
                  )}
                </div>
                <div className={s.articleBody}>
                  <p className={s.dropcap}>{pick(project.challenge, locale)}</p>
                  <p>
                    <b>{pick(content.labels.solution, locale)}</b>
                    {pick(project.solution, locale)}
                  </p>
                  <p>
                    <b>{pick(content.labels.outcome, locale)}</b>
                    {pick(project.outcome, locale)}
                  </p>
                  <aside>
                    {project.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </aside>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <ReviewProofWall content={content} locale={locale} design={design} variantPath={props.variantPath} />
      <section className={s.method}>
        <header>
          <span>WORKING METHOD</span>
          <h2>{pick(content.labels.approach, locale)}</h2>
        </header>
        {content.approach.map((item, i) => (
          <article key={item.id}>
            <span>{n(i)}</span>
            <h3>{pick(item.title, locale)}</h3>
            <p>{pick(item.description, locale)}</p>
          </article>
        ))}
      </section>
      <footer className={s.footer} id="contact">
        <p>EDITOR’S NOTE</p>
        <h2>{pick(content.labels.contact, locale)}</h2>
        <p>{pick(content.labels.contactCopy, locale)}</p>
        <div>
          <a href={`mailto:${content.profile.email}`}>
            {content.profile.email}
          </a>
          <a href={whatsappHref(content)} target="_blank" rel="noreferrer">
            WhatsApp ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
