"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
      }}
    />
  );
}
