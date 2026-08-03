"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, ArrowUpRight, Cpu } from "lucide-react";

interface TelemetryPoint {
  country: string;
  code: string;
  flag: string;
  dimension: string;
  baselineUs: number;
  literalRate: number;
  adaptedRate: number;
  lift: string;
  sourceText: string;
  adaptedText: string;
  hofstedeShift: { idv: string; uai: string; mas: string };
}

const TELEMETRY_DATA: TelemetryPoint[] = [
  {
    country: "Japan",
    code: "JA",
    flag: "🇯🇵",
    dimension: "UAI 92 · Uncertainty Avoidance",
    baselineUs: 12.0,
    literalRate: 2.1,
    adaptedRate: 14.7,
    lift: "+600%",
    sourceText: "Start your free trial today — boost sales 40%!",
    adaptedText: "安心の無料トライアルをお試しください — チーム全体の業務効率化をサポート",
    hofstedeShift: { idv: "91 ➔ 46 (Collectivist)", uai: "46 ➔ 92 (Risk-Reducing)", mas: "62 ➔ 95 (Quality Focus)" },
  },
  {
    country: "Germany",
    code: "DE",
    flag: "🇩🇪",
    dimension: "LTO 83 · Long-Term Orientation",
    baselineUs: 12.0,
    literalRate: 4.8,
    adaptedRate: 11.2,
    lift: "+133%",
    sourceText: "Join 10,000+ happy founders!",
    adaptedText: "Von 10.000+ Unternehmen vertraut — nachweislich effizient und DSGVO-konform",
    hofstedeShift: { idv: "91 ➔ 67 (Structure)", uai: "46 ➔ 65 (Factual Proof)", mas: "62 ➔ 66 (Precision)" },
  },
  {
    country: "Brazil",
    code: "BR",
    flag: "🇧🇷",
    dimension: "IDV 38 · Collectivism & Relationship",
    baselineUs: 12.0,
    literalRate: 3.2,
    adaptedRate: 9.8,
    lift: "+206%",
    sourceText: "The #1 tool for your personal workflow",
    adaptedText: "A ferramenta que sua equipe pode confiar — juntos, transformamos resultados",
    hofstedeShift: { idv: "91 ➔ 38 (Group Synergy)", uai: "46 ➔ 76 (Trust First)", mas: "62 ➔ 49 (Harmony)" },
  },
];

export function HeroTelemetry() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const active = TELEMETRY_DATA[selectedIdx];

  return (
    <div className="w-full telemetry-panel overflow-hidden font-sans border border-zinc-800">
      {/* Top Telemetry Bar */}
      <div className="px-5 py-3.5 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2 text-zinc-200">
          <Cpu className="w-3.5 h-3.5 text-zinc-100" />
          <span className="tracking-wider uppercase font-bold text-zinc-200">CONVERSION_TELEMETRY // LIVE_BENCHMARK</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-zinc-200 font-semibold">BAYESIAN_SIMULATOR</span>
        </div>
      </div>

      {/* Country Selectors */}
      <div className="px-5 pt-4 pb-2 flex gap-2 border-b border-zinc-800/60 bg-zinc-950/40">
        {TELEMETRY_DATA.map((item, idx) => (
          <button
            key={item.code}
            onClick={() => setSelectedIdx(idx)}
            className={`
              flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer border
              ${idx === selectedIdx
                ? "bg-zinc-800 border-zinc-600 text-white font-bold shadow-sm"
                : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }
            `}
          >
            <span>{item.flag}</span>
            <span>{item.country}</span>
            <span className="text-[10px] text-zinc-400">({item.lift})</span>
          </button>
        ))}
      </div>

      {/* Metric Breakdown Grid */}
      <div className="p-6 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.code}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Conversion Comparison Bars */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">MARKET: <strong className="text-white">{active.country.toUpperCase()} ({active.dimension})</strong></span>
                <span className="text-white font-extrabold flex items-center gap-1">
                  PREDICTED CONVERSION LIFT: <span className="text-emerald-400">{active.lift}</span>
                </span>
              </div>

              {/* Bar 1: US Original */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>🇺🇸 US Original Copy (Baseline)</span>
                  <span>12.0%</span>
                </div>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                  <div className="h-full bg-zinc-600 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              {/* Bar 2: Literal Translation */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>{active.flag} Literal Translation (Unadapted)</span>
                  <span className="text-rose-400 font-bold">{active.literalRate}% (Failure)</span>
                </div>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                  <div className="h-full bg-rose-500/60 rounded-full" style={{ width: `${active.literalRate * 3.5}%` }} />
                </div>
              </div>

              {/* Bar 3: Hofstede Culturally Adapted */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-zinc-200">
                  <span className="font-bold flex items-center gap-1.5">
                    {active.flag} ContraCulture Adapted Copy
                  </span>
                  <span className="text-emerald-400 font-extrabold">{active.adaptedRate}% (Winner)</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${active.adaptedRate * 4.5}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Split String Inspector Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                <p className="text-[10px] text-zinc-500 uppercase">US Source Copy</p>
                <p className="text-zinc-300 font-sans text-xs font-medium leading-relaxed">&ldquo;{active.sourceText}&rdquo;</p>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-700 space-y-1">
                <p className="text-[10px] text-emerald-400 uppercase font-bold flex items-center justify-between">
                  <span>Hofstede Adapted Copy</span>
                  <span className="text-emerald-400 font-normal">{active.lift}</span>
                </p>
                <p className="text-white font-sans text-xs font-semibold leading-relaxed">&ldquo;{active.adaptedText}&rdquo;</p>
              </div>
            </div>

            {/* Hofstede Shifts Badge Bar */}
            <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap gap-2 text-[10px] font-mono text-zinc-400">
              <span className="text-zinc-500 font-bold uppercase self-center">Hofstede Shifts:</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">{active.hofstedeShift.idv}</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">{active.hofstedeShift.uai}</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">{active.hofstedeShift.mas}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
