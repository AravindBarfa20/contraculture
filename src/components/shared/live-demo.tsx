"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Sliders } from "lucide-react";

const DEMO_ITEMS = [
  {
    locale: "🇯🇵",
    country: "Japan",
    dimension: "UAI 92 · Uncertainty Avoidance",
    original: "Start your free trial today — boost sales by 40%!",
    adapted: "安心の無料トライアルをお試しください — チーム全体の業務効率化をサポート",
    category: "uncertainty_reducing",
    insight: "High Uncertainty Avoidance (92). Urgent 'trial' framing replaced with safety language (安心 = peace of mind) and risk-free team assurance.",
    lift: "+47%",
    stats: "Conversion Rate: 2.1% ➔ 14.7%",
  },
  {
    locale: "🇩🇪",
    country: "Germany",
    dimension: "LTO 83 · Long-Term Orientation",
    original: "Join 10,000+ happy founders today!",
    adapted: "Von 10.000+ Unternehmen vertraut — nachweislich effizient und DSGVO-konform",
    category: "authority_factual",
    insight: "High Long-Term Orientation (83). Replaced emotional 'happy' with empirical proof ('proven efficiency') and corporate compliance trust.",
    lift: "+32%",
    stats: "Conversion Rate: 4.8% ➔ 11.2%",
  },
  {
    locale: "🇧🇷",
    country: "Brazil",
    dimension: "IDV 38 · Collectivism & Relationship",
    original: "The #1 tool for your personal workflow",
    adapted: "A ferramenta que sua equipe pode confiar — juntos, transformamos resultados",
    category: "collectivist_harmony",
    insight: "Low Individualism (38). Shifted from solo achievement ('your personal workflow') to collective team growth ('together we transform results').",
    lift: "+41%",
    stats: "Conversion Rate: 3.2% ➔ 9.8%",
  },
];

export function LiveDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = DEMO_ITEMS[activeIndex];

  return (
    <div className="w-full max-w-4xl mx-auto font-sans">
      {/* Market Selector Tabs */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {DEMO_ITEMS.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono transition-all cursor-pointer border
              ${i === activeIndex
                ? "bg-zinc-800 border-zinc-600 text-white font-bold shadow-sm"
                : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }
            `}
          >
            <span>{item.locale}</span>
            <span>{item.country}</span>
            <span className="text-[10px] text-zinc-400">({item.lift})</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="telemetry-panel overflow-hidden border border-zinc-800">
            {/* Toolbar Header */}
            <div className="px-5 py-3 border-b border-zinc-800 bg-zinc-950/90 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <Sliders className="w-3.5 h-3.5 text-zinc-200" />
                <span>INSPECT: <strong className="text-white">{active.country.toUpperCase()}</strong></span>
              </div>
              <span className="text-[11px] font-mono text-zinc-300 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                {active.dimension}
              </span>
            </div>

            {/* Structured String Diff Panel */}
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-800 border-b border-zinc-800 text-xs font-mono">
              
              {/* Source Column */}
              <div className="md:col-span-5 p-6 bg-zinc-950/80 space-y-3">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>🇺🇸 SOURCE (US)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">IDV 91</span>
                </div>
                <p className="text-sm font-sans font-medium text-zinc-200 leading-snug">
                  &ldquo;{active.original}&rdquo;
                </p>
                <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-900">
                  Pattern: <span className="text-zinc-300">individualist_urgency</span>
                </div>
              </div>

              {/* Indicator Divider */}
              <div className="md:col-span-2 flex flex-col items-center justify-center p-4 bg-zinc-950">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-1">
                  <Sparkles className="w-4 h-4 text-zinc-200" />
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-extrabold">{active.lift} LIFT</span>
              </div>

              {/* Adapted Column */}
              <div className="md:col-span-5 p-6 bg-zinc-900/40 space-y-3">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>{active.locale} ADAPTED ({active.country.toUpperCase()})</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-200">
                    {active.category}
                  </span>
                </div>
                <p className="text-sm font-sans font-semibold text-white leading-snug">
                  &ldquo;{active.adapted}&rdquo;
                </p>
                <div className="text-[11px] text-emerald-400 font-semibold pt-2 border-t border-zinc-800">
                  ⚡ {active.stats}
                </div>
              </div>

            </div>

            {/* Notes Bar */}
            <div className="px-6 py-4 bg-zinc-950 font-mono text-xs text-zinc-400 flex items-start gap-2">
              <span className="text-white font-bold uppercase">Psychology Notes:</span>
              <span className="font-sans text-zinc-300 leading-relaxed">{active.insight}</span>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
