"use client";

import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Legend,
} from "recharts";
import { HOFSTEDE_DATA, HOFSTEDE_DIMENSIONS } from "@/lib/cultural/hofstede";
import { getCountryName, getFlag } from "@/lib/utils";

interface HofstedeRadarProps {
  sourceLocale: string;
  targetLocale: string;
}

export function HofstedeRadar({ sourceLocale, targetLocale }: HofstedeRadarProps) {
  const source = HOFSTEDE_DATA[sourceLocale];
  const target = HOFSTEDE_DATA[targetLocale];
  if (!source || !target) return null;

  const data = HOFSTEDE_DIMENSIONS.map((dim) => ({
    dimension: dim.shortLabel,
    fullName: dim.label,
    [sourceLocale]: source[dim.key as keyof typeof source],
    [targetLocale]: target[dim.key as keyof typeof target],
  }));

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
          />
          <Radar
            name={`${getFlag(sourceLocale)} ${getCountryName(sourceLocale)}`}
            dataKey={sourceLocale}
            stroke="#94a3b8"
            fill="#94a3b8"
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Radar
            name={`${getFlag(targetLocale)} ${getCountryName(targetLocale)}`}
            dataKey={targetLocale}
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
