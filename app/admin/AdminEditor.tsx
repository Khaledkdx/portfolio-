"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type SetStateAction } from "react";
import { DESIGN_DEFINITIONS } from "@/app/_designs/registry";
import type { MediaAsset } from "@/lib/data";
import {
  type DesignSlug,
  normalizeProjectSlug,
  normalizeSiteContent,
  type CompanyLogo,
  type Experience,
  type Locale,
  type Project,
  type ProjectImage,
  type ProjectLink,
  type Review,
  type Service,
  type SiteContent,
} from "@/lib/site-content";

type Tab =
  | "overview"
  | "designs"
  | "projects"
  | "companies"
  | "reviews"
  | "services"
  | "experience"
  | "media";
type ProjectFilter = "all" | Project["status"];

const copy = {
  en: {
    tabs: {
      overview: "Profile & content",
      designs: "Designs",
      projects: "Case studies",
      companies: "Companies & logos",
      reviews: "Reviews",
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
    focalPoint: "Portrait focal point",
    focalHelp: "Move the focus separately for desktop and mobile crops.",
    desktopCrop: "Desktop crop",
    mobileCrop: "Mobile crop",
    horizontal: "Horizontal",
    vertical: "Vertical",
    replace: "Upload replacement",
    uploading: "Uploading…",
    labels: "Section labels & calls to action",
    approach: "Working method",
    addApproach: "＋ Add step",
    growthStory: "Growth transformation story",
    growthStoryHelp: "Controls the falling-company scroll scene on the public site.",
    storyEyebrow: "Story eyebrow",
    storyIntro: "Story introduction",
    storyIntervention: "Intervention sequence",
    storyResult: "Final business result",
    storyProblems: "Business friction points",
    addStoryProblem: "＋ Add friction point",
    published: "published",
    addProject: "＋ Add project",
    caseStudy: "Case study",
    status: { published: "Published", draft: "Draft", archived: "Archived" },
    eyebrow: "Eyebrow",
    title: "Title",
    summary: "Summary",
    slug: "Project URL slug",
    slugHelp: "Lowercase letters, numbers and hyphens only.",
    fullDescription: "Full description",
    challenge: "Challenge",
    response: "Response",
    implementation: "Implementation",
    value: "Business value",
    openProject: "Open project ↗",
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
    caption: "Visible image caption",
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
    companies: "Companies & client logos",
    companiesIntro: "Control the companies shown in the logo rail. Each item can show its logo alone or the logo beside its name.",
    companiesHeading: "Public section heading",
    addCompany: "＋ Add company",
    companyName: "Company name",
    companyLogo: "Company logo",
    companyAlt: "Logo alt text",
    companyWebsite: "Company website · optional",
    chooseLogo: "Choose a logo from the media library",
    uploadLogo: "Upload logo",
    showCompanyName: "Show the company name beside the logo",
    showCompany: "Show this company publicly",
    noCompanies: "No companies added yet. Add one, choose its logo, then make it visible.",
    reviews: "Reviews & proof",
    reviewsIntro: "Add real client, manager or teammate quotes. Visible reviews appear across every design in the new stagger proof section.",
    reviewsHeading: "Public reviews heading",
    reviewsIntroLabel: "Public reviews intro",
    addReview: "＋ Add review",
    reviewQuote: "Review quote",
    reviewAuthor: "Person name",
    reviewRole: "Role / context",
    reviewCompany: "Company · optional",
    reviewProject: "Linked project · optional",
    reviewAvatar: "Avatar / proof image",
    chooseAvatar: "Choose avatar from media library",
    uploadAvatar: "Upload avatar",
    showReview: "Show this review publicly",
    noReviews: "No reviews added yet. Add a real quote, then make it visible when approved.",
    maxReviews: "The reviews section can contain up to 20 entries.",
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
      designs: "التصميمات",
      projects: "دراسات الحالة",
      companies: "الشركات والشعارات",
      reviews: "الآراء",
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
    focalPoint: "نقطة تركيز الصورة",
    focalHelp: "اضبط موضع التركيز بشكل منفصل لقص سطح المكتب والموبايل.",
    desktopCrop: "قص سطح المكتب",
    mobileCrop: "قص الموبايل",
    horizontal: "أفقي",
    vertical: "رأسي",
    replace: "رفع صورة بديلة",
    uploading: "جارٍ الرفع…",
    labels: "عناوين الأقسام والدعوات",
    approach: "منهج العمل",
    addApproach: "＋ إضافة خطوة",
    growthStory: "قصة تحول ونمو الشركة",
    growthStoryHelp: "تتحكم هذه البيانات في مشهد سقوط الشركة وصعودها أثناء التمرير.",
    storyEyebrow: "العنوان العلوي للقصة",
    storyIntro: "مقدمة القصة",
    storyIntervention: "تسلسل التدخل",
    storyResult: "النتيجة التجارية النهائية",
    storyProblems: "نقاط تعطيل العمل",
    addStoryProblem: "＋ إضافة نقطة تعطيل",
    published: "منشور",
    addProject: "＋ إضافة مشروع",
    caseStudy: "دراسة حالة",
    status: { published: "منشور", draft: "مسودة", archived: "مؤرشف" },
    eyebrow: "العنوان العلوي",
    title: "العنوان",
    summary: "الملخص",
    slug: "رابط المشروع",
    slugHelp: "حروف إنجليزية صغيرة وأرقام وشرطة فقط.",
    fullDescription: "الوصف الكامل",
    challenge: "التحدي",
    response: "الحل",
    implementation: "تفاصيل التنفيذ",
    value: "القيمة للأعمال",
    openProject: "فتح المشروع ↗",
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
    caption: "شرح الصورة الظاهر",
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
    companies: "الشركات وشعارات العملاء",
    companiesIntro: "تحكم في الشركات الظاهرة داخل شريط الشعارات. يمكن عرض اللوجو فقط أو اللوجو بجانب اسم الشركة.",
    companiesHeading: "عنوان القسم في الموقع",
    addCompany: "＋ إضافة شركة",
    companyName: "اسم الشركة",
    companyLogo: "لوجو الشركة",
    companyAlt: "النص البديل للوجو",
    companyWebsite: "موقع الشركة · اختياري",
    chooseLogo: "اختيار لوجو من مكتبة الوسائط",
    uploadLogo: "رفع لوجو",
    showCompanyName: "إظهار اسم الشركة بجانب اللوجو",
    showCompany: "إظهار الشركة للعامة",
    noCompanies: "لم تتم إضافة شركات بعد. أضف شركة واختر اللوجو ثم فعّل ظهورها.",
    reviews: "الآراء والإثباتات",
    reviewsIntro: "أضف آراء حقيقية من عميل أو مدير أو زميل. الآراء المفعلة تظهر في كل التصميمات داخل قسم Stagger Proof الجديد.",
    reviewsHeading: "عنوان قسم الآراء في الموقع",
    reviewsIntroLabel: "مقدمة قسم الآراء في الموقع",
    addReview: "＋ إضافة رأي",
    reviewQuote: "نص الرأي",
    reviewAuthor: "اسم الشخص",
    reviewRole: "المنصب / السياق",
    reviewCompany: "الشركة · اختياري",
    reviewProject: "ربط بمشروع · اختياري",
    reviewAvatar: "الصورة / إثبات بصري",
    chooseAvatar: "اختيار صورة من مكتبة الوسائط",
    uploadAvatar: "رفع صورة",
    showReview: "إظهار هذا الرأي للعامة",
    noReviews: "لا توجد آراء بعد. أضف رأيًا حقيقيًا ثم فعّل ظهوره بعد الموافقة.",
    maxReviews: "قسم الآراء يقبل حتى 20 عنصرًا.",
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
  const id = crypto.randomUUID();
  return {
    id,
    slug: `project-${id.slice(0, 8)}`,
    status: "draft",
    order,
    eyebrow: { en: "NEW CASE STUDY", ar: "دراسة حالة جديدة" },
    title: { en: "Untitled project", ar: "مشروع بدون عنوان" },
    summary: { en: "", ar: "" },
    description: { en: "", ar: "" },
    challenge: { en: "", ar: "" },
    solution: { en: "", ar: "" },
    implementation: { en: "", ar: "" },
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

function newCompany(): CompanyLogo {
  return {
    id: crypto.randomUUID(),
    name: { en: "", ar: "" },
    logoUrl: "",
    alt: { en: "", ar: "" },
    website: "",
    showName: true,
    visible: false,
  };
}

function newReview(order: number): Review {
  return {
    id: crypto.randomUUID(),
    quote: { en: "", ar: "" },
    author: { en: "", ar: "" },
    role: { en: "", ar: "" },
    company: "",
    avatarUrl: "",
    avatarAlt: { en: "", ar: "" },
    projectSlug: "",
    visible: false,
    order,
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
}: {
  initialContent: SiteContent;
  initialMedia: MediaAsset[];
  ownerName: string;
  initialTab?: Tab;
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
  const [activatingDesign, setActivatingDesign] = useState<DesignSlug | null>(null);
  const [previewDesign, setPreviewDesign] = useState<DesignSlug | null>(null);
  const [previewLocale, setPreviewLocale] = useState<Locale>("en");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const project = content.projects[selectedProject];
  const t = copy[locale];
  const designOptions = useMemo(
    () => Object.values(DESIGN_DEFINITIONS).sort((a, b) => a.index - b.index),
    [],
  );
  const previewDefinition = previewDesign ? DESIGN_DEFINITIONS[previewDesign] : null;
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
    content.companies.items.forEach((company) => {
      if (company.logoUrl === asset.url)
        usages.push(company.name[locale] || (locale === "ar" ? "لوجو شركة" : "Company logo"));
    });
    content.reviews.items.forEach((review) => {
      if (review.avatarUrl === asset.url)
        usages.push(review.author[locale] || (locale === "ar" ? "صورة رأي" : "Review avatar"));
    });
    return usages;
  }

  function assignCompanyLogo(index: number, asset: MediaAsset) {
    setContent((current) => ({
      ...current,
      companies: {
        ...current.companies,
        items: current.companies.items.map((company, companyIndex) =>
          companyIndex === index
            ? {
                ...company,
                logoUrl: asset.url,
                alt: {
                  en: company.alt.en || asset.altEn || company.name.en,
                  ar: company.alt.ar || asset.altAr || company.name.ar,
                },
              }
            : company,
        ),
      },
    }));
  }

  function assignReviewAvatar(index: number, asset: MediaAsset) {
    setContent((current) => ({
      ...current,
      reviews: {
        ...current.reviews,
        items: current.reviews.items.map((review, reviewIndex) =>
          reviewIndex === index
            ? {
                ...review,
                avatarUrl: asset.url,
                avatarAlt: {
                  en: review.avatarAlt.en || asset.altEn || review.author.en,
                  ar: review.avatarAlt.ar || asset.altAr || review.author.ar,
                },
              }
            : review,
        ),
      },
    }));
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

  async function activateDesign(slug: DesignSlug) {
    if (slug === content.activeDesign) return;
    if (!window.confirm(t.confirmActivate)) return;
    setActivatingDesign(slug);
    setNotice("");
    try {
      const response = await fetch("/api/admin/design", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ activeDesign: slug }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        activeDesign?: DesignSlug;
        error?: string;
      };
      if (!response.ok) throw new Error(result.error ?? t.failed);
      setContentState((current) =>
        normalizeSiteContent({
          ...current,
          activeDesign: result.activeDesign ?? slug,
        }),
      );
      setNotice(t.designActivated);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : t.failed);
    } finally {
      setActivatingDesign(null);
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
      caption: { en: "", ar: "" },
    };
    updateProject({ images: [...project.images, image] });
    setNotice(t.added);
  }

  async function uploadFiles(
    files: File[],
    target: "portrait" | "project" | "library" | "company" | "review",
    itemIndex?: number,
  ) {
    if (!files.length) return;
    setUploading(true);
    setNotice("");
    const uploaded: MediaAsset[] = [];
    const company = itemIndex === undefined ? undefined : content.companies.items[itemIndex];
    const review = itemIndex === undefined ? undefined : content.reviews.items[itemIndex];
    const limit = target === "project" ? Math.max(0, 6 - (project?.images.length ?? 0)) : target === "company" || target === "review" ? 1 : files.length;
    for (const file of files.slice(0, limit)) {
      const form = new FormData();
      form.append("file", file);
      form.append("altEn", target === "portrait" ? "Khalid Mohamad" : target === "company" ? (company?.name.en || file.name) : target === "review" ? (review?.author.en || file.name) : (project?.title.en ?? file.name));
      form.append("altAr", target === "portrait" ? "خالد محمد" : target === "company" ? (company?.name.ar || file.name) : target === "review" ? (review?.author.ar || file.name) : (project?.title.ar ?? file.name));
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
        caption: { en: "", ar: "" },
      }));
      updateProject({ images: [...project.images, ...additions].slice(0, 6) });
    }
    if (target === "company" && itemIndex !== undefined && uploaded[0])
      assignCompanyLogo(itemIndex, uploaded[0]);
    if (target === "review" && itemIndex !== undefined && uploaded[0])
      assignReviewAvatar(itemIndex, uploaded[0]);
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
          <Link href="/api/auth/logout">{t.signout}</Link>
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

        {tab === "designs" && (
          <div className="admin-stack">
            <div className="admin-panel">
              <header>
                <div>
                  <span>{t.tabs.designs.toUpperCase()}</span>
                  <h2>{t.tabs.designs}</h2>
                  <p className="designs-intro">{t.designsIntro}</p>
                </div>
              </header>
              <div className="design-admin-grid">
                {designOptions.map((definition) => {
                  const active = content.activeDesign === definition.slug;
                  return (
                    <article className={`design-admin-card ${active ? "active" : ""}`} key={definition.slug}>
                      <span className="design-card-number">/{definition.index}</span>
                      {active ? <b className="active-design-label">{t.active}</b> : null}
                      <div className={`design-card-mini design-card-mini-${definition.index}`} aria-hidden="true">
                        <i /><i /><i />
                      </div>
                      <p>{definition.sector}</p>
                      <h2>{definition.name}</h2>
                      <div className="design-swatches" aria-hidden="true">
                        {definition.palette.map((color) => <i key={color} style={{ background: color }} />)}
                      </div>
                      <div className="design-card-actions">
                        <button onClick={() => { setPreviewDesign(definition.slug); setPreviewLocale(locale); }}>
                          {t.preview}
                        </button>
                        <button
                          className="primary"
                          disabled={active || activatingDesign === definition.slug}
                          onClick={() => activateDesign(definition.slug)}
                        >
                          {activatingDesign === definition.slug ? t.activating : t.activate}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        )}

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
              <Image src={content.profile.portrait} width={360} height={460} alt={content.profile.name} unoptimized className="admin-portrait" style={{ objectPosition: `${content.profile.portraitFocalPoint.desktop.x}% ${content.profile.portraitFocalPoint.desktop.y}%` }} />
              <label className="upload-button">{uploading ? t.uploading : t.replace}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => uploadFiles(Array.from(event.target.files ?? []), "portrait")} /></label>
              <div className="portrait-focus-editor">
                <h3>{t.focalPoint}</h3><p>{t.focalHelp}</p>
                {(["desktop", "mobile"] as const).map((device) => (
                  <fieldset key={device}>
                    <legend>{device === "desktop" ? t.desktopCrop : t.mobileCrop}</legend>
                    <label>{t.horizontal}<input type="range" min="0" max="100" value={content.profile.portraitFocalPoint[device].x} onChange={(event) => setContent({ ...content, profile: { ...content.profile, portraitFocalPoint: { ...content.profile.portraitFocalPoint, [device]: { ...content.profile.portraitFocalPoint[device], x: Number(event.target.value) } } } })} /></label>
                    <label>{t.vertical}<input type="range" min="0" max="100" value={content.profile.portraitFocalPoint[device].y} onChange={(event) => setContent({ ...content, profile: { ...content.profile, portraitFocalPoint: { ...content.profile.portraitFocalPoint, [device]: { ...content.profile.portraitFocalPoint[device], y: Number(event.target.value) } } } })} /></label>
                    <div className={`portrait-crop-preview ${device}`}><Image src={content.profile.portrait} alt="" fill sizes="220px" unoptimized style={{ objectFit: "cover", objectPosition: `${content.profile.portraitFocalPoint[device].x}% ${content.profile.portraitFocalPoint[device].y}%` }} /></div>
                  </fieldset>
                ))}
              </div>
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
            <div className="admin-panel wide">
              <header><div><span>CINEMATIC STORY</span><h2>{t.growthStory}</h2><p>{t.growthStoryHelp}</p></div></header>
              <div className="field-grid">
                <LocalizedField label={t.storyEyebrow} value={content.growthStory.eyebrow} locale={locale} onChange={(value) => setContent({ ...content, growthStory: { ...content.growthStory, eyebrow: localized(content.growthStory.eyebrow, value) } })} />
                <LocalizedField label={t.title} value={content.growthStory.title} locale={locale} multiline onChange={(value) => setContent({ ...content, growthStory: { ...content.growthStory, title: localized(content.growthStory.title, value) } })} />
                <div className="full"><LocalizedField label={t.storyIntro} value={content.growthStory.intro} locale={locale} multiline onChange={(value) => setContent({ ...content, growthStory: { ...content.growthStory, intro: localized(content.growthStory.intro, value) } })} /></div>
                <LocalizedField label={t.storyIntervention} value={content.growthStory.intervention} locale={locale} onChange={(value) => setContent({ ...content, growthStory: { ...content.growthStory, intervention: localized(content.growthStory.intervention, value) } })} />
                <LocalizedField label={t.storyResult} value={content.growthStory.result} locale={locale} multiline onChange={(value) => setContent({ ...content, growthStory: { ...content.growthStory, result: localized(content.growthStory.result, value) } })} />
              </div>
              <header><div><span>{t.storyProblems.toUpperCase()}</span><h3>{t.storyProblems}</h3></div><button className="upload-button" onClick={() => setContent({ ...content, growthStory: { ...content.growthStory, problems: [...content.growthStory.problems, { id: crypto.randomUUID(), title: { en: "New friction point", ar: "نقطة تعطيل جديدة" }, description: { en: "", ar: "" } }] } })}>{t.addStoryProblem}</button></header>
              {content.growthStory.problems.map((problem, index) => <div className="repeater" key={problem.id}><span>{String(index + 1).padStart(2, "0")}</span><div className="field-grid">
                <LocalizedField label={t.title} value={problem.title} locale={locale} onChange={(value) => setContent({ ...content, growthStory: { ...content.growthStory, problems: content.growthStory.problems.map((item, itemIndex) => itemIndex === index ? { ...item, title: localized(item.title, value) } : item) } })} />
                <LocalizedField label={t.description} value={problem.description} locale={locale} multiline onChange={(value) => setContent({ ...content, growthStory: { ...content.growthStory, problems: content.growthStory.problems.map((item, itemIndex) => itemIndex === index ? { ...item, description: localized(item.description, value) } : item) } })} />
                <div className="full">{repeaterActions(index, content.growthStory.problems.length, (to) => setContent({ ...content, growthStory: { ...content.growthStory, problems: move(content.growthStory.problems, index, to) } }), () => content.growthStory.problems.length > 1 && window.confirm(t.confirmDelete) && setContent({ ...content, growthStory: { ...content.growthStory, problems: content.growthStory.problems.filter((_, itemIndex) => itemIndex !== index) } }))}</div>
              </div></div>)}
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
                      {project.status === "published" && project.slug ? <Link target="_blank" href={`/${locale}/projects/${project.slug}`}>{t.openProject}</Link> : null}
                      <button className="danger-button" onClick={deleteProject}>{t.delete}</button>
                    </div>
                  </header>
                  <div className="field-grid">
                    <LocalizedField label={t.eyebrow} value={project.eyebrow} locale={locale} onChange={(value) => updateProject({ eyebrow: localized(project.eyebrow, value) })} />
                    <LocalizedField label={t.title} value={project.title} locale={locale} onChange={(value) => updateProject({ title: localized(project.title, value) })} />
                    <Field label={t.slug} value={project.slug} dir="ltr" placeholder={t.slugHelp} onChange={(slug) => updateProject({ slug: normalizeProjectSlug(slug) })} />
                    <div className="full"><LocalizedField label={t.summary} value={project.summary} locale={locale} multiline onChange={(value) => updateProject({ summary: localized(project.summary, value) })} /></div>
                    <div className="full"><LocalizedField label={t.fullDescription} value={project.description} locale={locale} multiline onChange={(value) => updateProject({ description: localized(project.description, value) })} /></div>
                    <div className="full"><LocalizedField label={t.challenge} value={project.challenge} locale={locale} multiline onChange={(value) => updateProject({ challenge: localized(project.challenge, value) })} /></div>
                    <div className="full"><LocalizedField label={t.response} value={project.solution} locale={locale} multiline onChange={(value) => updateProject({ solution: localized(project.solution, value) })} /></div>
                    <div className="full"><LocalizedField label={t.implementation} value={project.implementation} locale={locale} multiline onChange={(value) => updateProject({ implementation: localized(project.implementation, value) })} /></div>
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
                        <LocalizedField label={t.caption} value={image.caption} locale={locale} multiline onChange={(value) => updateProject({ images: project.images.map((item, i) => i === index ? { ...item, caption: localized(item.caption, value) } : item) })} />
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

        {tab === "companies" && (
          <div className="admin-stack">
            <div className="admin-panel company-editor-panel">
              <header>
                <div><span>{t.companies.toUpperCase()}</span><h2>{t.companies}</h2><p>{t.companiesIntro}</p></div>
                <button className="upload-button" disabled={content.companies.items.length >= 30} onClick={() => setContent({ ...content, companies: { ...content.companies, items: [...content.companies.items, newCompany()] } })}>{t.addCompany}</button>
              </header>
              <div className="company-heading-field">
                <LocalizedField label={t.companiesHeading} value={content.companies.heading} locale={locale} onChange={(value) => setContent({ ...content, companies: { ...content.companies, heading: localized(content.companies.heading, value) } })} />
              </div>
              {content.companies.items.length === 0 ? <p className="empty-state">{t.noCompanies}</p> : (
                <div className="company-editor-grid">
                  {content.companies.items.map((company, index) => (
                    <article className="company-editor-card" key={company.id}>
                      <header>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <b>{company.visible ? (locale === "ar" ? "ظاهر" : "Visible") : (locale === "ar" ? "مخفي" : "Hidden")}</b>
                      </header>
                      <div className="company-logo-preview">
                        {company.logoUrl ? <Image src={company.logoUrl} alt={company.alt[locale] || company.name[locale]} width={220} height={100} unoptimized /> : <span>{locale === "ar" ? "اختر اللوجو" : "Choose a logo"}</span>}
                        {company.showName && company.name[locale] ? <strong>{company.name[locale]}</strong> : null}
                      </div>
                      <div className="field-grid">
                        <LocalizedField label={t.companyName} value={company.name} locale={locale} onChange={(value) => setContent({ ...content, companies: { ...content.companies, items: content.companies.items.map((item, itemIndex) => itemIndex === index ? { ...item, name: localized(item.name, value) } : item) } })} />
                        <LocalizedField label={t.companyAlt} value={company.alt} locale={locale} onChange={(value) => setContent({ ...content, companies: { ...content.companies, items: content.companies.items.map((item, itemIndex) => itemIndex === index ? { ...item, alt: localized(item.alt, value) } : item) } })} />
                        <div className="full"><Field type="url" label={t.companyWebsite} value={company.website} dir="ltr" onChange={(website) => setContent({ ...content, companies: { ...content.companies, items: content.companies.items.map((item, itemIndex) => itemIndex === index ? { ...item, website } : item) } })} /></div>
                      </div>
                      <label className="admin-field company-logo-select"><span>{t.chooseLogo}</span><select value={company.logoUrl} onChange={(event) => {
                        const asset = media.find((item) => item.url === event.target.value);
                        if (asset) assignCompanyLogo(index, asset);
                        else setContent({ ...content, companies: { ...content.companies, items: content.companies.items.map((item, itemIndex) => itemIndex === index ? { ...item, logoUrl: "" } : item) } });
                      }}><option value="">—</option>{media.map((asset) => <option key={asset.id} value={asset.url}>{asset.filename}</option>)}</select></label>
                      <div className="company-option-row">
                        <label><input type="checkbox" checked={company.showName} onChange={(event) => setContent({ ...content, companies: { ...content.companies, items: content.companies.items.map((item, itemIndex) => itemIndex === index ? { ...item, showName: event.target.checked } : item) } })} /> <span>{t.showCompanyName}</span></label>
                        <label><input type="checkbox" checked={company.visible} onChange={(event) => setContent({ ...content, companies: { ...content.companies, items: content.companies.items.map((item, itemIndex) => itemIndex === index ? { ...item, visible: event.target.checked } : item) } })} /> <span>{t.showCompany}</span></label>
                      </div>
                      <div className="company-card-actions">
                        <label className="upload-button">{uploading ? t.uploading : t.uploadLogo}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => uploadFiles(Array.from(event.target.files ?? []), "company", index)} /></label>
                        {repeaterActions(index, content.companies.items.length, (to) => setContent({ ...content, companies: { ...content.companies, items: move(content.companies.items, index, to) } }), () => window.confirm(t.confirmDelete) && setContent({ ...content, companies: { ...content.companies, items: content.companies.items.filter((_, itemIndex) => itemIndex !== index) } }))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div className="admin-stack">
            <div className="admin-panel review-editor-panel">
              <header>
                <div><span>{t.reviews.toUpperCase()}</span><h2>{t.reviews}</h2><p>{t.reviewsIntro}</p></div>
                <button
                  className="upload-button"
                  disabled={content.reviews.items.length >= 20}
                  onClick={() => {
                    if (content.reviews.items.length >= 20) return setNotice(t.maxReviews);
                    setContent({
                      ...content,
                      reviews: {
                        ...content.reviews,
                        items: [...content.reviews.items, newReview(content.reviews.items.length + 1)],
                      },
                    });
                  }}
                >
                  {t.addReview}
                </button>
              </header>
              <div className="field-grid">
                <LocalizedField
                  label={t.reviewsHeading}
                  value={content.reviews.heading}
                  locale={locale}
                  onChange={(value) => setContent({ ...content, reviews: { ...content.reviews, heading: localized(content.reviews.heading, value) } })}
                />
                <LocalizedField
                  label={t.reviewsIntroLabel}
                  value={content.reviews.intro}
                  locale={locale}
                  multiline
                  onChange={(value) => setContent({ ...content, reviews: { ...content.reviews, intro: localized(content.reviews.intro, value) } })}
                />
              </div>
              {content.reviews.items.length === 0 ? <p className="empty-state">{t.noReviews}</p> : (
                <div className="review-editor-grid">
                  {content.reviews.items.map((review, index) => (
                    <article className="review-editor-card" key={review.id}>
                      <header>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <label><input type="checkbox" checked={review.visible} onChange={(event) => setContent({ ...content, reviews: { ...content.reviews, items: content.reviews.items.map((item, itemIndex) => itemIndex === index ? { ...item, visible: event.target.checked } : item) } })} /> {t.showReview}</label>
                      </header>
                      <div className="review-preview">
                        <div>
                          {review.avatarUrl ? <Image src={review.avatarUrl} alt={review.avatarAlt[locale] || review.author[locale]} width={72} height={72} unoptimized /> : <span>{review.author[locale]?.slice(0, 1) || "?"}</span>}
                        </div>
                        <blockquote>{review.quote[locale] || (locale === "ar" ? "اكتب نص الرأي هنا" : "Write the review quote here")}</blockquote>
                        <b>{review.author[locale] || (locale === "ar" ? "اسم الشخص" : "Person name")}</b>
                      </div>
                      <div className="field-grid">
                        <div className="full"><LocalizedField label={t.reviewQuote} value={review.quote} locale={locale} multiline onChange={(value) => setContent({ ...content, reviews: { ...content.reviews, items: content.reviews.items.map((item, itemIndex) => itemIndex === index ? { ...item, quote: localized(item.quote, value) } : item) } })} /></div>
                        <LocalizedField label={t.reviewAuthor} value={review.author} locale={locale} onChange={(value) => setContent({ ...content, reviews: { ...content.reviews, items: content.reviews.items.map((item, itemIndex) => itemIndex === index ? { ...item, author: localized(item.author, value) } : item) } })} />
                        <LocalizedField label={t.reviewRole} value={review.role} locale={locale} onChange={(value) => setContent({ ...content, reviews: { ...content.reviews, items: content.reviews.items.map((item, itemIndex) => itemIndex === index ? { ...item, role: localized(item.role, value) } : item) } })} />
                        <Field label={t.reviewCompany} value={review.company} onChange={(company) => setContent({ ...content, reviews: { ...content.reviews, items: content.reviews.items.map((item, itemIndex) => itemIndex === index ? { ...item, company } : item) } })} />
                        <label className="admin-field">
                          <span>{t.reviewProject}</span>
                          <select value={review.projectSlug} onChange={(event) => setContent({ ...content, reviews: { ...content.reviews, items: content.reviews.items.map((item, itemIndex) => itemIndex === index ? { ...item, projectSlug: event.target.value } : item) } })}>
                            <option value="">—</option>
                            {content.projects.filter((item) => item.status === "published").map((item) => <option key={item.id} value={item.slug}>{item.title[locale]}</option>)}
                          </select>
                        </label>
                        <LocalizedField label={t.alt} value={review.avatarAlt} locale={locale} onChange={(value) => setContent({ ...content, reviews: { ...content.reviews, items: content.reviews.items.map((item, itemIndex) => itemIndex === index ? { ...item, avatarAlt: localized(item.avatarAlt, value) } : item) } })} />
                      </div>
                      <label className="admin-field company-logo-select"><span>{t.chooseAvatar}</span><select value={review.avatarUrl} onChange={(event) => {
                        const asset = media.find((item) => item.url === event.target.value);
                        if (asset) assignReviewAvatar(index, asset);
                        else setContent({ ...content, reviews: { ...content.reviews, items: content.reviews.items.map((item, itemIndex) => itemIndex === index ? { ...item, avatarUrl: "" } : item) } });
                      }}><option value="">—</option>{media.map((asset) => <option key={asset.id} value={asset.url}>{asset.filename}</option>)}</select></label>
                      <div className="company-card-actions">
                        <label className="upload-button">{uploading ? t.uploading : t.uploadAvatar}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => uploadFiles(Array.from(event.target.files ?? []), "review", index)} /></label>
                        {repeaterActions(index, content.reviews.items.length, (to) => setContent({ ...content, reviews: { ...content.reviews, items: move(content.reviews.items, index, to).map((item, itemIndex) => ({ ...item, order: itemIndex + 1 })) } }), () => window.confirm(t.confirmDelete) && setContent({ ...content, reviews: { ...content.reviews, items: content.reviews.items.filter((_, itemIndex) => itemIndex !== index).map((item, itemIndex) => ({ ...item, order: itemIndex + 1 })) } }))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
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

      {previewDefinition ? (
        <div className="design-preview-overlay" role="dialog" aria-modal="true" aria-label={previewDefinition.name}>
          <div className="design-preview-toolbar">
            <div>
              <b>{previewDefinition.name}</b>
              <span>/{previewDefinition.index} · {previewDefinition.sector}</span>
            </div>
            <div className="preview-controls" aria-label={locale === "ar" ? "أدوات المعاينة" : "Preview controls"}>
              {(["desktop", "tablet", "mobile"] as const).map((device) => (
                <button key={device} className={previewDevice === device ? "active" : ""} onClick={() => setPreviewDevice(device)}>
                  {t[device]}
                </button>
              ))}
              <button className={previewLocale === "en" ? "active" : ""} onClick={() => setPreviewLocale("en")}>EN</button>
              <button className={previewLocale === "ar" ? "active" : ""} onClick={() => setPreviewLocale("ar")}>AR</button>
            </div>
            <div className="preview-actions">
              <a href={`/${previewDefinition.index}?locale=${previewLocale}`} target="_blank" rel="noreferrer">{t.openPreview}</a>
              <button
                className="primary"
                disabled={content.activeDesign === previewDefinition.slug || activatingDesign === previewDefinition.slug}
                onClick={() => activateDesign(previewDefinition.slug)}
              >
                {activatingDesign === previewDefinition.slug ? t.activating : t.activate}
              </button>
              <button onClick={() => setPreviewDesign(null)}>{t.closePreview}</button>
            </div>
          </div>
          <div className={`design-preview-stage ${previewDevice}`}>
            <iframe title={previewDefinition.name} src={`/${previewDefinition.index}?locale=${previewLocale}`} />
          </div>
        </div>
      ) : null}

    </main>
  );
}
