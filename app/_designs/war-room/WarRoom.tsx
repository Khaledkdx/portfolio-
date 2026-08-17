import Image from "next/image";
import Link from "next/link";
import { DESIGN_NAMES, pick } from "@/lib/site-content";
import { languageHref, n, publishedProjects, whatsappHref, type DesignProps } from "../types";
import s from "./war-room.module.css";

export default function WarRoom(props: DesignProps) {
  const { content, locale, design, preview } = props;
  const projects = publishedProjects(content);
  return <main className={s.page} dir={locale === "ar" ? "rtl" : "ltr"} lang={locale} id="top">
    {preview && <div className={s.preview}><Link href="/designs">← LAB</Link><span>{DESIGN_NAMES[design]}</span></div>}
    <nav className={s.nav}><a href="#top"><i /> KM / OPS</a><div><span>STATUS: ONLINE</span><a href="#work">{locale === "ar" ? "الحملات" : "CAMPAIGNS"}</a><Link href={languageHref(props)}>{locale === "en" ? "AR" : "EN"}</Link></div></nav>
    <header className={s.hero}><section className={s.mission}><span>MISSION CONTROL / OPERATOR 07</span><h1>{pick(content.profile.headline, locale)}</h1><p>{pick(content.profile.intro, locale)}</p><a href="#work">OPEN CAMPAIGN DOSSIERS [↘]</a></section><aside className={s.operator}><div className={s.scan}><Image src={content.profile.portrait} alt={content.profile.name} width={900} height={1200} priority unoptimized /><i /></div><p><b>{content.profile.name}</b><span>{pick(content.profile.role, locale)}</span></p></aside><div className={s.channels}><span>META <i /></span><span>GOOGLE <i /></span><span>TIKTOK <i /></span><span>SNAP <i /></span></div></header>
    <section className={s.cycle}><header><span>OPERATION CYCLE</span><h2>{pick(content.labels.approach, locale)}</h2></header><div>{content.approach.map((item,i)=><article key={item.id}><span>{n(i)}</span><i /><h3>{pick(item.title, locale)}</h3><p>{pick(item.description, locale)}</p></article>)}</div></section>
    <section className={s.services} id="services"><header><span>ACTIVE CAPABILITIES</span><h2>{pick(content.labels.services, locale)}</h2></header>{content.services.map(service=><article key={service.id}><span>[{service.number}]</span><h3>{pick(service.title, locale)}</h3><p>{pick(service.description, locale)}</p><b>READY</b></article>)}</section>
    <section className={s.work} id="work"><header><span>CAMPAIGN ARCHIVE</span><h2>{pick(content.labels.work, locale)}</h2></header><div>{projects.map((project,i)=><details key={project.id} open={i===0}><summary><span>DOSSIER_{n(i)}</span><b>{pick(project.title, locale)}</b><em>{pick(project.eyebrow, locale)}</em><i>OPEN +</i></summary><section><p>{pick(project.summary, locale)}</p><div><p><b>{pick(content.labels.challenge, locale)}</b>{pick(project.challenge, locale)}</p><p><b>{pick(content.labels.solution, locale)}</b>{pick(project.solution, locale)}</p><p><b>{pick(content.labels.outcome, locale)}</b>{pick(project.outcome, locale)}</p></div><aside>{project.tools.map(tool=><span key={tool}>{tool}</span>)}</aside></section></details>)}</div></section>
    <footer className={s.footer} id="contact"><span>NEXT MISSION</span><h2>{pick(content.labels.contact, locale)}</h2><p>{pick(content.labels.contactCopy, locale)}</p><div><a href={`mailto:${content.profile.email}`}>EMAIL_CHANNEL ↗</a><a href={whatsappHref(content)} target="_blank" rel="noreferrer">WHATSAPP_CHANNEL ↗</a></div></footer>
  </main>;
}
