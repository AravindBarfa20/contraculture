"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp } from "lucide-react";
import { getFlag, getCountryName, formatPercent } from "@/lib/utils";
import { AppLogo } from "@/components/shared/app-logo";
import { LingoBadge } from "@/components/shared/lingo-badge";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { ShimmerSkeleton } from "@/components/shared/shimmer-skeleton";
import { ChartTooltip } from "@/components/shared/chart-tooltip";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";

interface ShareResult {
  locale: string;
  variant_label: string;
  simulated_visitors: number;
  simulated_conversions: number;
  conversion_rate: number;
  is_winner: boolean;
  insight: string;
}

interface ShareProject {
  name: string;
  description: string;
  source_locale: string;
  target_locales: string[];
}

export default function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<ShareProject | null>(null);
  const [results, setResults] = useState<ShareResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/projects/${id}/public`);
      if (res.ok) {
        const json = await res.json();
        setProject(json.project);
        setResults(json.results || []);
      } else {
        setError("Project not found or not shared");
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl space-y-6">
          <ShimmerSkeleton className="h-12 w-72" />
          <ShimmerSkeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <p className="text-lg font-medium mb-2">Not Available</p>
          <p className="text-muted-foreground">{error}</p>
        </Card>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <AppLogo size="md" />
          <Badge variant="outline" className="text-xs">Shared Results</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold mb-2">{project.name}</h1>
            <p className="text-muted-foreground">{project.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-6 py-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-extrabold text-green-600">
                +<AnimatedCounter end={Math.round(overallLift)} suffix="%" />
              </span>
              <span className="text-sm text-green-700 font-medium">avg. conversion lift</span>
            </div>
          </div>

          <Card className="mb-8 border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Conversion Rate by Market</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData} barCategoryGap="25%" barGap={6}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="locale" tick={{ fontSize: 12, fill: "#6b7280" }} tickLine={false} />
                  <YAxis unit="%" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(99,102,241,0.04)" }} />
                  <Legend iconType="circle" iconSize={10} />
                  <Bar dataKey="Literal Translation" fill="#cbd5e1" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Culturally Adapted" radius={[8, 8, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={index} fill="url(#greenGrad)" />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {locales.map((locale) => {
              const literal = results.find((r) => r.locale === locale && r.variant_label === "literal_translation");
              const adapted = results.find((r) => r.locale === locale && r.variant_label === "culturally_adapted");
              const lift = literal && adapted && literal.conversion_rate > 0
                ? ((adapted.conversion_rate - literal.conversion_rate) / literal.conversion_rate) * 100
                : 0;

              return (
                <Card key={locale} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{getFlag(locale)}</span>
                        <span className="font-bold text-lg">{getCountryName(locale)}</span>
                      </div>
                      {lift > 0 && (
                        <Badge className="bg-green-500 text-white border-0">
                          <Trophy className="w-3 h-3 mr-1" />
                          +{lift.toFixed(1)}%
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border p-4">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Literal</p>
                        <p className="text-2xl font-bold">{literal ? formatPercent(literal.conversion_rate) : "N/A"}</p>
                      </div>
                      <div className="rounded-xl border border-green-200 bg-green-50/50 p-4">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Adapted</p>
                        <p className="text-2xl font-bold text-green-600">{adapted ? formatPercent(adapted.conversion_rate) : "N/A"}</p>
                      </div>
                    </div>
                    {adapted?.insight && (
                      <p className="text-sm text-muted-foreground mt-3">
                        💡 {String(adapted.insight)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Generated by ContraCulture · Powered by Lingo.dev
            </p>
            <a href="/" className="text-primary text-sm underline hover:no-underline">
              Try ContraCulture for your landing page →
            </a>
          </div>
        </motion.div>

        <LingoBadge />
      </main>
    </div>
  );
}
