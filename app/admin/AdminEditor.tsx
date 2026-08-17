"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { MediaAsset } from "@/lib/data";
import {
  DESIGN_NAMES,
  DESIGN_SLUGS,
  normalizeSiteContent,
  type Locale,
  type Project,
  type ProjectImage,
  type ProjectLink,
  type SiteContent,
} from "@/lib/site-content";

type Tab = "overview" | "projects" | "services" | "experience" | "media";
type Copy = typeof copy.en;

const copy = {
  en: {
    tabs: {
      overview: "Profile & settings",
      projects: "Case studies",
      services: "Services & skills",
      experience: "Experience",
      media: "Media library",
    },
    control: "Portfolio control",
    welcome: "Welcome",
    save: "Save & publish",
    saving: "Saving…",
    saved: "All changes are live.",
    failed: "Changes could not be saved.",
    lab: "Design lab",
    live: "View live site ↗",
    signout: "Sign out",
    profile: "Public profile",
    core: "Your core message",
    name: "Name",
    role: "Professional title",
    headline: "Headline",
    intro: "Introduction",
    availability: "Availability",
    contact: "Contact",
    details: "Public details",
    email: "Email",
    whatsapp: "WhatsApp · international digits",
    linkedin: "LinkedIn URL · optional",
    design: "Live design",
    direction: "Choose the direction",
    compare: "Compare all 10 designs ↗",
    portrait: "Portrait",
    profileImage: "Profile image",
    replace: "Upload replacement",
    uploading: "Uploading…",
    published: "published",
    addProject: "＋ Add project",
    caseStudy: "Case study",
    status: { published: "Published", draft: "Draft", archived: "Archived" },
    eyebrow: "Eyebrow",
    title: "Title",
    summary: "Summary",
    challenge: "Challenge",
    response: "Response",
    value: "Business value",
    tools: "Tools · comma separated",
    order: "Display order",
    gallery: "Project gallery",
    galleryHelp: "Up to 6 images. The first image is the cover.",
    uploadImages: "Upload images",
    cover: "Cover",
    makeCover: "Make cover",
    remove: "Remove",
    moveUp: "Move up",
    moveDown: "Move down",
    alt: "Image alt text",
    library: "Choose from media library",
    add: "Add",
    links: "Project links",
    linksHelp: "Up to 3 named links. Only http/https links are accepted.",
    addLink: "＋ Add link",
    linkName: "Link name",
    url: "External URL",
    noImages: "No images yet.",
    noLinks: "No links yet.",
    services: "Services",
    bring: "What you bring",
    service: "Service",
    description: "Description",
    capabilities: "Capabilities",
    skills: "Skills and tools",
    comma: "Comma separated",
    selectedExperience: "Selected experience",
    career: "Career narrative",
    company: "Company",
    period: "Period / label",
    r2: "R2 media",
    assets: "Uploaded assets",
    upload: "Upload image",
    empty:
      "No uploaded assets yet. Upload an image to reuse it across projects.",
    uploaded: "Image uploaded. Save changes to publish it.",
    added: "Image added to the project.",
    maxImages: "This project already has 6 images.",
    maxLinks: "This project already has 3 links.",
  },
  ar: {
    tabs: {
      overview: "الملف والإعدادات",
      projects: "دراسات الحالة",
      services: "الخدمات والمهارات",
      experience: "الخبرات",
      media: "مكتبة الوسائط",
    },
    control: "إدارة البورتفوليو",
    welcome: "مرحبًا",
    save: "حفظ ونشر",
    saving: "جارٍ الحفظ…",
    saved: "تم نشر جميع التغييرات.",
    failed: "تعذر حفظ التغييرات.",
    lab: "مختبر التصاميم",
    live: "عرض الموقع ↗",
    signout: "تسجيل الخروج",
    profile: "الملف العام",
    core: "رسالتك الأساسية",
    name: "الاسم",
    role: "المسمى المهني",
    headline: "العنوان الرئيسي",
    intro: "المقدمة",
    availability: "التوفر للعمل",
    contact: "التواصل",
    details: "البيانات العامة",
    email: "البريد الإلكتروني",
    whatsapp: "واتساب · أرقام دولية",
    linkedin: "رابط LinkedIn · اختياري",
    design: "التصميم النشط",
    direction: "اختر الاتجاه",
    compare: "قارن التصاميم العشرة ↗",
    portrait: "الصورة الشخصية",
    profileImage: "صورة الملف",
    replace: "رفع صورة بديلة",
    uploading: "جارٍ الرفع…",
    published: "منشور",
    addProject: "＋ إضافة مشروع",
    caseStudy: "دراسة حالة",
    status: { published: "منشور", draft: "مسودة", archived: "مؤرشف" },
    eyebrow: "العنوان العلوي",
    title: "العنوان",
    summary: "الملخص",
    challenge: "التحدي",
    response: "الحل",
    value: "القيمة للأعمال",
    tools: "الأدوات · افصل بفاصلة",
    order: "ترتيب العرض",
    gallery: "معرض المشروع",
    galleryHelp: "حتى 6 صور. الصورة الأولى هي الغلاف.",
    uploadImages: "رفع صور",
    cover: "الغلاف",
    makeCover: "اجعلها غلافًا",
    remove: "إزالة",
    moveUp: "تحريك لأعلى",
    moveDown: "تحريك لأسفل",
    alt: "النص البديل للصورة",
    library: "اختيار من مكتبة الوسائط",
    add: "إضافة",
    links: "روابط المشروع",
    linksHelp: "حتى 3 روابط مسماة. تقبل روابط http/https فقط.",
    addLink: "＋ إضافة رابط",
    linkName: "اسم الرابط",
    url: "الرابط الخارجي",
    noImages: "لا توجد صور بعد.",
    noLinks: "لا توجد روابط بعد.",
    services: "الخدمات",
    bring: "ما الذي تقدمه",
    service: "الخدمة",
    description: "الوصف",
    capabilities: "القدرات",
    skills: "المهارات والأدوات",
    comma: "افصل بفاصلة",
    selectedExperience: "خبرات مختارة",
    career: "المسار المهني",
    company: "الشركة",
    period: "الفترة / الوصف",
    r2: "وسائط R2",
    assets: "الملفات المرفوعة",
    upload: "رفع صورة",
    empty: "لا توجد ملفات مرفوعة بعد. ارفع صورة لإعادة استخدامها في المشاريع.",
    uploaded: "تم رفع الصورة. احفظ التغييرات لنشرها.",
    added: "تمت إضافة الصورة للمشروع.",
    maxImages: "يحتوي المشروع بالفعل على 6 صور.",
    maxLinks: "يحتوي المشروع بالفعل على 3 روابط.",
  },
} as const;

function Field({
  label,
  value,
  onChange,
  multiline = false,
  dir,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  dir?: "rtl" | "ltr";
  type?: string;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          dir={dir}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value}
          dir={dir}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function LocalizedField({
  label,
  value,
  locale,
  onChange,
  multiline = false,
}: {
  label: string;
  value: { en: string; ar: string };
  locale: Locale;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <Field
      label={`${label} · ${locale.toUpperCase()}`}
      value={value[locale]}
      onChange={onChange}
      multiline={multiline}
      dir={locale === "ar" ? "rtl" : "ltr"}
    />
  );
}

function newProject(order: number): Project {
  return {
    id: crypto.randomUUID(),
    status: "draft",
    order,
    eyebrow: { en: "NEW CASE STUDY", ar: "دراسة حالة جديدة" },
    title: { en: "Untitled project", ar: "مشروع بدون عنوان" },
    summary: {
      en: "Add a concise project summary.",
      ar: "أضف ملخصًا موجزًا للمشروع.",
    },
    challenge: {
      en: "Describe the business challenge.",
      ar: "صف التحدي التجاري.",
    },
    solution: {
      en: "Describe your approach and solution.",
      ar: "صف منهجك والحل الذي قدمته.",
    },
    outcome: {
      en: "Describe the verified business value.",
      ar: "صف القيمة الموثقة التي تحققت للأعمال.",
    },
    tools: [],
    metrics: [],
    images: [],
    links: [],
  };
}

function move<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length || from === to) return items;
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function AdminEditor({
  initialContent,
  initialMedia,
  ownerName,
}: {
  initialContent: SiteContent;
  initialMedia: MediaAsset[];
  ownerName: string;
}) {
  const [content, setContent] = useState(() =>
    normalizeSiteContent(initialContent),
  );
  const [media, setMedia] = useState(initialMedia);
  const [tab, setTab] = useState<Tab>("overview");
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedProject, setSelectedProject] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [uploading, setUploading] = useState(false);
  const project = content.projects[selectedProject];
  const t: Copy = copy[locale];
  const tabList = (Object.keys(t.tabs) as Tab[]).map((id) => ({
    id,
    label: t.tabs[id],
  }));
  const publishedCount = useMemo(
    () => content.projects.filter((item) => item.status === "published").length,
    [content.projects],
  );

  const localized = (target: { en: string; ar: string }, value: string) => ({
    ...target,
    [locale]: value,
  });
  const updateProject = (patch: Partial<Project>) =>
    setContent((current) => ({
      ...current,
      projects: current.projects.map((item, index) =>
        index === selectedProject ? { ...item, ...patch } : item,
      ),
    }));

  async function save() {
    setSaving(true);
    setNotice("");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(content),
    });
    const result = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    setNotice(response.ok ? t.saved : (result.error ?? t.failed));
    setSaving(false);
  }

  function addProject() {
    const nextIndex = content.projects.length;
    setContent((current) => ({
      ...current,
      projects: [...current.projects, newProject(current.projects.length + 1)],
    }));
    setSelectedProject(nextIndex);
  }

  function addAssetToProject(asset: MediaAsset) {
    if (!project || project.images.length >= 6) return setNotice(t.maxImages);
    if (project.images.some((image) => image.url === asset.url)) return;
    const image: ProjectImage = {
      id: crypto.randomUUID(),
      url: asset.url,
      alt: {
        en: asset.altEn || project.title.en,
        ar: asset.altAr || project.title.ar,
      },
    };
    updateProject({ images: [...project.images, image] });
    setNotice(t.added);
  }

  async function uploadFiles(
    files: File[],
    target: "portrait" | "project" | "library",
  ) {
    if (!files.length) return;
    setUploading(true);
    setNotice("");
    const uploaded: MediaAsset[] = [];
    for (const file of files.slice(
      0,
      target === "project"
        ? Math.max(0, 6 - (project?.images.length ?? 0))
        : files.length,
    )) {
      const form = new FormData();
      form.append("file", file);
      form.append(
        "altEn",
        target === "portrait"
          ? "Khalid Mohamad"
          : (project?.title.en ?? file.name),
      );
      form.append(
        "altAr",
        target === "portrait" ? "خالد محمد" : (project?.title.ar ?? file.name),
      );
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: form,
      });
      const result = (await response.json()) as MediaAsset & { error?: string };
      if (!response.ok) {
        setNotice(result.error ?? t.failed);
        continue;
      }
      uploaded.push(result);
    }
    setMedia((current) => [...uploaded.reverse(), ...current]);
    if (target === "portrait" && uploaded[0])
      setContent((current) => ({
        ...current,
        profile: { ...current.profile, portrait: uploaded[0].url },
      }));
    if (target === "project" && project && uploaded.length) {
      const additions = uploaded.map((asset) => ({
        id: crypto.randomUUID(),
        url: asset.url,
        alt: {
          en: asset.altEn || project.title.en,
          ar: asset.altAr || project.title.ar,
        },
      }));
      updateProject({ images: [...project.images, ...additions].slice(0, 6) });
    }
    if (uploaded.length) setNotice(t.uploaded);
    setUploading(false);
  }

  function addLink() {
    if (!project || project.links.length >= 3) return setNotice(t.maxLinks);
    const link: ProjectLink = {
      id: crypto.randomUUID(),
      label: { en: "Live website", ar: "الموقع المباشر" },
      url: "",
    };
    updateProject({ links: [...project.links, link] });
  }

  return (
    <main
      className="admin-shell"
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
    >
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>K/</span>
          <div>
            <b>Khalid</b>
            <small>{t.control}</small>
          </div>
        </div>
        <nav>
          {tabList.map((item, index) => (
            <button
              className={tab === item.id ? "active" : ""}
              key={item.id}
              onClick={() => setTab(item.id)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="admin-side-footer">
          <Link href="/designs">{t.lab}</Link>
          <Link href={`/${locale}`}>{t.live}</Link>
          <Link href="/signout-with-chatgpt?return_to=/en">{t.signout}</Link>
        </div>
      </aside>
      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <p>
              {t.welcome}, {ownerName}
            </p>
            <h1>{t.tabs[tab]}</h1>
          </div>
          <div className="admin-top-actions">
            <div className="locale-toggle">
              <button
                className={locale === "en" ? "active" : ""}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
              <button
                className={locale === "ar" ? "active" : ""}
                onClick={() => setLocale("ar")}
              >
                AR
              </button>
            </div>
            <button className="save-button" disabled={saving} onClick={save}>
              {saving ? t.saving : t.save}
            </button>
          </div>
        </header>
        {notice && (
          <div className="admin-notice" role="status">
            {notice}
          </div>
        )}

        {tab === "overview" && (
          <div className="admin-content-grid">
            <div className="admin-panel wide">
              <header>
                <span>{t.profile.toUpperCase()}</span>
                <h2>{t.core}</h2>
              </header>
              <div className="field-grid">
                <Field
                  label={t.name}
                  value={content.profile.name}
                  onChange={(name) =>
                    setContent({
                      ...content,
                      profile: { ...content.profile, name },
                    })
                  }
                />
                <LocalizedField
                  label={t.role}
                  value={content.profile.role}
                  locale={locale}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      profile: {
                        ...content.profile,
                        role: localized(content.profile.role, value),
                      },
                    })
                  }
                />
                <div className="full">
                  <LocalizedField
                    label={t.headline}
                    value={content.profile.headline}
                    locale={locale}
                    multiline
                    onChange={(value) =>
                      setContent({
                        ...content,
                        profile: {
                          ...content.profile,
                          headline: localized(content.profile.headline, value),
                        },
                      })
                    }
                  />
                </div>
                <div className="full">
                  <LocalizedField
                    label={t.intro}
                    value={content.profile.intro}
                    locale={locale}
                    multiline
                    onChange={(value) =>
                      setContent({
                        ...content,
                        profile: {
                          ...content.profile,
                          intro: localized(content.profile.intro, value),
                        },
                      })
                    }
                  />
                </div>
                <div className="full">
                  <LocalizedField
                    label={t.availability}
                    value={content.profile.availability}
                    locale={locale}
                    multiline
                    onChange={(value) =>
                      setContent({
                        ...content,
                        profile: {
                          ...content.profile,
                          availability: localized(
                            content.profile.availability,
                            value,
                          ),
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="admin-panel">
              <header>
                <span>{t.contact.toUpperCase()}</span>
                <h2>{t.details}</h2>
              </header>
              <Field
                label={t.email}
                value={content.profile.email}
                onChange={(email) =>
                  setContent({
                    ...content,
                    profile: { ...content.profile, email },
                  })
                }
              />
              <Field
                label={t.whatsapp}
                value={content.profile.whatsapp}
                onChange={(whatsapp) =>
                  setContent({
                    ...content,
                    profile: {
                      ...content.profile,
                      whatsapp: whatsapp.replace(/\D/g, ""),
                    },
                  })
                }
              />
              <Field
                label={t.linkedin}
                value={content.profile.linkedin}
                onChange={(linkedin) =>
                  setContent({
                    ...content,
                    profile: { ...content.profile, linkedin },
                  })
                }
              />
            </div>
            <div className="admin-panel">
              <header>
                <span>{t.design.toUpperCase()}</span>
                <h2>{t.direction}</h2>
              </header>
              <select
                className="admin-select"
                value={content.activeDesign}
                onChange={(event) =>
                  setContent({
                    ...content,
                    activeDesign: event.target
                      .value as SiteContent["activeDesign"],
                  })
                }
              >
                {DESIGN_SLUGS.map((design) => (
                  <option value={design} key={design}>
                    {DESIGN_NAMES[design]}
                  </option>
                ))}
              </select>
              <Link className="panel-link" href="/designs">
                {t.compare}
              </Link>
            </div>
            <div className="admin-panel portrait-panel">
              <header>
                <span>{t.portrait.toUpperCase()}</span>
                <h2>{t.profileImage}</h2>
              </header>
              <Image
                src={content.profile.portrait}
                width={360}
                height={460}
                alt={content.profile.name}
                unoptimized
                className="admin-portrait"
              />
              <label className="upload-button">
                {uploading ? t.uploading : t.replace}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={uploading}
                  onChange={(event) =>
                    uploadFiles(
                      Array.from(event.target.files ?? []),
                      "portrait",
                    )
                  }
                />
              </label>
            </div>
          </div>
        )}

        {tab === "projects" && (
          <div className="project-editor-layout">
            <aside className="project-index">
              <div className="project-index-head">
                <span>
                  {publishedCount} {t.published}
                </span>
                <button onClick={addProject}>{t.addProject}</button>
              </div>
              {content.projects.map((item, index) => (
                <button
                  key={item.id}
                  className={selectedProject === index ? "active" : ""}
                  onClick={() => setSelectedProject(index)}
                >
                  <i className={`status-${item.status}`} />
                  <span>{item.title[locale]}</span>
                  <small>{t.status[item.status]}</small>
                </button>
              ))}
            </aside>
            {project && (
              <div className="admin-stack">
                <div className="admin-panel project-editor">
                  <header>
                    <div>
                      <span>
                        {t.caseStudy.toUpperCase()}{" "}
                        {String(selectedProject + 1).padStart(2, "0")}
                      </span>
                      <h2>{project.title[locale]}</h2>
                    </div>
                    <select
                      value={project.status}
                      onChange={(event) =>
                        updateProject({
                          status: event.target.value as Project["status"],
                        })
                      }
                    >
                      {(["published", "draft", "archived"] as const).map(
                        (status) => (
                          <option key={status} value={status}>
                            {t.status[status]}
                          </option>
                        ),
                      )}
                    </select>
                  </header>
                  <div className="field-grid">
                    <LocalizedField
                      label={t.eyebrow}
                      value={project.eyebrow}
                      locale={locale}
                      onChange={(value) =>
                        updateProject({
                          eyebrow: localized(project.eyebrow, value),
                        })
                      }
                    />
                    <LocalizedField
                      label={t.title}
                      value={project.title}
                      locale={locale}
                      onChange={(value) =>
                        updateProject({
                          title: localized(project.title, value),
                        })
                      }
                    />
                    <div className="full">
                      <LocalizedField
                        label={t.summary}
                        value={project.summary}
                        locale={locale}
                        multiline
                        onChange={(value) =>
                          updateProject({
                            summary: localized(project.summary, value),
                          })
                        }
                      />
                    </div>
                    <div className="full">
                      <LocalizedField
                        label={t.challenge}
                        value={project.challenge}
                        locale={locale}
                        multiline
                        onChange={(value) =>
                          updateProject({
                            challenge: localized(project.challenge, value),
                          })
                        }
                      />
                    </div>
                    <div className="full">
                      <LocalizedField
                        label={t.response}
                        value={project.solution}
                        locale={locale}
                        multiline
                        onChange={(value) =>
                          updateProject({
                            solution: localized(project.solution, value),
                          })
                        }
                      />
                    </div>
                    <div className="full">
                      <LocalizedField
                        label={t.value}
                        value={project.outcome}
                        locale={locale}
                        multiline
                        onChange={(value) =>
                          updateProject({
                            outcome: localized(project.outcome, value),
                          })
                        }
                      />
                    </div>
                    <div className="full">
                      <Field
                        label={t.tools}
                        value={project.tools.join(", ")}
                        onChange={(value) =>
                          updateProject({
                            tools: value
                              .split(",")
                              .map((tool) => tool.trim())
                              .filter(Boolean),
                          })
                        }
                      />
                    </div>
                    <Field
                      label={t.order}
                      value={String(project.order)}
                      onChange={(order) =>
                        updateProject({ order: Number(order) || 1 })
                      }
                    />
                  </div>
                </div>

                <div className="admin-panel project-assets">
                  <header>
                    <div>
                      <span>{t.gallery.toUpperCase()}</span>
                      <h2>{t.gallery}</h2>
                      <p>{t.galleryHelp}</p>
                    </div>
                    <label className="upload-button">
                      {uploading ? t.uploading : t.uploadImages}
                      <input
                        multiple
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        disabled={uploading || project.images.length >= 6}
                        onChange={(event) =>
                          uploadFiles(
                            Array.from(event.target.files ?? []),
                            "project",
                          )
                        }
                      />
                    </label>
                  </header>
                  {project.images.length === 0 ? (
                    <p className="empty-state">{t.noImages}</p>
                  ) : (
                    <div className="project-gallery-grid">
                      {project.images.map((image, index) => (
                        <article className="gallery-card" key={image.id}>
                          <div className="gallery-preview">
                            <Image
                              src={image.url}
                              alt={image.alt[locale] || project.title[locale]}
                              fill
                              sizes="240px"
                              unoptimized
                            />
                            {index === 0 && <b>{t.cover}</b>}
                          </div>
                          <LocalizedField
                            label={t.alt}
                            value={image.alt}
                            locale={locale}
                            onChange={(value) =>
                              updateProject({
                                images: project.images.map((item, i) =>
                                  i === index
                                    ? {
                                        ...item,
                                        alt: localized(item.alt, value),
                                      }
                                    : item,
                                ),
                              })
                            }
                          />
                          <div className="gallery-actions">
                            <button
                              disabled={index === 0}
                              onClick={() =>
                                updateProject({
                                  images: move(
                                    project.images,
                                    index,
                                    index - 1,
                                  ),
                                })
                              }
                            >
                              ↑ {t.moveUp}
                            </button>
                            <button
                              disabled={index === project.images.length - 1}
                              onClick={() =>
                                updateProject({
                                  images: move(
                                    project.images,
                                    index,
                                    index + 1,
                                  ),
                                })
                              }
                            >
                              ↓ {t.moveDown}
                            </button>
                            {index > 0 && (
                              <button
                                onClick={() =>
                                  updateProject({
                                    images: move(project.images, index, 0),
                                  })
                                }
                              >
                                {t.makeCover}
                              </button>
                            )}
                            <button
                              className="danger"
                              onClick={() =>
                                updateProject({
                                  images: project.images.filter(
                                    (_, i) => i !== index,
                                  ),
                                })
                              }
                            >
                              {t.remove}
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                  <h3 className="asset-subhead">{t.library}</h3>
                  <div className="media-picker-grid">
                    {media.map((asset) => {
                      const used = project.images.some(
                        (image) => image.url === asset.url,
                      );
                      return (
                        <button
                          key={asset.id}
                          disabled={used || project.images.length >= 6}
                          onClick={() => addAssetToProject(asset)}
                        >
                          <Image
                            src={asset.url}
                            alt={asset.altEn || asset.filename}
                            width={130}
                            height={90}
                            unoptimized
                          />
                          <span>{used ? "✓" : `＋ ${t.add}`}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="admin-panel project-links">
                  <header>
                    <div>
                      <span>{t.links.toUpperCase()}</span>
                      <h2>{t.links}</h2>
                      <p>{t.linksHelp}</p>
                    </div>
                    <button
                      className="upload-button"
                      disabled={project.links.length >= 3}
                      onClick={addLink}
                    >
                      {t.addLink}
                    </button>
                  </header>
                  {project.links.length === 0 ? (
                    <p className="empty-state">{t.noLinks}</p>
                  ) : (
                    <div className="project-links-editor">
                      {project.links.map((link, index) => (
                        <article className="project-link-card" key={link.id}>
                          <div className="field-grid">
                            <LocalizedField
                              label={t.linkName}
                              value={link.label}
                              locale={locale}
                              onChange={(value) =>
                                updateProject({
                                  links: project.links.map((item, i) =>
                                    i === index
                                      ? {
                                          ...item,
                                          label: localized(item.label, value),
                                        }
                                      : item,
                                  ),
                                })
                              }
                            />
                            <Field
                              type="url"
                              label={t.url}
                              value={link.url}
                              dir="ltr"
                              onChange={(url) =>
                                updateProject({
                                  links: project.links.map((item, i) =>
                                    i === index ? { ...item, url } : item,
                                  ),
                                })
                              }
                            />
                          </div>
                          <div className="gallery-actions">
                            <button
                              disabled={index === 0}
                              onClick={() =>
                                updateProject({
                                  links: move(project.links, index, index - 1),
                                })
                              }
                            >
                              ↑ {t.moveUp}
                            </button>
                            <button
                              disabled={index === project.links.length - 1}
                              onClick={() =>
                                updateProject({
                                  links: move(project.links, index, index + 1),
                                })
                              }
                            >
                              ↓ {t.moveDown}
                            </button>
                            <button
                              className="danger"
                              onClick={() =>
                                updateProject({
                                  links: project.links.filter(
                                    (_, i) => i !== index,
                                  ),
                                })
                              }
                            >
                              {t.remove}
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "services" && (
          <div className="admin-stack">
            <div className="admin-panel">
              <header>
                <span>{t.services.toUpperCase()}</span>
                <h2>{t.bring}</h2>
              </header>
              {content.services.map((service, index) => (
                <div className="repeater" key={service.id}>
                  <span>{service.number}</span>
                  <div className="field-grid">
                    <LocalizedField
                      label={t.service}
                      value={service.title}
                      locale={locale}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          services: content.services.map((item, i) =>
                            i === index
                              ? { ...item, title: localized(item.title, value) }
                              : item,
                          ),
                        })
                      }
                    />
                    <LocalizedField
                      label={t.description}
                      value={service.description}
                      locale={locale}
                      multiline
                      onChange={(value) =>
                        setContent({
                          ...content,
                          services: content.services.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  description: localized(
                                    item.description,
                                    value,
                                  ),
                                }
                              : item,
                          ),
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="admin-panel">
              <header>
                <span>{t.capabilities.toUpperCase()}</span>
                <h2>{t.skills}</h2>
              </header>
              <Field
                label={t.comma}
                value={content.skills.join(", ")}
                multiline
                onChange={(value) =>
                  setContent({
                    ...content,
                    skills: value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
          </div>
        )}

        {tab === "experience" && (
          <div className="admin-stack">
            <div className="admin-panel">
              <header>
                <span>{t.selectedExperience.toUpperCase()}</span>
                <h2>{t.career}</h2>
              </header>
              {content.experiences.map((experience, index) => (
                <div className="repeater experience-edit" key={experience.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className="field-grid">
                    <LocalizedField
                      label={t.role}
                      value={experience.role}
                      locale={locale}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          experiences: content.experiences.map((item, i) =>
                            i === index
                              ? { ...item, role: localized(item.role, value) }
                              : item,
                          ),
                        })
                      }
                    />
                    <Field
                      label={t.company}
                      value={experience.company}
                      onChange={(company) =>
                        setContent({
                          ...content,
                          experiences: content.experiences.map((item, i) =>
                            i === index ? { ...item, company } : item,
                          ),
                        })
                      }
                    />
                    <Field
                      label={t.period}
                      value={experience.period}
                      onChange={(period) =>
                        setContent({
                          ...content,
                          experiences: content.experiences.map((item, i) =>
                            i === index ? { ...item, period } : item,
                          ),
                        })
                      }
                    />
                    <div className="full">
                      <LocalizedField
                        label={t.summary}
                        value={experience.summary}
                        locale={locale}
                        multiline
                        onChange={(value) =>
                          setContent({
                            ...content,
                            experiences: content.experiences.map((item, i) =>
                              i === index
                                ? {
                                    ...item,
                                    summary: localized(item.summary, value),
                                  }
                                : item,
                            ),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "media" && (
          <div className="admin-panel">
            <header>
              <span>{t.r2.toUpperCase()}</span>
              <h2>{t.assets}</h2>
            </header>
            <label className="upload-button standalone">
              {uploading ? t.uploading : t.upload}
              <input
                multiple
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={uploading}
                onChange={(event) =>
                  uploadFiles(Array.from(event.target.files ?? []), "library")
                }
              />
            </label>
            <div className="media-grid">
              {media.length === 0 ? (
                <p className="empty-state">{t.empty}</p>
              ) : (
                media.map((asset) => (
                  <article key={asset.id}>
                    <Image
                      src={asset.url}
                      alt={asset.altEn || asset.filename}
                      width={260}
                      height={200}
                      unoptimized
                    />
                    <div>
                      <b>{asset.filename}</b>
                      <span>{Math.round(asset.size / 1024)} KB</span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
