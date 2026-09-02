import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, publishedProjects, type DesignProps } from "../types";
import s from "./type-tunnel.module.css";

export default function TypeTunnel(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
 <nav className={s.nav}><b>TYPE / 29</b><span>SCROLL INTO DEPTH</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></nav>
 <header className={s.hero}><div className={s.tunnel} aria-hidden="true"><span>GROWTH</span><span>SYSTEMS</span><span>MOVE</span><span>FASTER</span></div><div className={s.copy}><span>BUSINESS IN MOTION</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href="#work">ENTER ↓</a></div><figure><PortraitImage content={content} priority sizes="(max-width:760px) 50vw, 20vw"/></figure></header>
 <section className={s.words}><span>DIAGNOSE</span><span>CONNECT</span><span>AUTOMATE</span><span>IMPROVE</span></section>
 <section className={s.work} id="work"><header><span>SELECTED / 04</span><h2>{pick(content.labels.work,locale)}</h2></header>{projects.map((project,i)=><Link href={projectHref(project,props)} key={project.id}><span>0{i+1}</span><h3>{pick(project.title,locale)}</h3><p>{pick(project.summary,locale)}</p><b>↗</b></Link>)}</section>
 <section className={s.services}><h2>{pick(content.labels.services,locale)}</h2><div>{content.services.map(service=><article key={service.id}><h3>{pick(service.title,locale)}</h3><p>{pick(service.description,locale)}</p></article>)}</div></section>
 <footer className={s.footer}><h2>{pick(content.labels.contact,locale)}</h2><a href={`mailto:${content.profile.email}`}>{content.profile.email} ↗</a></footer>
 </main>}
