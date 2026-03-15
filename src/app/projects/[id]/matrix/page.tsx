"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Grid3X3 } from "lucide-react";
import { getFlag, getCountryName } from "@/lib/utils";
import { AppLogo } from "@/components/shared/app-logo";
import { LingoBadge } from "@/components/shared/lingo-badge";
import { DashboardBackground } from "@/components/shared/dashboard-background";
import { SectionReveal } from "@/components/shared/section-reveal";
import { ShimmerSkeleton } from "@/components/shared/shimmer-skeleton";
import { CopyButton } from "@/components/shared/copy-button";
import type { Project } from "@/types";

export default function MatrixPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/projects/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data.project);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        <DashboardBackground />
        <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
          <ShimmerSkeleton className="h-10 w-64" />
          <ShimmerSkeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!project || !project.copy_strings) return null;

  const allLocales = ["en", ...project.target_locales];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <DashboardBackground />

      <header className="border-b glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <AppLogo size="md" />
          <Button variant="ghost" size="sm" onClick={() => router.push(`/projects/${id}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project
          </Button>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-8 max-w-7xl">
        <SectionReveal>
          <div className="mb-8">
            <Badge variant="outline" className="mb-3 text-xs font-semibold tracking-wider border-indigo-300 text-indigo-600 bg-indigo-50/50">
              <Grid3X3 className="w-3 h-3 mr-1.5" />
              COMPARISON MATRIX
            </Badge>
            <h2 className="text-3xl font-extrabold mb-2">All-Locales Comparison</h2>
            <p className="text-muted-foreground">Every copy string across every market in one view</p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid gap-0 border-2 rounded-2xl overflow-hidden bg-card/90 backdrop-blur-sm">
                <div className={`grid border-b bg-muted/50`} style={{ gridTemplateColumns: `180px repeat(${allLocales.length}, 1fr)` }}>
                  <div className="p-4 font-bold text-sm border-r">Copy Type</div>
                  {allLocales.map((locale) => (
                    <div key={locale} className="p-4 text-center border-r last:border-r-0">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{getFlag(locale)}</span>
                        <span className="text-xs font-semibold">
                          {locale === "en" ? "Original" : getCountryName(locale)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {project.copy_strings.map((cs, index) => (
                  <motion.div
                    key={cs.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`grid border-b last:border-b-0 hover:bg-muted/30 transition-colors`}
                    style={{ gridTemplateColumns: `180px repeat(${allLocales.length}, 1fr)` }}
                  >
                    <div className="p-4 border-r flex flex-col gap-2">
                      <Badge variant="outline" className="text-xs w-fit">{cs.string_type}</Badge>
                      {cs.persuasion_category && (
                        <Badge className="text-xs w-fit bg-indigo-100 text-indigo-700 border-indigo-200">
                          {cs.persuasion_category}
                        </Badge>
                      )}
                    </div>

                    {allLocales.map((locale) => {
                      let content = "";
                      if (locale === "en") {
                        content = cs.content;
                      } else {
                        const adaptation = cs.adaptations?.find((a) => a.locale === locale);
                        content = adaptation?.content || "—";
                      }

                      return (
                        <div key={locale} className="p-4 border-r last:border-r-0 group relative">
                          <p className="text-sm leading-relaxed">{content}</p>
                          {content !== "—" && (
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <CopyButton text={content} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        <LingoBadge />
      </main>
    </div>
  );
}
