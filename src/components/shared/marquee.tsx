"use client";

import { motion } from "framer-motion";

export function Marquee() {
  const items = [
    "🇯🇵 Japan", "🇩🇪 Germany", "🇧🇷 Brazil", "🇫🇷 France", "🇪🇸 Spain",
    "Power Distance", "Individualism", "Masculinity", "Uncertainty Avoidance",
    "Long-Term Orientation", "Indulgence", "Cultural Adaptation", "Hofstede Dimensions"
  ];

  return (
    <div className="relative overflow-hidden py-8 bg-muted/30">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-2xl font-bold text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
