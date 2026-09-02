"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  design: string;
  locale: string;
};

const motionPresets = [
  { opacity: 0, y: 26, filter: "blur(8px)" },
  { opacity: 0, x: -28, rotate: -1.2, filter: "blur(6px)" },
  { opacity: 0, scale: 0.985, filter: "blur(10px)" },
  { opacity: 0, clipPath: "inset(0 0 18% 0)" },
  { opacity: 0, x: 24, rotate: 0.8, filter: "blur(5px)" },
];

export function DesignMotionFrame({ children, design, locale }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const seed = Array.from(design).reduce((total, char) => total + char.charCodeAt(0), 0);
  const initial = motionPresets[seed % motionPresets.length];

  if (prefersReducedMotion) {
    return <div data-design-motion="reduced">{children}</div>;
  }

  return (
    <motion.div
      key={`${design}-${locale}`}
      data-design-motion={design}
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
