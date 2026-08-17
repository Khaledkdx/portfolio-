import Image from "next/image";
import Link from "next/link";
import { DESIGN_NAMES, pick } from "@/lib/site-content";
import { languageHref, n, publishedProjects, whatsappHref, type DesignProps } from "../types";
import s from "./boardroom.module.css";

export default function Boardroom(props: DesignProps) {
  const { content, locale, design, preview } = props;
  const projects = publishedProjects(content);
  return <main className={s.page} dir={locale === "ar" ? "rtl" : "ltr"} lang={locale} id="top">
    {preview && <div className={s.preview}><Link href="/designs">← Design lab</Link><span>{DESIGN_NAMES[design]}</span></div>}
    <nav className={s.nav} aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}>
      <a className={s.brand} href="#top"><b>KM</b><span>{content.profile.name}<small>Growth & automation report</small></span></a>
      <div><a href="#work">{pick(content.labels.work, locale)}</a><a href="#services">{pick(content.labels.services, locale)}</a><Link href={languageHref(props)}>{locale === "en" ? "عربي" : "EN"}</Link></div>
    </nav>
    <header className={s.hero}>
      <div className={s.coverMeta}><span>ANNUAL CAPABILITY REPORT</span><span>01—10 / 2026</span></div>
      <div className={s.heroCopy}><p>{pick(content.profile.role, locale)}</p><h1>{pick(content.profile.headline, locale)}</h1><div className={s.intro}><span>EXECUTIVE SUMMARY</span><p>{pick(content.profile.intro, locale)}</p></div></div>
      <div className={s.portrait}><Image src={content.profile.portrait} alt={content.profile.name} width={900} height={1200} priority unoptimized /><span>UAE · KSA · REMOTE</span></div>
      <ol className={s.contents}><li><a href="#method"><b>01</b>{pick(content.labels.approach, locale)}</a></li><li><a href="#services"><b>02</b>{pick(content.labels.services, locale)}</a></li><li><a href="#work"><b>03</b>{pick(content.labels.work, locale)}</a></li></ol>
    </header>
    <section className={s.method} id="method"><header><span>CHAPTER 01</span><h2>{pick(content.labels.approach, locale)}</h2></header><div>{content.approach.map((item, i)=><article key={item.id}><b>{n(i)}</b><h3>{pick(item.title, locale)}</h3><p>{pick(item.description, locale)}</p></article>)}</div></section>
    <section className={s.capabilities} id="services"><header><span>CHAPTER 02</span><h2>{pick(content.labels.services, locale)}</h2></header><div className={s.matrix}>{content.services.map(service=><article key={service.id}><span>{service.number}</span><h3>{pick(service.title, locale)}</h3><p>{pick(service.description, locale)}</p><b>CAPABILITY ↗</b></article>)}</div><p className={s.skills}>{content.skills.map(skill=><span key={skill}>{skill}</span>)}</p></section>
    <section className={s.work} id="work"><header><span>CHAPTER 03</span><h2>{pick(content.labels.work, locale)}</h2></header>{projects.map((project, i)=><article className={s.case} key={project.id}><div className={s.caseNo}><span>CASE</span><b>{n(i)}</b></div><div><p>{pick(project.eyebrow, locale)}</p><h3>{pick(project.title, locale)}</h3><p className={s.summary}>{pick(project.summary, locale)}</p><div className={s.three}><section><b>{pick(content.labels.challenge, locale)}</b><p>{pick(project.challenge, locale)}</p></section><section><b>{pick(content.labels.solution, locale)}</b><p>{pick(project.solution, locale)}</p></section><section><b>{pick(content.labels.outcome, locale)}</b><p>{pick(project.outcome, locale)}</p></section></div></div></article>)}</section>
    <section className={s.experience} id="experience"><h2>{pick(content.labels.experience, locale)}</h2>{content.experiences.map(item=><article key={item.id}><span>{item.period}</span><b>{item.company}</b><h3>{pick(item.role, locale)}</h3><p>{pick(item.summary, locale)}</p></article>)}</section>
    <footer className={s.footer} id="contact"><span>FINAL NOTE</span><h2>{pick(content.labels.contact, locale)}</h2><p>{pick(content.labels.contactCopy, locale)}</p><div><a href={`mailto:${content.profile.email}`}>{content.profile.email} ↗</a><a href={whatsappHref(content)} target="_blank" rel="noreferrer">WhatsApp ↗</a></div><small>KHALID MOHAMAD — BUSINESS GROWTH & AUTOMATION</small></footer>
  </main>;
}
