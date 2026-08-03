"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/lib/local-projects";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Globe, ChevronRight } from "lucide-react";
import { getFlag } from "@/lib/utils";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { AppLogo } from "@/components/shared/app-logo";
import { LingoBadge } from "@/components/shared/lingo-badge";
import { DashboardBackground } from "@/components/shared/dashboard-background";
import { MouseSpotlight } from "@/components/shared/mouse-spotlight";
import { TiltCard } from "@/components/shared/tilt-card";
import { ShimmerSkeleton } from "@/components/shared/shimmer-skeleton";
import { DashboardStats } from "@/components/shared/dashboard-stats";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { t } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";
import type { Project } from "@/types";

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  draft: { color: "text-zinc-600 dark:text-zinc-400", bg: "bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700", label: "DRAFT" },
  analyzed: { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", label: "ANALYZED" },
  adapted: { color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10 border-purple-500/30", label: "ADAPTED" },
  simulated: { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", label: "SIMULATED" },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<(Project & { _count: { copy_strings: number } })[]>([]);
  const [loading, setLoading] = useState(true);
  const { locale, setLocale } = useLocale();
  const router = useRouter();

  useEffect(() => {
    const projects = getProjects();
    setProjects(projects.map(p => ({ ...p, _count: { copy_strings: p.copy_strings?.length || 0 } })));
    setLoading(false);
  }, []);

  const totalStrings = projects.reduce((sum, p) => sum + p._count.copy_strings, 0);
  const totalMarkets = new Set(projects.flatMap((p) => p.target_locales)).size;
  const completedProjects = projects.filter((p) => p.status === "simulated").length;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-sans text-foreground">
      <DashboardBackground />
      
      {/* Top Navbar */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <AppLogo size="md" />
          <div className="flex gap-3 items-center">
            <LocaleSwitcher current={locale} onChange={setLocale} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Title Section */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Project Workspace</h2>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              Manage your landing page copy and cultural adaptation pipelines
            </p>
          </div>
          <Button onClick={() => router.push("/projects/new")} className="bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs font-semibold rounded-xl shadow-md border border-purple-400/30">
            <Plus className="w-3.5 h-3.5 mr-1.5" />+ new_project
          </Button>
        </motion.div>

        {/* Dashboard Stats Cards */}
        <DashboardStats totalProjects={projects.length} totalStrings={totalStrings} totalMarkets={totalMarkets} completedProjects={completedProjects} />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (<ShimmerSkeleton key={i} className="h-48 rounded-xl" />))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="text-center py-16 border border-dashed border-border bg-card/60 backdrop-blur-sm rounded-2xl">
              <CardContent>
                <div className="w-14 h-14 rounded-xl bg-zinc-900/10 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center mx-auto mb-4 font-mono text-xl text-muted-foreground">
                  🌍
                </div>
                <h3 className="text-lg font-bold mb-1">No Projects Found</h3>
                <p className="text-xs text-muted-foreground mb-6 max-w-sm mx-auto font-mono">Create your first project to start adapting copy across global markets</p>
                <Button onClick={() => router.push("/projects/new")} className="bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs font-semibold rounded-xl shadow-md">
                  <Plus className="w-3.5 h-3.5 mr-1.5" />+ create_first_project
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, index) => {
              const status = statusConfig[project.status] || statusConfig.draft;
              return (
                <motion.div key={project.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: index * 0.05 }}>
                  <Card className="cursor-pointer group transition-all duration-200 border border-border/80 hover:border-purple-500/50 hover:shadow-lg bg-card rounded-xl overflow-hidden" onClick={() => router.push(`/projects/${project.id}`)}>
                    <CardHeader className="pb-3 pt-5 px-5">
                      <div className="flex items-center justify-between mb-1">
                        <CardTitle className="text-base font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{project.name}</CardTitle>
                        <Badge variant="outline" className={`${status.bg} ${status.color} font-mono text-[10px] tracking-wider px-2 py-0.5 border`}>{status.label}</Badge>
                      </div>
                      <CardDescription className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-5 px-5">
                      <div className="flex items-center justify-between pt-3 border-t border-border/40">
                        <div className="flex gap-1.5">
                          {project.target_locales.map((l) => (<span key={l} className="text-sm" title={l}>{getFlag(l)}</span>))}
                        </div>
                        <div className="flex items-center text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                          {project._count.copy_strings} strings
                          <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        <LingoBadge />
      </main>
    </div>
  );
}
