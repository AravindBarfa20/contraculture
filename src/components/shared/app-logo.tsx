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
        className={`relative flex items-center justify-center ${sizeMap[size].icon} rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-700/80 text-white font-mono font-bold shadow-md shadow-black/40`}
        whileHover={clickable ? { scale: 1.05 } : {}}
        transition={{ duration: 0.2 }}
      >
        <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent font-mono font-extrabold">CC</span>
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full ring-2 ring-zinc-950 animate-pulse shadow-sm" />
      </motion.div>
      <div className="flex items-center gap-1.5">
        <span className={`${sizeMap[size].text} font-bold tracking-tight font-sans text-white`}>
          Contra<span className="text-zinc-300 font-mono font-medium">Culture</span>
        </span>
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
