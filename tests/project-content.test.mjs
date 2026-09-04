import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_CONTENT,
  normalizeSiteContent,
  validateSiteContent,
} from "../lib/site-content.ts";

const clone = () => structuredClone(DEFAULT_CONTENT);

test("migrates legacy image and external URL without losing data", () => {
  const content = clone();
  const project = content.projects[0];
  project.images = [];
  project.links = [];
  project.image = "/media/legacy-image";
  project.externalUrl = "https://example.com/case";

  const migrated = normalizeSiteContent(content).projects[0];
  assert.equal(migrated.images[0].url, "/media/legacy-image");
  assert.deepEqual(migrated.images[0].caption, { en: "", ar: "" });
  assert.equal(migrated.links[0].url, "https://example.com/case");
  assert.equal("image" in migrated, false);
  assert.equal("externalUrl" in migrated, false);
});

test("allows incomplete drafts but blocks incomplete published projects", () => {
  const draft = clone();
  draft.projects[0].status = "draft";
  draft.projects[0].links = [
    { id: "link", label: { en: "", ar: "" }, url: "not-a-url" },
  ];
  assert.equal(validateSiteContent(draft), null);

  draft.projects[0].status = "published";
  assert.match(validateSiteContent(draft), /http or https/);
});

test("enforces gallery and link limits and bilingual publication metadata", () => {
  const content = clone();
  content.projects[0].images = Array.from({ length: 7 }, (_, index) => ({
    id: String(index),
    url: `/media/${index}`,
    alt: { en: "Image", ar: "صورة" },
    caption: { en: "", ar: "" },
  }));
  assert.match(validateSiteContent(content), /up to 6 images/);

  content.projects[0].images = [
    { id: "one", url: "/media/one", alt: { en: "", ar: "" }, caption: { en: "", ar: "" } },
  ];
  assert.match(validateSiteContent(content), /alt text/);
});

test("requires complete public CMS content and verified published metrics", () => {
  const content = clone();
  content.labels.work.ar = "";
  assert.match(validateSiteContent(content), /Section labels/);

  const metricContent = clone();
  metricContent.projects[0].metrics = [
    { label: { en: "Qualified leads", ar: "عملاء مؤهلون" }, value: "" },
  ];
  assert.match(validateSiteContent(metricContent), /metrics/);

  metricContent.projects[0].status = "draft";
  assert.equal(validateSiteContent(metricContent), null);
});

test("normalizes old projects that do not have metrics", () => {
  const content = clone();
  delete content.projects[0].metrics;
  const normalized = normalizeSiteContent(content);
  assert.deepEqual(normalized.projects[0].metrics, []);
});

test("migrates image captions and clamps portrait focal points", () => {
  const content = clone();
  content.projects[0].images = [{
    id: "legacy-caption",
    url: "/media/legacy-caption",
    alt: { en: "Campaign preview", ar: "معاينة الحملة" },
  }];
  content.profile.portraitFocalPoint = {
    desktop: { x: -40, y: 140 },
    mobile: { x: 35, y: 62 },
  };
  const normalized = normalizeSiteContent(content);
  assert.deepEqual(normalized.projects[0].images[0].caption, { en: "", ar: "" });
  assert.deepEqual(normalized.profile.portraitFocalPoint.desktop, { x: 0, y: 100 });
  assert.deepEqual(normalized.profile.portraitFocalPoint.mobile, { x: 35, y: 62 });
});

test("migrates project detail fields and stable slugs", () => {
  const content = clone();
  delete content.projects[0].slug;
  delete content.projects[0].description;
  delete content.projects[0].implementation;
  const normalized = normalizeSiteContent(content);
  assert.equal(normalized.projects[0].slug, content.projects[0].id);
  assert.deepEqual(normalized.projects[0].description, content.projects[0].summary);
  assert.deepEqual(normalized.projects[0].implementation, { en: "", ar: "" });
});

test("published project slugs must be valid and unique", () => {
  const content = clone();
  content.projects[1].slug = content.projects[0].slug;
  assert.match(validateSiteContent(content), /unique/);
  content.projects[1].slug = "!!!";
  assert.match(validateSiteContent(content), /URL slug/);
  content.projects[1].status = "draft";
  assert.equal(validateSiteContent(content), null);
});

test("migrates the companies section and validates only visible logos", () => {
  const legacy = clone();
  delete legacy.companies;
  const migrated = normalizeSiteContent(legacy);
  assert.deepEqual(migrated.companies.items, []);
  assert.equal(migrated.companies.heading.en, "Selected companies and teams");

  const content = clone();
  content.companies.items = [{
    id: "client-one",
    name: { en: "", ar: "" },
    logoUrl: "",
    alt: { en: "", ar: "" },
    website: "",
    showName: true,
    visible: false,
  }];
  assert.equal(validateSiteContent(content), null);
  content.companies.items[0].visible = true;
  assert.match(validateSiteContent(content), /require a logo/);
  content.companies.items[0].logoUrl = "/media/client-one";
  assert.match(validateSiteContent(content), /alt text/);
  content.companies.items[0].alt = { en: "Client one logo", ar: "شعار العميل الأول" };
  assert.match(validateSiteContent(content), /English and Arabic names/);
  content.companies.items[0].showName = false;
  assert.equal(validateSiteContent(content), null);
});

test("migrates reviews and validates only visible public reviews", () => {
  const legacy = clone();
  delete legacy.reviews;
  const migrated = normalizeSiteContent(legacy);
  assert.deepEqual(migrated.reviews.items, []);
  assert.equal(migrated.reviews.heading.en, "What people can say about the work");

  const content = clone();
  content.reviews.items = [{
    id: "review-one",
    quote: { en: "", ar: "" },
    author: { en: "", ar: "" },
    role: { en: "", ar: "" },
    company: "Example Co",
    avatarUrl: "/media/review-one",
    avatarAlt: { en: "", ar: "" },
    projectSlug: content.projects[0].slug,
    visible: false,
    order: 1,
  }];
  assert.equal(validateSiteContent(content), null);
  content.reviews.items[0].visible = true;
  assert.match(validateSiteContent(content), /Visible reviews require English and Arabic quote/);
  content.reviews.items[0].quote = { en: "Strong operator.", ar: "منفذ قوي." };
  content.reviews.items[0].author = { en: "Client Name", ar: "اسم العميل" };
  content.reviews.items[0].role = { en: "Founder", ar: "مؤسس" };
  assert.match(validateSiteContent(content), /review avatars/);
  content.reviews.items[0].avatarAlt = { en: "Client portrait", ar: "صورة العميل" };
  assert.equal(validateSiteContent(content), null);
});

test("migrates legacy design values and growth story content", () => {
  const legacy = clone();
  legacy.activeDesign = "arabic-geometry";
  delete legacy.growthStory;
  const migrated = normalizeSiteContent(legacy);
  assert.equal(migrated.activeDesign, "cinematic-growth");
  assert.equal(migrated.growthStory.problems.length, 4);
  assert.match(migrated.growthStory.title.en, /business starts falling/);

  const invalid = structuredClone(migrated);
  invalid.growthStory.result.ar = "";
  assert.match(validateSiteContent(invalid), /growth story/i);
});

test("accepts the scroll world atlas design slug", () => {
  const content = clone();
  content.activeDesign = "scroll-world-atlas";
  const migrated = normalizeSiteContent(content);
  assert.equal(migrated.activeDesign, "scroll-world-atlas");
  assert.equal(validateSiteContent(migrated), null);
});
