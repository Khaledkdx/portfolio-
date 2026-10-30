import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { ProjectPicture } from "@/app/_components/ProjectPicture";
import { pick, projectImages } from "@/lib/site-content";
import { languageHref, projectHref, publishedProjects, whatsappHref, type DesignProps } from "../types";
import { EditorialReveal } from "./EditorialReveal";
import styles from "./cinematic-growth.module.css";

export default function CinematicGrowth(props: DesignProps) {
  const { content, locale, variantPath } = props;
  const ar = locale === "ar";
  const projects = publishedProjects(content);
  const reviews = content.reviews.items.filter(item => item.visible).sort((a,b) => a.order-b.order);
  const companies = content.companies.items.filter(item => item.visible);
  return <main className={styles.page} dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
    <a className={styles.skip} href="#work">{ar ? "انتقل إلى الأعمال" : "Skip to work"}</a>
    <nav className={styles.nav} aria-label={ar ? "التنقل الرئيسي" : "Main navigation"}>
      <Link className={styles.brand} href={variantPath ? variantPath + "?locale=" + locale : "/" + locale}><span>K/</span>{content.profile.name}</Link>
      <div className={styles.navLinks}><a href="#story">{ar ? "القصة" : "Story"}</a><a href="#work">{pick(content.labels.work, locale)}</a><a href="#contact">{ar ? "تواصل" : "Contact"}</a></div>
      <Link className={styles.language} href={languageHref(props)}>{ar ? "EN" : "عربي"}</Link>
    </nav>
    <section className={styles.hero}>
      <EditorialReveal className={styles.heroCopy}>
        <p className={styles.eyebrow}>{pick(content.profile.role, locale)}</p>
        <h1>{pick(content.profile.headline, locale)}</h1>
        <p className={styles.intro}>{pick(content.profile.intro, locale)}</p>
        <div className={styles.actions}><a className={styles.primary} href="#work">{ar ? "اكتشف أعمالي" : "Explore my work"}<ArrowUpRight size={19} aria-hidden /></a><a href="#contact">{ar ? "لنتحدث عن مشروعك" : "Let’s talk about your project"}<ArrowUpRight size={18} aria-hidden /></a></div>
      </EditorialReveal>
    </section>
    {projects.length > 0 && <section className={styles.work} id="work">
      <header className={styles.sectionHeading}><h2>{pick(content.labels.work, locale)}</h2><p>{ar ? "مشكلات حقيقية. حلول عملية. قيمة للأعمال." : "Real challenges. Practical systems. Business value."}</p></header>
      <div className={styles.projectGrid}>{projects.map((project,index) => {
        const cover = projectImages(project)[0];
        return <EditorialReveal key={project.id} className={styles.project + (index === 0 ? " " + styles.featured : "")}><Link href={projectHref(project,props)}>
          {cover ? <ProjectPicture image={{...cover,caption:{en:"",ar:""}}} locale={locale} className={styles.workImage} sizes="(max-width: 760px) 94vw, 60vw" /> : <div className={styles.workPlaceholder}><span>{pick(project.eyebrow,locale)}</span><strong>{pick(project.title,locale)}</strong></div>}
          <div className={styles.projectCopy}><div><span className={styles.projectCategory}>{pick(project.eyebrow,locale)}</span><h3>{pick(project.title,locale)}</h3></div><ArrowUpRight aria-hidden /><p>{pick(project.summary,locale)}</p><p className={styles.projectOutcome}><b>{pick(content.labels.outcome,locale)}</b>{pick(project.outcome,locale)}</p><span className={styles.caseLink}>{pick(content.labels.viewCase,locale)}<ArrowUpRight size={17} aria-hidden /></span></div>
        </Link></EditorialReveal>;
      })}</div>
    </section>}
    <section className={styles.story} id="story">
      <div className={styles.storyIntro}><span className={styles.eyebrow}>{pick(content.growthStory.eyebrow,locale)}</span><h2>{pick(content.growthStory.title,locale)}</h2><p>{pick(content.growthStory.intro,locale)}</p><div className={styles.friction}>{content.growthStory.problems.map(problem => <details key={problem.id}><summary>{pick(problem.title,locale)}<Plus size={16} aria-hidden /></summary><p>{pick(problem.description,locale)}</p></details>)}</div></div>
      <div className={styles.method} id="method"><h3>{pick(content.labels.approach,locale)}</h3><ol>{content.approach.map((step,index) => <li key={step.id}><span aria-hidden>{String(index+1).padStart(2,"0")}</span><div><h4>{pick(step.title,locale)}</h4><p>{pick(step.description,locale)}</p></div></li>)}</ol><p className={styles.intervention}>{pick(content.growthStory.intervention,locale)}</p><p className={styles.result}>{pick(content.growthStory.result,locale)}</p></div>
    </section>
    <section className={styles.services} id="services"><header className={styles.sectionHeading}><h2>{pick(content.labels.services,locale)}</h2><p>{ar ? "التسويق والتقنية والتشغيل، حول هدف واحد." : "Marketing, technology and operations. Working toward one goal."}</p></header><div className={styles.serviceList}>{content.services.map(service => <details key={service.id}><summary><h3>{pick(service.title,locale)}</h3><Plus size={24} aria-hidden /></summary><p>{pick(service.description,locale)}</p></details>)}</div><div className={styles.skills} aria-label={ar ? "المهارات" : "Skills"}>{content.skills.map(skill => <span key={skill}>{skill}</span>)}</div></section>
    <section className={styles.experience}><h2>{pick(content.labels.experience,locale)}</h2><div>{content.experiences.map(item => <article key={item.id}><h3>{pick(item.role,locale)}</h3><strong>{item.company}</strong><p>{pick(item.summary,locale)}</p></article>)}</div></section>
    {companies.length > 0 && <section className={styles.companies}><h2>{pick(content.companies.heading,locale)}</h2><div>{companies.map(company => <div key={company.id} className={styles.company}>{company.website ? <a href={company.website} target="_blank" rel="noopener noreferrer" aria-label={pick(company.name,locale)}>{company.logoUrl && <Image src={company.logoUrl} alt={pick(company.alt,locale)} width={120} height={54} unoptimized />}{company.showName && <span>{pick(company.name,locale)}</span>}</a> : <>{company.logoUrl && <Image src={company.logoUrl} alt={pick(company.alt,locale)} width={120} height={54} unoptimized />}{company.showName && <span>{pick(company.name,locale)}</span>}</>}</div>)}</div></section>}
    {reviews.length > 0 && <section className={styles.reviews}><header className={styles.sectionHeading}><h2>{pick(content.reviews.heading,locale)}</h2><p>{pick(content.reviews.intro,locale)}</p></header><div>{reviews.map(review => <blockquote key={review.id}><p>“{pick(review.quote,locale)}”</p><footer><strong>{pick(review.author,locale)}</strong><span>{pick(review.role,locale)}{review.company ? " / " + review.company : ""}</span></footer></blockquote>)}</div></section>}
    <footer className={styles.contact} id="contact"><span className={styles.eyebrow}>{ar ? "لنعمل معًا" : "Let’s work together"}</span><h2>{pick(content.labels.contact,locale)}</h2><p>{pick(content.labels.contactCopy,locale)}</p><div className={styles.contactLinks}><a href={"mailto:" + content.profile.email} dir="ltr">{content.profile.email}<ArrowUpRight aria-hidden /></a><a href={whatsappHref(content)} target="_blank" rel="noopener noreferrer">{ar ? "واتساب" : "WhatsApp"}<ArrowUpRight aria-hidden /></a>{content.profile.linkedin && <a href={content.profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight aria-hidden /></a>}</div><div className={styles.footerLine}><span>{content.profile.name}</span><span>{pick(content.profile.availability,locale)}</span><a href="#">{ar ? "العودة للأعلى" : "Back to top"} ↑</a></div></footer>
  </main>;
}
