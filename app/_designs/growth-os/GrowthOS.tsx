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
import s from "./growth-os.module.css";
import { ProjectMetrics } from "../ProjectMetrics";

export default function GrowthOS(props: DesignProps) {
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
          <Link href="/designs">← Lab</Link>
          <span>{DESIGN_NAMES[design]}</span>
        </div>
      )}
      <nav className={s.nav}>
        <a href="#top" className={s.logo}>
          <i />
          Khalid_OS
        </a>
        <div>
          <a href="#system">{locale === "ar" ? "النظام" : "SYSTEM"}</a>
          <a href="#work">{locale === "ar" ? "الأعمال" : "CASES"}</a>
          <Link href={languageHref(props)}>
            {locale === "en" ? "AR" : "EN"}
          </Link>
        </div>
      </nav>
      <header className={s.hero}>
        <div className={s.heroCopy}>
          <span className={s.badge}>● AVAILABLE / GROWTH SYSTEMS</span>
          <h1>{pick(content.profile.headline, locale)}</h1>
          <p>{pick(content.profile.intro, locale)}</p>
          <div>
            <a href="#work">{pick(content.labels.work, locale)}</a>
            <a href={`mailto:${content.profile.email}`}>
              {locale === "ar" ? "ابدأ مشروعًا" : "START A BUILD"} ↗
            </a>
          </div>
        </div>
        <div className={s.console}>
          <div className={s.consoleTop}>
            <span>growth-flow.app</span>
            <i />
            <i />
            <i />
          </div>
          <div className={s.workflow}>
            <span>
              01
              <br />
              <b>FRICTION</b>
            </span>
            <i>→</i>
            <span>
              02
              <br />
              <b>SIGNAL</b>
            </span>
            <i>→</i>
            <span>
              03
              <br />
              <b>SYSTEM</b>
            </span>
            <i>→</i>
            <span>
              04
              <br />
              <b>GROWTH</b>
            </span>
          </div>
          <div className={s.profile}>
            <Image
              src={content.profile.portrait}
              alt={content.profile.name}
              width={900}
              height={1200}
              priority
              unoptimized
            />
            <div>
              <small>OPERATOR PROFILE</small>
              <b>{content.profile.name}</b>
              <span>{pick(content.profile.role, locale)}</span>
            </div>
          </div>
        </div>
      </header>
      <section className={s.system} id="system">
        <header>
          <span>CORE MODULES</span>
          <h2>{pick(content.labels.services, locale)}</h2>
        </header>
        <div className={s.bento}>
          {content.services.map((service, i) => (
            <details
              key={service.id}
              className={i === 0 ? s.wide : ""}
              open={i === 0}
            >
              <summary>
                <span>MOD_{service.number}</span>
                <b>{pick(service.title, locale)}</b>
                <i>↗</i>
              </summary>
              <p>{pick(service.description, locale)}</p>
            </details>
          ))}
        </div>
        <div className={s.stack}>
          {content.skills.map((skill) => (
            <span key={skill}>✓ {skill}</span>
          ))}
        </div>
      </section>
      <section className={s.pipeline}>
        <h2>{pick(content.labels.approach, locale)}</h2>
        {content.approach.map((item, i) => (
          <article key={item.id}>
            <span>{n(i)}</span>
            <div>
              <h3>{pick(item.title, locale)}</h3>
              <p>{pick(item.description, locale)}</p>
            </div>
            <i />
          </article>
        ))}
      </section>
      <section className={s.work} id="work">
        <header>
          <span>DEPLOYED SYSTEMS</span>
          <h2>{pick(content.labels.work, locale)}</h2>
        </header>
        <div className={s.tabs}>
          {projects.map((project, i) => {
            const images = projectImages(project);
            const links = projectLinks(project);
            return (
              <details key={project.id} open={i === 0}>
                <summary>
                  <span>
                    {n(i)} / {pick(project.eyebrow, locale)}
                  </span>
                  <b>{pick(project.title, locale)}</b>
                  <i>+</i>
                </summary>
                <div className={s.case}>
                  {images[0] && (
                    <Image
                      style={{
                        width: "100%",
                        height: 360,
                        objectFit: "cover",
                        marginBottom: 24,
                      }}
                      src={images[0].url}
                      alt={pick(images[0].alt, locale)}
                      width={1100}
                      height={620}
                      unoptimized
                    />
                  )}
                  <p>{pick(project.summary, locale)}</p>
                  <ProjectMetrics project={project} locale={locale} />
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
                  <div>
                    {project.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                  {links.map((link) => (
                    <a
                      style={{
                        display: "inline-block",
                        margin: "18px 10px 0 0",
                        border: "1px solid",
                        padding: "10px 12px",
                        fontSize: 10,
                      }}
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {pick(link.label, locale)} ↗
                    </a>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </section>
      <footer className={s.footer} id="contact">
        <span>READY_FOR_INPUT</span>
        <h2>{pick(content.labels.contact, locale)}</h2>
        <p>{pick(content.labels.contactCopy, locale)}</p>
        <div className={s.command}>
          <span>&gt;</span>
          <a href={`mailto:${content.profile.email}`}>
            {content.profile.email}
          </a>
          <a href={whatsappHref(content)} target="_blank" rel="noreferrer">
            WHATSAPP ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
