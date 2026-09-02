import Link from "next/link";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { ProjectMetrics } from "../ProjectMetrics";
import { pick } from "@/lib/site-content";
import { projectDetailData, type ProjectDetailProps } from "../types";
import s from "./project.module.css";

export default function BoardroomProject(props: ProjectDetailProps) {
  const { content, locale, project } = props; const d = projectDetailData(props);
  const implementation = { en: "Implementation", ar: "التنفيذ" };
  const chapters = [[content.labels.challenge, project.challenge], [content.labels.solution, project.solution], [implementation, project.implementation], [content.labels.outcome, project.outcome]];
  return <main className={s.report} dir={d.dir}>
    <nav><Link href={`${d.base}${d.query}`}>KHALID / PORTFOLIO</Link><span>GROWTH BRIEF · {String(d.index + 1).padStart(2,"0")}</span></nav>
    <header><div><small>{pick(project.eyebrow, locale)}</small><h1>{pick(project.title, locale)}</h1><p>{pick(project.description, locale)}</p></div>{d.images[0] ? <ProjectPicture image={d.images[0]} locale={locale} priority className={s.cover}/> : null}</header>
    <section className={s.dashboard}><div><b>{locale === "ar" ? "ملخص تنفيذي" : "Executive summary"}</b><p>{pick(project.summary, locale)}</p></div><ProjectMetrics project={project} locale={locale}/></section>
    <section className={s.chapters}>{chapters.filter(([,text])=>pick(text,locale).trim()).map(([label,text],i)=><article key={i}><span>0{i+1}</span><h2>{pick(label,locale)}</h2><p>{pick(text,locale)}</p></article>)}</section>
    {d.images.length > 1 ? <section className={s.appendix}>{d.images.slice(1).map((image,i)=><div key={image.id}><i>EXHIBIT {String.fromCharCode(65+i)}</i><ProjectPicture image={image} locale={locale}/></div>)}</section>:null}
    <section className={s.tools}><b>{locale === "ar" ? "القدرات المستخدمة" : "Capabilities deployed"}</b>{project.tools.map(tool=><span key={tool}>{tool}</span>)}{d.links.map(link=><a key={link.id} href={link.url} target="_blank" rel="noreferrer">{pick(link.label,locale)} ↗</a>)}</section>
    <footer>{d.previous?<Link href={d.projectUrl(d.previous.slug)}>← {pick(d.previous.title,locale)}</Link>:<span/>}{d.next?<Link href={d.projectUrl(d.next.slug)}>{pick(d.next.title,locale)} →</Link>:<Link href={`${d.base}${d.query}`}>INDEX →</Link>}</footer>
  </main>;
}
