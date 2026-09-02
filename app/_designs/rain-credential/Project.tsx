import Link from "next/link";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { ProjectMetrics } from "../ProjectMetrics";
import { pick } from "@/lib/site-content";
import { projectDetailData, type ProjectDetailProps } from "../types";
import s from "./project.module.css";

export default function RainCredentialProject(props: ProjectDetailProps) {
  const { content, locale, project } = props;
  const d = projectDetailData(props);
  const chapters = [
    { code: "FRICTION", label: content.labels.challenge, text: project.challenge },
    { code: "INTERVENTION", label: content.labels.solution, text: project.solution },
    { code: "VALUE", label: content.labels.outcome, text: project.outcome },
  ];

  return (
    <main className={s.page} dir={d.dir}>
      <nav>
        <Link href={`${d.base}${d.query}`}>← RAIN CREDENTIAL</Link>
        <span>FIELD RECORD / {String(d.index + 1).padStart(3, "0")}</span>
      </nav>

      <header className={s.hero}>
        <div className={s.copy}>
          <p><i /> VERIFIED CASE FILE</p>
          <small>{pick(project.eyebrow, locale)}</small>
          <h1>{pick(project.title, locale)}</h1>
          <div className={s.lead}>{pick(project.description, locale)}</div>
        </div>
        <div className={s.coverShell}>
          {d.images[0] ? (
            <ProjectPicture image={d.images[0]} locale={locale} priority className={s.cover} />
          ) : (
            <div className={s.placeholder}><span>K/</span><b>REC-{String(d.index + 1).padStart(3, "0")}</b></div>
          )}
          <span className={s.scanline} />
        </div>
      </header>

      {project.metrics.length ? <section className={s.metrics}><ProjectMetrics project={project} locale={locale} /></section> : null}

      <section className={s.trace}>
        <header><span>01 / DECISION TRACE</span><h2>{locale === "ar" ? "داخل القرار" : "Inside the decision"}</h2></header>
        <div>
          {chapters.map((chapter, index) => (
            <article key={chapter.code}>
              <span>0{index + 1} · {chapter.code}</span>
              <h3>{pick(chapter.label, locale)}</h3>
              <p>{pick(chapter.text, locale)}</p>
            </article>
          ))}
          {pick(project.implementation, locale).trim() ? (
            <article>
              <span>04 · BUILD LOG</span>
              <h3>{locale === "ar" ? "التنفيذ" : "Implementation"}</h3>
              <p>{pick(project.implementation, locale)}</p>
            </article>
          ) : null}
        </div>
      </section>

      {d.images.length > 1 ? (
        <section className={s.evidence}>
          <header><span>02 / VISUAL EVIDENCE</span><h2>{locale === "ar" ? "سجل التنفيذ" : "The execution record"}</h2></header>
          <div>
            {d.images.slice(1).map((image, index) => (
              <article key={image.id}>
                <span>CAPTURE_{String(index + 2).padStart(2, "0")}</span>
                <ProjectPicture image={image} locale={locale} />
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className={s.delivery}>
        <div><span>03 / SYSTEM ARRAY</span><h2>{locale === "ar" ? "الأدوات والتسليم" : "Tools & delivery"}</h2></div>
        <ul>{project.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        {d.links.length ? <aside>{d.links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{pick(link.label, locale)} ↗</a>)}</aside> : null}
      </section>

      <footer>
        {d.previous ? <Link href={d.projectUrl(d.previous.slug)}>← {pick(d.previous.title, locale)}</Link> : <span />}
        {d.next ? <Link href={d.projectUrl(d.next.slug)}>{pick(d.next.title, locale)} →</Link> : <Link href={`${d.base}${d.query}`}>CLOSE RECORD →</Link>}
      </footer>
    </main>
  );
}
