import { redirect } from "next/navigation";
import { requireOwner } from "@/lib/owner-auth";

export const dynamic = "force-dynamic";

export default async function DesignsPage() {
  await requireOwner("/designs");
  redirect("/admin?tab=designs");
}
