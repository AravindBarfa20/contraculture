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
    categoryColor: "bg-zinc-800/80 text-zinc-200 border-zinc-700",
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
    categoryColor: "bg-zinc-800/80 text-zinc-200 border-zinc-700",
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
    categoryColor: "bg-zinc-800/80 text-zinc-200 border-zinc-700",
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
                ? "border-zinc-500 bg-zinc-800/90 text-white shadow-md shadow-black/50 font-bold"
                : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
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
          <Card className="overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950">
            {/* Header Toolbar */}
            <div className="px-5 py-3 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <Sliders className="w-3.5 h-3.5 text-zinc-200" />
                <span>INSPECT: <strong className="text-white">{active.country.toUpperCase()}</strong></span>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono border-zinc-700 text-zinc-300 bg-zinc-800/80 font-bold">
                {active.dimension}
              </Badge>
            </div>

            {/* Split Comparison View */}
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-800 border-b border-zinc-800">
              {/* Original String */}
              <div className="md:col-span-5 p-6 bg-zinc-950">
                <div className="flex items-center justify-between mb-3 font-mono text-xs text-zinc-400">
                  <span>🇺🇸 SOURCE (US)</span>
                  <Badge variant="outline" className="text-[10px] font-mono border-zinc-800 text-zinc-400">IDV 91</Badge>
                </div>
                <p className="text-base font-sans font-medium text-zinc-100 mb-4 leading-snug">
                  &ldquo;{active.original}&rdquo;
                </p>
                <div className="text-xs font-mono text-zinc-400 bg-zinc-900/90 p-2.5 rounded-lg border border-zinc-800">
                  Pattern: <span className="text-zinc-200">individualist_direct</span>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="md:col-span-2 flex flex-col items-center justify-center p-4 bg-zinc-900/40">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-1 shadow-sm">
                  <Sparkles className="w-4 h-4 text-zinc-200" />
                </div>
                <span className="text-[11px] font-mono text-white font-extrabold">{active.lift} LIFT</span>
              </div>

              {/* Culturally Adapted String */}
              <div className="md:col-span-5 p-6 bg-zinc-900/30">
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className="text-white font-bold">{active.locale} ADAPTED ({active.country.toUpperCase()})</span>
                  <Badge className={`text-[10px] font-mono ${active.categoryColor}`}>
                    {active.category}
                  </Badge>
                </div>
                <p className="text-base font-sans font-semibold text-white mb-4 leading-snug">
                  &ldquo;{active.adapted}&rdquo;
                </p>
                <div className="text-xs font-mono text-white font-bold bg-zinc-800/90 border border-zinc-700/80 p-2.5 rounded-lg">
                  ⚡ {active.stats}
                </div>
              </div>
            </div>

            {/* Footer Reasoning */}
            <div className="px-6 py-4 bg-zinc-900/50 font-mono text-xs text-zinc-400 flex items-start gap-2 border-t border-zinc-800/80">
              <span className="text-white font-bold">PSYCHOLOGY_NOTES:</span>
              <span className="font-sans text-zinc-300 leading-relaxed text-xs">{active.insight}</span>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
