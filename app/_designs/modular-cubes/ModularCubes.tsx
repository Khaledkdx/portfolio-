import Image from "next/image";
import { PortraitImage } from "@/app/_components/PortraitImage";
import Link from "next/link";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, whatsappHref, type DesignProps } from "../types";
import s from "./modular-cubes.module.css";

export default function ModularCubes(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
<nav><b>KHALID®</b><span>MODULAR GROWTH SYSTEMS</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></nav>
<header className={s.hero}><div className={s.copy}><span>BUILD / CONNECT / SCALE</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href="#work">{pick(content.labels.work,locale)} ↓</a></div><div className={s.stack}><div className={s.cubeA}><b>AI</b></div><div className={s.cubeB}><b>BD</b></div><div className={s.cubeC}><PortraitImage content={content} priority sizes="(max-width:760px) 55vw, 25vw" /></div><div className={s.cubeD}><b>MK</b></div></div></header>
<section className={s.modules}><header><span>01</span><h2>{pick(content.labels.services,locale)}</h2></header><div>{content.services.map((service,i)=><article key={service.id} className={i===0?s.large:""}><b>{service.number}</b><h3>{pick(service.title,locale)}</h3><p>{pick(service.description,locale)}</p><i>＋</i></article>)}</div></section>
<section className={s.flow}><h2>{pick(content.labels.approach,locale)}</h2><div>{content.approach.map((step,i)=><article key={step.id}><span>{String(i+1).padStart(2,"0")}</span><div className={s.miniCube}/><h3>{pick(step.title,locale)}</h3><p>{pick(step.description,locale)}</p></article>)}</div></section>
<section className={s.work} id="work"><header><span>02</span><h2>{pick(content.labels.work,locale)}</h2></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id} className={s.case}><div className={s.caseTop}><b>{String(i+1).padStart(2,"0")}</b><small>{pick(project.eyebrow,locale)}</small></div><div className={s.caseVisual}>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 100vw, 42vw" unoptimized/>:<div className={s.cubeIcon}/>}</div><h3>{pick(project.title,locale)}</h3><p>{pick(project.summary,locale)}</p><span>OPEN MODULE ↗</span></Link>})}</div></section>
<footer id="contact"><div><span>READY TO ASSEMBLE?</span><h2>{pick(content.labels.contact,locale)}</h2></div><div><p>{pick(content.labels.contactCopy,locale)}</p><a href={`mailto:${content.profile.email}`}>{content.profile.email}</a><a href={whatsappHref(content)} target="_blank" rel="noreferrer">WHATSAPP ↗</a></div></footer>
</main>}
