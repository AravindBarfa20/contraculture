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
  draft: { color: "text-slate-600", bg: "bg-slate-100 border-slate-200 dark:bg-slate-800 dark:text-slate-300", label: "Draft" },
  analyzed: { color: "text-teal-700", bg: "bg-teal-50 border-teal-200 dark:bg-teal-950 dark:text-teal-300", label: "Analyzed" },
  adapted: { color: "text-amber-700", bg: "bg-amber-50 border-amber-200 dark:bg-amber-950 dark:text-amber-300", label: "Adapted" },
  simulated: { color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300", label: "Simulated" },
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
    <div className="relative min-h-screen bg-background overflow-hidden">
      <DashboardBackground />
      <header className="border-b glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <AppLogo size="md" />
          <div className="flex gap-3 items-center">
            <LocaleSwitcher current={locale} onChange={setLocale} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-8 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">{t("projects.title", locale)}</h2>
            <p className="text-muted-foreground mt-1">{t("projects.subtitle", locale)}</p>
          </div>
          <Button onClick={() => router.push("/projects/new")} className="bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-500 hover:from-teal-700 hover:to-amber-600 text-white border-0 shadow-md font-semibold">
            <Plus className="w-4 h-4 mr-2" />{t("projects.new", locale)}
          </Button>
        </motion.div>

        <DashboardStats totalProjects={projects.length} totalStrings={totalStrings} totalMarkets={totalMarkets} completedProjects={completedProjects} />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (<ShimmerSkeleton key={i} className="h-56 rounded-2xl" />))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <MouseSpotlight className="rounded-2xl">
              <Card className="text-center py-16 border-2 border-dashed bg-card/80 backdrop-blur-sm">
                <CardContent>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/10 to-amber-500/10 flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-10 h-10 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("projects.empty", locale)}</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{t("projects.emptyDesc", locale)}</p>
                  <Button onClick={() => router.push("/projects/new")} className="bg-gradient-to-r from-teal-600 to-amber-500 hover:from-teal-700 hover:to-amber-600 text-white border-0 font-semibold">
                    <Plus className="w-4 h-4 mr-2" />{t("projects.new", locale)}
                  </Button>
                </CardContent>
              </Card>
            </MouseSpotlight>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const status = statusConfig[project.status] || statusConfig.draft;
              return (
                <motion.div key={project.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.08 }}>
                  <TiltCard maxTilt={10}>
                    <MouseSpotlight className="rounded-2xl">
                      <Card className="cursor-pointer group transition-all duration-300 border-2 hover:border-teal-500/30 h-full bg-card/90 backdrop-blur-sm" onClick={() => router.push(`/projects/${project.id}`)}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg group-hover:text-teal-600 transition-colors">{project.name}</CardTitle>
                            <Badge variant="outline" className={`${status.bg} ${status.color} border text-xs font-semibold`}>{status.label}</Badge>
                          </div>
                          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1.5">
                              {project.target_locales.map((l) => (<span key={l} className="text-lg" title={l}>{getFlag(l)}</span>))}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground group-hover:text-teal-600 transition-colors font-medium">
                              {project._count.copy_strings} strings
                              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </MouseSpotlight>
                  </TiltCard>
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
