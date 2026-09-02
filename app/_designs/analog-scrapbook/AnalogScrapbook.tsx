import Image from "next/image";
import { PortraitImage } from "@/app/_components/PortraitImage";
import Link from "next/link";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, whatsappHref, type DesignProps } from "../types";
import s from "./analog-scrapbook.module.css";

export default function AnalogScrapbook(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
<nav><b>KHALID’S FIELD NOTES</b><Link href={languageHref(props)}>{locale==="ar"?"EN":"عربي"}</Link></nav>
<header className={s.hero}><div className={s.tape}/><div className={s.note}><span>NOTE #001</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href="#work">flip through the work ↓</a></div><figure><PortraitImage content={content} priority sizes="(max-width:760px) 85vw, 38vw" /><figcaption>{content.profile.name}<br/>{pick(content.profile.role,locale)}</figcaption></figure><div className={s.stamp}>GROW<br/>BETTER</div><p className={s.scribble}>{locale==="ar"?"ابدأ من المشكلة الحقيقية":"start with the real problem"}</p></header>
<section className={s.clippings}><h2>{pick(content.labels.services,locale)}</h2><div>{content.services.map((service,i)=><article key={service.id} className={s[`clip${i}`]}><span>{service.number}</span><h3>{pick(service.title,locale)}</h3><p>{pick(service.description,locale)}</p></article>)}</div></section>
<section className={s.method}><div className={s.label}>HOW IT GETS DONE</div>{content.approach.map((step,i)=><article key={step.id}><b>{i+1}</b><div><h3>{pick(step.title,locale)}</h3><p>{pick(step.description,locale)}</p></div></article>)}</section>
<section className={s.work} id="work"><header><span>CASE STUDY SCRAPBOOK</span><h2>{pick(content.labels.work,locale)}</h2></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id} className={s.project}><div className={s.photo}>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 88vw, 37vw" unoptimized/>:<span>{i+1}</span>}<i/></div><p>{pick(project.eyebrow,locale)}</p><h3>{pick(project.title,locale)}</h3><small>{pick(project.summary,locale)}</small><b>READ THE FULL STORY ↗</b></Link>})}</div></section>
<footer id="contact"><div className={s.postcard}><span>OPEN LETTER</span><h2>{pick(content.labels.contact,locale)}</h2><p>{pick(content.labels.contactCopy,locale)}</p><a href={`mailto:${content.profile.email}`}>{content.profile.email}</a><a href={whatsappHref(content)} target="_blank" rel="noreferrer">WHATSAPP ↗</a></div></footer>
</main>}
