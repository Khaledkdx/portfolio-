import Image from "next/image";
import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, type DesignProps } from "../types";
import s from "./tactile-clay.module.css";

export default function TactileClay(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
 <nav className={s.nav}><b>CLAY LAB / 30</b><span>SHAPING BETTER SYSTEMS</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></nav>
 <header className={s.hero}><div className={s.copy}><span>SERVICE DESIGN YOU CAN FEEL</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href="#trays">TOUCH THE WORK ↓</a></div><div className={s.stage}><i className={s.blobA}/><i className={s.blobB}/><figure><PortraitImage content={content} priority sizes="(max-width:760px) 74vw, 32vw"/></figure><b>30</b></div></header>
 <section className={s.materials}><header><span>RAW MATERIALS</span><h2>{pick(content.labels.services,locale)}</h2></header><div>{content.services.map((service,i)=><article key={service.id} className={s[`clay${i}`]}><span>{String(i+1).padStart(2,"0")}</span><h3>{pick(service.title,locale)}</h3><p>{pick(service.description,locale)}</p></article>)}</div></section>
 <section className={s.trays} id="trays"><header><span>FINISHED FORMS</span><h2>{pick(content.labels.work,locale)}</h2></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id}><figure>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 90vw, 36vw" unoptimized/>:<b>{i+1}</b>}</figure><div><span>FORM 0{i+1}</span><h3>{pick(project.title,locale)}</h3><p>{pick(project.summary,locale)}</p></div></Link>})}</div></section>
 <footer className={s.footer}><i/><h2>{pick(content.labels.contact,locale)}</h2><p>{pick(content.labels.contactCopy,locale)}</p><a href={`https://wa.me/${content.profile.whatsapp}`}>SHAPE THE NEXT SYSTEM ↗</a></footer>
 </main>}
