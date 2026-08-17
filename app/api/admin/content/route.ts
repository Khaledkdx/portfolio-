import { NextResponse } from "next/server";
import { getOwner } from "@/lib/owner-auth";
import { readSiteContent, saveSiteContent } from "@/lib/data";
import { DESIGN_SLUGS, type SiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getOwner())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await readSiteContent());
}

export async function PUT(request: Request) {
  if (!(await getOwner())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const content = await request.json() as SiteContent;
  if (!content?.profile?.headline?.en || !content?.profile?.headline?.ar || !DESIGN_SLUGS.includes(content.activeDesign)) {
    return NextResponse.json({ error: "Invalid site content" }, { status: 400 });
  }
  await saveSiteContent(content);
  return NextResponse.json({ ok: true });
}
