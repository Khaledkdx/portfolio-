import { AdminEditor } from "./AdminEditor";
import { listMedia, readSiteContent } from "@/lib/data";
import { requireOwner } from "@/lib/owner-auth";

export const dynamic = "force-dynamic";

type AdminPageProps = { searchParams: Promise<{ tab?: string }> };

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const query = await searchParams;
  const tabs = ["overview", "designs", "agentic", "projects", "companies", "reviews", "services", "experience", "media"] as const;
  const initialTab = tabs.find((tab) => tab === query.tab);
  const returnTo = initialTab ? `/admin?tab=${initialTab}` : "/admin";
  const owner = await requireOwner(returnTo);
  const [content, media] = await Promise.all([readSiteContent(), listMedia()]);
  return <AdminEditor initialContent={content} initialMedia={media} ownerName={owner.fullName ?? "Khalid"} initialTab={initialTab} />;
}
