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
import s from "./pitch.module.css";
import { ProjectMetrics } from "../ProjectMetrics";

export default function Pitch(props: DesignProps) {
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
          <Link href="/designs">← LAB</Link>
          <span>{DESIGN_NAMES[design]}</span>
        </div>
      )}
      <nav className={s.nav}>
        <a href="#top">KM™</a>
        <div>
          <span>{String(6 + projects.length).padStart(2, "0")} SLIDES</span>
          <a href="#work">{locale === "ar" ? "الأعمال" : "WORK"}</a>
          <Link href={languageHref(props)}>
            {locale === "en" ? "AR" : "EN"}
          </Link>
        </div>
      </nav>
      <div
        className={s.slideRail}
        aria-label={locale === "ar" ? "مؤشر الشرائح" : "Slide index"}
      >
        <a href="#top">01</a>
        <a href="#services">02</a>
        <a href="#work">04—{String(3 + projects.length).padStart(2, "0")}</a>
        <a href="#contact">END</a>
      </div>
      <header className={`${s.slide} ${s.hero}`}>
        <div className={s.slideNo}>SLIDE 01</div>
        <div className={s.heroCopy}>
          <p>{pick(content.profile.role, locale)}</p>
          <h1>{pick(content.profile.headline, locale)}</h1>
          <a href="#work">
            {locale === "ar" ? "شاهد الأعمال" : "SHOW ME THE WORK"} ↓
          </a>
        </div>
        <div className={s.cutout}>
          <Image
            src={content.profile.portrait}
            alt={content.profile.name}
            width={900}
            height={1200}
            priority
            unoptimized
          />
          <b>
            GROW
            <br />
            BUILD
            <br />
            FIX
          </b>
        </div>
      </header>
      <section className={`${s.slide} ${s.services}`} id="services">
        <span className={s.slideNo}>SLIDE 02</span>
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
      <section className={`${s.slide} ${s.method}`}>
        <span className={s.slideNo}>SLIDE 03</span>
        <h2>{pick(content.labels.approach, locale)}</h2>
        <div>
          {content.approach.map((item, i) => (
            <article key={item.id}>
              <b>{n(i)}</b>
              <h3>{pick(item.title, locale)}</h3>
              <p>{pick(item.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={s.work} id="work">
        <header className={s.slide}>
          <span className={s.slideNo}>
            SLIDES 04—{String(3 + projects.length).padStart(2, "0")}
          </span>
          <h2>{pick(content.labels.work, locale)}</h2>
          <p>SWIPE / SCROLL →</p>
        </header>
        <div className={s.deck}>
          {projects.map((project, i) => {
            const images = projectImages(project);
            const links = projectLinks(project);
            return (
              <article key={project.id}>
                <span className={s.slideNo}>
                  CASE {n(i)} / {String(i + 4).padStart(2, "0")}
                </span>
                <div className={s.visuals}>
                  <div className={s.caseArt}>
                    <b>{n(i)}</b>
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
                  {images.length > 1 && (
                    <div className={s.filmstrip}>
                      {images.map((image, index) => (
                        <figure key={image.id}>
                          <Image
                            src={image.url}
                            alt={pick(image.alt, locale)}
                            width={260}
                            height={180}
                            unoptimized
                          />
                          <figcaption>
                            {String(index + 1).padStart(2, "0")}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
                <div className={s.caseCopy}>
                  <p>{pick(project.eyebrow, locale)}</p>
                  <h3>{pick(project.title, locale)}</h3>
                  <p>{pick(project.summary, locale)}</p>
                  <ProjectMetrics project={project} locale={locale} />
                  {links.length > 0 && (
                    <div className={s.pitchLinks}>
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
                  <details>
                    <summary>OPEN CASE +</summary>
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
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className={`${s.slide} ${s.skills}`}>
        <span className={s.slideNo}>SLIDE 08</span>
        <h2>
          {locale === "ar"
            ? "الأدوات التي تحرّك العمل"
            : "Tools that move the work"}
        </h2>
        <div>
          {content.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>
      <footer className={`${s.slide} ${s.footer}`} id="contact">
        <span className={s.slideNo}>FINAL SLIDE</span>
        <h2>{pick(content.labels.contact, locale)}</h2>
        <p>{pick(content.labels.contactCopy, locale)}</p>
        <div>
          <a href={`mailto:${content.profile.email}`}>EMAIL ME ↗</a>
          <a href={whatsappHref(content)} target="_blank" rel="noreferrer">
            WHATSAPP ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
