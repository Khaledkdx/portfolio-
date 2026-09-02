import Image from "next/image";
import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, type DesignProps } from "../types";
import s from "./campaign-comics.module.css";

export default function CampaignComics(props: DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
  <nav className={s.nav}><b>KHALID COMICS</b><span>ISSUE #23</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"عربي"}</Link></nav>
  <header className={s.hero}><section><span>THE GROWTH FIXER</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p></section><figure><PortraitImage content={content} priority sizes="(max-width:760px) 90vw, 38vw"/><i>LET&apos;S<br/>SOLVE IT!</i></figure><b className={s.burst}>BOOM!</b></header>
  <section className={s.origin}><header><b>HOW IT WORKS</b><h2>{pick(content.labels.approach,locale)}</h2></header><div>{content.approach.map((item,i)=><article key={item.id}><span>0{i+1}</span><h3>{pick(item.title,locale)}</h3><p>{pick(item.description,locale)}</p><i>{i===0?"?":i===1?"→":"✓"}</i></article>)}</div></section>
  <section className={s.episodes} id="work"><header><b>CASE FILES</b><h2>{pick(content.labels.work,locale)}</h2></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id} className={s[`episode${i%4}`]}><span>EP. {i+1}</span><figure>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 90vw, 40vw" unoptimized/>:<b>!</b>}</figure><h3>{pick(project.title,locale)}</h3><p>{pick(project.summary,locale)}</p></Link>})}</div></section>
  <footer className={s.footer}><span>TO BE CONTINUED…</span><h2>{pick(content.labels.contact,locale)}</h2><a href={`https://wa.me/${content.profile.whatsapp}`}>START THE NEXT ISSUE →</a></footer>
 </main>}
