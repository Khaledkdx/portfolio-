import Image from "next/image";
import { PortraitImage } from "@/app/_components/PortraitImage";
import Link from "next/link";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, whatsappHref, type DesignProps } from "../types";
import s from "./spatial-orbit.module.css";

export default function SpatialOrbit(props: DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
  <nav><b>K/M — ORBIT</b><div><a href="#systems">SYSTEMS</a><a href="#work">WORK</a><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></div></nav>
  <header className={s.hero}><div className={s.copy}><span>BUSINESS GROWTH IN THREE DIMENSIONS</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href="#work">ENTER ORBIT <i>↘</i></a></div><div className={s.scene}><div className={s.ringA}/><div className={s.ringB}/><div className={s.sphere}/><div className={s.portrait}><PortraitImage content={content} priority sizes="(max-width:760px) 80vw, 35vw" /></div><span className={s.nodeA}>MARKETING</span><span className={s.nodeB}>AUTOMATION</span><span className={s.nodeC}>GROWTH</span></div></header>
  <section className={s.systems} id="systems"><header><span>01 / SYSTEM COMPONENTS</span><h2>{pick(content.labels.services,locale)}</h2></header><div>{content.services.map((item,i)=><article key={item.id} style={{"--z":`${i*35}px`} as React.CSSProperties}><span>{item.number}</span><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p><i/></article>)}</div></section>
  <section className={s.trajectory}><div className={s.axis}/><h2>{pick(content.labels.approach,locale)}</h2>{content.approach.map((item,i)=><article key={item.id}><b>{String(i+1).padStart(2,"0")}</b><div><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p></div></article>)}</section>
  <section className={s.work} id="work"><header><span>02 / SELECTED ORBITS</span><h2>{pick(content.labels.work,locale)}</h2></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id} className={s.project}><div className={s.projectOrb}>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 80vw, 34vw" unoptimized/>:<span>{String(i+1).padStart(2,"0")}</span>}<i/></div><p>{pick(project.eyebrow,locale)}</p><h3>{pick(project.title,locale)}</h3><small>OPEN CASE / ↗</small></Link>})}</div></section>
  <footer id="contact"><span>FINAL COORDINATE</span><h2>{pick(content.labels.contact,locale)}</h2><p>{pick(content.labels.contactCopy,locale)}</p><div><a href={`mailto:${content.profile.email}`}>EMAIL ↗</a><a href={whatsappHref(content)} target="_blank" rel="noreferrer">WHATSAPP ↗</a></div></footer>
  </main>}
