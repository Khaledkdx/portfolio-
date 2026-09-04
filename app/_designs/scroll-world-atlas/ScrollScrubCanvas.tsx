"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type FrameSet = {
  basePath: string;
  count: number;
  poster: string;
};

type ScrollScrubCanvasProps = {
  desktop: FrameSet;
  mobile: FrameSet;
  className?: string;
  stageClassName?: string;
  canvasClassName?: string;
  posterClassName?: string;
  children?: ReactNode;
};

const padFrame = (index: number) => String(index + 1).padStart(4, "0");
const frameUrl = (set: FrameSet, index: number) => `${set.basePath}/frame_${padFrame(index)}.webp`;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function ScrollScrubCanvas({
  desktop,
  mobile,
  className,
  stageClassName,
  canvasClassName,
  posterClassName,
  children,
}: ScrollScrubCanvasProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef(new Map<number, HTMLImageElement>());
  const requestedRef = useRef(new Set<number>());
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const activeSet = isMobile ? mobile : desktop;

  const firstFrameIndexes = useMemo(
    () => Array.from({ length: Math.min(activeSet.count, isMobile ? 18 : 30) }, (_, index) => index),
    [activeSet.count, isMobile],
  );

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px), (pointer: coarse)");
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    framesRef.current.clear();
    requestedRef.current.clear();
    currentFrameRef.current = 0;
  }, [activeSet.basePath]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;

    const drawCover = (img: HTMLImageElement) => {
      const context = canvas.getContext("2d");
      if (!context) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0a1211";
      context.fillRect(0, 0, width, height);

      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      const drawWidth = img.naturalWidth * scale;
      const drawHeight = img.naturalHeight * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;
      context.drawImage(img, x, y, drawWidth, drawHeight);
    };

    const drawFrame = (index: number) => {
      const exact = framesRef.current.get(index);
      if (exact) {
        drawCover(exact);
        return;
      }

      for (let offset = 1; offset < 16; offset += 1) {
        const before = framesRef.current.get(index - offset);
        const after = framesRef.current.get(index + offset);
        if (before) {
          drawCover(before);
          return;
        }
        if (after) {
          drawCover(after);
          return;
        }
      }
    };

    const loadFrame = (index: number, shouldDraw = false) => {
      const safeIndex = clamp(index, 0, activeSet.count - 1);
      if (framesRef.current.has(safeIndex) || requestedRef.current.has(safeIndex)) return;

      requestedRef.current.add(safeIndex);
      const image = new Image();
      image.decoding = "async";
      image.src = frameUrl(activeSet, safeIndex);
      image.onload = () => {
        framesRef.current.set(safeIndex, image);
        if (shouldDraw || safeIndex === currentFrameRef.current) drawFrame(currentFrameRef.current);
      };
      image.onerror = () => {
        requestedRef.current.delete(safeIndex);
      };
    };

    const warmAround = (center: number) => {
      for (let offset = -14; offset <= 14; offset += 1) {
        loadFrame(center + offset);
      }
    };

    const update = () => {
      rafRef.current = null;
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / travel, 0, 1);
      const frameIndex = clamp(Math.round(progress * (activeSet.count - 1)), 0, activeSet.count - 1);

      currentFrameRef.current = frameIndex;
      loadFrame(frameIndex, true);
      warmAround(frameIndex);
      drawFrame(frameIndex);
    };

    const requestUpdate = () => {
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(update);
      }
    };

    firstFrameIndexes.forEach((index) => loadFrame(index, index === 0));

    const idlePreload = () => {
      let index = firstFrameIndexes.length;
      const run = (deadline?: IdleDeadline) => {
        while (index < activeSet.count && (!deadline || deadline.timeRemaining() > 8)) {
          loadFrame(index);
          index += isMobile ? 2 : 1;
        }
        if (index < activeSet.count) {
          if ("requestIdleCallback" in window) {
            window.requestIdleCallback(run, { timeout: 900 });
          } else {
            window.setTimeout(() => run(), 120);
          }
        }
      };
      run();
    };

    requestUpdate();
    idlePreload();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    document.addEventListener("visibilitychange", requestUpdate);

    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      document.removeEventListener("visibilitychange", requestUpdate);
    };
  }, [activeSet, firstFrameIndexes, isMobile, reduceMotion]);

  return (
    <div ref={rootRef} className={className} data-frame-set={isMobile ? "mobile" : "desktop"}>
      <div className={stageClassName}>
        <picture className={posterClassName}>
          <source media="(max-width: 760px), (pointer: coarse)" srcSet={mobile.poster} />
          <img src={desktop.poster} alt="" loading="eager" />
        </picture>
        {!reduceMotion ? <canvas ref={canvasRef} className={canvasClassName} aria-label="Scroll-controlled company collapse animation" /> : null}
      </div>
      {children}
    </div>
  );
}
