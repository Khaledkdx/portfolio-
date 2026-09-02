import Image from "next/image";
import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, type DesignProps } from "../types";
import s from "./museum-walk.module.css";

export default function MuseumWalk(props: DesignProps) {
  const { content, locale } = props;
  const projects = publishedProjects(content);
  return <main className={s.page} dir={locale === "ar" ? "rtl" : "ltr"}>
    <nav className={s.nav}><b>KHALID / EXHIBITION 21</b><div><a href="#gallery">{pick(content.labels.work, locale)}</a><Link href={languageHref(props)}>{locale === "ar" ? "EN" : "عربي"}</Link></div></nav>
    <header className={s.hero}>
      <div className={s.wallLabel}><span>ROOM 01</span><h1>{pick(content.profile.headline, locale)}</h1><p>{pick(content.profile.intro, locale)}</p><a href="#gallery">Enter the exhibition →</a></div>
      <figure className={s.portrait}><PortraitImage content={content} priority sizes="(max-width:760px) 90vw, 38vw"/><figcaption>{content.profile.name}<br/>{pick(content.profile.role, locale)}</figcaption></figure>
    </header>
    <section className={s.corridor} id="services"><aside>ROOM 02<br/>CAPABILITIES</aside><div>{content.services.map((service, i)=><article key={service.id}><span>{String(i+1).padStart(2,"0")}</span><h2>{pick(service.title, locale)}</h2><p>{pick(service.description, locale)}</p></article>)}</div></section>
    <section className={s.gallery} id="gallery"><header><span>ROOM 03</span><h2>{pick(content.labels.work, locale)}</h2></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link className={s.exhibit} href={projectHref(project,props)} key={project.id}><figure>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 90vw, 42vw" unoptimized/>:<b>{String(i+1).padStart(2,"0")}</b>}</figure><div><span>EXHIBIT {String(i+1).padStart(2,"0")}</span><h3>{pick(project.title,locale)}</h3><p>{pick(project.summary,locale)}</p></div></Link>})}</div></section>
    <footer className={s.footer}><span>FINAL ROOM</span><h2>{pick(content.labels.contact, locale)}</h2><p>{pick(content.labels.contactCopy, locale)}</p><a href={`mailto:${content.profile.email}`}>{content.profile.email} ↗</a></footer>
  </main>;
}
