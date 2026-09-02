import Image from "next/image";
import { PortraitImage } from "@/app/_components/PortraitImage";
import Link from "next/link";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, whatsappHref, type DesignProps } from "../types";
import s from "./art-deco.module.css";

export default function ArtDeco(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
<nav><i/><b>KHALID MOHAMAD</b><div><a href="#work">WORK</a><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></div></nav>
<header className={s.hero}><div className={s.fan}/><div className={s.copy}><span>GROWTH · STRATEGY · AUTOMATION</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href="#work">ENTER THE PORTFOLIO</a></div><figure><div><PortraitImage content={content} priority sizes="(max-width:760px) 82vw, 32vw" /></div><figcaption>{pick(content.profile.role,locale)}</figcaption></figure></header>
<section className={s.capabilities}><header><i/><span>CHAPTER I</span><h2>{pick(content.labels.services,locale)}</h2><i/></header><div>{content.services.map(service=><article key={service.id}><div className={s.gem}>{service.number}</div><h3>{pick(service.title,locale)}</h3><p>{pick(service.description,locale)}</p></article>)}</div></section>
<section className={s.method}><header><span>CHAPTER II</span><h2>{pick(content.labels.approach,locale)}</h2></header><div>{content.approach.map((item,i)=><article key={item.id}><b>{String(i+1).padStart(2,"0")}</b><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p></article>)}</div></section>
<section className={s.work} id="work"><header><i/><span>CHAPTER III</span><h2>{pick(content.labels.work,locale)}</h2><i/></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id} className={s.project}><div className={s.projectFrame}>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 82vw, 32vw" unoptimized/>:<b>{String(i+1).padStart(2,"0")}</b>}</div><span>{pick(project.eyebrow,locale)}</span><h3>{pick(project.title,locale)}</h3><p>{pick(project.summary,locale)}</p><small>VIEW THE CASE ↗</small></Link>})}</div></section>
<footer id="contact"><div className={s.sunburst}/><span>AN INVITATION</span><h2>{pick(content.labels.contact,locale)}</h2><p>{pick(content.labels.contactCopy,locale)}</p><div><a href={`mailto:${content.profile.email}`}>EMAIL</a><a href={whatsappHref(content)} target="_blank" rel="noreferrer">WHATSAPP</a></div></footer>
</main>}
