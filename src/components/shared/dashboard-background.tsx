"use client";

import { motion } from "framer-motion";

interface DashboardBackgroundProps {
  animated?: boolean;
}

export function DashboardBackground({
  animated = false,
}: DashboardBackgroundProps) {
  if (!animated) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 left-[8%] h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(13, 148, 136, 0.08)" }}
        />
        <div
          className="absolute top-[25%] right-[10%] h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(249, 115, 22, 0.08)" }}
        />
        <div
          className="absolute bottom-[-4rem] left-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(16, 185, 129, 0.06)" }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-20 left-[8%] h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(13, 148, 136, 0.10)" }}
        animate={{ scale: [1, 1.12, 1], x: [0, 18, 0], y: [0, 8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[25%] right-[10%] h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(249, 115, 22, 0.10)" }}
        animate={{ scale: [1.08, 1, 1.08], x: [0, -24, 0], y: [0, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-4rem] left-1/3 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(16, 185, 129, 0.08)" }}
        animate={{ scale: [1, 1.06, 1], y: [0, -14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
