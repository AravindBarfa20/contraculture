"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
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
import { t } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";
import type { Project } from "@/types";

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  draft: { color: "text-gray-600", bg: "bg-gray-100 border-gray-200", label: "Draft" },
  analyzed: { color: "text-blue-600", bg: "bg-blue-50 border-blue-200", label: "Analyzed" },
  adapted: { color: "text-green-600", bg: "bg-green-50 border-green-200", label: "Adapted" },
  simulated: { color: "text-purple-600", bg: "bg-purple-50 border-purple-200", label: "Simulated" },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<(Project & { _count: { copy_strings: number } })[]>([]);
  const [loading, setLoading] = useState(true);
  const { locale, setLocale } = useLocale();
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <DashboardBackground />

      <header className="border-b glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <AppLogo size="md" />
          <div className="flex gap-3 items-center">
            <LocaleSwitcher current={locale} onChange={setLocale} />
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              {t("nav.signOut", locale)}
            </Button>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold">{t("projects.title", locale)}</h2>
            <p className="text-muted-foreground mt-1">{t("projects.subtitle", locale)}</p>
          </div>

          <Button
            onClick={() => router.push("/projects/new")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("projects.new", locale)}
          </Button>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <ShimmerSkeleton key={i} className="h-56 rounded-2xl" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <MouseSpotlight className="rounded-2xl">
              <Card className="text-center py-16 border-2 border-dashed bg-card/80 backdrop-blur-sm">
                <CardContent>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("projects.empty", locale)}</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    {t("projects.emptyDesc", locale)}
                  </p>
                  <Button
                    onClick={() => router.push("/projects/new")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t("projects.new", locale)}
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
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <TiltCard maxTilt={10}>
                    <MouseSpotlight className="rounded-2xl">
                      <Card
                        className="cursor-pointer group transition-all duration-300 border-2 hover:border-blue-500/20 h-full bg-card/90 backdrop-blur-sm"
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                              {project.name}
                            </CardTitle>
                            <Badge variant="outline" className={`${status.bg} ${status.color} border text-xs`}>
                              {status.label}
                            </Badge>
                          </div>
                          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1.5">
                              {project.target_locales.map((l) => (
                                <span key={l} className="text-lg" title={l}>
                                  {getFlag(l)}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground group-hover:text-blue-600 transition-colors">
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
