"use client";

import Image from "next/image";
import { BrainCircuit, CheckCircle2, Database, Route, Sparkles, Workflow } from "lucide-react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import styles from "./agentic-growth-core.module.css";

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

export function AgenticCoreMap({ locale, className = "" }: { locale: "en" | "ar"; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(rootRef, { amount: .25 });
  const copy = locale === "ar" ? {
    label: "نواة تشغيل الأعمال", state: "النظام متصل", input: "إشارات غير منظمة", output: "عمل منسّق",
    nodes: ["التخطيط", "المحتوى", "العمليات", "إدارة العملاء", "النشر", "خدمة العملاء"],
    inputs: ["مهام يدوية", "بيانات متفرقة", "متابعة متأخرة"], outputs: ["توجيه", "تنفيذ آلي", "تقرير واضح"],
    cycle: ["يراقب", "يفهم", "ينفذ", "يتعلم"],
  } : {
    label: "Business operating core", state: "System connected", input: "Unstructured signals", output: "Coordinated work",
    nodes: ["Planning", "Content", "Operations", "CRM", "Publishing", "Customer care"],
    inputs: ["Manual tasks", "Scattered data", "Late follow-up"], outputs: ["Routed", "Automated", "Reported"],
    cycle: ["Observe", "Understand", "Act", "Learn"],
  };
  const icons = [Sparkles, Workflow, Route, Database, CheckCircle2, BrainCircuit];
  const animate = !reduced && inView;

  return (
    <motion.div
      ref={rootRef}
      className={`${styles.coreMap} ${className}`}
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .18 }}
      transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}
      aria-label={copy.label}
    >
      <div className={styles.coreMapHeader}>
        <span><i />{copy.state}</span>
        <b>AGENTIC / OS</b>
      </div>
      <div className={styles.coreMapStage}>
        <div className={styles.coreInputs}>
          <small>{copy.input}</small>
          {copy.inputs.map((item, index) => <motion.span key={item} animate={animate ? { x: [0, 5, 0], opacity: [.55, 1, .55] } : undefined} transition={{ duration: 2.4, delay: index * .25, repeat: Infinity }}>{item}</motion.span>)}
        </div>
        <svg className={styles.coreRoutes} viewBox="0 0 900 600" preserveAspectRatio="none" aria-hidden>
          {["M80 105 C260 105 235 300 445 300", "M80 300 H445", "M80 495 C260 495 235 300 445 300", "M455 300 C665 300 640 105 820 105", "M455 300 H820", "M455 300 C665 300 640 495 820 495"].map((path, index) => (
            <motion.path key={path} d={path} initial={reduced ? { pathLength: 1 } : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.15, delay: index * .08 }} />
          ))}
        </svg>
        <div className={styles.agentNodes}>
          {copy.nodes.map((item, index) => {
            const Icon = icons[index];
            return <motion.div key={item} className={styles.agentNode} animate={animate ? { y: [0, index % 2 ? 5 : -5, 0] } : undefined} transition={{ duration: 3.2 + index * .15, repeat: Infinity, ease: "easeInOut" }}><Icon size={17} /><span>{item}</span><i /></motion.div>;
          })}
        </div>
        <motion.div className={styles.intelligenceCore} animate={animate ? { scale: [1, 1.025, 1] } : undefined} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
          <div className={styles.coreHalo} aria-hidden />
          <BrainCircuit size={42} />
          <strong>AGENTIC<br />CORE</strong>
          <small>{copy.label}</small>
        </motion.div>
        <div className={styles.coreOutputs}>
          <small>{copy.output}</small>
          {copy.outputs.map((item, index) => <motion.span key={item} initial={reduced ? false : { opacity: 0, x: locale === "ar" ? 12 : -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .65 + index * .14 }}><CheckCircle2 size={14} />{item}</motion.span>)}
        </div>
      </div>
      <div className={styles.coreCycle}>{copy.cycle.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div>
    </motion.div>
  );
}
