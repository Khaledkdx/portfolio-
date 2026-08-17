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

test("protects admin mutations and includes deployment assets", async () => {
  const [adminPage, contentRoute, auth, hosting] = await Promise.all([
    readFile(new URL("app/admin/page.tsx", root), "utf8"),
    readFile(new URL("app/api/admin/content/route.ts", root), "utf8"),
    readFile(new URL("lib/owner-auth.ts", root), "utf8"),
    readFile(new URL(".openai/hosting.json", root), "utf8"),
  ]);
  assert.match(adminPage, /requireOwner\("\/admin"\)/);
  assert.match(contentRoute, /getOwner\(\)/);
  assert.match(auth, /saim\.goodm@gmail\.com/);
  assert.match(hosting, /"d1": "DB"/);
  assert.match(hosting, /"r2": "MEDIA"/);
  await access(new URL("public/og.png", root));
  await access(new URL("dist/server/index.js", root));
});
