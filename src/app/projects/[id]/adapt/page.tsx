"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { getFlag, getCountryName } from "@/lib/utils";
import { HOFSTEDE_DATA, HOFSTEDE_DIMENSIONS } from "@/lib/cultural/hofstede";
import { HofstedeRadar } from "@/components/analysis/hofstede-radar";
import { AppLogo } from "@/components/shared/app-logo";
import { LingoBadge } from "@/components/shared/lingo-badge";
import { SectionReveal } from "@/components/shared/section-reveal";
import { ShimmerSkeleton } from "@/components/shared/shimmer-skeleton";
import { DashboardBackground } from "@/components/shared/dashboard-background";
import { MouseSpotlight } from "@/components/shared/mouse-spotlight";
import { TiltCard } from "@/components/shared/tilt-card";
import { AnimatedTextDiff } from "@/components/shared/animated-text-diff";
import type { Project } from "@/types";

export default function AdaptationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLocale, setActiveLocale] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/projects/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data.project);
        if (data.project.target_locales.length > 0) {
          setActiveLocale(data.project.target_locales[0]);
        }
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        <DashboardBackground />
        <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
          <ShimmerSkeleton className="h-10 w-64" />
          <ShimmerSkeleton className="h-16 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ShimmerSkeleton className="h-80 w-full" />
            <ShimmerSkeleton className="h-80 w-full" />
          </div>
          <ShimmerSkeleton className="h-60 w-full" />
          <ShimmerSkeleton className="h-60 w-full" />
        </div>
      </div>
    );
  }

  if (!project) return null;

  const targetScores = HOFSTEDE_DATA[activeLocale];
  const sourceScores = HOFSTEDE_DATA["en"];

  const activeStrings = (project.copy_strings || []).filter(
    (cs) => cs.adaptations?.some((a) => a.locale === activeLocale)
  );

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

      <main className="relative container mx-auto px-4 py-8 max-w-6xl">
        <SectionReveal>
          <div className="mb-8">
            <Badge variant="outline" className="mb-3 text-xs font-semibold tracking-wider border-purple-300 text-purple-600 bg-purple-50/50">
              <Globe className="w-3 h-3 mr-1.5" />
              CULTURAL ADAPTATIONS
            </Badge>
            <h2 className="text-3xl font-extrabold mb-2">Cultural Adaptations</h2>
            <p className="text-muted-foreground">
              Side-by-side comparison of original English copy vs. culturally adapted variants
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="flex gap-3 mb-8 flex-wrap">
            {project.target_locales.map((locale) => (
              <motion.button
                key={locale}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveLocale(locale)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer
                  ${locale === activeLocale
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-500/10"
                    : "border-border hover:border-indigo-300 hover:bg-indigo-50/30"
                  }
                `}
              >
                <span className="text-xl">{getFlag(locale)}</span>
                <span>{getCountryName(locale)}</span>
              </motion.button>
            ))}
          </div>
        </SectionReveal>

        {activeLocale && targetScores && sourceScores && (
          <>
            <SectionReveal delay={0.12}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                <TiltCard maxTilt={8}>
                  <MouseSpotlight className="rounded-2xl">
                    <Card className="border-2 overflow-hidden bg-card/90 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <span className="text-xl">{getFlag(activeLocale)}</span>
                          Cultural Profile — {getCountryName(activeLocale)} vs USA
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <HofstedeRadar sourceLocale="en" targetLocale={activeLocale} />
                      </CardContent>
                    </Card>
                  </MouseSpotlight>
                </TiltCard>

                <TiltCard maxTilt={8}>
                  <MouseSpotlight className="rounded-2xl">
                    <Card className="border-2 overflow-hidden bg-card/90 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Key Cultural Gaps</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {HOFSTEDE_DIMENSIONS.map((dim) => {
                            const sourceVal = sourceScores[dim.key as keyof typeof sourceScores];
                            const targetVal = targetScores[dim.key as keyof typeof targetScores];
                            const diff = targetVal - sourceVal;
                            const isSignificant = Math.abs(diff) > 20;
                            const percentage = targetVal;

                            return (
                              <div key={dim.key}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">{dim.label}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">🇺🇸 {sourceVal}</span>
                                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-xs font-medium">{getFlag(activeLocale)} {targetVal}</span>
                                    <Badge
                                      variant="outline"
                                      className={`text-xs px-1.5 py-0 ${
                                        isSignificant
                                          ? diff > 0
                                            ? "border-red-300 text-red-600 bg-red-50"
                                            : "border-blue-300 text-blue-600 bg-blue-50"
                                          : "border-gray-200 text-gray-500"
                                      }`}
                                    >
                                      {diff > 0 ? "+" : ""}{diff}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <motion.div
                                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </MouseSpotlight>
                </TiltCard>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.16}>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">{getFlag(activeLocale)}</span>
                Adapted Copy for {getCountryName(activeLocale)}
              </h3>
            </SectionReveal>

            <div className="space-y-6">
              {activeStrings.map((cs, index) => {
                const adaptation = cs.adaptations?.find((a) => a.locale === activeLocale);
                if (!adaptation) return null;

                return (
                  <SectionReveal key={cs.id} delay={index * 0.08}>
                    <TiltCard maxTilt={6}>
                      <MouseSpotlight className="rounded-2xl">
                        <Card className="border-2 overflow-hidden bg-card/90 backdrop-blur-sm">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {cs.string_type}
                              </Badge>
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Original vs Adapted
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <AnimatedTextDiff
                              before={cs.content}
                              after={adaptation.content}
                            />

                            <div className="mt-5 rounded-xl border bg-muted/30 p-4">
                              <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">💡 Why: </span>
                                {adaptation.cultural_reasoning}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </MouseSpotlight>
                    </TiltCard>
                  </SectionReveal>
                );
              })}
            </div>

            {project.status === "simulated" && (
              <SectionReveal delay={0.22}>
                <div className="mt-10 text-center">
                  <Button
                    onClick={() => router.push(`/projects/${id}/results`)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg shadow-green-500/20 h-12 px-8 rounded-xl font-semibold"
                  >
                    View A/B Test Results
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </SectionReveal>
            )}
          </>
        )}

        <LingoBadge />
      </main>
    </div>
  );
}
