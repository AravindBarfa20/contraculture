"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
}

export function AppLogo({ size = "md", clickable = true }: AppLogoProps) {
  const router = useRouter();

  const sizeMap = {
    sm: { icon: "w-7 h-7 text-xs", text: "text-sm" },
    md: { icon: "w-8 h-8 text-sm", text: "text-base" },
    lg: { icon: "w-10 h-10 text-base", text: "text-xl" },
  };

  const content = (
    <div className="flex items-center gap-2.5">
      <motion.div
        className={`relative flex items-center justify-center ${sizeMap[size].icon} rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono font-bold shadow-sm dark:bg-zinc-900 dark:border-zinc-700/80`}
        whileHover={clickable ? { scale: 1.05 } : {}}
        transition={{ duration: 0.2 }}
      >
        <span className="bg-gradient-to-tr from-purple-400 to-indigo-300 bg-clip-text text-transparent font-mono">CC</span>
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-background animate-pulse" />
      </motion.div>
      <div className="flex items-center gap-1.5">
        <span className={`${sizeMap[size].text} font-semibold tracking-tight font-sans text-slate-900 dark:text-slate-100`}>
          Contra<span className="text-purple-500 dark:text-purple-400 font-mono font-medium">Culture</span>
        </span>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50">v2.0</span>
      </div>
    </div>
  );

  if (clickable) {
    return (
      <button
        onClick={() => router.push("/")}
        className="cursor-pointer hover:opacity-90 transition-opacity focus:outline-none"
        aria-label="Go to homepage"
      >
        {content}
      </button>
    );
  }

  return content;
}
