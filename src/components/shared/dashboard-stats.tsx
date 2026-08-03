"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, Globe, BarChart3, Languages } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";

interface DashboardStatsProps {
  totalProjects: number;
  totalStrings: number;
  totalMarkets: number;
  completedProjects: number;
}

export function DashboardStats({ totalProjects, totalStrings, totalMarkets, completedProjects }: DashboardStatsProps) {
  const stats = [
    { icon: FolderOpen, label: "Total Projects", value: totalProjects, color: "border-l-zinc-500", text: "text-white" },
    { icon: Languages, label: "Copy Strings", value: totalStrings, color: "border-l-zinc-400", text: "text-white" },
    { icon: Globe, label: "Target Markets", value: totalMarkets, color: "border-l-zinc-300", text: "text-white" },
    { icon: BarChart3, label: "Simulated Tests", value: completedProjects, color: "border-l-white", text: "text-white" },
  ];

  if (totalProjects === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 font-sans">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`border border-zinc-800 border-l-4 ${stat.color} bg-zinc-950 p-4 rounded-xl shadow-md`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className={`text-2xl font-extrabold font-mono tracking-tight ${stat.text}`}>
                    <AnimatedCounter end={stat.value} />
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
