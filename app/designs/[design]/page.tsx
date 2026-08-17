import { notFound, redirect } from "next/navigation";
import { requireOwner } from "@/lib/owner-auth";
import { isDesignSlug } from "@/lib/site-content";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ design: string }> };

export default async function DesignPreviewRedirect({ params }: PageProps) {
  const { design } = await params;
  if (!isDesignSlug(design)) notFound();
  await requireOwner(`/designs/${design}`);
  redirect(`/admin?tab=designs&preview=${encodeURIComponent(design)}`);
}
