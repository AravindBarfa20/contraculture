"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TextDiffProps {
  before: string;
  after: string;
  className?: string;
}

export function TextDiff({ before, after, className = "" }: TextDiffProps) {
  const beforeWords = before.split(" ");
  const afterWords = after.split(" ");

  return (
    <div className={className}>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.span
            key="before"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="block text-muted-foreground line-through decoration-red-400"
          >
            {before}
          </motion.span>
        </AnimatePresence>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="block text-green-600 font-medium"
        >
          {after}
        </motion.span>
      </div>
    </div>
  );
}
