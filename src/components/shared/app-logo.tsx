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
    sm: { icon: "text-xl", text: "text-base" },
    md: { icon: "text-2xl", text: "text-xl" },
    lg: { icon: "text-4xl", text: "text-3xl" },
  };

  const content = (
    <div className="flex items-center gap-2.5">
      <motion.div
        className={`relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20`}
        whileHover={clickable ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className={`${sizeMap[size].icon} leading-none`}>🌍</span>
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-background" />
      </motion.div>
      <div className="flex flex-col">
        <span className={`${sizeMap[size].text} font-bold tracking-tight leading-tight`}>
          Contra<span className="gradient-text">Culture</span>
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
