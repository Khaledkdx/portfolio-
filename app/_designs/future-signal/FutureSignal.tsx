import Image from "next/image";
import { PortraitImage } from "@/app/_components/PortraitImage";
import Link from "next/link";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, whatsappHref, type DesignProps } from "../types";
import s from "./future-signal.module.css";

export default function FutureSignal(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
<div className={s.scan}/><nav><b>KS / 2040</b><div><span>STATUS: AVAILABLE</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></div></nav>
<header className={s.hero}><div className={s.readout}><span>GROWTH SIGNAL ACQUIRED</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href="#work">ACCESS CASE FILES <i>↘</i></a></div><div className={s.visual}><div className={s.frame}><PortraitImage content={content} priority sizes="(max-width:760px) 88vw, 38vw" /></div><div className={s.reticle}/><span className={s.tagA}>MARKETING_01</span><span className={s.tagB}>AUTOMATION_02</span><span className={s.tagC}>BD_03</span></div></header>
<section className={s.protocol}><header><span>PROTOCOL / 01</span><h2>{pick(content.labels.approach,locale)}</h2></header><div>{content.approach.map((item,i)=><article key={item.id}><div><b>0{i+1}</b><i/></div><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p></article>)}</div></section>
<section className={s.capabilities}><header><span>CAPABILITY ARRAY / 02</span><h2>{pick(content.labels.services,locale)}</h2></header>{content.services.map((service,i)=><article key={service.id}><b>{service.number}</b><h3>{pick(service.title,locale)}</h3><p>{pick(service.description,locale)}</p><span>{"▰".repeat(i+2)}{"▱".repeat(Math.max(0,5-i))}</span></article>)}</section>
<section className={s.work} id="work"><header><span>ARCHIVE / 03</span><h2>{pick(content.labels.work,locale)}</h2></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id} className={s.file}><div className={s.fileBar}><span>CASE_{String(i+1).padStart(3,"0")}</span><b>LIVE</b></div><div className={s.fileImage}>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 100vw, 45vw" unoptimized/>:<i/>}</div><div className={s.fileText}><p>{pick(project.eyebrow,locale)}</p><h3>{pick(project.title,locale)}</h3><small>DECRYPT STORY ↗</small></div></Link>})}</div></section>
<footer id="contact"><span>TRANSMISSION READY</span><h2>{pick(content.labels.contact,locale)}</h2><p>{pick(content.labels.contactCopy,locale)}</p><div><a href={`mailto:${content.profile.email}`}>EMAIL://SEND</a><a href={whatsappHref(content)} target="_blank" rel="noreferrer">WA://OPEN</a></div></footer>
</main>}
