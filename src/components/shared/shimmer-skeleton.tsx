"use client";

import { motion } from "framer-motion";

interface ShimmerSkeletonProps {
  className?: string;
}

export function ShimmerSkeleton({ className = "" }: ShimmerSkeletonProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-muted ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
