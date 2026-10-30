"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
// Content is visible in the server HTML, including when JavaScript is disabled.
export function EditorialReveal({children,className,delay=0}:{children:ReactNode;className?:string;delay?:number}) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : {y:[16,0]}} viewport={{once:true,amount:.12}} transition={{duration:.6,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}
