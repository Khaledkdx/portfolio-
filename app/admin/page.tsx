import { AdminEditor } from "./AdminEditor";
import { listMedia, readSiteContent } from "@/lib/data";
import { requireOwner } from "@/lib/owner-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const owner = await requireOwner("/admin");
  const [content, media] = await Promise.all([readSiteContent(), listMedia()]);
  return <AdminEditor initialContent={content} initialMedia={media} ownerName={owner.fullName ?? "Khalid"} />;
}
