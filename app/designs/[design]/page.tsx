import { redirect } from "next/navigation";
import { requireOwner } from "@/lib/owner-auth";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ design: string }> };

export default async function DesignPreviewRedirect({ params }: PageProps) {
  await params;
  await requireOwner(`/designs/${design}`);
  redirect("/admin");
}
