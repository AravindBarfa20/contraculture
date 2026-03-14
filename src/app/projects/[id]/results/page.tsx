"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, TrendingUp, Users, BarChart3, Globe } from "lucide-react";
import { getFlag, getCountryName, formatPercent } from "@/lib/utils";
import { AppLogo } from "@/components/shared/app-logo";
import { LingoBadge } from "@/components/shared/lingo-badge";
import { SectionReveal } from "@/components/shared/section-reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { ChartTooltip } from "@/components/shared/chart-tooltip";
import { ShimmerSkeleton } from "@/components/shared/shimmer-skeleton";
import { DashboardBackground } from "@/components/shared/dashboard-background";
import { MouseSpotlight } from "@/components/shared/mouse-spotlight";
import { TiltCard } from "@/components/shared/tilt-card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";
import type { Project } from "@/types";

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredLocale, setHoveredLocale] = useState<string | null>(null);
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
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="space-y-6">
            <ShimmerSkeleton className="h-10 w-72" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <ShimmerSkeleton className="h-36 w-full" />
              <ShimmerSkeleton className="h-36 w-full" />
              <ShimmerSkeleton className="h-36 w-full" />
            </div>
            <ShimmerSkeleton className="h-[420px] w-full" />
            <ShimmerSkeleton className="h-56 w-full" />
            <ShimmerSkeleton className="h-56 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!project || !project.simulation_results) return null;

  const results = project.simulation_results;
  const locales = [...new Set(results.map((r) => r.locale))];

  const chartData = locales.map((locale) => {
    const literal = results.find((r) => r.locale === locale && r.variant_label === "literal_translation");
    const adapted = results.find((r) => r.locale === locale && r.variant_label === "culturally_adapted");
    return {
      locale: `${getFlag(locale)} ${getCountryName(locale)}`,
      "Literal Translation": literal ? +(literal.conversion_rate * 100).toFixed(2) : 0,
      "Culturally Adapted": adapted ? +(adapted.conversion_rate * 100).toFixed(2) : 0,
    };
  });

  const totalLiteral = results
    .filter((r) => r.variant_label === "literal_translation")
    .reduce((sum, r) => sum + r.simulated_conversions, 0);

  const totalAdapted = results
    .filter((r) => r.variant_label === "culturally_adapted")
    .reduce((sum, r) => sum + r.simulated_conversions, 0);

  const overallLift = totalLiteral > 0 ? ((totalAdapted - totalLiteral) / totalLiteral) * 100 : 0;
  const totalVisitors = results.reduce((sum, r) => sum + r.simulated_visitors, 0);

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

      <main className="relative container mx-auto px-4 py-8 max-w-5xl">
        <SectionReveal>
          <div className="mb-8">
            <Badge variant="outline" className="mb-3 text-xs font-semibold tracking-wider border-green-300 text-green-600 bg-green-50/50">
              <BarChart3 className="w-3 h-3 mr-1.5" />
              SIMULATION RESULTS
            </Badge>
            <h2 className="text-3xl font-extrabold mb-2">A/B Simulation Results</h2>
            <p className="text-muted-foreground">
              Literal translation vs. culturally adapted copy — predicted conversion rates
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: TrendingUp,
                value: Math.round(overallLift),
                suffix: "%",
                label: "Average Conversion Lift",
                color: "from-green-400 to-emerald-500",
                bg: "bg-green-100",
                text: "text-green-600",
              },
              {
                icon: Users,
                value: totalVisitors,
                suffix: "",
                label: "Simulated Visitors",
                color: "from-blue-400 to-indigo-500",
                bg: "bg-blue-100",
                text: "text-blue-600",
              },
              {
                icon: Trophy,
                value: locales.length,
                suffix: "",
                label: "Markets Tested",
                color: "from-purple-400 to-pink-500",
                bg: "bg-purple-100",
                text: "text-purple-600",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <TiltCard key={item.label} maxTilt={8}>
                  <MouseSpotlight className="rounded-2xl">
                    <Card className="border-2 overflow-hidden relative group hover:shadow-lg transition-all duration-300 bg-card/90 backdrop-blur-sm">
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`} />
                      <CardContent className="pt-8 pb-6 text-center">
                        <motion.div
                          className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                        >
                          <Icon className={`w-7 h-7 ${item.text}`} />
                        </motion.div>
                        <p className={`text-4xl font-extrabold ${item.text}`}>
                          {index === 0 ? "+" : ""}
                          <AnimatedCounter end={item.value} suffix={item.suffix} />
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 font-medium">
                          {item.label}
                        </p>
                      </CardContent>
                    </Card>
                  </MouseSpotlight>
                </TiltCard>
              );
            })}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <MouseSpotlight className="rounded-2xl">
            <Card className="mb-10 border-2 overflow-hidden hover:shadow-lg transition-all duration-300 bg-card/90 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Conversion Rate by Market</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData} barCategoryGap="25%" barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="locale"
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={false}
                    />
                    <YAxis
                      unit="%"
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(99, 102, 241, 0.04)" }} />
                    <Legend
                      wrapperStyle={{ paddingTop: "16px", fontSize: "13px" }}
                      iconType="circle"
                      iconSize={10}
                    />
                    <Bar dataKey="Literal Translation" fill="#cbd5e1" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Culturally Adapted" radius={[8, 8, 0, 0]}>
                      {chartData.map((_, index) => (
                        <Cell key={index} fill="url(#greenGradient)" />
                      ))}
                    </Bar>
                    <defs>
                      <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#16a34a" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </MouseSpotlight>
        </SectionReveal>

        <SectionReveal delay={0.16}>
          <h3 className="text-xl font-bold mb-6">Market Breakdown</h3>
        </SectionReveal>

        <div className="space-y-6">
          {locales.map((locale, index) => {
            const literal = results.find((r) => r.locale === locale && r.variant_label === "literal_translation");
            const adapted = results.find((r) => r.locale === locale && r.variant_label === "culturally_adapted");
            const lift =
              literal && adapted && literal.conversion_rate > 0
                ? ((adapted.conversion_rate - literal.conversion_rate) / literal.conversion_rate) * 100
                : 0;

            return (
              <SectionReveal key={locale} delay={index * 0.08}>
                <TiltCard maxTilt={6}>
                  <MouseSpotlight className="rounded-2xl">
                    <Card
                      className={`border-2 overflow-hidden transition-all duration-300 bg-card/90 backdrop-blur-sm ${
                        hoveredLocale === locale ? "shadow-xl border-indigo-200" : "hover:shadow-lg"
                      }`}
                      onMouseEnter={() => setHoveredLocale(locale)}
                      onMouseLeave={() => setHoveredLocale(null)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-3">
                            <motion.span
                              className="text-4xl"
                              animate={hoveredLocale === locale ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              {getFlag(locale)}
                            </motion.span>
                            <span className="text-xl">{getCountryName(locale)}</span>
                          </CardTitle>
                          {lift > 0 && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.45 + index * 0.08, type: "spring" }}
                            >
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-sm px-4 py-1.5 shadow-lg shadow-green-500/20">
                                <Trophy className="w-3.5 h-3.5 mr-1.5" />
                                +{lift.toFixed(1)}% lift
                              </Badge>
                            </motion.div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                          <div className="rounded-2xl border-2 p-6 relative overflow-hidden hover:border-gray-300 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gray-300" />
                            <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">
                              Literal Translation
                            </p>
                            <p className="text-4xl font-extrabold mt-2 tracking-tight">
                              {literal ? formatPercent(literal.conversion_rate) : "N/A"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {literal?.simulated_conversions.toLocaleString()} conversions / {literal?.simulated_visitors.toLocaleString()} visitors
                            </p>
                            <div className="mt-4 w-full bg-muted rounded-full h-2.5 overflow-hidden">
                              <motion.div
                                className="h-2.5 rounded-full bg-gray-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((literal?.conversion_rate || 0) * 100 * 4, 100)}%` }}
                                transition={{ duration: 1, delay: 0.25 + index * 0.08 }}
                              />
                            </div>
                          </div>

                          <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50/80 to-emerald-50/50 p-6 relative overflow-hidden hover:border-green-300 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500" />
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                                Culturally Adapted
                              </p>
                              {adapted?.is_winner && (
                                <motion.div
                                  animate={{ rotate: [0, 15, -15, 0] }}
                                  transition={{ duration: 0.6, delay: 0.8 + index * 0.08 }}
                                >
                                  <Trophy className="w-4 h-4 text-green-600" />
                                </motion.div>
                              )}
                            </div>
                            <p className="text-4xl font-extrabold text-green-600 mt-2 tracking-tight">
                              {adapted ? formatPercent(adapted.conversion_rate) : "N/A"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {adapted?.simulated_conversions.toLocaleString()} conversions / {adapted?.simulated_visitors.toLocaleString()} visitors
                            </p>
                            <div className="mt-4 w-full bg-green-100 rounded-full h-2.5 overflow-hidden">
                              <motion.div
                                className="h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((adapted?.conversion_rate || 0) * 100 * 4, 100)}%` }}
                                transition={{ duration: 1, delay: 0.4 + index * 0.08 }}
                              />
                            </div>
                          </div>
                        </div>

                        {adapted?.insight && (
                          <motion.div
                            className="rounded-xl p-5 border bg-gradient-to-r from-indigo-50/30 to-purple-50/30"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65 + index * 0.08 }}
                          >
                            <p className="text-sm leading-relaxed">
                              <span className="font-bold text-foreground">💡 Insight: </span>
                              {adapted.insight}
                            </p>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </MouseSpotlight>
                </TiltCard>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal delay={0.22}>
          <div className="mt-12">
            <MouseSpotlight className="rounded-2xl">
              <Card className="border-2 overflow-hidden bg-card/90 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-center text-white relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2),transparent_50%)]" />
                  </div>
                  <div className="relative">
                    <p className="text-lg font-bold mb-1">
                      Cultural adaptation delivers a <span className="text-3xl font-extrabold">+{overallLift.toFixed(0)}%</span> average lift
                    </p>
                    <p className="text-sm text-white/80 mb-6">
                      across {locales.length} markets with {totalVisitors.toLocaleString()} simulated visitors
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={() => router.push(`/projects/${id}/adapt`)}
                        className="bg-white text-indigo-600 hover:bg-gray-50 font-semibold shadow-xl rounded-xl"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        View All Adaptations
                      </Button>
                      <Button
                        onClick={() => router.push(`/projects/${id}`)}
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 rounded-xl"
                      >
                        Back to Project
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </MouseSpotlight>
          </div>
        </SectionReveal>

        <LingoBadge />
      </main>
    </div>
  );
}
