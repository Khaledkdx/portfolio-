import Image from "next/image";
import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, type DesignProps } from "../types";
import s from "./gtm-gameboard.module.css";

export default function GtmGameboard(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
 <nav className={s.nav}><b>GTM / PLAYER ONE</b><span>TURN 26</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></nav>
 <header className={s.hero}><div className={s.copy}><span>OBJECTIVE: BUILD MOMENTUM</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href="#board">ROLL INTO THE PLAN ↓</a></div><div className={s.board}><div className={s.tileA}>MARKET</div><div className={s.tileB}>MESSAGE</div><figure><PortraitImage content={content} priority sizes="(max-width:760px) 55vw, 24vw"/></figure><div className={s.tileC}>SYSTEM</div><i className={s.token}>KM</i></div></header>
 <section className={s.rounds} id="board"><header><span>THREE ROUNDS</span><h2>{pick(content.labels.approach,locale)}</h2></header><div>{content.approach.map((item,i)=><article key={item.id}><b>{i+1}</b><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p><span>MOVE →</span></article>)}</div></section>
 <section className={s.missions} id="work"><header><span>MISSION CARDS</span><h2>{pick(content.labels.work,locale)}</h2></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id}><div className={s.corner}>{i+1}</div><figure>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 88vw, 25vw" unoptimized/>:null}</figure><h3>{pick(project.title,locale)}</h3><p>{pick(project.summary,locale)}</p><b>OPEN CARD ↗</b></Link>})}</div></section>
 <footer className={s.footer}><span>NEXT TURN</span><h2>{pick(content.labels.contact,locale)}</h2><a href={`mailto:${content.profile.email}`}>INVITE PLAYER ↗</a></footer>
 </main>}
