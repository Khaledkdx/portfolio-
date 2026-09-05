"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function CyberPortrait({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-.5, .5], [5, -5]), { stiffness: 110, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-.5, .5], [-7, 7]), { stiffness: 110, damping: 22 });
  return (
    <motion.div
      className={className}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(event) => {
        if (reduced) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - .5);
        y.set((event.clientY - rect.top) / rect.height - .5);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      <Image src="/agentic-growth-core/cyber-human.webp" alt="Khalid Mohamad represented as a cyber-human systems operator" fill priority unoptimized sizes="(max-width: 900px) 94vw, 52vw" />
    </motion.div>
  );
}

export function AvatarScrub({ className = "", frameClassName = "" }: { className?: string; frameClassName?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [duration, setDuration] = useState(8);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    const syncMetadata = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) setDuration(video.duration);
      setReady(true);
    };
    if (video.readyState >= 1) syncMetadata();
    video.addEventListener("loadedmetadata", syncMetadata);
    return () => video.removeEventListener("loadedmetadata", syncMetadata);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !ready) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = rootRef.current;
      const video = videoRef.current;
      if (!root || !video || document.visibilityState === "hidden") return;
      const rect = root.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / range));
      const next = Math.min(duration - .04, Math.max(0, progress * duration));
      if (Math.abs(video.currentTime - next) > .035) video.currentTime = next;
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    document.addEventListener("visibilitychange", requestUpdate);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      document.removeEventListener("visibilitychange", requestUpdate);
    };
  }, [duration, ready, reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    const prime = () => video.play().then(() => { video.pause(); }).catch(() => undefined);
    window.addEventListener("pointerdown", prime, { once: true });
    return () => window.removeEventListener("pointerdown", prime);
  }, [reduced]);

  return (
    <div ref={rootRef} className={className}>
      <div className={frameClassName}>
        {reduced ? <Image src="/agentic-growth-core/avatar-poster.webp" alt="Khalid's 3D avatar" fill unoptimized sizes="(max-width: 900px) 94vw, 48vw" /> : (
          <video ref={videoRef} muted playsInline preload="auto" poster="/agentic-growth-core/avatar-poster.webp" onLoadedMetadata={(event) => { setDuration(event.currentTarget.duration || 8); setReady(true); }} aria-label="Scroll-controlled transformation into a 3D agentic operator">
            <source src="/agentic-growth-core/avatar-transform.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}
