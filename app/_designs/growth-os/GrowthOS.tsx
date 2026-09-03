import Image from "next/image";
import Link from "next/link";
import { pick, projectImages } from "@/lib/site-content";
import { PortraitImage } from "@/app/_components/PortraitImage";
import type { DesignProps } from "../types";
import { languageHref, n, projectHref, publishedProjects, whatsappHref } from "../types";
import styles from "./growth-os.module.css";

export default function GrowthOS({ content, locale, design, preview, variantPath }: DesignProps) {
 const projects=publishedProjects(content); const lang=languageHref({content,locale,design,preview,variantPath});
 return <main className={styles.page} dir={locale === "ar" ? "rtl" : "ltr"}><a className={styles.skip} href="#cases">Skip</a><nav className={styles.command}><b>growth.os</b><span>{content.profile.email}</span><Link href={lang}>{locale==='ar'?'EN':'AR'}</Link></nav><section className={styles.desktop}><div className={styles.console}><span>INPUT</span><h1>{pick(content.profile.headline,locale)}</h1><p>{pick(content.profile.intro,locale)}</p><a href={whatsappHref(content)} target="_blank" rel="noreferrer">Run brief</a></div><div className={styles.workflow}>{content.approach.map((s,i)=><article key={s.id}><b>{n(i)}</b><h2>{pick(s.title,locale)}</h2></article>)}</div><figure className={styles.avatar}><PortraitImage content={content} className={styles.portrait} sizes="(max-width:760px) 90vw, 36vw" priority /></figure></section><section className={styles.modules}>{content.services.map(s=><article key={s.id}><span>{s.number}</span><h2>{pick(s.title,locale)}</h2><p>{pick(s.description,locale)}</p></article>)}</section><section id="cases" className={styles.cases}>{projects.map((p,i)=>{const c=projectImages(p)[0];return <Link key={p.id} href={projectHref(p,{locale,variantPath})} className={styles.caseNode}><b>{n(i)}</b>{c&&<Image src={c.url} alt={pick(c.alt,locale)} fill sizes="30vw" unoptimized/>}<h2>{pick(p.title,locale)}</h2><p>{pick(p.summary,locale)}</p></Link>})}</section></main> }
