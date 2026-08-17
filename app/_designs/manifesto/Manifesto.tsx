import Image from "next/image";
import Link from "next/link";
import { DESIGN_NAMES, pick } from "@/lib/site-content";
import { languageHref, n, publishedProjects, whatsappHref, type DesignProps } from "../types";
import s from "./manifesto.module.css";

export default function Manifesto(props: DesignProps) {
  const { content, locale, design, preview } = props;
  const projects = publishedProjects(content);
  return <main className={s.page} dir={locale === "ar" ? "rtl" : "ltr"} lang={locale} id="top">
    {preview && <div className={s.preview}><Link href="/designs">← LAB</Link><span>{DESIGN_NAMES[design]}</span></div>}
    <nav className={s.nav}><a href="#top" className={s.logo}>KHALID!<i /></a><div><a href="#work">{locale === "ar" ? "الأعمال" : "WORK"}</a><a href="#services">{locale === "ar" ? "الخدمات" : "SERVICES"}</a><Link href={languageHref(props)}>{locale === "en" ? "عربي" : "EN"}</Link></div></nav>
    <header className={s.hero}><p className={s.issue}>MANIFESTO № 02 / BRAND × GROWTH × SYSTEMS</p><h1>{pick(content.profile.headline, locale)}</h1><div className={s.photo}><Image src={content.profile.portrait} alt={content.profile.name} width={900} height={1200} priority unoptimized /><b>IDEAS<br/>THAT<br/>MOVE</b></div><p className={s.intro}>{pick(content.profile.intro, locale)}</p><a className={s.sticker} href="#work">{locale === "ar" ? "شاهد الأعمال" : "SEE THE PROOF"} ↘</a></header>
    <div className={s.marquee} aria-hidden="true"><span>MARKETING / AUTOMATION / BUSINESS DEVELOPMENT / CONTENT /</span><span>MARKETING / AUTOMATION / BUSINESS DEVELOPMENT / CONTENT /</span></div>
    <section className={s.services} id="services"><div className={s.sideTitle}><span>WHAT I DO</span><h2>{pick(content.labels.services, locale)}</h2></div><div>{content.services.map((service,i)=><details key={service.id} open={i===0}><summary><b>{service.number}</b><span>{pick(service.title, locale)}</span><i>+</i></summary><p>{pick(service.description, locale)}</p></details>)}</div></section>
    <section className={s.work} id="work"><header><span>SELECTED CHAOS, ORGANIZED.</span><h2>{pick(content.labels.work, locale)}</h2></header>{projects.map((project,i)=><article key={project.id} className={s.poster}><div className={s.art}><b>{n(i)}</b><span>{project.tools.slice(0,3).join(" / ")}</span></div><div className={s.copy}><p>{pick(project.eyebrow, locale)}</p><h3>{pick(project.title, locale)}</h3><p>{pick(project.summary, locale)}</p><details><summary>{pick(content.labels.viewCase, locale)} ↘</summary><div><p><b>{pick(content.labels.challenge, locale)}</b>{pick(project.challenge, locale)}</p><p><b>{pick(content.labels.solution, locale)}</b>{pick(project.solution, locale)}</p><p><b>{pick(content.labels.outcome, locale)}</b>{pick(project.outcome, locale)}</p></div></details></div></article>)}</section>
    <section className={s.method}><h2>{pick(content.labels.approach, locale)}</h2>{content.approach.map((item,i)=><article key={item.id}><b>{n(i)}</b><h3>{pick(item.title, locale)}</h3><p>{pick(item.description, locale)}</p></article>)}</section>
    <footer className={s.footer} id="contact"><p>READY WHEN YOU ARE.</p><h2>{pick(content.labels.contact, locale)}</h2><div><a href={`mailto:${content.profile.email}`}>EMAIL ME ↗</a><a href={whatsappHref(content)} target="_blank" rel="noreferrer">WHATSAPP ↗</a></div></footer>
  </main>;
}
