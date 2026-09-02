import Image from "next/image";
import { PortraitImage } from "@/app/_components/PortraitImage";
import Link from "next/link";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, type DesignProps } from "../types";
import s from "./swiss-grid.module.css";

export default function SwissGrid(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
<nav><b>KHALID MOHAMAD</b><span>BUSINESS GROWTH / AUTOMATION</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></nav>
<header className={s.hero}><div className={s.red}><span>PORTFOLIO<br/>20—26</span></div><div className={s.title}><p>{pick(content.profile.role,locale)}</p><h1>{pick(content.profile.headline,locale)}</h1></div><figure><PortraitImage content={content} priority sizes="(max-width:760px) 100vw, 32vw" /></figure><div className={s.intro}><p>{pick(content.profile.intro,locale)}</p><a href="#work">↓ {pick(content.labels.work,locale)}</a></div></header>
<section className={s.services}><aside><b>01</b><span>CAPABILITIES</span></aside><div><h2>{pick(content.labels.services,locale)}</h2>{content.services.map(service=><article key={service.id}><span>{service.number}</span><h3>{pick(service.title,locale)}</h3><p>{pick(service.description,locale)}</p></article>)}</div></section>
<section className={s.method}><aside><b>02</b><span>METHOD</span></aside><div>{content.approach.map((item,i)=><article key={item.id}><b>{i+1}</b><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p></article>)}</div></section>
<section className={s.work} id="work"><header><b>03</b><h2>{pick(content.labels.work,locale)}</h2></header>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id} className={s.project}><span>{String(i+1).padStart(2,"0")}</span><div className={s.image}>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 100vw, 42vw" unoptimized/>:<i/>}</div><div><p>{pick(project.eyebrow,locale)}</p><h3>{pick(project.title,locale)}</h3><small>{pick(project.summary,locale)}</small></div><b>↗</b></Link>})}</section>
<footer id="contact"><div className={s.blue}>04</div><div><span>CONTACT</span><h2>{pick(content.labels.contact,locale)}</h2><p>{pick(content.labels.contactCopy,locale)}</p><a href={`mailto:${content.profile.email}`}>{content.profile.email} ↗</a></div></footer>
</main>}
