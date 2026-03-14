"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ message = "Processing...", size = "md" }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-14 h-14 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <motion.div
        className={`${sizeMap[size]} border-primary/30 border-t-primary rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
