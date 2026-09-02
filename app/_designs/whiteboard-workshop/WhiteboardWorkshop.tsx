import Image from "next/image";
import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, type DesignProps } from "../types";
import s from "./whiteboard-workshop.module.css";

export default function WhiteboardWorkshop(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
 <nav className={s.nav}><b>KHALID&apos;S WORKSHOP</b><span>BOARD 27 / LIVE</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></nav>
 <header className={s.hero}><div className={s.copy}><span>THE REAL PROBLEM → THE RIGHT SYSTEM</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><div><b>MARKETING</b><b>AUTOMATION</b><b>GROWTH</b></div></div><figure><PortraitImage content={content} priority sizes="(max-width:760px) 78vw, 30vw"/><i>START<br/>HERE ↘</i></figure></header>
 <section className={s.notes}><h2>{pick(content.labels.services,locale)}</h2><div>{content.services.map((service,i)=><article key={service.id} className={s[`note${i%4}`]}><span>0{i+1}</span><h3>{pick(service.title,locale)}</h3><p>{pick(service.description,locale)}</p></article>)}</div></section>
 <section className={s.canvas} id="work"><header><h2>{pick(content.labels.work,locale)}</h2><p>PROBLEM → INTERVENTION → VALUE</p></header>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id}><span>{i+1}</span><div><h3>{pick(project.title,locale)}</h3><p>{pick(project.summary,locale)}</p></div><figure>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 88vw, 28vw" unoptimized/>:null}</figure><b>DETAILS ↗</b></Link>})}</section>
 <footer className={s.footer}><div className={s.marker}/><h2>{pick(content.labels.contact,locale)}</h2><a href={`https://wa.me/${content.profile.whatsapp}`}>BOOK A WORKING SESSION ↗</a></footer>
 </main>}
