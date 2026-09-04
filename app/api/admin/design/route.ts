import { NextResponse } from "next/server";
import { getOwner } from "@/lib/owner-auth";
import { readSiteContent, saveSiteContent } from "@/lib/data";
import { isDesignSlug, normalizeSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await getOwner()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as {
    activeDesign?: unknown;
  };
  const activeDesign = String(body.activeDesign ?? "");
  if (!isDesignSlug(activeDesign))
    return NextResponse.json({ error: "Invalid design slug." }, { status: 400 });

  const content = await readSiteContent();
  const updated = normalizeSiteContent({ ...content, activeDesign });
  await saveSiteContent(updated);
  return NextResponse.json({ ok: true, activeDesign: updated.activeDesign });
}
