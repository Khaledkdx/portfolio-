import { getMediaById } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getMediaById(id);
  if (!result) return new Response("Not found", { status: 404 });
  return new Response(result.object.body, {
    headers: {
      "content-type": result.object.httpMetadata?.contentType ?? result.contentType,
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
