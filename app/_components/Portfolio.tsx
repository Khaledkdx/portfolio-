import type { DesignSlug, Locale, SiteContent } from "@/lib/site-content";
import { DESIGN_DEFINITIONS } from "@/app/_designs/registry";
import { DesignMotionFrame } from "@/app/_components/DesignMotionFrame";
import { PortfolioIdentity } from "@/app/_components/PortfolioIdentity";
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
    <DesignMotionFrame design={design} locale={locale}>
      <PortfolioIdentity content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
      <Design content={content} locale={locale} design={design} preview={preview} variantPath={variantPath} />
      <ReviewProofWall content={content} locale={locale} design={design} variantPath={variantPath} />
    </DesignMotionFrame>
  );
}
