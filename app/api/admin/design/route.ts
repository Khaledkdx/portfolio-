import { NextResponse } from "next/server";
import { getOwner } from "@/lib/owner-auth";
import { updateActiveDesign } from "@/lib/data";
import { isDesignSlug } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  if (!(await getOwner())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as { activeDesign?: string };
  if (!body.activeDesign || !isDesignSlug(body.activeDesign)) return NextResponse.json({ error: "Invalid design" }, { status: 400 });
  await updateActiveDesign(body.activeDesign);
  return NextResponse.json({ ok: true, activeDesign: body.activeDesign });
}
