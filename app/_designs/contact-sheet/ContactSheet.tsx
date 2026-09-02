import Image from "next/image";
import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, type DesignProps } from "../types";
import s from "./contact-sheet.module.css";

export default function ContactSheet(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
 <nav className={s.nav}><b>KM / CONTACT SHEET</b><span>ROLL 25 · 2026</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></nav>
 <header className={s.hero}><div className={s.title}><span>FRAME 001</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p></div><div className={s.film}><i/><i/><figure><PortraitImage content={content} priority sizes="(max-width:760px) 88vw, 42vw"/></figure><i/><i/></div></header>
 <section className={s.process}><header><span>PROCESS NOTES</span><h2>{pick(content.labels.approach,locale)}</h2></header><ol>{content.approach.map((item,i)=><li key={item.id}><b>{String(i+1).padStart(2,"0")}</b><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p></li>)}</ol></section>
 <section className={s.sheet} id="work"><header><span>SELECTED FRAMES</span><h2>{pick(content.labels.work,locale)}</h2></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id}><span>{String(i+1).padStart(2,"0")}A</span><figure>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 92vw, 23vw" unoptimized/>:<b>KM</b>}</figure><h3>{pick(project.title,locale)}</h3><small>{pick(project.eyebrow,locale)}</small></Link>})}</div></section>
 <footer className={s.footer}><span>END OF ROLL</span><h2>{pick(content.labels.contact,locale)}</h2><a href={`mailto:${content.profile.email}`}>BOOK THE NEXT SHOOT ↗</a></footer>
 </main>}
