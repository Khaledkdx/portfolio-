import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Bot, BrainCircuit, Building2, Mail, MessageCircle, Network, TimerReset, Workflow } from "lucide-react";
import { pick } from "@/lib/site-content";
import { projectHref, publishedProjects, type DesignProps } from "../types";
import { AgenticCoreMap, CyberPortrait, Reveal } from "./MotionPrimitives";
import styles from "./agentic-growth-core.module.css";

const label = {
  en: { menu: "System map", cases: "Case studies", view: "Open case", pressure: "Business friction", input: "Before", output: "After", reviews: "Proof from people", contact: "Start a growth route", email: "Email", whatsapp: "WhatsApp", projects: "All systems", companies: "Teams & companies", noReviews: "Verified reviews will appear here when published from the CMS.", orbit: ["Marketing", "Operations", "Sales", "HR", "Customer"], departments: ["Marketing", "Sales", "Operations", "HR", "Customer service"], steps: ["Observe", "Route", "Act", "Report"], pipeline: ["Attention", "Qualified lead", "CRM context", "Follow-up", "Learning loop"], papers: ["Sheet", "Approval", "Report"], live: "ONE LIVE FLOW", liveMeta: "Roles · Data · Action", agents: ["Planning", "Content", "Visuals", "Moderation", "Publishing", "Response"], before: ["Repeat", "Search", "Copy", "Wait"], after: ["Context", "Decision", "Customer", "Growth"] },
  ar: { menu: "خريطة النظام", cases: "دراسات الحالة", view: "افتح الدراسة", pressure: "تعطيل الأعمال", input: "قبل", output: "بعد", reviews: "إثبات من الأشخاص", contact: "ابدأ مسار نمو", email: "البريد", whatsapp: "واتساب", projects: "كل الأنظمة", companies: "الشركات والفرق", noReviews: "ستظهر الآراء الموثقة هنا بعد نشرها من لوحة التحكم.", orbit: ["التسويق", "العمليات", "المبيعات", "الموارد", "العملاء"], departments: ["التسويق", "المبيعات", "العمليات", "الموارد البشرية", "خدمة العملاء"], steps: ["مراقبة", "توجيه", "تنفيذ", "تقرير"], pipeline: ["انتباه", "عميل مؤهل", "سياق العميل", "متابعة", "دائرة تعلم"], papers: ["جدول", "موافقة", "تقرير"], live: "مسار مباشر واحد", liveMeta: "صلاحيات · بيانات · إجراء", agents: ["تخطيط", "محتوى", "عناصر بصرية", "مراجعة", "نشر", "استجابة"], before: ["تكرار", "بحث", "نسخ", "انتظار"], after: ["سياق", "قرار", "عميل", "نمو"] },
} as const;

export default function AgenticGrowthCore(props: DesignProps) {
  const { content, locale } = props;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const copy = label[locale];
  const projects = publishedProjects(content);
  const sections = content.agenticStory.sections;
  const section = (id: string, fallback: number) => sections.find((item) => item.id === id) ?? sections[fallback] ?? sections[0];
  const projectsFor = (id: string, fallback: number) => {
    const selected = section(id, fallback)?.projectSlugs ?? [];
    return selected.map((slug) => projects.find((project) => project.slug === slug)).filter((project): project is (typeof projects)[number] => Boolean(project));
  };
  const visibleReviews = content.reviews.items.filter((review) => review.visible).sort((a, b) => a.order - b.order);
  const visibleCompanies = content.companies.items.filter((company) => company.visible);
  const navItems = ["pressure", "core", "marketing", "operations", "network", "sectors", "time", "constellation"];

  const renderProof = (id: string, fallback: number, compact = false) => {
    const selected = projectsFor(id, fallback);
    if (!selected.length) return null;
    return <div className={`${styles.proofDock} ${compact ? styles.proofDockCompact : ""}`} aria-label={copy.cases}>{selected.map((project, index) => (
      <Link key={project.id} href={projectHref(project, props)}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{pick(project.eyebrow, locale)}</small><strong>{pick(project.title, locale)}</strong></div><ArrowUpRight aria-hidden size={18} /></Link>
    ))}</div>;
  };

  return (
    <main className={styles.shell} dir={dir}>
      <a className={styles.skip} href="#content">{locale === "ar" ? "انتقل للمحتوى" : "Skip to content"}</a>
      <div className={styles.noise} aria-hidden />
      <nav className={styles.nav} aria-label={copy.menu}>
        <Link className={styles.brand} href={props.variantPath ?? `/${locale}`}><b>K</b><span>{content.profile.name}</span></Link>
        <div className={styles.navRail}>{navItems.map((id, index) => <a href={`#${id}`} key={id}><i />{String(index + 1).padStart(2, "0")}</a>)}</div>
        <Link className={styles.language} href={props.variantPath ? `${props.variantPath}?locale=${locale === "ar" ? "en" : "ar"}` : `/${locale === "ar" ? "en" : "ar"}`}>{locale === "ar" ? "EN" : "ع"}</Link>
      </nav>

      <section className={styles.hero} id="content">
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>{pick(section("signal", 0).eyebrow, locale)}</span>
          <h1>{pick(content.agenticStory.headline, locale)}</h1>
          <p>{pick(content.agenticStory.intro, locale)}</p>
          <div className={styles.heroActions}><a href="#pressure">{locale === "ar" ? "ابدأ القصة" : "Enter the system"}<ArrowDown size={17} /></a><a href="#constellation">{copy.projects}</a></div>
          {renderProof("signal", 0, true)}
        </div>
        <div className={styles.heroVisual}>
          <CyberPortrait className={styles.cyberPortrait} />
          <div className={styles.orbit} aria-label="Connected business departments">{copy.orbit.map((item, index) => <span key={item} style={{ "--orbit-index": index } as React.CSSProperties}>{item}</span>)}</div>
          <div className={styles.coreBadge}><BrainCircuit size={22} /><span>AGENTIC<br />CORE</span></div>
        </div>
      </section>

      <section className={styles.pressure} id="pressure">
        <Reveal className={styles.sectionIntro}><span>{pick(section("pressure", 1).eyebrow, locale)}</span><h2>{pick(section("pressure", 1).title, locale)}</h2><p>{pick(section("pressure", 1).body, locale)}</p></Reveal>
        <div className={styles.pressureWorld}>
          <div className={styles.companyModel} aria-label={copy.pressure}>
            {copy.departments.map((department, index) => <div key={department} className={styles.companyFloor}><span>0{index + 1}</span><strong>{department}</strong><i /></div>)}
            <Building2 className={styles.buildingIcon} aria-hidden />
          </div>
          <div className={styles.frictionStack}>{content.growthStory.problems.map((problem, index) => <article key={problem.id}><span>F/{index + 1}</span><h3>{pick(problem.title, locale)}</h3><p>{pick(problem.description, locale)}</p></article>)}</div>
        </div>
        {renderProof("pressure", 1)}
      </section>

      <section className={styles.coreSection} id="core">
        <div className={styles.coreCopy}><span>{pick(section("core", 2).eyebrow, locale)}</span><h2>{pick(section("core", 2).title, locale)}</h2><p>{pick(section("core", 2).body, locale)}</p><div className={styles.agentSteps}>{copy.steps.map((step, index) => <div key={step}><i>{index + 1}</i><span>{step}</span></div>)}</div>{renderProof("core", 2)}</div>
        <AgenticCoreMap locale={locale} />
      </section>

      <section className={styles.engine} id="marketing">
        <Reveal className={styles.sectionIntro}><span>{pick(section("marketing", 3).eyebrow, locale)}</span><h2>{pick(section("marketing", 3).title, locale)}</h2><p>{pick(section("marketing", 3).body, locale)}</p></Reveal>
        <div className={styles.signalPipeline} aria-label="Marketing and sales workflow">{copy.pipeline.map((item, index) => <div key={item}><b>0{index + 1}</b><span>{item}</span><i /></div>)}</div>
        {renderProof("marketing", 3)}
      </section>

      <section className={styles.operations} id="operations">
        <div className={styles.opsVisual}><Workflow size={66} aria-hidden /><div className={styles.paperStack}>{copy.papers.map((item) => <span key={item}>{item}</span>)}</div><div className={styles.flowLine} /><div className={styles.livePanel}><i /><b>{copy.live}</b><small>{copy.liveMeta}</small></div></div>
        <Reveal className={styles.sectionIntro}><span>{pick(section("operations", 4).eyebrow, locale)}</span><h2>{pick(section("operations", 4).title, locale)}</h2><p>{pick(section("operations", 4).body, locale)}</p>{renderProof("operations", 4)}</Reveal>
      </section>

      <section className={styles.networkSection} id="network">
        <div className={styles.networkImage}><Image src="/agentic-growth-core/agent-network.webp" alt="Khalid coordinating a network of specialized AI agents" fill unoptimized sizes="100vw" /></div>
        <div className={styles.networkCopy}><span>{pick(section("network", 5).eyebrow, locale)}</span><h2>{pick(section("network", 5).title, locale)}</h2><p>{pick(section("network", 5).body, locale)}</p><div className={styles.agentGrid}>{copy.agents.map((agent) => <span key={agent}><Bot size={16} />{agent}</span>)}</div>{renderProof("network", 5)}</div>
      </section>

      <section className={styles.sectors} id="sectors">
        <Reveal className={styles.sectionIntro}><span>{pick(section("sectors", 6).eyebrow, locale)}</span><h2>{pick(section("sectors", 6).title, locale)}</h2><p>{pick(section("sectors", 6).body, locale)}</p></Reveal>
        <div className={styles.portalGrid}>{projectsFor("sectors", 6).map((project, index) => <Link href={projectHref(project, props)} key={project.id}><span>WORLD / 0{index + 1}</span><h3>{pick(project.title, locale)}</h3><p>{pick(project.challenge, locale)}</p><div><small>{pick(project.outcome, locale)}</small><ArrowUpRight /></div></Link>)}</div>
      </section>

      <section className={styles.timeSection} id="time">
        <Reveal className={styles.sectionIntro}><span>{pick(section("time", 7).eyebrow, locale)}</span><h2>{pick(section("time", 7).title, locale)}</h2><p>{pick(section("time", 7).body, locale)}</p></Reveal>
        <div className={styles.timeFlow}><div><span>{copy.input}</span>{copy.before.map((item) => <b key={item}>{item}</b>)}</div><TimerReset size={44} aria-hidden /><div><span>{copy.output}</span>{copy.after.map((item) => <b key={item}>{item}</b>)}</div></div>
        {renderProof("time", 7)}
      </section>

      <section className={styles.constellation} id="constellation">
        <div className={styles.constellationHead}><span>{pick(section("constellation", 8).eyebrow, locale)}</span><h2>{pick(section("constellation", 8).title, locale)}</h2><p>{pick(section("constellation", 8).body, locale)}</p></div>
        <div className={styles.projectUniverse}>{projects.map((project, index) => <Link key={project.id} href={projectHref(project, props)} style={{ "--project-index": index } as React.CSSProperties}><span>{String(index + 1).padStart(2, "0")}</span><Network aria-hidden size={22} /><h3>{pick(project.title, locale)}</h3><p>{pick(project.summary, locale)}</p><b>{copy.view}<ArrowUpRight size={15} /></b></Link>)}</div>
      </section>

      <section className={styles.proofSection} id="proof">
        <div><span>{copy.reviews}</span><h2>{pick(content.reviews.heading, locale)}</h2><p>{pick(content.reviews.intro, locale)}</p></div>
        {visibleReviews.length ? <div className={styles.reviewRail}>{visibleReviews.map((review) => <blockquote key={review.id}><p>“{pick(review.quote, locale)}”</p><footer>{review.avatarUrl ? <Image src={review.avatarUrl} alt={pick(review.avatarAlt, locale)} width={48} height={48} unoptimized /> : null}<span><b>{pick(review.author, locale)}</b><small>{pick(review.role, locale)}{review.company ? ` · ${review.company}` : ""}</small></span></footer></blockquote>)}</div> : <p className={styles.emptyProof}>{copy.noReviews}</p>}
        {visibleCompanies.length ? <div className={styles.companyRail} aria-label={copy.companies}>{visibleCompanies.map((company) => <div key={company.id}>{company.logoUrl ? <Image src={company.logoUrl} alt={pick(company.alt, locale)} width={100} height={50} unoptimized /> : null}{company.showName ? <span>{pick(company.name, locale)}</span> : null}</div>)}</div> : null}
      </section>

      <footer className={styles.footer} id="contact">
        <Image className={styles.footerAvatar} src="/agentic-growth-core/avatar.webp" alt="Khalid's 3D avatar" width={430} height={405} unoptimized />
        <div><span>{pick(section("contact", 9).eyebrow, locale)}</span><h2>{pick(section("contact", 9).title, locale)}</h2><p>{pick(section("contact", 9).body, locale)}</p><div className={styles.contactActions}><a href={`mailto:${content.profile.email}`}><Mail size={18} />{copy.email}</a><a href={`https://wa.me/${content.profile.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={18} />{copy.whatsapp}</a></div>{renderProof("contact", 9, true)}</div>
      </footer>
    </main>
  );
}
