import Image from "next/image";
import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, type DesignProps } from "../types";
import s from "./broadcast-studio.module.css";

export default function BroadcastStudio(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
 <nav className={s.nav}><b>KM / LIVE</b><span>● ON AIR</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></nav>
 <header className={s.hero}><div className={s.screen}><PortraitImage content={content} priority sizes="(max-width:760px) 96vw, 52vw"/><div className={s.lower}><span>KHALID MOHAMAD</span><b>{pick(content.profile.role,locale)}</b></div></div><div className={s.program}><span>NOW PLAYING / GROWTH SYSTEMS</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href="#channels">VIEW CHANNELS ↓</a></div></header>
 <div className={s.ticker}><span>MARKETING ◆ BUSINESS DEVELOPMENT ◆ AUTOMATION ◆ CONTENT ◆ PROBLEM SOLVING ◆</span></div>
 <section className={s.channels} id="channels"><header><span>PROGRAM GRID</span><h2>{pick(content.labels.work,locale)}</h2></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id}><div className={s.channel}>CH {String(i+1).padStart(2,"0")}</div><figure>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 90vw, 24vw" unoptimized/>:<b>NO SIGNAL</b>}</figure><h3>{pick(project.title,locale)}</h3><small>{pick(project.eyebrow,locale)}</small></Link>})}</div></section>
 <section className={s.rundown}><h2>{pick(content.labels.approach,locale)}</h2>{content.approach.map((item,i)=><article key={item.id}><time>00:{String((i+1)*15).padStart(2,"0")}</time><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p></article>)}</section>
 <footer className={s.footer}><span>END CREDITS</span><h2>{pick(content.labels.contact,locale)}</h2><a href={`mailto:${content.profile.email}`}>PRODUCE THE NEXT STORY ↗</a></footer>
 </main>}
