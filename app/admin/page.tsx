import { AdminEditor } from "./AdminEditor";
import { listMedia, readSiteContent } from "@/lib/data";
import { requireOwner } from "@/lib/owner-auth";

export const dynamic = "force-dynamic";

type AdminPageProps = { searchParams: Promise<{ tab?: string; preview?: string }> };

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const query = await searchParams;
  const returnTo = query.tab === "designs" ? "/admin?tab=designs" : "/admin";
  const owner = await requireOwner(returnTo);
  const [content, media] = await Promise.all([readSiteContent(), listMedia()]);
  return <AdminEditor initialContent={content} initialMedia={media} ownerName={owner.fullName ?? "Khalid"} initialTab={query.tab === "designs" ? "designs" : undefined} initialPreview={query.preview} />;
}
