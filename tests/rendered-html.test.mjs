import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("ships bilingual portfolio content without private CV details", async () => {
  const [content, arabicGeometry, growthOs] = await Promise.all([
    readFile(new URL("lib/site-content.ts", root), "utf8"),
    readFile(new URL("app/_designs/arabic-geometry/ArabicGeometry.tsx", root), "utf8"),
    readFile(new URL("app/_designs/growth-os/GrowthOS.tsx", root), "utf8"),
  ]);
  assert.match(content, /I turn business bottlenecks into growth systems\./);
  assert.match(content, /أحوّل اختناقات الأعمال إلى أنظمة نمو/);
  assert.match(content, /saim\.goodm@gmail\.com/);
  assert.match(content, /971506797854/);
  assert.doesNotMatch(content, /Alradwan|Sammanoud|Download CV/);
  assert.match(arabicGeometry, /dir=\{locale === "ar" \? "rtl" : "ltr"\}/);
  assert.match(growthOs, /dir=\{locale === "ar" \? "rtl" : "ltr"\}/);
});

test("includes twelve complete selectable design directions and independent project views", async () => {
  const [content, portfolio, registry] = await Promise.all([
    readFile(new URL("lib/site-content.ts", root), "utf8"),
    readFile(new URL("app/_components/Portfolio.tsx", root), "utf8"),
    readFile(new URL("app/_designs/registry.ts", root), "utf8"),
  ]);
  const slugs = ["arabic-geometry", "systems-map", "spatial-orbit", "modular-cubes", "future-signal", "swiss-grid", "analog-scrapbook", "art-deco", "retro-computer", "organic-lab", "broadcast-studio", "control-room"];
  for (const slug of slugs) {
    assert.match(content, new RegExp(slug));
    assert.match(registry, new RegExp(`slug: "${slug}"`));
  }
  assert.match(content, /activeDesign: "arabic-geometry"/);
  assert.match(content, /isDesignSlug\(String\(content\.activeDesign\)\) \? content\.activeDesign : "arabic-geometry"/);
  const components = [
    "arabic-geometry/ArabicGeometry.tsx", "growth-os/GrowthOS.tsx", "spatial-orbit/SpatialOrbit.tsx", "modular-cubes/ModularCubes.tsx",
    "future-signal/FutureSignal.tsx", "swiss-grid/SwissGrid.tsx", "analog-scrapbook/AnalogScrapbook.tsx", "art-deco/ArtDeco.tsx",
    "retro-computer/RetroComputer.tsx", "organic-lab/OrganicLab.tsx", "broadcast-studio/BroadcastStudio.tsx", "pitch/Pitch.tsx",
  ];
  for (const component of components) await access(new URL(`app/_designs/${component}`, root));
  const projectFolders = ["arabic-geometry", "growth-os", "spatial-orbit", "modular-cubes", "future-signal", "swiss-grid", "analog-scrapbook", "art-deco", "retro-computer", "organic-lab", "broadcast-studio", "pitch"];
  for (const folder of projectFolders) {
    const projectSource = await readFile(new URL(`app/_designs/${folder}/Project.tsx`, root), "utf8");
    await access(new URL(`app/_designs/${folder}/project.module.css`, root));
    assert.doesNotMatch(projectSource, /ProjectDetailView/);
    assert.match(projectSource, /ProjectPicture/);
  }
  assert.match(portfolio, /definition\.load\(\)/);
  assert.match(portfolio, /ReviewProofWall/);
  assert.match(registry, /loadProject/);
  const route = await readFile(new URL("app/[locale]/page.tsx", root), "utf8");
  assert.match(route, /1\[0-2\]\|\[1-9\]/);
  assert.match(route, /DESIGN_SLUGS\[index\]/);
  assert.match(route, /variantPath=\{`\/\$\{value\}`\}/);
  await access(new URL("app/[locale]/projects/[slug]/page.tsx", root));
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
  assert.match(workflow, /actions\/setup-node@v6/);
  assert.match(workflow, /run: npm test/);
  assert.doesNotMatch(workflow, /cloudflare\/wrangler-action/);
  assert.doesNotMatch(workflow, /ADMIN_PASSWORD/);
  await access(new URL("public/og.png", root));
  await access(new URL("dist/server/index.js", root));
});

test("admin contains design activation, CMS repeaters, media safety and dirty-state protection", async () => {
  const [editor, data, designsPage, designPreviewPage, metrics, reviewWall, mediaRoute] = await Promise.all([
    readFile(new URL("app/admin/AdminEditor.tsx", root), "utf8"),
    readFile(new URL("lib/data.ts", root), "utf8"),
    readFile(new URL("app/designs/page.tsx", root), "utf8"),
    readFile(new URL("app/designs/[design]/page.tsx", root), "utf8"),
    readFile(new URL("app/_designs/ProjectMetrics.tsx", root), "utf8"),
    readFile(new URL("app/_components/ReviewProofWall.tsx", root), "utf8"),
    readFile(new URL("app/api/admin/media/[id]/route.ts", root), "utf8"),
  ]);
  assert.match(editor, /"designs"/);
  assert.match(editor, /beforeunload/);
  assert.match(editor, /\/api\/admin\/design/);
  assert.match(editor, /design-preview-stage/);
  assert.match(editor, /PreviewDevice/);
  assert.match(editor, /project\.metrics\.map/);
  assert.match(editor, /saveMediaAlt/);
  assert.match(editor, /deleteMedia/);
  assert.match(editor, /companies\.items\.map/);
  assert.match(editor, /reviews\.items\.map/);
  assert.match(editor, /assignReviewAvatar/);
  assert.match(editor, /uploadFiles\(Array\.from\(event\.target\.files \?\? \[\]\), "review"/);
  assert.match(editor, /showCompanyName/);
  assert.match(editor, /assignCompanyLogo/);
  assert.match(reviewWall, /framer-motion/);
  assert.match(reviewWall, /useReducedMotion/);
  assert.match(reviewWall, /reviewProjectHref/);
  assert.match(mediaRoute, /Review avatar/);
  assert.match(data, /json_set\(content_json, '\$\.activeDesign'/);
  assert.match(designsPage, /redirect\("\/admin\?tab=designs"\)/);
  assert.match(designPreviewPage, /admin\?tab=designs&preview=/);
  assert.match(metrics, /if \(!metrics\.length\) return null/);
  await access(new URL("components/ui/logos3.tsx", root));
  await access(new URL("components/ui/carousel.tsx", root));
});
