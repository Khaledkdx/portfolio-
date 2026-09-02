import Image from "next/image";
import type { CSSProperties } from "react";
import type { SiteContent } from "@/lib/site-content";

type PortraitImageProps = {
  content: SiteContent;
  className?: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

export function PortraitImage({ content, className = "", sizes, priority = false, fill = true, width = 900, height = 1200 }: PortraitImageProps) {
  const focus = content.profile.portraitFocalPoint;
  const style = {
    "--portrait-desktop": `${focus.desktop.x}% ${focus.desktop.y}%`,
    "--portrait-mobile": `${focus.mobile.x}% ${focus.mobile.y}%`,
    objectFit: "cover",
    objectPosition: "var(--portrait-position)",
  } as CSSProperties;

  const shared = {
    src: content.profile.portrait,
    alt: content.profile.name,
    sizes,
    priority,
    unoptimized: true,
    className: `smart-portrait ${className}`.trim(),
    style,
  };

  return fill ? (
    <Image
      {...shared}
      alt={content.profile.name}
      fill
    />
  ) : (
    <Image {...shared} alt={content.profile.name} width={width} height={height} />
  );
}
