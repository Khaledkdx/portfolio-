import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("ships bilingual portfolio content without private CV details", async () => {
  const [content, boardroom, manifesto] = await Promise.all([
    readFile(new URL("lib/site-content.ts", root), "utf8"),
    readFile(new URL("app/_designs/boardroom/Boardroom.tsx", root), "utf8"),
    readFile(new URL("app/_designs/manifesto/Manifesto.tsx", root), "utf8"),
  ]);
  assert.match(content, /I turn business bottlenecks into growth systems\./);
  assert.match(content, /أحوّل اختناقات الأعمال إلى أنظمة نمو/);
  assert.match(content, /saim\.goodm@gmail\.com/);
  assert.match(content, /971506797854/);
  assert.doesNotMatch(content, /Alradwan|Sammanoud|Download CV/);
  assert.match(boardroom, /dir=\{locale === "ar" \? "rtl" : "ltr"\}/);
  assert.match(manifesto, /dir=\{locale === "ar" \? "rtl" : "ltr"\}/);
});

test("includes ten complete selectable design directions", async () => {
  const [content, portfolio, registry] = await Promise.all([
    readFile(new URL("lib/site-content.ts", root), "utf8"),
    readFile(new URL("app/_components/Portfolio.tsx", root), "utf8"),
    readFile(new URL("app/_designs/registry.ts", root), "utf8"),
  ]);
  const slugs = ["growth-operator", "executive-brief", "campaign-desk", "systems-map", "signal-scale", "gulf-modern", "proof-of-work", "momentum", "studio-ledger", "control-room"];
  for (const slug of slugs) {
    assert.match(content, new RegExp(slug));
    assert.match(registry, new RegExp(`slug: "${slug}"`));
  }
  const components = [
    "boardroom/Boardroom.tsx", "manifesto/Manifesto.tsx", "luxury/Luxury.tsx", "growth-os/GrowthOS.tsx", "casebook/Casebook.tsx",
    "gulf/Gulf.tsx", "war-room/WarRoom.tsx", "reel/Reel.tsx", "stories/Stories.tsx", "pitch/Pitch.tsx",
  ];
  for (const component of components) await access(new URL(`app/_designs/${component}`, root));
  assert.match(portfolio, /definition\.load\(\)/);
  const route = await readFile(new URL("app/[locale]/page.tsx", root), "utf8");
  assert.match(route, /\^\(10\|\[1-9\]\)\$/);
  assert.match(route, /DESIGN_SLUGS\[index\]/);
  assert.match(route, /variantPath=\{`\/\$\{value\}`\}/);
});

test("protects every admin mutation and includes independent deployment config", async () => {
  const [adminPage, contentRoute, designRoute, mediaRoute, auth, loginRoute, hosting, workflow] = await Promise.all([
    readFile(new URL("app/admin/page.tsx", root), "utf8"),
    readFile(new URL("app/api/admin/content/route.ts", root), "utf8"),
    readFile(new URL("app/api/admin/design/route.ts", root), "utf8"),
    readFile(new URL("app/api/admin/media/[id]/route.ts", root), "utf8"),
    readFile(new URL("lib/owner-auth.ts", root), "utf8"),
    readFile(new URL("app/api/auth/login/route.ts", root), "utf8"),
    readFile(new URL("wrangler.jsonc", root), "utf8"),
    readFile(new URL(".github/workflows/deploy.yml", root), "utf8"),
  ]);
  assert.match(adminPage, /requireOwner\(returnTo\)/);
  assert.match(contentRoute, /getOwner\(\)/);
  assert.match(designRoute, /getOwner\(\)/);
  assert.match(designRoute, /updateActiveDesign/);
  assert.match(mediaRoute, /getOwner\(\)/);
  assert.match(mediaRoute, /status: 409/);
  assert.match(auth, /ADMIN_PASSWORD/);
  assert.match(loginRoute, /httpOnly: true/);
  assert.doesNotMatch(auth, /ChatGPT|oai-authenticated/);
  assert.match(hosting, /"binding": "DB"/);
  assert.match(hosting, /"binding": "MEDIA"/);
  assert.match(workflow, /cloudflare\/wrangler-action@v4/);
  assert.match(workflow, /ADMIN_PASSWORD/);
  await access(new URL("public/og.png", root));
  await access(new URL("dist/server/index.js", root));
});

test("admin contains design activation, CMS repeaters, media safety and dirty-state protection", async () => {
  const [editor, data, designsPage, designPreviewPage, metrics] = await Promise.all([
    readFile(new URL("app/admin/AdminEditor.tsx", root), "utf8"),
    readFile(new URL("lib/data.ts", root), "utf8"),
    readFile(new URL("app/designs/page.tsx", root), "utf8"),
    readFile(new URL("app/designs/[design]/page.tsx", root), "utf8"),
    readFile(new URL("app/_designs/ProjectMetrics.tsx", root), "utf8"),
  ]);
  assert.match(editor, /"designs"/);
  assert.match(editor, /beforeunload/);
  assert.match(editor, /\/api\/admin\/design/);
  assert.match(editor, /design-preview-stage/);
  assert.match(editor, /PreviewDevice/);
  assert.match(editor, /project\.metrics\.map/);
  assert.match(editor, /saveMediaAlt/);
  assert.match(editor, /deleteMedia/);
  assert.match(data, /json_set\(content_json, '\$\.activeDesign'/);
  assert.match(designsPage, /redirect\("\/admin\?tab=designs"\)/);
  assert.match(designPreviewPage, /admin\?tab=designs&preview=/);
  assert.match(metrics, /if \(!metrics\.length\) return null/);
});
