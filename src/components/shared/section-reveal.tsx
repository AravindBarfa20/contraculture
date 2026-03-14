"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}

export function SectionReveal({ children, className = "", direction = "up", delay = 0 }: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    up: { initial: { y: 60, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: -60, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: 60, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction].initial}
      animate={isInView ? variants[direction].animate : variants[direction].initial}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
