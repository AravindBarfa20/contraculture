"use client";

import { motion } from "framer-motion";

interface LayoutTransitionProps {
  children: React.ReactNode;
  layoutId: string;
  className?: string;
}

export function LayoutTransition({ children, layoutId, className = "" }: LayoutTransitionProps) {
  return (
    <motion.div layoutId={layoutId} className={className}>
      {children}
    </motion.div>
  );
}
