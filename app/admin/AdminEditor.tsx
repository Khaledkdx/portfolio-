"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { MediaAsset } from "@/lib/data";
import { DESIGN_NAMES, DESIGN_SLUGS, type Locale, type Project, type SiteContent } from "@/lib/site-content";

type Tab = "overview" | "projects" | "services" | "experience" | "media";

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "overview", label: "Profile & settings" },
  { id: "projects", label: "Case studies" },
  { id: "services", label: "Services & skills" },
  { id: "experience", label: "Experience" },
  { id: "media", label: "Media library" },
];

function Field({ label, value, onChange, multiline = false, dir }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; dir?: "rtl" | "ltr" }) {
  return <label className="admin-field"><span>{label}</span>{multiline ? <textarea rows={4} value={value} dir={dir} onChange={(event) => onChange(event.target.value)} /> : <input value={value} dir={dir} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function LocalizedField({ label, value, locale, onChange, multiline = false }: { label: string; value: { en: string; ar: string }; locale: Locale; onChange: (value: string) => void; multiline?: boolean }) {
  return <Field label={`${label} · ${locale.toUpperCase()}`} value={value[locale]} onChange={onChange} multiline={multiline} dir={locale === "ar" ? "rtl" : "ltr"} />;
}

function newProject(order: number): Project {
  return {
    id: crypto.randomUUID(), status: "draft", order,
    eyebrow: { en: "NEW CASE STUDY", ar: "دراسة حالة جديدة" },
    title: { en: "Untitled project", ar: "مشروع بدون عنوان" },
    summary: { en: "Add a concise project summary.", ar: "أضف ملخصًا موجزًا للمشروع." },
    challenge: { en: "Describe the business challenge.", ar: "صف التحدي التجاري." },
    solution: { en: "Describe your approach and solution.", ar: "صف منهجك والحل الذي قدمته." },
    outcome: { en: "Describe the verified business value.", ar: "صف القيمة الموثقة التي تحققت للأعمال." },
    tools: [], metrics: [], image: "", externalUrl: "",
  };
}

export function AdminEditor({ initialContent, initialMedia, ownerName }: { initialContent: SiteContent; initialMedia: MediaAsset[]; ownerName: string }) {
  const [content, setContent] = useState(initialContent);
  const [media, setMedia] = useState(initialMedia);
  const [tab, setTab] = useState<Tab>("overview");
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedProject, setSelectedProject] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [uploading, setUploading] = useState(false);
  const project = content.projects[selectedProject];
  const publishedCount = useMemo(() => content.projects.filter((item) => item.status === "published").length, [content.projects]);

  function setLocalized(target: { en: string; ar: string }, value: string) {
    return { ...target, [locale]: value };
  }

  async function save() {
    setSaving(true); setNotice("");
    const response = await fetch("/api/admin/content", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(content) });
    setNotice(response.ok ? "All changes are live." : "Changes could not be saved. Please try again.");
    setSaving(false);
  }

  function updateProject(patch: Partial<Project>) {
    setContent((current) => ({ ...current, projects: current.projects.map((item, index) => index === selectedProject ? { ...item, ...patch } : item) }));
  }

  function addProject() {
    setContent((current) => ({ ...current, projects: [...current.projects, newProject(current.projects.length + 1)] }));
    setSelectedProject(content.projects.length);
  }

  async function upload(file: File, target: "portrait" | "project") {
    setUploading(true); setNotice("");
    const form = new FormData(); form.append("file", file); form.append("altEn", target === "portrait" ? "Khalid Mohamad" : project?.title.en ?? "Project image"); form.append("altAr", target === "portrait" ? "خالد محمد" : project?.title.ar ?? "صورة المشروع");
    const response = await fetch("/api/admin/media", { method: "POST", body: form });
    if (response.ok) {
      const asset = await response.json() as MediaAsset;
      setMedia((current) => [asset, ...current]);
      if (target === "portrait") setContent((current) => ({ ...current, profile: { ...current.profile, portrait: asset.url } }));
      else updateProject({ image: asset.url });
      setNotice("Image uploaded. Save changes to publish it.");
    } else {
      const error = await response.json() as { error?: string };
      setNotice(error.error ?? "Upload failed.");
    }
    setUploading(false);
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span>K/</span><div><b>Khalid</b><small>Portfolio control</small></div></div>
        <nav>{tabs.map((item, index) => <button className={tab === item.id ? "active" : ""} key={item.id} onClick={() => setTab(item.id)}><span>0{index + 1}</span>{item.label}</button>)}</nav>
        <div className="admin-side-footer"><Link href="/designs">Design lab</Link><Link href="/en">View live site ↗</Link><Link href="/signout-with-chatgpt?return_to=/en">Sign out</Link></div>
      </aside>
      <section className="admin-main">
        <header className="admin-topbar"><div><p>Welcome, {ownerName}</p><h1>{tabs.find((item) => item.id === tab)?.label}</h1></div><div className="admin-top-actions"><div className="locale-toggle"><button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>EN</button><button className={locale === "ar" ? "active" : ""} onClick={() => setLocale("ar")}>AR</button></div><button className="save-button" disabled={saving} onClick={save}>{saving ? "Saving…" : "Save & publish"}</button></div></header>
        {notice && <div className="admin-notice" role="status">{notice}</div>}

        {tab === "overview" && <div className="admin-content-grid">
          <div className="admin-panel wide"><header><span>PUBLIC PROFILE</span><h2>Your core message</h2></header><div className="field-grid">
            <Field label="Name" value={content.profile.name} onChange={(name) => setContent({ ...content, profile: { ...content.profile, name } })} />
            <LocalizedField label="Professional title" value={content.profile.role} locale={locale} onChange={(value) => setContent({ ...content, profile: { ...content.profile, role: setLocalized(content.profile.role, value) } })} />
            <div className="full"><LocalizedField label="Headline" value={content.profile.headline} locale={locale} multiline onChange={(value) => setContent({ ...content, profile: { ...content.profile, headline: setLocalized(content.profile.headline, value) } })} /></div>
            <div className="full"><LocalizedField label="Introduction" value={content.profile.intro} locale={locale} multiline onChange={(value) => setContent({ ...content, profile: { ...content.profile, intro: setLocalized(content.profile.intro, value) } })} /></div>
            <div className="full"><LocalizedField label="Availability" value={content.profile.availability} locale={locale} multiline onChange={(value) => setContent({ ...content, profile: { ...content.profile, availability: setLocalized(content.profile.availability, value) } })} /></div>
          </div></div>
          <div className="admin-panel"><header><span>CONTACT</span><h2>Public details</h2></header>
            <Field label="Email" value={content.profile.email} onChange={(email) => setContent({ ...content, profile: { ...content.profile, email } })} />
            <Field label="WhatsApp · international digits" value={content.profile.whatsapp} onChange={(whatsapp) => setContent({ ...content, profile: { ...content.profile, whatsapp: whatsapp.replace(/\D/g, "") } })} />
            <Field label="LinkedIn URL · optional" value={content.profile.linkedin} onChange={(linkedin) => setContent({ ...content, profile: { ...content.profile, linkedin } })} />
          </div>
          <div className="admin-panel"><header><span>LIVE DESIGN</span><h2>Choose the direction</h2></header><select className="admin-select" value={content.activeDesign} onChange={(event) => setContent({ ...content, activeDesign: event.target.value as SiteContent["activeDesign"] })}>{DESIGN_SLUGS.map((design) => <option value={design} key={design}>{DESIGN_NAMES[design]}</option>)}</select><Link className="panel-link" href="/designs">Compare all 10 designs ↗</Link></div>
          <div className="admin-panel portrait-panel"><header><span>PORTRAIT</span><h2>Profile image</h2></header><Image src={content.profile.portrait} width={360} height={460} alt="Current portrait" unoptimized className="admin-portrait" /><label className="upload-button">{uploading ? "Uploading…" : "Upload replacement"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => event.target.files?.[0] && upload(event.target.files[0], "portrait")} /></label></div>
        </div>}

        {tab === "projects" && <div className="project-editor-layout"><aside className="project-index"><div className="project-index-head"><span>{publishedCount} published</span><button onClick={addProject}>＋ Add project</button></div>{content.projects.map((item, index) => <button key={item.id} className={selectedProject === index ? "active" : ""} onClick={() => setSelectedProject(index)}><i className={`status-${item.status}`} /><span>{item.title.en}</span><small>{item.status}</small></button>)}</aside>
          {project && <div className="admin-panel project-editor"><header><div><span>CASE STUDY {String(selectedProject + 1).padStart(2, "0")}</span><h2>{project.title.en}</h2></div><select value={project.status} onChange={(event) => updateProject({ status: event.target.value as Project["status"] })}><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></header><div className="field-grid">
            <LocalizedField label="Eyebrow" value={project.eyebrow} locale={locale} onChange={(value) => updateProject({ eyebrow: setLocalized(project.eyebrow, value) })} />
            <LocalizedField label="Title" value={project.title} locale={locale} onChange={(value) => updateProject({ title: setLocalized(project.title, value) })} />
            <div className="full"><LocalizedField label="Summary" value={project.summary} locale={locale} multiline onChange={(value) => updateProject({ summary: setLocalized(project.summary, value) })} /></div>
            <div className="full"><LocalizedField label="Challenge" value={project.challenge} locale={locale} multiline onChange={(value) => updateProject({ challenge: setLocalized(project.challenge, value) })} /></div>
            <div className="full"><LocalizedField label="Response" value={project.solution} locale={locale} multiline onChange={(value) => updateProject({ solution: setLocalized(project.solution, value) })} /></div>
            <div className="full"><LocalizedField label="Business value" value={project.outcome} locale={locale} multiline onChange={(value) => updateProject({ outcome: setLocalized(project.outcome, value) })} /></div>
            <div className="full"><Field label="Tools · comma separated" value={project.tools.join(", ")} onChange={(value) => updateProject({ tools: value.split(",").map((tool) => tool.trim()).filter(Boolean) })} /></div>
            <Field label="External URL · optional" value={project.externalUrl ?? ""} onChange={(externalUrl) => updateProject({ externalUrl })} />
            <Field label="Display order" value={String(project.order)} onChange={(order) => updateProject({ order: Number(order) || 1 })} />
          </div><div className="project-media-row">{project.image ? <Image src={project.image} alt={project.title.en} width={280} height={170} unoptimized /> : <div>No project image</div>}<label className="upload-button">{uploading ? "Uploading…" : "Upload project image"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => event.target.files?.[0] && upload(event.target.files[0], "project")} /></label></div></div>}
        </div>}

        {tab === "services" && <div className="admin-stack"><div className="admin-panel"><header><span>SERVICES</span><h2>What you bring</h2></header>{content.services.map((service, index) => <div className="repeater" key={service.id}><span>{service.number}</span><div className="field-grid"><LocalizedField label="Service" value={service.title} locale={locale} onChange={(value) => setContent({ ...content, services: content.services.map((item, i) => i === index ? { ...item, title: setLocalized(item.title, value) } : item) })} /><LocalizedField label="Description" value={service.description} locale={locale} multiline onChange={(value) => setContent({ ...content, services: content.services.map((item, i) => i === index ? { ...item, description: setLocalized(item.description, value) } : item) })} /></div></div>)}</div><div className="admin-panel"><header><span>CAPABILITIES</span><h2>Skills and tools</h2></header><Field label="Comma separated" value={content.skills.join(", ")} multiline onChange={(value) => setContent({ ...content, skills: value.split(",").map((item) => item.trim()).filter(Boolean) })} /></div></div>}

        {tab === "experience" && <div className="admin-stack"><div className="admin-panel"><header><span>SELECTED EXPERIENCE</span><h2>Career narrative</h2></header>{content.experiences.map((experience, index) => <div className="repeater experience-edit" key={experience.id}><span>{String(index + 1).padStart(2, "0")}</span><div className="field-grid"><LocalizedField label="Role" value={experience.role} locale={locale} onChange={(value) => setContent({ ...content, experiences: content.experiences.map((item, i) => i === index ? { ...item, role: setLocalized(item.role, value) } : item) })} /><Field label="Company" value={experience.company} onChange={(company) => setContent({ ...content, experiences: content.experiences.map((item, i) => i === index ? { ...item, company } : item) })} /><Field label="Period / label" value={experience.period} onChange={(period) => setContent({ ...content, experiences: content.experiences.map((item, i) => i === index ? { ...item, period } : item) })} /><div className="full"><LocalizedField label="Summary" value={experience.summary} locale={locale} multiline onChange={(value) => setContent({ ...content, experiences: content.experiences.map((item, i) => i === index ? { ...item, summary: setLocalized(item.summary, value) } : item) })} /></div></div></div>)}</div></div>}

        {tab === "media" && <div className="admin-panel"><header><span>R2 MEDIA</span><h2>Uploaded assets</h2></header><label className="upload-button standalone">{uploading ? "Uploading…" : "Upload image"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => event.target.files?.[0] && upload(event.target.files[0], "portrait")} /></label><div className="media-grid">{media.length === 0 ? <p className="empty-state">No uploaded assets yet. The original portrait is stored with the site.</p> : media.map((asset) => <article key={asset.id}><Image src={asset.url} alt={asset.altEn || asset.filename} width={260} height={200} unoptimized /><div><b>{asset.filename}</b><span>{Math.round(asset.size / 1024)} KB</span></div></article>)}</div></div>}
      </section>
    </main>
  );
}
