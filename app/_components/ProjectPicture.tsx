import Image from "next/image";
import { pick, type Locale, type ProjectImage } from "@/lib/site-content";

export function ProjectPicture({
  image,
  locale,
  className = "",
  priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: {
  image: ProjectImage;
  locale: Locale;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const caption = pick(image.caption, locale).trim();
  return (
    <figure className={className}>
      <div className="project-picture-frame">
        <Image src={image.url} alt={pick(image.alt, locale)} fill priority={priority} sizes={sizes} unoptimized />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
