import Image from "next/image";
import Link from "next/link";
import { PortraitImage } from "@/app/_components/PortraitImage";
import { pick } from "@/lib/site-content";
import { languageHref, projectHref, projectImages, publishedProjects, type DesignProps } from "../types";
import s from "./folded-mail.module.css";

export default function FoldedMail(props:DesignProps){const{content,locale}=props;const projects=publishedProjects(content);return <main className={s.page} dir={locale==="ar"?"rtl":"ltr"}>
 <nav className={s.nav}><b>DIRECT / 24</b><span>OPENED WITH INTENT</span><Link href={languageHref(props)}>{locale==="ar"?"EN":"AR"}</Link></nav>
 <header className={s.brochure}><div className={s.foldA}><span>BUSINESS GROWTH MAILER</span><h1>{pick(content.profile.headline,locale)}</h1></div><div className={s.foldB}><p>{pick(content.profile.intro,locale)}</p><a href="#work">UNFOLD THE WORK ↓</a></div><figure className={s.foldC}><PortraitImage content={content} priority sizes="(max-width:760px) 90vw, 32vw"/><figcaption>FROM: {content.profile.name}<br/>UAE · KSA · REMOTE</figcaption></figure></header>
 <section className={s.message}><aside>INSIDE PANEL</aside><div><h2>{pick(content.labels.services,locale)}</h2>{content.services.map((service,i)=><article key={service.id}><span>{String(i+1).padStart(2,"0")}</span><h3>{pick(service.title,locale)}</h3><p>{pick(service.description,locale)}</p></article>)}</div></section>
 <section className={s.mailers} id="work"><header><span>ENCLOSURES</span><h2>{pick(content.labels.work,locale)}</h2></header><div>{projects.map((project,i)=>{const cover=projectImages(project)[0];return <Link href={projectHref(project,props)} key={project.id}><div className={s.tab}>0{i+1}</div><figure>{cover?<Image src={cover.url} alt={pick(cover.alt,locale)} fill sizes="(max-width:760px) 90vw, 38vw" unoptimized/>:null}</figure><h3>{pick(project.title,locale)}</h3><p>{pick(project.summary,locale)}</p></Link>})}</div></section>
 <footer className={s.footer}><div className={s.stamp}>REPLY<br/>PAID</div><h2>{pick(content.labels.contact,locale)}</h2><a href={`mailto:${content.profile.email}`}>{content.profile.email}</a></footer>
 </main>}
