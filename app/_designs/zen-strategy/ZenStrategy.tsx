import Image from "next/image";
import { PortraitImage } from "@/app/_components/PortraitImage";
import Link from "next/link";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, type DesignProps } from "../types";
import s from "./zen-strategy.module.css";

export default function ZenStrategy(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
<nav><b>Khalid</b><div><a href="#work">{pick(content.labels.work,locale)}</a><Link href={languageHref(props)}>{locale==="ar"?"English":"العربية"}</Link></div></nav>
<header className={s.hero}><div className={s.copy}><span>STRATEGY WITH CLARITY</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href="#method">{locale==="ar"?"ابدأ من المنهج":"Begin with the method"} ↓</a></div><figure><div className={s.sun}/><PortraitImage content={content} priority sizes="(max-width:760px) 84vw, 36vw" /><figcaption>{pick(content.profile.role,locale)}</figcaption></figure></header>
<section className={s.pause}><p>{locale==="ar"?"النمو الأفضل لا يبدأ بأداة. يبدأ بفهم واضح لما يبطئ العمل.":"Better growth does not begin with a tool. It begins with a clear view of what slows the work."}</p></section>
<section className={s.method} id="method"><header><span>01</span><h2>{pick(content.labels.approach,locale)}</h2></header>{content.approach.map((item,i)=><article key={item.id}><b>{String(i+1).padStart(2,"0")}</b><div><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p></div><i/></article>)}</section>
<section className={s.services}><header><span>02</span><h2>{pick(content.labels.services,locale)}</h2></header><div>{content.services.map((service)=><article key={service.id}><span>{service.number}</span><h3>{pick(service.title,locale)}</h3><p>{pick(service.description,locale)}</p></article>)}</div></section>
<section className={s.work} id="work"><header><span>03</span><h2>{pick(content.labels.work,locale)}</h2></header>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id} className={s.project}><div className={s.projectCopy}><span>{String(i+1).padStart(2,"0")}</span><p>{pick(project.eyebrow,locale)}</p><h3>{pick(project.title,locale)}</h3><small>{pick(project.summary,locale)}</small><b>{pick(content.labels.viewCase,locale)} →</b></div><div className={s.image}>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 100vw, 47vw" unoptimized/>:<i/>}</div></Link>})}</section>
<footer id="contact"><span>04</span><h2>{pick(content.labels.contact,locale)}</h2><p>{pick(content.labels.contactCopy,locale)}</p><a href={`mailto:${content.profile.email}`}>{content.profile.email} ↗</a></footer>
</main>}
