"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type SetStateAction } from "react";
import type { MediaAsset } from "@/lib/data";
import {
  DESIGN_NAMES,
  DESIGN_SLUGS,
  normalizeSiteContent,
  type DesignSlug,
  type Experience,
  type Locale,
  type Project,
  type ProjectImage,
  type ProjectLink,
  type Service,
  type SiteContent,
} from "@/lib/site-content";

type Tab =
  | "overview"
  | "designs"
  | "projects"
  | "services"
  | "experience"
  | "media";
type ProjectFilter = "all" | Project["status"];
type PreviewDevice = "desktop" | "tablet" | "mobile";

const designMeta: Record<
  DesignSlug,
  { sector: { en: string; ar: string }; colors: string[] }
> = {
  "growth-operator": {
    sector: { en: "Corporate B2B", ar: "شركات وB2B" },
    colors: ["#0B1F33", "#F4F0E8", "#1F6B57", "#D8B36A"],
  },
  "executive-brief": {
    sector: { en: "Bold Creative", ar: "وكالة إبداعية" },
    colors: ["#F4FF57", "#FF5A36", "#2015FF", "#0A0A0A"],
  },
  "campaign-desk": {
    sector: { en: "Premium Minimal", ar: "استشارات فاخرة" },
    colors: ["#171714", "#F2EEE5", "#A68A64", "#77766C"],
  },
  "systems-map": {
    sector: { en: "Tech Startup", ar: "تقنية وستارت أب" },
    colors: ["#07111F", "#1267FF", "#16D9A4", "#E8F0FF"],
  },
  "signal-scale": {
    sector: { en: "Marketing Magazine", ar: "مجلة تسويقية" },
    colors: ["#F7F0DF", "#C52B28", "#172A3A", "#E1B94A"],
  },
  "gulf-modern": {
    sector: { en: "Regional Premium", ar: "هوية خليجية راقية" },
    colors: ["#E8D9BF", "#0F5A4A", "#7B2D34", "#B98B5F"],
  },
  "proof-of-work": {
    sector: { en: "Data & Media Buying", ar: "بيانات وشراء إعلانات" },
    colors: ["#080B0D", "#C8FF41", "#FFB000", "#DCE5E2"],
  },
  momentum: {
    sector: { en: "Content & Social", ar: "محتوى وسوشيال" },
    colors: ["#0A0A0F", "#FF3D8D", "#FF6B3D", "#7A5CFF"],
  },
  "studio-ledger": {
    sector: { en: "Consulting & SMEs", ar: "استشارات ومشاريع صغيرة" },
    colors: ["#F6E8DA", "#2F5D50", "#295A7A", "#C8654B"],
  },
  "control-room": {
    sector: { en: "Startup & Agency", ar: "ستارت أب ووكالات" },
    colors: ["#FFFFFF", "#000000", "#FFD600", "#3455FF"],
  },
};

const copy = {
  en: {
    tabs: {
      overview: "Profile & content",
      designs: "Designs",
      projects: "Case studies",
      services: "Services & skills",
      experience: "Experience",
      media: "Media library",
    },
    control: "Portfolio control",
    welcome: "Welcome",
    save: "Save & publish",
    saving: "Saving…",
    saved: "All content changes are live.",
    failed: "Changes could not be saved.",
    unsaved: "Unsaved content changes",
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
    portrait: "Portrait",
    profileImage: "Profile image",
    replace: "Upload replacement",
    uploading: "Uploading…",
    labels: "Section labels & calls to action",
    approach: "Working method",
    addApproach: "＋ Add step",
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
    delete: "Delete permanently",
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
    metrics: "Verified metrics",
    metricsHelp: "Metrics appear publicly only when a label and value are saved.",
    addMetric: "＋ Add metric",
    metricName: "Metric label",
    metricValue: "Verified value",
    noMetrics: "No verified metrics yet.",
    services: "Services",
    bring: "What you bring",
    addService: "＋ Add service",
    service: "Service",
    description: "Description",
    capabilities: "Capabilities",
    skills: "Skills and tools",
    addSkill: "＋ Add skill",
    selectedExperience: "Selected experience",
    career: "Career narrative",
    addExperience: "＋ Add experience",
    company: "Company",
    period: "Period / label",
    r2: "R2 media",
    assets: "Uploaded assets",
    upload: "Upload image",
    empty: "No uploaded assets yet. Upload an image to reuse it across projects.",
    uploaded: "Image uploaded. Save content changes when you are ready.",
    added: "Image added to the project.",
    maxImages: "This project already has 6 images.",
    maxLinks: "This project already has 3 links.",
    searchProjects: "Search projects",
    searchMedia: "Search media",
    allStatuses: "All statuses",
    noResults: "No matching items.",
    mediaAltEn: "Alt text · EN",
    mediaAltAr: "Alt text · AR",
    saveAlt: "Save alt text",
    usedBy: "Used by",
    unused: "Not used",
    deleteMedia: "Delete file",
    mediaSaved: "Media alt text saved.",
    mediaDeleted: "Media file deleted permanently.",
    designsIntro: "Preview every direction at real breakpoints, then activate it independently from content changes.",
    active: "Active",
    preview: "Preview",
    activate: "Activate design",
    activating: "Activating…",
    designActivated: "The live design changed immediately.",
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
    closePreview: "Close preview",
    openPreview: "Open full preview ↗",
    confirmActivate: "Activate this design on the English and Arabic live site?",
    confirmDelete: "This deletion is permanent. Continue?",
    confirmProjectDelete: "Delete this project permanently? Its media files will stay in the library.",
  },
  ar: {
    tabs: {
      overview: "الملف والمحتوى",
      designs: "التصاميم",
      projects: "دراسات الحالة",
      services: "الخدمات والمهارات",
      experience: "الخبرات",
      media: "مكتبة الوسائط",
    },
    control: "إدارة البورتفوليو",
    welcome: "مرحبًا",
    save: "حفظ ونشر",
    saving: "جارٍ الحفظ…",
    saved: "تم نشر جميع تعديلات المحتوى.",
    failed: "تعذر حفظ التغييرات.",
    unsaved: "توجد تعديلات محتوى غير محفوظة",
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
    portrait: "الصورة الشخصية",
    profileImage: "صورة الملف",
    replace: "رفع صورة بديلة",
    uploading: "جارٍ الرفع…",
    labels: "عناوين الأقسام والدعوات",
    approach: "منهج العمل",
    addApproach: "＋ إضافة خطوة",
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
    delete: "حذف نهائي",
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
    metrics: "المؤشرات الموثقة",
    metricsHelp: "لا يظهر المؤشر للعامة إلا بعد حفظ الاسم والقيمة.",
    addMetric: "＋ إضافة مؤشر",
    metricName: "اسم المؤشر",
    metricValue: "القيمة الموثقة",
    noMetrics: "لا توجد مؤشرات موثقة بعد.",
    services: "الخدمات",
    bring: "ما الذي تقدمه",
    addService: "＋ إضافة خدمة",
    service: "الخدمة",
    description: "الوصف",
    capabilities: "القدرات",
    skills: "المهارات والأدوات",
    addSkill: "＋ إضافة مهارة",
    selectedExperience: "خبرات مختارة",
    career: "المسار المهني",
    addExperience: "＋ إضافة خبرة",
    company: "الشركة",
    period: "الفترة / الوصف",
    r2: "وسائط R2",
    assets: "الملفات المرفوعة",
    upload: "رفع صورة",
    empty: "لا توجد ملفات مرفوعة بعد. ارفع صورة لإعادة استخدامها في المشاريع.",
    uploaded: "تم رفع الصورة. احفظ تعديلات المحتوى عندما تصبح جاهزة.",
    added: "تمت إضافة الصورة للمشروع.",
    maxImages: "يحتوي المشروع بالفعل على 6 صور.",
    maxLinks: "يحتوي المشروع بالفعل على 3 روابط.",
    searchProjects: "ابحث في المشاريع",
    searchMedia: "ابحث في الوسائط",
    allStatuses: "كل الحالات",
    noResults: "لا توجد نتائج مطابقة.",
    mediaAltEn: "النص البديل · EN",
    mediaAltAr: "النص البديل · AR",
    saveAlt: "حفظ النص البديل",
    usedBy: "مستخدمة في",
    unused: "غير مستخدمة",
    deleteMedia: "حذف الملف",
    mediaSaved: "تم حفظ النص البديل للصورة.",
    mediaDeleted: "تم حذف ملف الوسائط نهائيًا.",
    designsIntro: "عاين كل اتجاه على المقاسات الحقيقية ثم فعّله بشكل مستقل عن تعديلات المحتوى.",
    active: "نشط",
    preview: "معاينة",
    activate: "تفعيل التصميم",
    activating: "جارٍ التفعيل…",
    designActivated: "تم تغيير التصميم على الموقع فورًا.",
    desktop: "كمبيوتر",
    tablet: "تابلت",
    mobile: "موبايل",
    closePreview: "إغلاق المعاينة",
    openPreview: "فتح المعاينة الكاملة ↗",
    confirmActivate: "تفعيل هذا التصميم على النسختين العربية والإنجليزية؟",
    confirmDelete: "هذا الحذف نهائي. هل تريد المتابعة؟",
    confirmProjectDelete: "حذف هذا المشروع نهائيًا؟ ستبقى صوره داخل مكتبة الوسائط.",
  },
} as const;

function Field({
  label,
  value,
  onChange,
  multiline = false,
  dir,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  dir?: "rtl" | "ltr";
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          dir={dir}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value}
          dir={dir}
          placeholder={placeholder}
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
    summary: { en: "", ar: "" },
    challenge: { en: "", ar: "" },
    solution: { en: "", ar: "" },
    outcome: { en: "", ar: "" },
    tools: [],
    metrics: [],
    images: [],
    links: [],
  };
}

function newService(order: number): Service {
  return {
    id: crypto.randomUUID(),
    number: String(order).padStart(2, "0"),
    title: { en: "New service", ar: "خدمة جديدة" },
    description: { en: "", ar: "" },
  };
}

function newExperience(): Experience {
  return {
    id: crypto.randomUUID(),
    role: { en: "New role", ar: "منصب جديد" },
    company: "",
    period: "",
    summary: { en: "", ar: "" },
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
  initialTab,
  initialPreview,
}: {
  initialContent: SiteContent;
  initialMedia: MediaAsset[];
  ownerName: string;
  initialTab?: Tab;
  initialPreview?: string;
}) {
  const normalizedInitial = useMemo(
    () => normalizeSiteContent(initialContent),
    [initialContent],
  );
  const [content, setContentState] = useState(normalizedInitial);
  const [media, setMedia] = useState(initialMedia);
  const [tab, setTab] = useState<Tab>(initialTab ?? "overview");
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedProject, setSelectedProject] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const [mediaSearch, setMediaSearch] = useState("");
  const validInitialPreview = DESIGN_SLUGS.find(
    (design) => design === initialPreview,
  );
  const [previewDesign, setPreviewDesign] = useState<DesignSlug | null>(
    validInitialPreview ?? null,
  );
  const [previewLocale, setPreviewLocale] = useState<Locale>("en");
  const [previewDevice, setPreviewDevice] =
    useState<PreviewDevice>("desktop");
  const [activating, setActivating] = useState(false);
  const project = content.projects[selectedProject];
  const t = copy[locale];
  const tabList = (Object.keys(t.tabs) as Tab[]).map((id) => ({
    id,
    label: t.tabs[id],
  }));

  function setContent(update: SetStateAction<SiteContent>) {
    setDirty(true);
    setContentState(update);
  }

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const publishedCount = useMemo(
    () => content.projects.filter((item) => item.status === "published").length,
    [content.projects],
  );
  const visibleProjects = useMemo(() => {
    const search = projectSearch.trim().toLowerCase();
    return content.projects
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => projectFilter === "all" || item.status === projectFilter)
      .filter(
        ({ item }) =>
          !search ||
          item.title.en.toLowerCase().includes(search) ||
          item.title.ar.includes(search),
      );
  }, [content.projects, projectFilter, projectSearch]);
  const filteredMedia = useMemo(() => {
    const search = mediaSearch.trim().toLowerCase();
    return media.filter(
      (asset) =>
        !search ||
        asset.filename.toLowerCase().includes(search) ||
        asset.altEn.toLowerCase().includes(search) ||
        asset.altAr.includes(search),
    );
  }, [media, mediaSearch]);

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

  function mediaUsages(asset: MediaAsset) {
    const usages: string[] = [];
    if (content.profile.portrait === asset.url)
      usages.push(locale === "ar" ? "الصورة الشخصية" : "Profile portrait");
    content.projects.forEach((item) => {
      if (item.images.some((image) => image.url === asset.url))
        usages.push(item.title[locale] || item.id);
    });
    return usages;
  }

  async function save() {
    setSaving(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(content),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!response.ok) throw new Error(result.error ?? t.failed);
      setDirty(false);
      setNotice(t.saved);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : t.failed);
    } finally {
      setSaving(false);
    }
  }

  async function activateDesign(design: DesignSlug) {
    if (!window.confirm(t.confirmActivate)) return;
    setActivating(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/design", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ activeDesign: design }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!response.ok) throw new Error(result.error ?? t.failed);
      setContentState((current) => ({ ...current, activeDesign: design }));
      setNotice(t.designActivated);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : t.failed);
    } finally {
      setActivating(false);
    }
  }

  function addProject() {
    const nextIndex = content.projects.length;
    setContent((current) => ({
      ...current,
      projects: [...current.projects, newProject(current.projects.length + 1)],
    }));
    setSelectedProject(nextIndex);
  }

  function reorderProject(to: number) {
    if (!project || to < 0 || to >= content.projects.length) return;
    setContent((current) => ({
      ...current,
      projects: move(current.projects, selectedProject, to).map((item, index) => ({
        ...item,
        order: index + 1,
      })),
    }));
    setSelectedProject(to);
  }

  function deleteProject() {
    if (!project || !window.confirm(t.confirmProjectDelete)) return;
    setContent((current) => ({
      ...current,
      projects: current.projects
        .filter((_, index) => index !== selectedProject)
        .map((item, index) => ({ ...item, order: index + 1 })),
    }));
    setSelectedProject(Math.max(0, Math.min(selectedProject, content.projects.length - 2)));
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
    const limit = target === "project" ? Math.max(0, 6 - (project?.images.length ?? 0)) : files.length;
    for (const file of files.slice(0, limit)) {
      const form = new FormData();
      form.append("file", file);
      form.append("altEn", target === "portrait" ? "Khalid Mohamad" : (project?.title.en ?? file.name));
      form.append("altAr", target === "portrait" ? "خالد محمد" : (project?.title.ar ?? file.name));
      const response = await fetch("/api/admin/media", { method: "POST", body: form });
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
        alt: { en: asset.altEn || project.title.en, ar: asset.altAr || project.title.ar },
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

  async function saveMediaAlt(asset: MediaAsset) {
    const response = await fetch(`/api/admin/media/${encodeURIComponent(asset.id)}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ altEn: asset.altEn, altAr: asset.altAr }),
    });
    const result = (await response.json().catch(() => ({}))) as MediaAsset & { error?: string };
    if (!response.ok) return setNotice(result.error ?? t.failed);
    setMedia((current) => current.map((item) => (item.id === result.id ? result : item)));
    setNotice(t.mediaSaved);
  }

  async function deleteMedia(asset: MediaAsset) {
    const usages = mediaUsages(asset);
    if (usages.length) return setNotice(`${t.usedBy}: ${usages.join(" · ")}`);
    if (!window.confirm(t.confirmDelete)) return;
    const response = await fetch(`/api/admin/media/${encodeURIComponent(asset.id)}`, { method: "DELETE" });
    const result = (await response.json().catch(() => ({}))) as { error?: string; usages?: string[] };
    if (!response.ok) return setNotice(result.usages?.length ? `${result.error}: ${result.usages.join(" · ")}` : (result.error ?? t.failed));
    setMedia((current) => current.filter((item) => item.id !== asset.id));
    setNotice(t.mediaDeleted);
  }

  function repeaterActions(index: number, length: number, onMove: (to: number) => void, onDelete: () => void) {
    return (
      <div className="repeater-actions">
        <button disabled={index === 0} onClick={() => onMove(index - 1)} aria-label={t.moveUp}>↑</button>
        <button disabled={index === length - 1} onClick={() => onMove(index + 1)} aria-label={t.moveDown}>↓</button>
        <button className="danger" onClick={onDelete}>{t.remove}</button>
      </div>
    );
  }

  return (
    <main className="admin-shell" dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>K/</span>
          <div><b>Khalid</b><small>{t.control}</small></div>
        </div>
        <nav>
          {tabList.map((item, index) => (
            <button className={tab === item.id ? "active" : ""} key={item.id} onClick={() => setTab(item.id)}>
              <span>0{index + 1}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="admin-side-footer">
          <Link href={`/${locale}`}>{t.live}</Link>
          <Link href="/signout-with-chatgpt?return_to=/en">{t.signout}</Link>
        </div>
      </aside>
      <section className="admin-main">
        <header className="admin-topbar">
          <div><p>{t.welcome}, {ownerName}</p><h1>{t.tabs[tab]}</h1></div>
          <div className="admin-top-actions">
            {dirty && <span className="admin-dirty">● {t.unsaved}</span>}
            <div className="locale-toggle">
              <button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>EN</button>
              <button className={locale === "ar" ? "active" : ""} onClick={() => setLocale("ar")}>AR</button>
            </div>
            <button className="save-button" disabled={saving || !dirty} onClick={save}>{saving ? t.saving : t.save}</button>
          </div>
        </header>
        {notice && <div className="admin-notice" role="status">{notice}</div>}

        {tab === "overview" && (
          <div className="admin-content-grid">
            <div className="admin-panel wide">
              <header><div><span>{t.profile.toUpperCase()}</span><h2>{t.core}</h2></div></header>
              <div className="field-grid">
                <Field label={t.name} value={content.profile.name} onChange={(name) => setContent({ ...content, profile: { ...content.profile, name } })} />
                <LocalizedField label={t.role} value={content.profile.role} locale={locale} onChange={(value) => setContent({ ...content, profile: { ...content.profile, role: localized(content.profile.role, value) } })} />
                <div className="full"><LocalizedField label={t.headline} value={content.profile.headline} locale={locale} multiline onChange={(value) => setContent({ ...content, profile: { ...content.profile, headline: localized(content.profile.headline, value) } })} /></div>
                <div className="full"><LocalizedField label={t.intro} value={content.profile.intro} locale={locale} multiline onChange={(value) => setContent({ ...content, profile: { ...content.profile, intro: localized(content.profile.intro, value) } })} /></div>
                <div className="full"><LocalizedField label={t.availability} value={content.profile.availability} locale={locale} multiline onChange={(value) => setContent({ ...content, profile: { ...content.profile, availability: localized(content.profile.availability, value) } })} /></div>
              </div>
            </div>
            <div className="admin-panel">
              <header><div><span>{t.contact.toUpperCase()}</span><h2>{t.details}</h2></div></header>
              <div className="admin-stack compact">
                <Field label={t.email} type="email" dir="ltr" value={content.profile.email} onChange={(email) => setContent({ ...content, profile: { ...content.profile, email } })} />
                <Field label={t.whatsapp} dir="ltr" value={content.profile.whatsapp} onChange={(whatsapp) => setContent({ ...content, profile: { ...content.profile, whatsapp: whatsapp.replace(/\D/g, "") } })} />
                <Field label={t.linkedin} type="url" dir="ltr" value={content.profile.linkedin} onChange={(linkedin) => setContent({ ...content, profile: { ...content.profile, linkedin } })} />
              </div>
            </div>
            <div className="admin-panel portrait-panel">
              <header><div><span>{t.portrait.toUpperCase()}</span><h2>{t.profileImage}</h2></div></header>
              <Image src={content.profile.portrait} width={360} height={460} alt={content.profile.name} unoptimized className="admin-portrait" />
              <label className="upload-button">{uploading ? t.uploading : t.replace}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => uploadFiles(Array.from(event.target.files ?? []), "portrait")} /></label>
            </div>
            <div className="admin-panel wide">
              <header><div><span>{t.labels.toUpperCase()}</span><h2>{t.labels}</h2></div></header>
              <div className="field-grid">
                {Object.entries(content.labels).map(([key, label]) => (
                  <LocalizedField key={key} label={key} value={label} locale={locale} onChange={(value) => setContent({ ...content, labels: { ...content.labels, [key]: localized(label, value) } })} />
                ))}
              </div>
            </div>
            <div className="admin-panel wide">
              <header><div><span>{t.approach.toUpperCase()}</span><h2>{t.approach}</h2></div><button className="upload-button" onClick={() => setContent({ ...content, approach: [...content.approach, { id: crypto.randomUUID(), title: { en: "New step", ar: "خطوة جديدة" }, description: { en: "", ar: "" } }] })}>{t.addApproach}</button></header>
              {content.approach.map((item, index) => (
                <div className="repeater" key={item.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className="field-grid">
                    <LocalizedField label={t.title} value={item.title} locale={locale} onChange={(value) => setContent({ ...content, approach: content.approach.map((entry, i) => i === index ? { ...entry, title: localized(entry.title, value) } : entry) })} />
                    <LocalizedField label={t.description} value={item.description} locale={locale} multiline onChange={(value) => setContent({ ...content, approach: content.approach.map((entry, i) => i === index ? { ...entry, description: localized(entry.description, value) } : entry) })} />
                    <div className="full">{repeaterActions(index, content.approach.length, (to) => setContent({ ...content, approach: move(content.approach, index, to) }), () => window.confirm(t.confirmDelete) && setContent({ ...content, approach: content.approach.filter((_, i) => i !== index) }))}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "designs" && (
          <div className="admin-stack">
            <p className="designs-intro">{t.designsIntro}</p>
            <div className="design-admin-grid">
              {DESIGN_SLUGS.map((design, index) => (
                <article className={`design-admin-card ${content.activeDesign === design ? "active" : ""}`} key={design}>
                  <div className="design-card-number">{String(index + 1).padStart(2, "0")}</div>
                  <div className="design-swatches">{designMeta[design].colors.map((color) => <i key={color} style={{ background: color }} />)}</div>
                  <p>{designMeta[design].sector[locale]}</p>
                  <h2>{DESIGN_NAMES[design]}</h2>
                  {content.activeDesign === design && <b className="active-design-label">● {t.active}</b>}
                  <div className="design-card-actions">
                    <button onClick={() => setPreviewDesign(design)}>{t.preview}</button>
                    <button className="primary" disabled={activating || content.activeDesign === design} onClick={() => activateDesign(design)}>{activating ? t.activating : t.activate}</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {tab === "projects" && (
          <div className="project-editor-layout">
            <aside className="project-index">
              <div className="project-index-head"><span>{publishedCount} {t.published}</span><button onClick={addProject}>{t.addProject}</button></div>
              <div className="admin-filterbar vertical">
                <input value={projectSearch} placeholder={t.searchProjects} onChange={(event) => setProjectSearch(event.target.value)} />
                <select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value as ProjectFilter)}>
                  <option value="all">{t.allStatuses}</option>
                  {(["published", "draft", "archived"] as const).map((status) => <option key={status} value={status}>{t.status[status]}</option>)}
                </select>
              </div>
              {visibleProjects.length === 0 && <p className="empty-state indexed">{t.noResults}</p>}
              {visibleProjects.map(({ item, index }) => (
                <button key={item.id} className={selectedProject === index ? "active" : ""} onClick={() => setSelectedProject(index)}>
                  <i className={`status-${item.status}`} /><span>{item.title[locale]}</span><small>{t.status[item.status]}</small>
                </button>
              ))}
            </aside>
            {project && (
              <div className="admin-stack">
                <div className="admin-panel project-editor">
                  <header>
                    <div><span>{t.caseStudy.toUpperCase()} {String(selectedProject + 1).padStart(2, "0")}</span><h2>{project.title[locale]}</h2></div>
                    <div className="project-header-actions">
                      <button disabled={selectedProject === 0} onClick={() => reorderProject(selectedProject - 1)}>↑</button>
                      <button disabled={selectedProject === content.projects.length - 1} onClick={() => reorderProject(selectedProject + 1)}>↓</button>
                      <select value={project.status} onChange={(event) => updateProject({ status: event.target.value as Project["status"] })}>{(["published", "draft", "archived"] as const).map((status) => <option key={status} value={status}>{t.status[status]}</option>)}</select>
                      <button className="danger-button" onClick={deleteProject}>{t.delete}</button>
                    </div>
                  </header>
                  <div className="field-grid">
                    <LocalizedField label={t.eyebrow} value={project.eyebrow} locale={locale} onChange={(value) => updateProject({ eyebrow: localized(project.eyebrow, value) })} />
                    <LocalizedField label={t.title} value={project.title} locale={locale} onChange={(value) => updateProject({ title: localized(project.title, value) })} />
                    <div className="full"><LocalizedField label={t.summary} value={project.summary} locale={locale} multiline onChange={(value) => updateProject({ summary: localized(project.summary, value) })} /></div>
                    <div className="full"><LocalizedField label={t.challenge} value={project.challenge} locale={locale} multiline onChange={(value) => updateProject({ challenge: localized(project.challenge, value) })} /></div>
                    <div className="full"><LocalizedField label={t.response} value={project.solution} locale={locale} multiline onChange={(value) => updateProject({ solution: localized(project.solution, value) })} /></div>
                    <div className="full"><LocalizedField label={t.value} value={project.outcome} locale={locale} multiline onChange={(value) => updateProject({ outcome: localized(project.outcome, value) })} /></div>
                    <div className="full"><Field label={t.tools} value={project.tools.join(", ")} onChange={(value) => updateProject({ tools: value.split(",").map((tool) => tool.trim()).filter(Boolean) })} /></div>
                    <Field label={t.order} value={String(project.order)} onChange={(order) => updateProject({ order: Number(order) || 1 })} />
                  </div>
                </div>

                <div className="admin-panel project-assets">
                  <header><div><span>{t.gallery.toUpperCase()}</span><h2>{t.gallery}</h2><p>{t.galleryHelp}</p></div><label className="upload-button">{uploading ? t.uploading : t.uploadImages}<input multiple type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading || project.images.length >= 6} onChange={(event) => uploadFiles(Array.from(event.target.files ?? []), "project")} /></label></header>
                  {project.images.length === 0 ? <p className="empty-state">{t.noImages}</p> : (
                    <div className="project-gallery-grid">{project.images.map((image, index) => (
                      <article className="gallery-card" key={image.id}>
                        <div className="gallery-preview"><Image src={image.url} alt={image.alt[locale] || project.title[locale]} fill sizes="240px" unoptimized />{index === 0 && <b>{t.cover}</b>}</div>
                        <LocalizedField label={t.alt} value={image.alt} locale={locale} onChange={(value) => updateProject({ images: project.images.map((item, i) => i === index ? { ...item, alt: localized(item.alt, value) } : item) })} />
                        <div className="gallery-actions">
                          <button disabled={index === 0} onClick={() => updateProject({ images: move(project.images, index, index - 1) })}>↑ {t.moveUp}</button>
                          <button disabled={index === project.images.length - 1} onClick={() => updateProject({ images: move(project.images, index, index + 1) })}>↓ {t.moveDown}</button>
                          {index > 0 && <button onClick={() => updateProject({ images: move(project.images, index, 0) })}>{t.makeCover}</button>}
                          <button className="danger" onClick={() => updateProject({ images: project.images.filter((_, i) => i !== index) })}>{t.remove}</button>
                        </div>
                      </article>
                    ))}</div>
                  )}
                  <h3 className="asset-subhead">{t.library}</h3>
                  <div className="media-picker-grid">{media.map((asset) => {
                    const used = project.images.some((image) => image.url === asset.url);
                    return <button key={asset.id} disabled={used || project.images.length >= 6} onClick={() => addAssetToProject(asset)}><Image src={asset.url} alt={asset.altEn || asset.filename} width={130} height={90} unoptimized /><span>{used ? "✓" : `＋ ${t.add}`}</span></button>;
                  })}</div>
                </div>

                <div className="admin-panel project-links">
                  <header><div><span>{t.links.toUpperCase()}</span><h2>{t.links}</h2><p>{t.linksHelp}</p></div><button className="upload-button" disabled={project.links.length >= 3} onClick={addLink}>{t.addLink}</button></header>
                  {project.links.length === 0 ? <p className="empty-state">{t.noLinks}</p> : <div className="project-links-editor">{project.links.map((link, index) => (
                    <article className="project-link-card" key={link.id}>
                      <div className="field-grid"><LocalizedField label={t.linkName} value={link.label} locale={locale} onChange={(value) => updateProject({ links: project.links.map((item, i) => i === index ? { ...item, label: localized(item.label, value) } : item) })} /><Field type="url" label={t.url} value={link.url} dir="ltr" onChange={(url) => updateProject({ links: project.links.map((item, i) => i === index ? { ...item, url } : item) })} /></div>
                      <div className="gallery-actions"><button disabled={index === 0} onClick={() => updateProject({ links: move(project.links, index, index - 1) })}>↑ {t.moveUp}</button><button disabled={index === project.links.length - 1} onClick={() => updateProject({ links: move(project.links, index, index + 1) })}>↓ {t.moveDown}</button><button className="danger" onClick={() => updateProject({ links: project.links.filter((_, i) => i !== index) })}>{t.remove}</button></div>
                    </article>
                  ))}</div>}
                </div>

                <div className="admin-panel project-metrics-editor">
                  <header><div><span>{t.metrics.toUpperCase()}</span><h2>{t.metrics}</h2><p>{t.metricsHelp}</p></div><button className="upload-button" onClick={() => updateProject({ metrics: [...project.metrics, { label: { en: "", ar: "" }, value: "" }] })}>{t.addMetric}</button></header>
                  {project.metrics.length === 0 ? <p className="empty-state">{t.noMetrics}</p> : <div className="project-links-editor">{project.metrics.map((metric, index) => (
                    <article className="project-link-card" key={`${project.id}-metric-${index}`}>
                      <div className="field-grid"><LocalizedField label={t.metricName} value={metric.label} locale={locale} onChange={(value) => updateProject({ metrics: project.metrics.map((item, i) => i === index ? { ...item, label: localized(item.label, value) } : item) })} /><Field label={t.metricValue} value={metric.value} onChange={(value) => updateProject({ metrics: project.metrics.map((item, i) => i === index ? { ...item, value } : item) })} /></div>
                      <div className="gallery-actions"><button disabled={index === 0} onClick={() => updateProject({ metrics: move(project.metrics, index, index - 1) })}>↑ {t.moveUp}</button><button disabled={index === project.metrics.length - 1} onClick={() => updateProject({ metrics: move(project.metrics, index, index + 1) })}>↓ {t.moveDown}</button><button className="danger" onClick={() => updateProject({ metrics: project.metrics.filter((_, i) => i !== index) })}>{t.remove}</button></div>
                    </article>
                  ))}</div>}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "services" && (
          <div className="admin-stack">
            <div className="admin-panel">
              <header><div><span>{t.services.toUpperCase()}</span><h2>{t.bring}</h2></div><button className="upload-button" onClick={() => setContent({ ...content, services: [...content.services, newService(content.services.length + 1)] })}>{t.addService}</button></header>
              {content.services.map((service, index) => (
                <div className="repeater" key={service.id}><span>{String(index + 1).padStart(2, "0")}</span><div className="field-grid">
                  <LocalizedField label={t.service} value={service.title} locale={locale} onChange={(value) => setContent({ ...content, services: content.services.map((item, i) => i === index ? { ...item, title: localized(item.title, value) } : item) })} />
                  <LocalizedField label={t.description} value={service.description} locale={locale} multiline onChange={(value) => setContent({ ...content, services: content.services.map((item, i) => i === index ? { ...item, description: localized(item.description, value) } : item) })} />
                  <div className="full">{repeaterActions(index, content.services.length, (to) => setContent({ ...content, services: move(content.services, index, to).map((item, i) => ({ ...item, number: String(i + 1).padStart(2, "0") })) }), () => window.confirm(t.confirmDelete) && setContent({ ...content, services: content.services.filter((_, i) => i !== index).map((item, i) => ({ ...item, number: String(i + 1).padStart(2, "0") })) }))}</div>
                </div></div>
              ))}
            </div>
            <div className="admin-panel">
              <header><div><span>{t.capabilities.toUpperCase()}</span><h2>{t.skills}</h2></div><button className="upload-button" onClick={() => setContent({ ...content, skills: [...content.skills, "New skill"] })}>{t.addSkill}</button></header>
              <div className="skill-editor">{content.skills.map((skill, index) => (
                <div key={`${index}-${skill}`}><input value={skill} onChange={(event) => setContent({ ...content, skills: content.skills.map((item, i) => i === index ? event.target.value : item) })} />{repeaterActions(index, content.skills.length, (to) => setContent({ ...content, skills: move(content.skills, index, to) }), () => window.confirm(t.confirmDelete) && setContent({ ...content, skills: content.skills.filter((_, i) => i !== index) }))}</div>
              ))}</div>
            </div>
          </div>
        )}

        {tab === "experience" && (
          <div className="admin-stack"><div className="admin-panel">
            <header><div><span>{t.selectedExperience.toUpperCase()}</span><h2>{t.career}</h2></div><button className="upload-button" onClick={() => setContent({ ...content, experiences: [...content.experiences, newExperience()] })}>{t.addExperience}</button></header>
            {content.experiences.map((experience, index) => (
              <div className="repeater experience-edit" key={experience.id}><span>{String(index + 1).padStart(2, "0")}</span><div className="field-grid">
                <LocalizedField label={t.role} value={experience.role} locale={locale} onChange={(value) => setContent({ ...content, experiences: content.experiences.map((item, i) => i === index ? { ...item, role: localized(item.role, value) } : item) })} />
                <Field label={t.company} value={experience.company} onChange={(company) => setContent({ ...content, experiences: content.experiences.map((item, i) => i === index ? { ...item, company } : item) })} />
                <Field label={t.period} value={experience.period} onChange={(period) => setContent({ ...content, experiences: content.experiences.map((item, i) => i === index ? { ...item, period } : item) })} />
                <div className="full"><LocalizedField label={t.summary} value={experience.summary} locale={locale} multiline onChange={(value) => setContent({ ...content, experiences: content.experiences.map((item, i) => i === index ? { ...item, summary: localized(item.summary, value) } : item) })} /></div>
                <div className="full">{repeaterActions(index, content.experiences.length, (to) => setContent({ ...content, experiences: move(content.experiences, index, to) }), () => window.confirm(t.confirmDelete) && setContent({ ...content, experiences: content.experiences.filter((_, i) => i !== index) }))}</div>
              </div></div>
            ))}
          </div></div>
        )}

        {tab === "media" && (
          <div className="admin-panel">
            <header><div><span>{t.r2.toUpperCase()}</span><h2>{t.assets}</h2></div><label className="upload-button">{uploading ? t.uploading : t.upload}<input multiple type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => uploadFiles(Array.from(event.target.files ?? []), "library")} /></label></header>
            <div className="admin-filterbar"><input value={mediaSearch} placeholder={t.searchMedia} onChange={(event) => setMediaSearch(event.target.value)} /></div>
            <div className="media-grid">{filteredMedia.length === 0 ? <p className="empty-state">{media.length ? t.noResults : t.empty}</p> : filteredMedia.map((asset) => {
              const usages = mediaUsages(asset);
              return <article key={asset.id}>
                <Image src={asset.url} alt={asset.altEn || asset.filename} width={260} height={200} unoptimized />
                <div className="media-meta"><b>{asset.filename}</b><span>{Math.round(asset.size / 1024)} KB</span><small className={usages.length ? "used" : ""}>{usages.length ? `${t.usedBy}: ${usages.join(" · ")}` : t.unused}</small></div>
                <div className="media-alt-fields"><Field label={t.mediaAltEn} value={asset.altEn} dir="ltr" onChange={(altEn) => setMedia((current) => current.map((item) => item.id === asset.id ? { ...item, altEn } : item))} /><Field label={t.mediaAltAr} value={asset.altAr} dir="rtl" onChange={(altAr) => setMedia((current) => current.map((item) => item.id === asset.id ? { ...item, altAr } : item))} /></div>
                <div className="media-card-actions"><button onClick={() => saveMediaAlt(asset)}>{t.saveAlt}</button><button className="danger" disabled={usages.length > 0} onClick={() => deleteMedia(asset)}>{t.deleteMedia}</button></div>
              </article>;
            })}</div>
          </div>
        )}
      </section>

      {previewDesign && (
        <div className="design-preview-overlay" role="dialog" aria-modal="true" aria-label={`${t.preview}: ${DESIGN_NAMES[previewDesign]}`}>
          <div className="design-preview-toolbar">
            <div><b>{DESIGN_NAMES[previewDesign]}</b><span>{designMeta[previewDesign].sector[locale]}</span></div>
            <div className="preview-controls">
              {(["desktop", "tablet", "mobile"] as const).map((device) => <button key={device} className={previewDevice === device ? "active" : ""} onClick={() => setPreviewDevice(device)}>{t[device]}</button>)}
              <button className={previewLocale === "en" ? "active" : ""} onClick={() => setPreviewLocale("en")}>EN</button>
              <button className={previewLocale === "ar" ? "active" : ""} onClick={() => setPreviewLocale("ar")}>AR</button>
            </div>
            <div className="preview-actions">
              <Link target="_blank" href={`/${DESIGN_SLUGS.indexOf(previewDesign) + 1}?locale=${previewLocale}`}>{t.openPreview}</Link>
              <button className="primary" disabled={activating || content.activeDesign === previewDesign} onClick={() => activateDesign(previewDesign)}>{activating ? t.activating : t.activate}</button>
              <button onClick={() => setPreviewDesign(null)}>{t.closePreview}</button>
            </div>
          </div>
          <div className={`design-preview-stage ${previewDevice}`}>
            <iframe title={`${DESIGN_NAMES[previewDesign]} ${previewLocale}`} src={`/${DESIGN_SLUGS.indexOf(previewDesign) + 1}?locale=${previewLocale}`} />
          </div>
        </div>
      )}
    </main>
  );
}
