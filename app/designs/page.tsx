import { DesignLab } from "./DesignLab";
import { requireOwner } from "@/lib/owner-auth";
import { readSiteContent } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function DesignsPage() {
  await requireOwner("/designs");
  const content = await readSiteContent();
  return <DesignLab content={content} />;
}
