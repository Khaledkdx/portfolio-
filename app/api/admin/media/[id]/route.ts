import { NextResponse } from "next/server";
import { getOwner } from "@/lib/owner-auth";
import { deleteMediaAsset, readSiteContent, updateMediaMetadata } from "@/lib/data";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

function mediaUrl(id: string) {
  return `/media/${encodeURIComponent(id)}`;
}

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!(await getOwner())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json() as { altEn?: string; altAr?: string };
  const asset = await updateMediaMetadata(id, String(body.altEn ?? "").trim(), String(body.altAr ?? "").trim());
  if (!asset) return NextResponse.json({ error: "Media not found" }, { status: 404 });
  return NextResponse.json(asset);
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!(await getOwner())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const url = mediaUrl(id);
  const content = await readSiteContent();
  const usages: string[] = [];
  if (content.profile.portrait === url) usages.push("Profile portrait");
  for (const project of content.projects) if (project.images.some((image) => image.url === url)) usages.push(project.title.en || project.id);
  if (usages.length) return NextResponse.json({ error: "Media is still in use", usages }, { status: 409 });
  if (!(await deleteMediaAsset(id))) return NextResponse.json({ error: "Media not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
