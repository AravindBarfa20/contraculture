"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, CheckCircle2, Sliders, Shield, Users, Layers } from "lucide-react";

const demoData = [
  {
    locale: "🇯🇵",
    country: "Japan",
    dimension: "UAI 92 (Uncertainty Avoidance)",
    original: "Start your free trial today!",
    adapted: "安心の無料トライアルをお試しください",
    category: "uncertainty_reducing",
    categoryColor: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30",
    insight: "High Uncertainty Avoidance (92). Urgent 'trial' framing replaced with safety language (安心 = peace of mind) and risk-free assurance.",
    lift: "+47%",
    stats: "Conversions: 2.1% ➔ 14.7%",
  },
  {
    locale: "🇩🇪",
    country: "Germany",
    dimension: "LTO 83 (Long-Term Orientation)",
    original: "Join 10,000+ happy customers!",
    adapted: "Von 10.000+ Unternehmen vertraut — nachweislich effizient",
    category: "authority_factual",
    categoryColor: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
    insight: "High Long-Term Orientation (83). Replaced emotional 'happy' with empirical proof ('proven efficiency') and corporate trust.",
    lift: "+32%",
    stats: "Conversions: 4.8% ➔ 11.2%",
  },
  {
    locale: "🇧🇷",
    country: "Brazil",
    dimension: "IDV 38 (Collectivism)",
    original: "The #1 tool for your personal workflow",
    adapted: "A ferramenta que sua equipe pode confiar — juntos, vamos mais longe",
    category: "collectivist_harmony",
    categoryColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    insight: "Low Individualism (38). Shifted from solo achievement ('your personal workflow') to collective team growth ('together we go further').",
    lift: "+41%",
    stats: "Conversions: 3.2% ➔ 9.8%",
  },
];

export function LiveDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = demoData[activeIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Market Selector Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {demoData.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer
              ${i === activeIndex
                ? "border-purple-500/50 bg-purple-500/10 text-purple-600 dark:text-purple-300 shadow-sm"
                : "border-border/60 bg-card/60 text-muted-foreground hover:bg-accent"
              }
            `}
          >
            <span className="text-base">{item.locale}</span>
            <span>{item.country}</span>
            <span className="text-[10px] opacity-60">({item.lift})</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="overflow-hidden border border-border/80 shadow-xl bg-card">
            {/* Header Toolbar */}
            <div className="px-5 py-3 border-b border-border/60 bg-muted/40 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sliders className="w-3.5 h-3.5 text-purple-500" />
                <span>INSPECT: <strong className="text-foreground">{active.country.toUpperCase()}</strong></span>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono border-purple-500/30 text-purple-600 dark:text-purple-300">
                {active.dimension}
              </Badge>
            </div>

            {/* Split Comparison View */}
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x border-b border-border/60">
              {/* Original String */}
              <div className="md:col-span-5 p-6 bg-card">
                <div className="flex items-center justify-between mb-3 font-mono text-xs text-muted-foreground">
                  <span>🇺🇸 SOURCE (US)</span>
                  <Badge variant="outline" className="text-[10px] font-mono">IDV 91</Badge>
                </div>
                <p className="text-base font-sans font-medium text-foreground mb-4 leading-snug">
                  &ldquo;{active.original}&rdquo;
                </p>
                <div className="text-xs font-mono text-muted-foreground bg-muted/50 p-2.5 rounded-lg border border-border/40">
                  Pattern: <span className="text-foreground">individualist_direct</span>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="md:col-span-2 flex flex-col items-center justify-center p-4 bg-muted/20">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-1">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">{active.lift} LIFT</span>
              </div>

              {/* Culturally Adapted String */}
              <div className="md:col-span-5 p-6 bg-purple-500/5">
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">{active.locale} ADAPTED ({active.country.toUpperCase()})</span>
                  <Badge className={`text-[10px] font-mono ${active.categoryColor}`}>
                    {active.category}
                  </Badge>
                </div>
                <p className="text-base font-sans font-semibold text-foreground mb-4 leading-snug">
                  &ldquo;{active.adapted}&rdquo;
                </p>
                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
                  ⚡ {active.stats}
                </div>
              </div>
            </div>

            {/* Footer Reasoning */}
            <div className="px-6 py-4 bg-muted/20 font-mono text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-purple-500 font-bold">PSYCHOLOGY_NOTES:</span>
              <span className="font-sans text-foreground/90 leading-relaxed text-xs">{active.insight}</span>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
