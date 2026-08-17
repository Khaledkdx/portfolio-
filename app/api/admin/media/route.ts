import { NextResponse } from "next/server";
import { getOwner } from "@/lib/owner-auth";
import { listMedia, storeMedia } from "@/lib/data";

export const dynamic = "force-dynamic";
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_SIZE = 8 * 1024 * 1024;

export async function GET() {
  if (!(await getOwner())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await listMedia());
}

export async function POST(request: Request) {
  if (!(await getOwner())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !ALLOWED_TYPES.has(file.type) || file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Use a JPG, PNG or WebP image up to 8 MB." }, { status: 400 });
  }
  const asset = await storeMedia(file, String(form.get("altEn") ?? ""), String(form.get("altAr") ?? ""));
  return NextResponse.json(asset, { status: 201 });
}
