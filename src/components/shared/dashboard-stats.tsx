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
    { icon: FolderOpen, label: "Projects", value: totalProjects, color: "from-blue-500 to-indigo-500", bg: "bg-blue-100", text: "text-blue-600" },
    { icon: Languages, label: "Copy Strings", value: totalStrings, color: "from-purple-500 to-pink-500", bg: "bg-purple-100", text: "text-purple-600" },
    { icon: Globe, label: "Markets", value: totalMarkets, color: "from-green-500 to-emerald-500", bg: "bg-green-100", text: "text-green-600" },
    { icon: BarChart3, label: "Simulated", value: completedProjects, color: "from-amber-500 to-orange-500", bg: "bg-amber-100", text: "text-amber-600" },
  ];

  if (totalProjects === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className="border-2 overflow-hidden relative group hover:shadow-md transition-all bg-card/90 backdrop-blur-sm">
              <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${stat.color}`} />
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${stat.text}`} />
                  </div>
                  <div>
                    <p className={`text-2xl font-extrabold ${stat.text}`}>
                      <AnimatedCounter end={stat.value} />
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
