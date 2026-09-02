import Image from "next/image";
import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, type DesignProps } from "../types";
import s from "./growth-transit.module.css";

export default function GrowthTransit(props: DesignProps) {
  const { content, locale } = props; const projects=publishedProjects(content);
  return <main className={s.page} dir={locale === "ar" ? "rtl" : "ltr"}>
    <nav className={s.nav}><b>KM / GROWTH TRANSIT</b><div><span>NETWORK OPEN</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></div></nav>
    <header className={s.hero}><div className={s.copy}><span>ORIGIN · DUBAI</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href="#lines">Plan the route ↓</a></div><div className={s.map}><i/><i/><i/><i/><figure><PortraitImage content={content} priority sizes="(max-width:760px) 54vw, 22vw"/></figure><b>YOU ARE HERE</b></div></header>
    <section className={s.lines} id="lines"><header><h2>{pick(content.labels.approach,locale)}</h2><span>3 CONNECTED LINES</span></header>{content.approach.map((item,i)=><article key={item.id} className={s[`line${i}`]}><b>{String.fromCharCode(65+i)}</b><i/><div><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p></div></article>)}</section>
    <section className={s.stations} id="work"><header><h2>{pick(content.labels.work,locale)}</h2><span>SELECT A DESTINATION</span></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id}><span>{i+1}</span><figure>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 86vw, 24vw" unoptimized/>:null}</figure><h3>{pick(project.title,locale)}</h3><small>{pick(project.eyebrow,locale)}</small></Link>})}</div></section>
    <footer className={s.footer}><div className={s.route}><i/><i/><i/></div><h2>{pick(content.labels.contact,locale)}</h2><a href={`mailto:${content.profile.email}`}>START A NEW ROUTE ↗</a></footer>
  </main>;
}
