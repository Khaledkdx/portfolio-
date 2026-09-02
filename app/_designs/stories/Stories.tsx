import Image from "next/image";
import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
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
import s from "./stories.module.css";
import { ProjectMetrics } from "../ProjectMetrics";

export default function Stories(props: DesignProps) {
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
        <a href="#top">
          <i /> Khalid Mohamad
        </a>
        <div>
          <a href="#stories">{pick(content.labels.work, locale)}</a>
          <a href="#contact">{pick(content.labels.contact, locale)}</a>
          <Link href={languageHref(props)}>
            {locale === "en" ? "عربي" : "EN"}
          </Link>
        </div>
      </nav>
      <header className={s.hero}>
        <div className={s.note}>
          <span>
            {locale === "ar" ? "مرحبًا، أنا خالد" : "Hello, I’m Khalid"}
          </span>
          <h1>{pick(content.profile.headline, locale)}</h1>
          <p>{pick(content.profile.intro, locale)}</p>
          <a href="#stories">
            {locale === "ar" ? "اقرأ قصص العمل" : "Read the work stories"} ↓
          </a>
        </div>
        <figure>
          <div>
            <PortraitImage content={content} fill={false} sizes="(max-width: 760px) 100vw, 34vw" priority />
          </div>
          <figcaption>{pick(content.profile.role, locale)}</figcaption>
        </figure>
        <p className={s.scribble}>people → process → progress</p>
      </header>
      <section className={s.journey}>
        <header>
          <span>{locale === "ar" ? "طريقة التفكير" : "The way through"}</span>
          <h2>{pick(content.labels.approach, locale)}</h2>
        </header>
        <div className={s.path}>
          {content.approach.map((item, i) => (
            <article key={item.id}>
              <span>{n(i)}</span>
              <div>
                <h3>{pick(item.title, locale)}</h3>
                <p>{pick(item.description, locale)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className={s.stories} id="stories">
        <header>
          <span>{locale === "ar" ? "قصص مختارة" : "Selected stories"}</span>
          <h2>{pick(content.labels.work, locale)}</h2>
        </header>
        {projects.map((project, i) => {
          const images = projectImages(project);
          const links = projectLinks(project);
          return (
            <article key={project.id}>
              <div className={s.marker}>
                <span>{n(i)}</span>
                <i />
              </div>
              <div className={s.story}>
                {images[0] && (
                  <Image
                    style={{
                      width: "100%",
                      height: 360,
                      objectFit: "cover",
                      borderRadius: 32,
                      marginBottom: 28,
                    }}
                    src={images[0].url}
                    alt={pick(images[0].alt, locale)}
                    width={1000}
                    height={620}
                    unoptimized
                  />
                )}
                <p>{pick(project.eyebrow, locale)}</p>
                <Link href={projectHref(project, props)}><h3>{pick(project.title, locale)}</h3></Link>
                <blockquote>{pick(project.summary, locale)}</blockquote>
                <ProjectMetrics project={project} locale={locale} />
                <div className={s.chapters}>
                  <section>
                    <b>{locale === "ar" ? "قبل" : "Before"}</b>
                    <p>{pick(project.challenge, locale)}</p>
                  </section>
                  <section>
                    <b>{locale === "ar" ? "التغيير" : "The change"}</b>
                    <p>{pick(project.solution, locale)}</p>
                  </section>
                  <section>
                    <b>{locale === "ar" ? "بعد" : "What changed"}</b>
                    <p>{pick(project.outcome, locale)}</p>
                  </section>
                </div>
                <p className={s.tools}>
                  {project.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </p>
                {links.map((link) => (
                  <a
                    style={{
                      display: "inline-block",
                      margin: "16px 12px 0 0",
                      borderBottom: "2px solid",
                      paddingBottom: 4,
                      fontWeight: 700,
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
              </div>
            </article>
          );
        })}
      </section>
      <section className={s.services} id="services">
        <h2>{pick(content.labels.services, locale)}</h2>
        {content.services.map((service, i) => (
          <article key={service.id}>
            <span>{n(i)}</span>
            <div>
              <h3>{pick(service.title, locale)}</h3>
              <p>{pick(service.description, locale)}</p>
            </div>
          </article>
        ))}
      </section>
      <footer className={s.footer} id="contact">
        <span>{locale === "ar" ? "رسالة مفتوحة" : "An open note"}</span>
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
