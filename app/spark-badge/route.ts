import { SPARK_BADGE_MARKUP } from "@/components/ui/spark-badge-utils/spark-badge-markup";

export const dynamic = "force-static";

export function GET() {
  return new Response(SPARK_BADGE_MARKUP, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
