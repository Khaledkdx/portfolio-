"use client";

import { type CSSProperties, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import { PauseIcon, PlayIcon } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Logo {
  id: string;
  description: string;
  image: string;
  name?: string;
  showName?: boolean;
  href?: string;
  className?: string;
}

export interface Logos3Props {
  heading?: string;
  eyebrow?: string;
  logos?: Logo[];
  className?: string;
  locale?: "en" | "ar";
}

export function Logos3({
  heading = "Selected companies and teams",
  eyebrow = "TRUSTED IN THE FIELD",
  logos = [],
  className,
  locale = "en",
}: Logos3Props) {
  const reducedMotion = useReducedMotion();
  const canAutoScroll = logos.length > 5 && !reducedMotion;
  const [api, setApi] = useState<CarouselApi>();
  const [playing, setPlaying] = useState(canAutoScroll);
  const plugins = useMemo(
    () =>
      canAutoScroll
        ? [
            AutoScroll({
              speed: 0.72,
              startDelay: 900,
              playOnInit: true,
              stopOnFocusIn: true,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]
        : [],
    [canAutoScroll],
  );

  useEffect(() => {
    if (!api || !canAutoScroll) return;
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    api.on("autoScroll:play", onPlay);
    api.on("autoScroll:stop", onStop);
    return () => {
      api.off("autoScroll:play", onPlay);
      api.off("autoScroll:stop", onStop);
    };
  }, [api, canAutoScroll]);

  if (!logos.length) return null;

  const listVariants: Variants = reducedMotion
    ? {}
    : {
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.075,
            delayChildren: 0.06,
          },
        },
      };
  const cardVariants: Variants = reducedMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 26, scale: 0.96, rotate: locale === "ar" ? -1.5 : 1.5 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const togglePlayback = () => {
    const autoScroll = api?.plugins().autoScroll;
    if (!autoScroll) return;
    if (autoScroll.isPlaying()) autoScroll.stop();
    else autoScroll.play();
  };

  return (
    <motion.section
      className={cn("border-y border-border bg-background py-12 text-foreground md:py-16", className)}
      aria-labelledby="company-logos-heading"
      dir={locale === "ar" ? "rtl" : "ltr"}
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      variants={listVariants}
    >
      <div className="mx-auto flex w-[min(92%,90rem)] items-end justify-between gap-6">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className="font-mono text-[0.625rem] font-semibold tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2 id="company-logos-heading" className="text-balance text-2xl font-semibold tracking-tight md:text-4xl">
            {heading}
          </h2>
        </div>
        {canAutoScroll ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-11"
            onClick={togglePlayback}
            aria-pressed={!playing}
            aria-label={
              playing
                ? locale === "ar" ? "إيقاف حركة الشعارات" : "Pause logo movement"
                : locale === "ar" ? "تشغيل حركة الشعارات" : "Play logo movement"
            }
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </Button>
        ) : null}
      </div>

      <div className="relative mx-auto mt-8 w-full md:mt-12">
        <Carousel
          opts={{ loop: logos.length > 3, dragFree: true, direction: locale === "ar" ? "rtl" : "ltr" }}
          plugins={plugins}
          setApi={setApi}
          aria-label={locale === "ar" ? "شعارات الشركات" : "Company logos"}
        >
          <CarouselContent className="ms-0">
            {logos.map((logo, index) => {
              const cardStyle = {
                "--logo-shift": `${(index % 3) * 12}px`,
                "--logo-tilt": `${(index % 2 === 0 ? -1 : 1) * Math.min(index + 1, 3)}deg`,
              } as CSSProperties;
              const card = (
                <motion.div
                  data-logo-card
                  variants={cardVariants}
                  style={cardStyle}
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          y: -8,
                          rotate: locale === "ar" ? -0.9 : 0.9,
                          transition: { duration: 0.24 },
                        }
                  }
                  className="group flex min-h-28 w-full translate-y-[var(--logo-shift)] items-center justify-center gap-4 border-e border-border bg-background/70 px-6 py-5 shadow-[0_14px_38px_rgba(0,0,0,0.06)] outline outline-1 outline-transparent backdrop-blur-[1px] transition-colors hover:bg-muted/50 hover:outline-border focus-within:outline-border md:rotate-[var(--logo-tilt)]"
                >
                  <Image
                    src={logo.image}
                    alt={logo.description}
                    width={176}
                    height={72}
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 24vw, 176px"
                    className={cn("h-12 w-auto max-w-32 object-contain", logo.className)}
                    unoptimized
                  />
                  {logo.showName && logo.name ? (
                    <span className="max-w-32 text-pretty text-sm font-semibold leading-tight">
                      {logo.name}
                    </span>
                  ) : null}
                </motion.div>
              );
              return (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/2 justify-center ps-0 pb-8 pt-1 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  {logo.href ? (
                    <a href={logo.href} target="_blank" rel="noreferrer" className="block w-full">
                      {card}
                    </a>
                  ) : card}
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <div className="pointer-events-none absolute inset-y-0 start-0 w-10 bg-linear-to-r from-background to-transparent md:w-20 rtl:bg-linear-to-l" />
        <div className="pointer-events-none absolute inset-y-0 end-0 w-10 bg-linear-to-l from-background to-transparent md:w-20 rtl:bg-linear-to-r" />
      </div>
    </motion.section>
  );
}

export default Logos3;
