import Image from "next/image";
import Link from "next/link";
import {
  DESIGN_NAMES,
  pick,
  type DesignSlug,
  type Locale,
  type Project,
  type SiteContent,
} from "@/lib/site-content";

type Props = {
  content: SiteContent;
  locale: Locale;
  design?: DesignSlug;
  preview?: boolean;
  variantPath?: string;
};

type ResolvedProps = Props & { design: DesignSlug; preview: boolean };

function Nav({ content, locale, design, preview, variantPath }: Props & { design: DesignSlug }) {
  const nextLocale = locale === "en" ? "ar" : "en";
  const localeHref = variantPath
    ? `${variantPath}?locale=${nextLocale}`
    : preview
      ? `/designs/${design}?locale=${nextLocale}`
      : `/${nextLocale}`;
  return (
    <nav className="site-nav" aria-label={locale === "en" ? "Main navigation" : "التنقل الرئيسي"}>
      <a className="brand" href="#top" aria-label="Khalid Mohamad home">
        <span className="brand-mark">K/</span>
        <span className="brand-name">Khalid Mohamad</span>
      </a>
      <div className="nav-links">
        <a href="#work">{pick(content.labels.work, locale)}</a>
        <a href="#services">{pick(content.labels.services, locale)}</a>
        <a href="#experience">{pick(content.labels.experience, locale)}</a>
        <a className="nav-contact" href="#contact">{pick(content.labels.contact, locale)}</a>
        <Link className="language-switch" href={localeHref} lang={nextLocale}>
          {locale === "en" ? "عربي" : "EN"}
        </Link>
      </div>
    </nav>
  );
}

function Portrait({ content, priority = false }: { content: SiteContent; priority?: boolean }) {
  return (
    <div className="portrait-wrap">
      <Image
        className="portrait"
        src={content.profile.portrait}
        alt="Khalid Mohamad"
        width={900}
        height={1200}
        priority={priority}
        unoptimized
      />
      <span className="portrait-stamp" aria-hidden="true">GROW / BUILD / IMPROVE</span>
    </div>
  );
}

function HeroCopy({ content, locale }: Pick<Props, "content" | "locale">) {
  return (
    <div className="hero-copy">
      <p className="kicker">{pick(content.profile.role, locale)}</p>
      <h1>{pick(content.profile.headline, locale)}</h1>
      <p className="hero-intro">{pick(content.profile.intro, locale)}</p>
      <div className="hero-actions">
        <a className="button primary" href="#work">{pick(content.labels.work, locale)}</a>
        <a className="button text" href={`mailto:${content.profile.email}`}>{pick(content.labels.email, locale)} ↗</a>
      </div>
    </div>
  );
}

function Approach({ content, locale }: Pick<Props, "content" | "locale">) {
  return (
    <section className="approach-section section" id="approach">
      <header className="section-heading">
        <span className="section-index">01</span>
        <h2>{pick(content.labels.approach, locale)}</h2>
      </header>
      <div className="approach-grid">
        {content.approach.map((item, index) => (
          <article className="approach-card" key={item.id}>
            <span className="card-index">0{index + 1}</span>
            <h3>{pick(item.title, locale)}</h3>
            <p>{pick(item.description, locale)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services({ content, locale }: Pick<Props, "content" | "locale">) {
  return (
    <section className="services-section section" id="services">
      <header className="section-heading">
        <span className="section-index">02</span>
        <h2>{pick(content.labels.services, locale)}</h2>
      </header>
      <div className="service-list">
        {content.services.map((service) => (
          <article className="service-row" key={service.id}>
            <span className="service-number">{service.number}</span>
            <h3>{pick(service.title, locale)}</h3>
            <p>{pick(service.description, locale)}</p>
          </article>
        ))}
      </div>
      <div className="skill-ticker" aria-label={locale === "en" ? "Skills" : "المهارات"}>
        {content.skills.map((skill) => <span key={skill}>{skill}</span>)}
      </div>
    </section>
  );
}

function ProjectCard({ project, content, locale, featured = false }: {
  project: Project;
  content: SiteContent;
  locale: Locale;
  featured?: boolean;
}) {
  return (
    <article className={`project-card${featured ? " project-featured" : ""}`}>
      {project.image ? (
        <Image className="project-image" src={project.image} alt={pick(project.title, locale)} width={1200} height={800} unoptimized />
      ) : (
        <div className="project-art" aria-hidden="true"><span>{String(project.order).padStart(2, "0")}</span></div>
      )}
      <div className="project-content">
        <p className="project-eyebrow">{pick(project.eyebrow, locale)}</p>
        <h3>{pick(project.title, locale)}</h3>
        <p className="project-summary">{pick(project.summary, locale)}</p>
        <div className="tool-list">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
        {project.metrics.length > 0 && (
          <div className="metrics">
            {project.metrics.map((metric, index) => (
              <span key={`${metric.value}-${index}`}><strong>{metric.value}</strong>{pick(metric.label, locale)}</span>
            ))}
          </div>
        )}
        <details className="case-details">
          <summary>{pick(content.labels.viewCase, locale)} <span>＋</span></summary>
          <div className="case-grid">
            <div><b>{pick(content.labels.challenge, locale)}</b><p>{pick(project.challenge, locale)}</p></div>
            <div><b>{pick(content.labels.solution, locale)}</b><p>{pick(project.solution, locale)}</p></div>
            <div><b>{pick(content.labels.outcome, locale)}</b><p>{pick(project.outcome, locale)}</p></div>
          </div>
        </details>
      </div>
    </article>
  );
}

function Projects({ content, locale, lead = false }: Pick<Props, "content" | "locale"> & { lead?: boolean }) {
  const projects = content.projects.filter((project) => project.status === "published").sort((a, b) => a.order - b.order);
  return (
    <section className="projects-section section" id="work">
      <header className="section-heading">
        <span className="section-index">03</span>
        <h2>{pick(content.labels.work, locale)}</h2>
        <p>{locale === "en" ? "Work across growth, marketing, automation and technology." : "أعمال تجمع بين النمو والتسويق والأتمتة والتقنية."}</p>
      </header>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} content={content} locale={locale} featured={lead && index === 0} />
        ))}
      </div>
    </section>
  );
}

function Experience({ content, locale }: Pick<Props, "content" | "locale">) {
  return (
    <section className="experience-section section" id="experience">
      <header className="section-heading">
        <span className="section-index">04</span>
        <h2>{pick(content.labels.experience, locale)}</h2>
      </header>
      <div className="experience-list">
        {content.experiences.map((experience) => (
          <article key={experience.id} className="experience-row">
            <div><span>{experience.period}</span><strong>{experience.company}</strong></div>
            <h3>{pick(experience.role, locale)}</h3>
            <p>{pick(experience.summary, locale)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact({ content, locale }: Pick<Props, "content" | "locale">) {
  return (
    <footer className="contact-section" id="contact">
      <p className="kicker">{pick(content.profile.availability, locale)}</p>
      <h2>{pick(content.labels.contact, locale)}</h2>
      <p>{pick(content.labels.contactCopy, locale)}</p>
      <div className="contact-actions">
        <a href={`mailto:${content.profile.email}`}>{content.profile.email} ↗</a>
        <a href={`https://wa.me/${content.profile.whatsapp}`} target="_blank" rel="noreferrer">{pick(content.labels.whatsapp, locale)} ↗</a>
        {content.profile.linkedin && <a href={content.profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
      </div>
      <div className="footer-line"><span>Khalid Mohamad © {new Date().getFullYear()}</span><span>Business Growth & Automation</span></div>
    </footer>
  );
}

function ThemeLabel({ design, preview }: { design: DesignSlug; preview?: boolean }) {
  if (!preview) return null;
  return <div className="preview-label"><Link href="/designs">← Design lab</Link><span>{DESIGN_NAMES[design]}</span></div>;
}

function StandardFlow({ content, locale, design, preview, variantPath }: ResolvedProps) {
  return <main className={`portfolio theme-${design}`} id="top" dir={locale === "ar" ? "rtl" : "ltr"}>
    <ThemeLabel design={design} preview={preview} />
    <Nav content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
    <section className="hero hero-split"><HeroCopy content={content} locale={locale} /><Portrait content={content} priority /></section>
    <Approach content={content} locale={locale} />
    <Services content={content} locale={locale} />
    <Projects content={content} locale={locale} lead />
    <Experience content={content} locale={locale} />
    <Contact content={content} locale={locale} />
  </main>;
}

function ExecutiveFlow({ content, locale, design, preview, variantPath }: ResolvedProps) {
  return <main className={`portfolio theme-${design}`} id="top" dir={locale === "ar" ? "rtl" : "ltr"}>
    <ThemeLabel design={design} preview={preview} /><Nav content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
    <section className="hero hero-executive"><p className="kicker">Private brief / 2026</p><HeroCopy content={content} locale={locale} /><Portrait content={content} priority /></section>
    <Projects content={content} locale={locale} lead /><div className="paired-sections"><Services content={content} locale={locale} /><Approach content={content} locale={locale} /></div>
    <Experience content={content} locale={locale} /><Contact content={content} locale={locale} />
  </main>;
}

function CampaignFlow({ content, locale, design, preview, variantPath }: ResolvedProps) {
  return <main className={`portfolio theme-${design}`} id="top" dir={locale === "ar" ? "rtl" : "ltr"}>
    <ThemeLabel design={design} preview={preview} /><Nav content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
    <section className="hero hero-campaign"><div className="issue-tag">ISSUE 01 — GROWTH</div><HeroCopy content={content} locale={locale} /><Portrait content={content} priority /></section>
    <Services content={content} locale={locale} /><Projects content={content} locale={locale} /><Approach content={content} locale={locale} /><Experience content={content} locale={locale} /><Contact content={content} locale={locale} />
  </main>;
}

function SystemsFlow({ content, locale, design, preview, variantPath }: ResolvedProps) {
  return <main className={`portfolio theme-${design}`} id="top" dir={locale === "ar" ? "rtl" : "ltr"}>
    <ThemeLabel design={design} preview={preview} /><Nav content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
    <section className="hero hero-system"><HeroCopy content={content} locale={locale} /><div className="system-orbit"><Portrait content={content} priority /><span className="node node-a">MARKET</span><span className="node node-b">SYSTEM</span><span className="node node-c">GROWTH</span></div></section>
    <Approach content={content} locale={locale} /><Projects content={content} locale={locale} /><Services content={content} locale={locale} /><Experience content={content} locale={locale} /><Contact content={content} locale={locale} />
  </main>;
}

function SignalFlow({ content, locale, design, preview, variantPath }: ResolvedProps) {
  return <main className={`portfolio theme-${design}`} id="top" dir={locale === "ar" ? "rtl" : "ltr"}>
    <ThemeLabel design={design} preview={preview} /><Nav content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
    <section className="hero hero-signal"><HeroCopy content={content} locale={locale} /><div className="signal-side"><Portrait content={content} priority /><div className="signal-note">STRATEGY → SYSTEM → SCALE</div></div></section>
    <div className="signal-band"><span>BUSINESS DEVELOPMENT</span><span>PERFORMANCE MARKETING</span><span>AI AUTOMATION</span></div>
    <Projects content={content} locale={locale} lead /><Services content={content} locale={locale} /><Approach content={content} locale={locale} /><Experience content={content} locale={locale} /><Contact content={content} locale={locale} />
  </main>;
}

function GulfFlow({ content, locale, design, preview, variantPath }: ResolvedProps) {
  return <main className={`portfolio theme-${design}`} id="top" dir={locale === "ar" ? "rtl" : "ltr"}>
    <ThemeLabel design={design} preview={preview} /><Nav content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
    <section className="hero hero-gulf"><div className="gulf-arch"><Portrait content={content} priority /></div><HeroCopy content={content} locale={locale} /><p className="vertical-note">UAE · KSA · REMOTE</p></section>
    <Approach content={content} locale={locale} /><Services content={content} locale={locale} /><Projects content={content} locale={locale} /><Experience content={content} locale={locale} /><Contact content={content} locale={locale} />
  </main>;
}

function ProofFlow({ content, locale, design, preview, variantPath }: ResolvedProps) {
  return <main className={`portfolio theme-${design}`} id="top" dir={locale === "ar" ? "rtl" : "ltr"}>
    <ThemeLabel design={design} preview={preview} /><Nav content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
    <section className="hero hero-proof"><div className="proof-number">04</div><HeroCopy content={content} locale={locale} /><Portrait content={content} priority /></section>
    <Projects content={content} locale={locale} lead /><Services content={content} locale={locale} /><Experience content={content} locale={locale} /><Approach content={content} locale={locale} /><Contact content={content} locale={locale} />
  </main>;
}

function MomentumFlow({ content, locale, design, preview, variantPath }: ResolvedProps) {
  return <main className={`portfolio theme-${design}`} id="top" dir={locale === "ar" ? "rtl" : "ltr"}>
    <ThemeLabel design={design} preview={preview} /><Nav content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
    <section className="hero hero-momentum"><div className="momentum-word" aria-hidden="true">MOVE</div><HeroCopy content={content} locale={locale} /><Portrait content={content} priority /></section>
    <Services content={content} locale={locale} /><Approach content={content} locale={locale} /><Projects content={content} locale={locale} lead /><Experience content={content} locale={locale} /><Contact content={content} locale={locale} />
  </main>;
}

function LedgerFlow({ content, locale, design, preview, variantPath }: ResolvedProps) {
  return <main className={`portfolio theme-${design}`} id="top" dir={locale === "ar" ? "rtl" : "ltr"}>
    <ThemeLabel design={design} preview={preview} /><Nav content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
    <section className="hero hero-ledger"><div className="ledger-meta"><span>FILE: KM-001</span><span>STATUS: OPEN</span></div><HeroCopy content={content} locale={locale} /><Portrait content={content} priority /></section>
    <Approach content={content} locale={locale} /><Projects content={content} locale={locale} /><div className="paired-sections"><Experience content={content} locale={locale} /><Services content={content} locale={locale} /></div><Contact content={content} locale={locale} />
  </main>;
}

function ControlFlow({ content, locale, design, preview, variantPath }: ResolvedProps) {
  return <main className={`portfolio theme-${design}`} id="top" dir={locale === "ar" ? "rtl" : "ltr"}>
    <ThemeLabel design={design} preview={preview} /><Nav content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
    <section className="hero hero-control"><div className="control-status"><i /> SYSTEM ONLINE</div><HeroCopy content={content} locale={locale} /><Portrait content={content} priority /><div className="control-readout"><span>01 DIAGNOSE</span><span>02 DESIGN</span><span>03 IMPROVE</span></div></section>
    <Approach content={content} locale={locale} /><Services content={content} locale={locale} /><Projects content={content} locale={locale} /><Experience content={content} locale={locale} /><Contact content={content} locale={locale} />
  </main>;
}

export function Portfolio({ content, locale, design = content.activeDesign, preview = false, variantPath }: Props) {
  const props: ResolvedProps = { content, locale, design, preview, variantPath };
  switch (design) {
    case "executive-brief": return <ExecutiveFlow {...props} />;
    case "campaign-desk": return <CampaignFlow {...props} />;
    case "systems-map": return <SystemsFlow {...props} />;
    case "signal-scale": return <SignalFlow {...props} />;
    case "gulf-modern": return <GulfFlow {...props} />;
    case "proof-of-work": return <ProofFlow {...props} />;
    case "momentum": return <MomentumFlow {...props} />;
    case "studio-ledger": return <LedgerFlow {...props} />;
    case "control-room": return <ControlFlow {...props} />;
    default: return <StandardFlow {...props} />;
  }
}
