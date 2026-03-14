"use client";

import { motion } from "framer-motion";

interface AnimatedTextDiffProps {
  before: string;
  after: string;
  className?: string;
}

export function AnimatedTextDiff({
  before,
  after,
  className = "",
}: AnimatedTextDiffProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0.65 }}
        className="rounded-xl border border-red-200 bg-red-50/60 p-4"
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-500">
          Original
        </p>
        <p className="text-sm leading-relaxed text-red-700 line-through decoration-red-400">
          {before}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl border border-green-200 bg-green-50/70 p-4"
      >
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-green-600">
          Adapted
        </p>
        <p className="text-sm font-medium leading-relaxed text-green-700">
          {after}
        </p>
      </motion.div>
    </div>
  );
}
