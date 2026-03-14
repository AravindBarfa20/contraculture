"use client";

import { motion } from "framer-motion";

export function FloatingElements() {
  const elements = [
    { emoji: "🇯🇵", x: "12%", y: "22%", delay: 0, duration: 10 },
    { emoji: "🇩🇪", x: "82%", y: "18%", delay: 1, duration: 12 },
    { emoji: "🇧🇷", x: "74%", y: "72%", delay: 2, duration: 11 },
    { emoji: "📊", x: "52%", y: "12%", delay: 3, duration: 13 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-[0.10] select-none"
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -12, 4, 0],
            x: [0, 4, -4, 0],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
}
