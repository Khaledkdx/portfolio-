import type { DesignSlug, Locale, SiteContent } from "@/lib/site-content";
import { DESIGN_DEFINITIONS } from "@/app/_designs/registry";
import { ReviewProofWall } from "@/app/_components/ReviewProofWall";

type Props = {
  content: SiteContent;
  locale: Locale;
  design?: DesignSlug;
  preview?: boolean;
  variantPath?: string;
};

export async function Portfolio({ content, locale, design = content.activeDesign, preview = false, variantPath }: Props) {
  const definition = DESIGN_DEFINITIONS[design];
  const { default: Design } = await definition.load();
  return (
    <>
      <Design content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
      <ReviewProofWall content={content} locale={locale} design={design} variantPath={variantPath} />
    </>
  );
}
