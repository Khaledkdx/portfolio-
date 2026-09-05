import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("ships bilingual cinematic portfolio content without private CV details", async () => {
  const [content, cinematic, scene] = await Promise.all([
    readFile(new URL("lib/site-content.ts", root), "utf8"),
    readFile(new URL("app/_designs/cinematic-growth/CinematicGrowth.tsx", root), "utf8"),
    readFile(new URL("app/_designs/cinematic-growth/GrowthStoryScene.tsx", root), "utf8"),
  ]);
  assert.match(content, /I turn business bottlenecks into growth systems\./);
  assert.match(content, /أحوّل اختناقات الأعمال إلى أنظمة نمو/);
  assert.match(content, /saim\.goodm@gmail\.com/);
  assert.match(content, /971506797854/);
  assert.doesNotMatch(content, /Alradwan|Sammanoud|Download CV/);
  assert.match(cinematic, /dir=\{locale === "ar" \? "rtl" : "ltr"\}/);
  assert.match(cinematic, /PortraitImage/);
  assert.match(cinematic, /CAMPAIGNS & GROWTH/);
  assert.match(cinematic, /Review section is ready/);
  assert.match(scene, /ScrollScrubCanvas/);
  assert.match(scene, /\/scroll-scrub\/company-collapse\/desktop/);
  await access(new URL("public/scroll-scrub/company-collapse/desktop/poster.webp", root));
  await access(new URL("public/scroll-scrub/company-collapse/mobile/poster.webp", root));
  assert.match(scene, /useReducedMotion/);
});

test("ships three selectable designs and independent project views", async () => {
  const [content, portfolio, registry] = await Promise.all([
    readFile(new URL("lib/site-content.ts", root), "utf8"),
    readFile(new URL("app/_components/Portfolio.tsx", root), "utf8"),
    readFile(new URL("app/_designs/registry.ts", root), "utf8"),
  ]);
  assert.match(content, /"cinematic-growth"/);
  assert.match(content, /"scroll-world-atlas"/);
  assert.match(content, /"agentic-growth-core"/);
  assert.match(registry, /slug: "cinematic-growth"/);
  assert.match(registry, /slug: "scroll-world-atlas"/);
  assert.match(registry, /slug: "agentic-growth-core"/);
  assert.match(content, /activeDesign: "cinematic-growth"/);
  const projectSource = await readFile(new URL("app/_designs/cinematic-growth/Project.tsx", root), "utf8");
  const atlasProjectSource = await readFile(new URL("app/_designs/scroll-world-atlas/Project.tsx", root), "utf8");
  const agenticSource = await readFile(new URL("app/_designs/agentic-growth-core/AgenticGrowthCore.tsx", root), "utf8");
  const agenticProjectSource = await readFile(new URL("app/_designs/agentic-growth-core/Project.tsx", root), "utf8");
  await access(new URL("app/_designs/cinematic-growth/project.module.css", root));
  await access(new URL("app/_designs/scroll-world-atlas/atlas-project.module.css", root));
  await access(new URL("app/_designs/scroll-world-atlas/scroll-world-atlas.module.css", root));
  await access(new URL("app/_designs/agentic-growth-core/agentic-growth-core.module.css", root));
  await access(new URL("app/_designs/agentic-growth-core/project.module.css", root));
  await access(new URL("public/agentic-growth-core/cyber-human.webp", root));
  await access(new URL("public/agentic-growth-core/agent-network.webp", root));
  await access(new URL("public/agentic-growth-core/avatar.webp", root));
  await access(new URL("public/agentic-growth-core/avatar-transform.mp4", root));
  assert.match(projectSource, /ProjectPicture/);
  assert.match(atlasProjectSource, /ProjectPicture/);
  assert.match(atlasProjectSource, /const dossier =/);
  assert.match(atlasProjectSource, /project\.summary/);
  assert.match(atlasProjectSource, /project\.description/);
  assert.match(atlasProjectSource, /project\.challenge/);
  assert.match(atlasProjectSource, /project\.solution/);
  assert.match(atlasProjectSource, /project\.implementation/);
  assert.match(atlasProjectSource, /project\.outcome/);
  assert.match(agenticSource, /content\.agenticStory\.sections/);
  assert.match(agenticSource, /AvatarScrub/);
  assert.match(agenticSource, /projectSlugs/);
  assert.match(agenticProjectSource, /project\.challenge/);
  assert.match(agenticProjectSource, /project\.solution/);
  assert.match(agenticProjectSource, /project\.implementation/);
  assert.match(agenticProjectSource, /project\.outcome/);
  const atlasSource = await readFile(new URL("app/_designs/scroll-world-atlas/ScrollWorldAtlas.tsx", root), "utf8");
  assert.match(atlasSource, /caseProblem/);
  assert.match(atlasSource, /project\.challenge/);
  assert.match(atlasSource, /project\.solution/);
  assert.match(atlasSource, /project\.outcome/);
  assert.doesNotMatch(atlasSource, /campaignProjects/);
  assert.doesNotMatch(atlasSource, /slice\(0, 4\)\.map/);
  assert.match(portfolio, /definition\.load\(\)/);
  assert.doesNotMatch(portfolio, /ReviewProofWall/);
  assert.match(registry, /loadProject/);
  const route = await readFile(new URL("app/[locale]/page.tsx", root), "utf8");
  assert.match(route, /\/\^\\d\+\$\//);
  assert.match(route, /DESIGN_SLUGS\[index\]/);
  assert.match(route, /variantPath=\{`\/\$\{value\}`\}/);
  await access(new URL("app/[locale]/projects/[slug]/page.tsx", root));
});

test("protects every admin mutation and includes independent deployment config", async () => {
  const [adminPage, contentRoute, mediaRoute, auth, loginRoute, hosting, workflow] = await Promise.all([
    readFile(new URL("app/admin/page.tsx", root), "utf8"),
    readFile(new URL("app/api/admin/content/route.ts", root), "utf8"),
    readFile(new URL("app/api/admin/media/[id]/route.ts", root), "utf8"),
    readFile(new URL("lib/owner-auth.ts", root), "utf8"),
    readFile(new URL("app/api/auth/login/route.ts", root), "utf8"),
    readFile(new URL("wrangler.jsonc", root), "utf8"),
    readFile(new URL(".github/workflows/deploy.yml", root), "utf8"),
  ]);
  assert.match(adminPage, /requireOwner\(returnTo\)/);
  assert.match(contentRoute, /getOwner\(\)/);
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

test("admin contains design switching, cinematic story CMS, media safety and dirty-state protection", async () => {
  const [editor, adminPage, designsPage, designPreviewPage, designRoute, metrics, scene, mediaRoute] = await Promise.all([
    readFile(new URL("app/admin/AdminEditor.tsx", root), "utf8"),
    readFile(new URL("app/admin/page.tsx", root), "utf8"),
    readFile(new URL("app/designs/page.tsx", root), "utf8"),
    readFile(new URL("app/designs/[design]/page.tsx", root), "utf8"),
    readFile(new URL("app/api/admin/design/route.ts", root), "utf8"),
    readFile(new URL("app/_designs/ProjectMetrics.tsx", root), "utf8"),
    readFile(new URL("app/_designs/cinematic-growth/GrowthStoryScene.tsx", root), "utf8"),
    readFile(new URL("app/api/admin/media/[id]/route.ts", root), "utf8"),
  ]);
  assert.match(editor, /tab === "designs"/);
  assert.match(editor, /activateDesign/);
  assert.match(editor, /\/api\/admin\/design/);
  assert.match(adminPage, /"designs"/);
  assert.match(designRoute, /getOwner\(\)/);
  assert.match(designRoute, /isDesignSlug/);
  assert.match(designRoute, /activeDesign/);
  assert.match(editor, /beforeunload/);
  assert.match(editor, /growthStory\.problems\.map/);
  assert.match(editor, /agenticStory\.sections\.map/);
  assert.match(editor, /updateAgenticSection/);
  assert.match(editor, /project\.metrics\.map/);
  assert.match(editor, /saveMediaAlt/);
  assert.match(editor, /deleteMedia/);
  assert.match(editor, /companies\.items\.map/);
  assert.match(editor, /reviews\.items\.map/);
  assert.match(editor, /assignReviewAvatar/);
  assert.match(editor, /uploadFiles\(Array\.from\(event\.target\.files \?\? \[\]\), "review"/);
  assert.match(editor, /showCompanyName/);
  assert.match(editor, /assignCompanyLogo/);
  assert.match(scene, /framer-motion/);
  assert.match(scene, /useReducedMotion/);
  assert.match(mediaRoute, /Review avatar/);
  assert.match(designsPage, /redirect\("\/admin\?tab=designs"\)/);
  assert.match(designPreviewPage, /tab=designs/);
  assert.match(metrics, /if \(!metrics\.length\) return null/);
  await access(new URL("components/ui/logos3.tsx", root));
  await access(new URL("components/ui/carousel.tsx", root));
});
