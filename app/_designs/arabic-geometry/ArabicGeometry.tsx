import Image from "next/image";
import { PortraitImage } from "@/app/_components/PortraitImage";
import Link from "next/link";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, whatsappHref, type DesignProps } from "../types";
import s from "./arabic-geometry.module.css";

export default function ArabicGeometry(props: DesignProps) {
  const { content, locale } = props;
  const projects = publishedProjects(content);
  return <main className={s.page} dir={locale === "ar" ? "rtl" : "ltr"}>
    <nav className={s.nav}><b>خالد · KHALID</b><div><a href="#work">{pick(content.labels.work, locale)}</a><a href="#contact">{pick(content.labels.contact, locale)}</a><Link href={languageHref(props)}>{locale === "ar" ? "EN" : "ع"}</Link></div></nav>
    <header className={s.hero}>
      <div className={s.seal}><span>نمو</span><i /></div>
      <div className={s.copy}><p>{pick(content.profile.role, locale)}</p><h1>{pick(content.profile.headline, locale)}</h1><div className={s.rule}><i /><span>11</span><i /></div><p className={s.intro}>{pick(content.profile.intro, locale)}</p><a href="#work">{locale === "ar" ? "افتح سجل الأعمال" : "Open the work folio"} ↓</a></div>
      <figure><div className={s.star} /><PortraitImage content={content} priority sizes="(max-width: 760px) 92vw, 36vw" /><figcaption>{content.profile.name}<small>UAE · KSA · REMOTE</small></figcaption></figure>
    </header>
    <section className={s.principles}><header><span>باب ٠١</span><h2>{pick(content.labels.approach, locale)}</h2></header><div>{content.approach.map((item, i)=><article key={item.id}><span>٠{i+1}</span><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p></article>)}</div></section>
    <section className={s.services}><div className={s.vertical}>BUSINESS · MARKETING · AUTOMATION</div><div><span>باب ٠٢</span><h2>{pick(content.labels.services,locale)}</h2>{content.services.map((item)=><article key={item.id}><b>{item.number}</b><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p></article>)}</div></section>
    <section className={s.work} id="work"><header><span>باب ٠٣</span><h2>{pick(content.labels.work,locale)}</h2></header><div className={s.folios}>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} className={s.folio} key={project.id}><span>{String(i+1).padStart(2,"0")}</span><div className={s.cover}>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 88vw, 38vw" unoptimized/>:<i />}</div><p>{pick(project.eyebrow,locale)}</p><h3>{pick(project.title,locale)}</h3><small>{pick(content.labels.viewCase,locale)} ↗</small></Link>})}</div></section>
    <footer id="contact"><div className={s.sealSmall}>خ</div><p>{pick(content.labels.contactCopy,locale)}</p><h2>{pick(content.labels.contact,locale)}</h2><div><a href={`mailto:${content.profile.email}`}>{content.profile.email}</a><a href={whatsappHref(content)} target="_blank" rel="noreferrer">WhatsApp ↗</a></div></footer>
  </main>;
}
