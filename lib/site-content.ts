export type Locale = "en" | "ar";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type Service = {
  id: string;
  number: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type Experience = {
  id: string;
  role: LocalizedText;
  company: string;
  period: string;
  summary: LocalizedText;
};

export type ProjectImage = {
  id: string;
  url: string;
  alt: LocalizedText;
  caption: LocalizedText;
};

export type PortraitFocalPoint = {
  desktop: { x: number; y: number };
  mobile: { x: number; y: number };
};

export type ProjectLink = {
  id: string;
  label: LocalizedText;
  url: string;
};

export type CompanyLogo = {
  id: string;
  name: LocalizedText;
  logoUrl: string;
  alt: LocalizedText;
  website: string;
  showName: boolean;
  visible: boolean;
};

export type Project = {
  id: string;
  slug: string;
  status: "published" | "draft" | "archived";
  order: number;
  title: LocalizedText;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  challenge: LocalizedText;
  solution: LocalizedText;
  implementation: LocalizedText;
  outcome: LocalizedText;
  tools: string[];
  metrics: Array<{ label: LocalizedText; value: string }>;
  images: ProjectImage[];
  links: ProjectLink[];
  /** Legacy fields are accepted during migration and removed on the next save. */
  image?: string;
  externalUrl?: string;
};

export type SiteContent = {
  activeDesign: DesignSlug;
  profile: {
    name: string;
    role: LocalizedText;
    headline: LocalizedText;
    intro: LocalizedText;
    availability: LocalizedText;
    email: string;
    whatsapp: string;
    linkedin: string;
    portrait: string;
    portraitFocalPoint: PortraitFocalPoint;
  };
  labels: Record<string, LocalizedText>;
  approach: Array<{
    id: string;
    title: LocalizedText;
    description: LocalizedText;
  }>;
  services: Service[];
  skills: string[];
  experiences: Experience[];
  companies: {
    heading: LocalizedText;
    items: CompanyLogo[];
  };
  projects: Project[];
};

export const DESIGN_SLUGS = [
  "growth-operator",
  "executive-brief",
  "campaign-desk",
  "systems-map",
  "signal-scale",
  "gulf-modern",
  "proof-of-work",
  "momentum",
  "studio-ledger",
  "control-room",
  "arabic-geometry",
  "spatial-orbit",
  "modular-cubes",
  "future-signal",
  "swiss-grid",
  "analog-scrapbook",
  "art-deco",
  "zen-strategy",
  "retro-computer",
  "organic-lab",
  "museum-walk",
  "growth-transit",
  "campaign-comics",
  "folded-mail",
  "contact-sheet",
  "gtm-gameboard",
  "whiteboard-workshop",
  "broadcast-studio",
  "type-tunnel",
  "tactile-clay",
  "rain-credential",
  "stagger-proof",
] as const;

export type DesignSlug = (typeof DESIGN_SLUGS)[number];

export const DESIGN_NAMES: Record<DesignSlug, string> = {
  "growth-operator": "Boardroom Annual Report",
  "executive-brief": "Creative Agency Manifesto",
  "campaign-desk": "Quiet Luxury Advisor",
  "systems-map": "SaaS Growth OS",
  "signal-scale": "Editorial Campaign Casebook",
  "gulf-modern": "Gulf Architectural Modernism",
  "proof-of-work": "Performance Marketing War Room",
  momentum: "Motion-first Creator Reel",
  "studio-ledger": "Human-Centered Growth Stories",
  "control-room": "Neo-Brutalist Pitch Deck",
  "arabic-geometry": "Arabic Geometry",
  "spatial-orbit": "Spatial 3D Orbit",
  "modular-cubes": "Modular Cubes",
  "future-signal": "Future Signal 2040",
  "swiss-grid": "Swiss Grid System",
  "analog-scrapbook": "Analog Scrapbook",
  "art-deco": "Art Deco Executive",
  "zen-strategy": "Zen Strategy",
  "retro-computer": "Retro Growth Computer",
  "organic-lab": "Organic Growth Lab",
  "museum-walk": "Museum Walk",
  "growth-transit": "Growth Transit",
  "campaign-comics": "Campaign Comics",
  "folded-mail": "Folded Direct Mail",
  "contact-sheet": "Contact Sheet Studio",
  "gtm-gameboard": "GTM Gameboard",
  "whiteboard-workshop": "Whiteboard Workshop",
  "broadcast-studio": "Broadcast Studio",
  "type-tunnel": "Type Tunnel",
  "tactile-clay": "Tactile Clay Lab",
  "rain-credential": "Rain Credential",
  "stagger-proof": "Stagger Proof Studio",
};

const t = (en: string, ar: string): LocalizedText => ({ en, ar });

export const DEFAULT_CONTENT: SiteContent = {
  activeDesign: "growth-operator",
  profile: {
    name: "Khalid Mohamad",
    role: t(
      "Business Growth & Automation Specialist",
      "متخصص تطوير الأعمال والأتمتة",
    ),
    headline: t(
      "I turn business bottlenecks into growth systems.",
      "أحوّل اختناقات الأعمال إلى أنظمة نمو.",
    ),
    intro: t(
      "I connect marketing judgment, business development and practical automation to remove friction, improve customer journeys and help teams move faster.",
      "أربط بين الرؤية التسويقية وتطوير الأعمال والأتمتة العملية لإزالة التعقيد وتحسين رحلة العميل ومساعدة الفرق على التحرك بسرعة أكبر.",
    ),
    availability: t(
      "Available for growth, marketing and automation opportunities across the UAE, KSA and remote teams.",
      "متاح لفرص تطوير الأعمال والتسويق والأتمتة في الإمارات والسعودية ومع فرق العمل عن بُعد.",
    ),
    email: "saim.goodm@gmail.com",
    whatsapp: "971506797854",
    linkedin: "",
    portrait: "/khalid-portrait.jpg",
    portraitFocalPoint: {
      desktop: { x: 50, y: 32 },
      mobile: { x: 50, y: 30 },
    },
  },
  labels: {
    work: t("Selected work", "أعمال مختارة"),
    services: t("What I bring", "ما أقدمه"),
    approach: t("How I work", "كيف أعمل"),
    experience: t("Selected experience", "خبرات مختارة"),
    contact: t("Let’s solve the next bottleneck", "لنحل المشكلة التالية"),
    contactCopy: t(
      "If growth is being slowed by a disconnected process, unclear message or repetitive work, let’s map it and build a better system.",
      "إذا كان النمو يتباطأ بسبب عملية مفككة أو رسالة غير واضحة أو عمل متكرر، فلنحدد المشكلة ونبني نظامًا أفضل.",
    ),
    email: t("Email me", "راسلني"),
    whatsapp: t("WhatsApp", "واتساب"),
    viewCase: t("View case study", "عرض دراسة الحالة"),
    challenge: t("The challenge", "التحدي"),
    solution: t("The response", "الحل"),
    outcome: t("Business value", "القيمة للأعمال"),
    menu: t("Menu", "القائمة"),
  },
  approach: [
    {
      id: "diagnose",
      title: t("Diagnose the friction", "تشخيص نقطة التعطيل"),
      description: t(
        "Start with the customer journey, team workflow and commercial goal—not the tool.",
        "أبدأ برحلة العميل ومسار عمل الفريق والهدف التجاري، وليس بالأداة.",
      ),
    },
    {
      id: "design",
      title: t("Design the system", "تصميم النظام"),
      description: t(
        "Connect the right message, channel, data and automation into one practical flow.",
        "أربط الرسالة والقناة والبيانات والأتمتة المناسبة في مسار عملي واحد.",
      ),
    },
    {
      id: "improve",
      title: t("Measure and improve", "القياس والتحسين"),
      description: t(
        "Test the experience, learn from real behavior and keep refining what moves the business.",
        "أختبر التجربة وأتعلم من السلوك الفعلي وأواصل تحسين ما يدفع الأعمال للأمام.",
      ),
    },
  ],
  services: [
    {
      id: "growth",
      number: "01",
      title: t("Growth & business development", "النمو وتطوير الأعمال"),
      description: t(
        "Market research, opportunity framing and customer journeys that connect commercial goals to focused action.",
        "بحث السوق وصياغة الفرص ورحلات العملاء التي تربط الأهداف التجارية بخطوات واضحة.",
      ),
    },
    {
      id: "marketing",
      number: "02",
      title: t("Performance marketing", "التسويق القائم على الأداء"),
      description: t(
        "Media planning and campaign optimization across Meta, Google, TikTok and Snapchat, guided by the right KPIs.",
        "تخطيط الحملات وتحسينها عبر Meta وGoogle وTikTok وSnapchat وفق مؤشرات الأداء المناسبة.",
      ),
    },
    {
      id: "automation",
      number: "03",
      title: t("AI agents & automation", "وكلاء الذكاء الاصطناعي والأتمتة"),
      description: t(
        "Practical AI and n8n workflows for lead qualification, CRM updates, messaging, summaries and internal operations.",
        "حلول AI وn8n عملية لتأهيل العملاء وتحديث CRM والمراسلات والتلخيص والعمليات الداخلية.",
      ),
    },
    {
      id: "creative",
      number: "04",
      title: t("Content & creative systems", "أنظمة المحتوى والإبداع"),
      description: t(
        "Content strategy, copy, design and video workflows that keep brand output consistent and useful.",
        "استراتيجية محتوى وكتابة وتصميم وفيديو تحافظ على اتساق العلامة وجودة المخرجات.",
      ),
    },
  ],
  skills: [
    "Business development",
    "Marketing strategy",
    "Media buying",
    "AI agents",
    "n8n automation",
    "RAG workflows",
    "Content strategy",
    "Problem solving",
    "Flutter",
    "REST APIs",
    "Adobe Creative Suite",
    "Arabic / English",
  ],
  experiences: [
    {
      id: "pioneers-ai",
      role: t("AI Agent Builder", "مطوّر وكلاء ذكاء اصطناعي"),
      company: "Pioneers Properties — UAE",
      period: "Selected experience",
      summary: t(
        "Designed multilingual agents and n8n workflows for customer engagement, lead qualification, document handling and multi-channel operations.",
        "صممت وكلاء متعددين اللغات ومسارات n8n للتواصل مع العملاء وتأهيل الفرص ومعالجة المستندات والعمليات متعددة القنوات.",
      ),
    },
    {
      id: "pioneers-media",
      role: t("Media Buyer", "مشتري إعلانات"),
      company: "Pioneers Properties — UAE",
      period: "Selected experience",
      summary: t(
        "Planned and optimized paid media using audience research, budget control and campaign KPIs.",
        "خططت للحملات المدفوعة وحسنتها عبر بحث الجمهور وإدارة الميزانية ومؤشرات الأداء.",
      ),
    },
    {
      id: "swar",
      role: t("IT, Design & Video", "تقنية معلومات وتصميم وفيديو"),
      company: "Swar Sfqa — KSA",
      period: "Selected experience",
      summary: t(
        "Supported technical operations while producing campaign assets, video content and structured media libraries for marketing and sales.",
        "دعمت العمليات التقنية وأنتجت مواد الحملات والفيديو ومكتبات إعلامية منظمة لفرق التسويق والمبيعات.",
      ),
    },
    {
      id: "abm",
      role: t(
        "Flutter Developer & Media Buyer",
        "مطوّر Flutter ومشتري إعلانات",
      ),
      company: "ABM Service",
      period: "Selected experience",
      summary: t(
        "Built cross-platform applications and contributed to performance marketing across international client work.",
        "طورت تطبيقات متعددة المنصات وساهمت في التسويق القائم على الأداء لعملاء في أسواق مختلفة.",
      ),
    },
  ],
  companies: {
    heading: t(
      "Selected companies and teams",
      "شركات وفرق عمل مختارة",
    ),
    items: [],
  },
  projects: [
    {
      id: "real-estate-agent",
      slug: "real-estate-agent",
      status: "published",
      order: 1,
      eyebrow: t("AI + REAL ESTATE OPERATIONS", "AI + عمليات العقارات"),
      title: t(
        "A multilingual operating layer for real estate teams",
        "طبقة تشغيل ذكية ومتعددة اللغات لفرق العقارات",
      ),
      summary: t(
        "AI agents designed around the way sales and management teams actually work.",
        "وكلاء ذكاء اصطناعي مصممون حول طريقة عمل فرق المبيعات والإدارة فعليًا.",
      ),
      description: t(
        "A practical operating system for real-estate teams that brings business knowledge, lead handling and day-to-day follow-up into one multilingual workflow.",
        "نظام تشغيل عملي لفرق العقارات يجمع معرفة الشركة ومعالجة العملاء والمتابعة اليومية داخل مسار عمل واحد متعدد اللغات.",
      ),
      challenge: t(
        "Information and follow-up were spread across documents, messaging channels and different levels of team access.",
        "كانت المعلومات والمتابعة موزعة بين المستندات وقنوات الرسائل ومستويات وصول مختلفة داخل الفريق.",
      ),
      solution: t(
        "Built GPT-based agents with RAG, vector search and n8n workflows for lead qualification, summaries, CRM updates and WhatsApp/Telegram messaging.",
        "بنيت وكلاء يعتمدون على GPT وRAG والبحث المتجهي مع مسارات n8n لتأهيل العملاء والتلخيص وتحديث CRM والمراسلة عبر واتساب وتيليجرام.",
      ),
      implementation: t(
        "Mapped team roles and information sources, structured the knowledge base, then connected qualification, summaries, CRM updates and messaging through controlled automation flows.",
        "حددت أدوار الفريق ومصادر المعلومات، ونظمت قاعدة المعرفة، ثم ربطت التأهيل والتلخيص وتحديث CRM والمراسلات عبر مسارات أتمتة محكومة.",
      ),
      outcome: t(
        "A clearer route from business knowledge to fast, role-appropriate action for sales and leadership.",
        "مسار أوضح يحول معرفة الشركة إلى إجراءات سريعة ومناسبة لصلاحيات فرق المبيعات والإدارة.",
      ),
      tools: [
        "GPT",
        "RAG",
        "Vector DB",
        "n8n",
        "WhatsApp",
        "Telegram",
        "Google Drive",
      ],
      metrics: [],
      images: [],
      links: [],
    },
    {
      id: "performance-marketing",
      slug: "performance-marketing",
      status: "published",
      order: 2,
      eyebrow: t("PAID MEDIA + MARKET RESEARCH", "إعلانات مدفوعة + بحث سوق"),
      title: t(
        "Campaign decisions built around the market—not assumptions",
        "قرارات حملات مبنية على السوق لا على الافتراضات",
      ),
      summary: t(
        "Performance marketing work across UAE and KSA brands, from audience research to ongoing optimization.",
        "عمل تسويقي قائم على الأداء لعلامات في الإمارات والسعودية، من دراسة الجمهور إلى التحسين المستمر.",
      ),
      description: t(
        "A repeatable campaign workflow connecting market research, media planning, creative direction and ongoing optimization for brands in the UAE and Saudi Arabia.",
        "مسار حملات قابل للتكرار يربط بحث السوق وتخطيط الوسائط والتوجيه الإبداعي والتحسين المستمر لعلامات في الإمارات والسعودية.",
      ),
      challenge: t(
        "Different brands needed channel choices, messaging and budgets that matched their actual audience and commercial context.",
        "احتاجت العلامات المختلفة إلى قنوات ورسائل وميزانيات تناسب جمهورها وسياقها التجاري الفعلي.",
      ),
      solution: t(
        "Combined competitor analysis, media planning and KPI-led optimization across Google, Meta, TikTok and Snapchat.",
        "جمعت بين تحليل المنافسين وتخطيط الوسائط والتحسين وفق مؤشرات الأداء عبر Google وMeta وTikTok وSnapchat.",
      ),
      implementation: t(
        "Built audience and competitor views, selected channels around the commercial objective, organized campaign structures and reviewed performance against the agreed KPIs.",
        "بنيت تصورًا للجمهور والمنافسين، واخترت القنوات وفق الهدف التجاري، ونظمت هيكل الحملات وراجعت الأداء مقابل مؤشرات الأداء المتفق عليها.",
      ),
      outcome: t(
        "More disciplined media decisions and a repeatable process for learning from campaign performance.",
        "قرارات إعلانية أكثر انضباطًا وعملية قابلة للتكرار للتعلم من أداء الحملات.",
      ),
      tools: ["Meta Ads", "Google Ads", "TikTok Ads", "Snapchat Ads", "Excel"],
      metrics: [],
      images: [],
      links: [],
    },
    {
      id: "creative-operations",
      slug: "creative-operations",
      status: "published",
      order: 3,
      eyebrow: t("CONTENT + CREATIVE OPERATIONS", "محتوى + عمليات إبداعية"),
      title: t(
        "A content system teams can actually keep using",
        "نظام محتوى يستطيع الفريق الاستمرار في استخدامه",
      ),
      summary: t(
        "Strategy, copy, design and video production connected through an organized media workflow.",
        "استراتيجية وكتابة وتصميم وإنتاج فيديو مرتبطة بمسار منظم لإدارة المواد الإعلامية.",
      ),
      description: t(
        "A connected content operation covering strategy, copy, design, video and reusable asset management instead of isolated campaign files.",
        "عملية محتوى مترابطة تشمل الاستراتيجية والكتابة والتصميم والفيديو وإدارة الأصول القابلة لإعادة الاستخدام بدلًا من ملفات حملات منفصلة.",
      ),
      challenge: t(
        "Fast campaign production can create inconsistent assets, lost files and unnecessary work between marketing and sales.",
        "قد يؤدي الإنتاج السريع للحملات إلى مواد غير متسقة وملفات مفقودة وعمل متكرر بين التسويق والمبيعات.",
      ),
      solution: t(
        "Created campaign assets and video while organizing reusable libraries for faster content deployment across channels.",
        "أنشأت مواد الحملات والفيديو ونظمت مكتبات قابلة لإعادة الاستخدام لتسريع نشر المحتوى عبر القنوات.",
      ),
      implementation: t(
        "Established reusable templates, naming and storage conventions, production checkpoints and a clearer handoff between creative, marketing and sales.",
        "أنشأت قوالب قابلة لإعادة الاستخدام وقواعد للتسمية والتخزين ونقاط مراجعة للإنتاج وتسليمًا أوضح بين الإبداع والتسويق والمبيعات.",
      ),
      outcome: t(
        "A more consistent brand output and a simpler handoff between creative, marketing and sales teams.",
        "مخرجات أكثر اتساقًا للعلامة وتسليم أبسط بين فرق الإبداع والتسويق والمبيعات.",
      ),
      tools: [
        "Photoshop",
        "Illustrator",
        "Premiere Pro",
        "After Effects",
        "CapCut",
        "Canva",
      ],
      metrics: [],
      images: [],
      links: [],
    },
    {
      id: "product-technology",
      slug: "product-technology",
      status: "published",
      order: 4,
      eyebrow: t(
        "PRODUCT + TECHNICAL PROBLEM SOLVING",
        "منتجات + حل مشكلات تقنية",
      ),
      title: t(
        "From operational need to a usable digital product",
        "من الاحتياج التشغيلي إلى منتج رقمي قابل للاستخدام",
      ),
      summary: t(
        "Cross-platform application development backed by practical technical support and clean integrations.",
        "تطوير تطبيقات متعددة المنصات مدعوم بدعم تقني عملي وتكاملات منظمة.",
      ),
      description: t(
        "Cross-platform product delivery shaped around real operational needs, reliable integrations and a maintainable user experience.",
        "تنفيذ منتجات متعددة المنصات مصمم حول احتياجات تشغيلية حقيقية وتكاملات موثوقة وتجربة استخدام قابلة للصيانة.",
      ),
      challenge: t(
        "Digital products need to work reliably across devices while connecting cleanly to backend services and real workflows.",
        "يجب أن تعمل المنتجات الرقمية بثبات عبر الأجهزة وأن تتصل بوضوح بالخدمات الخلفية ومسارات العمل الحقيقية.",
      ),
      solution: t(
        "Developed responsive Flutter applications, integrated REST APIs and applied structured state management and testing practices.",
        "طورت تطبيقات Flutter متجاوبة وربطت REST APIs وطبقت إدارة حالة منظمة وممارسات اختبار مناسبة.",
      ),
      implementation: t(
        "Translated workflows into responsive screens, connected REST services, structured application state and tested the paths most important to users and operations.",
        "حولت مسارات العمل إلى شاشات متجاوبة، وربطت خدمات REST، ونظمت حالة التطبيق، واختبرت المسارات الأكثر أهمية للمستخدمين والعمليات.",
      ),
      outcome: t(
        "Technical execution grounded in usability, maintainability and the business process behind the product.",
        "تنفيذ تقني يرتكز على سهولة الاستخدام وقابلية الصيانة والعملية التجارية خلف المنتج.",
      ),
      tools: ["Flutter", "Dart", "REST APIs", "Riverpod", "Bloc", "GetX"],
      metrics: [],
      images: [],
      links: [],
    },
  ],
};

export function pick(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "ar";
}

export function isDesignSlug(value: string): value is DesignSlug {
  return DESIGN_SLUGS.includes(value as DesignSlug);
}

export function projectImages(project: Project): ProjectImage[] {
  if (Array.isArray(project.images) && project.images.length > 0)
    return project.images.map((image) => ({
      ...image,
      alt: image.alt ?? { en: "", ar: "" },
      caption: image.caption ?? { en: "", ar: "" },
    }));
  if (!project.image) return [];
  return [
    {
      id: `legacy-image-${project.id}`,
      url: project.image,
      alt: { ...project.title },
      caption: { en: "", ar: "" },
    },
  ];
}

export function projectLinks(project: Project): ProjectLink[] {
  if (Array.isArray(project.links) && project.links.length > 0)
    return project.links;
  if (!project.externalUrl) return [];
  return [
    {
      id: `legacy-link-${project.id}`,
      label: { en: "View project", ar: "عرض المشروع" },
      url: project.externalUrl,
    },
  ];
}

export function normalizeSiteContent(content: SiteContent): SiteContent {
  return {
    ...content,
    profile: {
      ...content.profile,
      portraitFocalPoint: {
        desktop: {
          x: clampFocalPoint(content.profile?.portraitFocalPoint?.desktop?.x, 50),
          y: clampFocalPoint(content.profile?.portraitFocalPoint?.desktop?.y, 32),
        },
        mobile: {
          x: clampFocalPoint(content.profile?.portraitFocalPoint?.mobile?.x, 50),
          y: clampFocalPoint(content.profile?.portraitFocalPoint?.mobile?.y, 30),
        },
      },
    },
    companies: {
      heading: content.companies?.heading ?? {
        en: "Selected companies and teams",
        ar: "شركات وفرق عمل مختارة",
      },
      items: (content.companies?.items ?? []).map((company) => ({
        ...company,
        name: company.name ?? { en: "", ar: "" },
        logoUrl: company.logoUrl ?? "",
        alt: company.alt ?? { en: "", ar: "" },
        website: company.website ?? "",
        showName: company.showName ?? true,
        visible: company.visible ?? true,
      })),
    },
    projects: (content.projects ?? []).map((project) => {
      const normalized: Project = {
        ...project,
        slug: normalizeProjectSlug(project.slug || project.id),
        description: project.description ?? project.summary ?? { en: "", ar: "" },
        implementation: project.implementation ?? { en: "", ar: "" },
        tools: Array.isArray(project.tools) ? project.tools : [],
        metrics: Array.isArray(project.metrics) ? project.metrics : [],
        images: projectImages(project),
        links: projectLinks(project),
      };
      delete normalized.image;
      delete normalized.externalUrl;
      return normalized;
    }),
  };
}

function clampFocalPoint(value: number | undefined, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(100, Math.max(0, Number(value)));
}

export function normalizeProjectSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function projectBySlug(content: SiteContent, slug: string): Project | null {
  return content.projects.find(
    (project) => project.status === "published" && project.slug === slug,
  ) ?? null;
}

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateSiteContent(input: SiteContent): string | null {
  const content = normalizeSiteContent(input);
  const publishedSlugs = new Set<string>();
  if (
    !content.profile?.headline?.en?.trim() ||
    !content.profile?.headline?.ar?.trim() ||
    !isDesignSlug(content.activeDesign)
  ) {
    return "Invalid site content";
  }
  if (!/^\S+@\S+\.\S+$/.test(content.profile.email)) return "Enter a valid public email address.";
  if (!/^\d{8,15}$/.test(content.profile.whatsapp)) return "Enter a valid international WhatsApp number.";
  if (content.profile.linkedin && !isHttpUrl(content.profile.linkedin)) return "LinkedIn must use a valid http or https URL.";
  if (!content.profile.role.en.trim() || !content.profile.role.ar.trim() || !content.profile.intro.en.trim() || !content.profile.intro.ar.trim()) return "The public profile requires English and Arabic content.";
  if (Object.values(content.labels).some((label) => !label.en.trim() || !label.ar.trim())) return "Section labels require English and Arabic text.";
  if (!content.companies.heading.en.trim() || !content.companies.heading.ar.trim()) return "The companies section requires an English and Arabic heading.";
  if (content.companies.items.length > 30) return "The companies section can contain up to 30 entries.";
  for (const company of content.companies.items) {
    if (!company.visible) continue;
    if (!company.logoUrl.trim()) return "Visible companies require a logo.";
    if (!company.alt.en.trim() || !company.alt.ar.trim()) return "Visible company logos require English and Arabic alt text.";
    if (company.showName && (!company.name.en.trim() || !company.name.ar.trim())) return "Companies showing a name require English and Arabic names.";
    if (company.website && !isHttpUrl(company.website)) return "Company websites must use a valid http or https URL.";
  }
  if (content.approach.some((item) => !item.title.en.trim() || !item.title.ar.trim() || !item.description.en.trim() || !item.description.ar.trim())) return "Approach items require English and Arabic content.";
  if (content.services.some((item) => !item.title.en.trim() || !item.title.ar.trim() || !item.description.en.trim() || !item.description.ar.trim())) return "Services require English and Arabic content.";
  if (content.experiences.some((item) => !item.company.trim() || !item.role.en.trim() || !item.role.ar.trim() || !item.summary.en.trim() || !item.summary.ar.trim())) return "Experience items require a company and bilingual content.";
  for (const project of content.projects) {
    if (project.images.length > 6)
      return "A project can contain up to 6 images.";
    if (project.links.length > 3) return "A project can contain up to 3 links.";
    if (project.status !== "published") continue;
    if (!project.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug))
      return "Published projects require a URL slug using lowercase letters, numbers and hyphens.";
    if (publishedSlugs.has(project.slug))
      return "Published project URL slugs must be unique.";
    publishedSlugs.add(project.slug);
    if (project.links.some((link) => !isHttpUrl(link.url)))
      return "Project links must use a valid http or https URL.";
    if (!project.title.en.trim() || !project.title.ar.trim())
      return "Published projects require English and Arabic titles.";
    if (
      !project.summary.en.trim() ||
      !project.summary.ar.trim() ||
      !project.description.en.trim() ||
      !project.description.ar.trim() ||
      !project.challenge.en.trim() ||
      !project.challenge.ar.trim() ||
      !project.solution.en.trim() ||
      !project.solution.ar.trim() ||
      !project.outcome.en.trim() ||
      !project.outcome.ar.trim()
    )
      return "Published projects require bilingual summary, description, challenge, solution and business value.";
    if (
      project.images.some(
        (image) => !image.url || !image.alt.en.trim() || !image.alt.ar.trim(),
      )
    )
      return "Published project images require English and Arabic alt text.";
    if (
      project.links.some(
        (link) => !link.label.en.trim() || !link.label.ar.trim(),
      )
    )
      return "Published project links require English and Arabic names.";
    if (project.metrics.some((metric) => !metric.label.en.trim() || !metric.label.ar.trim() || !metric.value.trim())) return "Published project metrics require bilingual labels and a value.";
  }
  return null;
}
