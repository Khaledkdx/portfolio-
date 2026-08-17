import { NextResponse } from "next/server";
import { getOwner } from "@/lib/owner-auth";
import { readSiteContent, saveSiteContent } from "@/lib/data";
import {
  normalizeSiteContent,
  validateSiteContent,
  type SiteContent,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getOwner()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await readSiteContent());
}

export async function PUT(request: Request) {
  if (!(await getOwner()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const content = normalizeSiteContent((await request.json()) as SiteContent);
  const error = validateSiteContent(content);
  if (error) return NextResponse.json({ error }, { status: 400 });
  await saveSiteContent(content);
  return NextResponse.json({ ok: true });
}
