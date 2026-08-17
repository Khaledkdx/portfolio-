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
  }));
  assert.match(validateSiteContent(content), /up to 6 images/);

  content.projects[0].images = [
    { id: "one", url: "/media/one", alt: { en: "", ar: "" } },
  ];
  assert.match(validateSiteContent(content), /alt text/);
});
