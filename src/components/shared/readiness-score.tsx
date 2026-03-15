"use client";

import { motion } from "framer-motion";

interface ReadinessScoreProps {
  score: number;
  locale: string;
  flag: string;
  country: string;
  size?: "sm" | "lg";
}

export function ReadinessScore({ score, locale, flag, country, size = "lg" }: ReadinessScoreProps) {
  const radius = size === "lg" ? 54 : 36;
  const stroke = size === "lg" ? 8 : 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const svgSize = (radius + stroke) * 2;

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: "#22c55e", bg: "text-green-600", label: "Excellent" };
    if (s >= 60) return { stroke: "#3b82f6", bg: "text-blue-600", label: "Good" };
    if (s >= 40) return { stroke: "#f59e0b", bg: "text-amber-600", label: "Fair" };
    return { stroke: "#ef4444", bg: "text-red-600", label: "Needs Work" };
  };

  const color = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg width={svgSize} height={svgSize} className="-rotate-90">
          <circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-muted/30"
          />
          <motion.circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl">{flag}</span>
          <motion.span
            className={`font-extrabold ${size === "lg" ? "text-xl" : "text-base"} ${color.bg}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <p className="text-sm font-semibold mt-2">{country}</p>
      <p className={`text-xs font-medium ${color.bg}`}>{color.label}</p>
    </div>
  );
}
