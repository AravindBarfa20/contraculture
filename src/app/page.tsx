"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { AppLogo } from "@/components/shared/app-logo";
import { LiveDemo } from "@/components/shared/live-demo";
import { HeroTelemetry } from "@/components/shared/hero-telemetry";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { SectionReveal } from "@/components/shared/section-reveal";
import { Marquee } from "@/components/shared/marquee";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useLocale } from "@/hooks/use-locale";
import {
  ArrowRight,
  BarChart3,
  Globe,
  Sparkles,
  Terminal,
  ChevronRight,
  Code,
  CheckCircle2,
  ShieldCheck,
  Layers,
} from "lucide-react";

export default function HomePage() {
  const { locale, setLocale, mounted } = useLocale();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center font-mono text-xs text-zinc-400">
        INITIALIZING_CONTRACULTURE_ENGINE...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 overflow-hidden font-sans selection:bg-zinc-800 selection:text-white">
      <ScrollProgress />

      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3.5 flex items-center justify-between">
          <AppLogo size="md" />
          <div className="flex gap-4 items-center">
            <LocaleSwitcher current={locale} onChange={setLocale} />
            <ThemeToggle />
            <Link href="/projects">
              <span className="font-mono text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer px-2 py-1">
                /dashboard
              </span>
            </Link>
            <Link href="/projects/new">
              <Button size="sm" className="tactile-button-primary text-xs font-mono px-4 h-8">
                + new_project
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Subtle Precision Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />

        {/* Asymmetric Hero Section (12-Column Grid) */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 7 Columns: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded border border-zinc-800 bg-zinc-900/90 text-zinc-300 font-mono text-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="uppercase tracking-widest font-semibold text-zinc-200">ContraCulture Engine</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">Hofstede Adaptation</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-display tracking-tight text-white leading-[1.05]"
              >
                Translation preserves words.
                <br />
                <span className="text-zinc-400 font-normal">
                  Cultural adaptation preserves conversion.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-body-lead max-w-xl text-zinc-400"
              >
                Individualist copy fails in collectivist markets. ContraCulture rewrites landing page persuasion using Hofstede psychological framework scores tailored for each global market.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-4 pt-2 flex-wrap"
              >
                <Link href="/projects/new">
                  <Button size="lg" className="tactile-button-primary h-12 px-7 font-mono text-xs">
                    <Terminal className="w-4 h-4 mr-2" />
                    Launch Cultural Pipeline
                    <ArrowRight className="w-4 h-4 ml-2 opacity-70" />
                  </Button>
                </Link>

                <a href="#demo">
                  <Button size="lg" variant="outline" className="tactile-button-secondary h-12 px-6 font-mono text-xs">
                    <Code className="w-4 h-4 mr-2 text-zinc-400" />
                    Inspect Live Demo
                  </Button>
                </a>
              </motion.div>

              {/* Key Proof Points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4 grid grid-cols-3 gap-4 border-t border-zinc-800/80 font-mono text-xs"
              >
                <div>
                  <p className="text-zinc-500 text-[11px] uppercase">Framework</p>
                  <p className="text-zinc-200 font-bold mt-0.5">6 Hofstede Dimensions</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-[11px] uppercase">Latency</p>
                  <p className="text-zinc-200 font-bold mt-0.5">Stateless LLM Pipeline</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-[11px] uppercase">Verification</p>
                  <p className="text-zinc-200 font-bold mt-0.5">Bayesian A/B Simulator</p>
                </div>
              </motion.div>
            </div>

            {/* Right 5 Columns: First-Class Interactive Conversion Telemetry Widget */}
            <div className="lg:col-span-5 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <HeroTelemetry />
              </motion.div>
            </div>

          </div>
        </section>

        {/* Ticker */}
        <Marquee />

        {/* System Proof Metrics Grid */}
        <section className="container mx-auto px-6 py-20 border-t border-zinc-800/80">
          <SectionReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto font-sans">
              {[
                { value: 6, suffix: "", label: "Target Markets", desc: "JA, DE, PT-BR, FR, ES, US" },
                { value: 47, suffix: "%", label: "Avg. Conversion Lift", desc: "Predicted A/B Win Rate" },
                { value: 6, suffix: "", label: "Cultural Dimensions", desc: "IDV, PDI, MAS, UAI, LTO, IND" },
                { value: 30, suffix: "s", label: "Pipeline Latency", desc: "Stateless Llama 3.3 Engine" },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/40">
                  <p className="text-h2 font-mono text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs font-bold text-zinc-200 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-[11px] text-zinc-500 mt-1 font-mono">{stat.desc}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="container mx-auto px-6 py-20 border-t border-zinc-800/80">
          <SectionReveal>
            <div className="max-w-xl mx-auto text-center mb-12 space-y-3">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800">
                INSPECTION_TOOL // LIVE_PREVIEW
              </span>
              <h2 className="text-h2 text-white">Compare Cultural Rewriting</h2>
              <p className="text-body">
                Select a target country to compare word-for-word translation against Hofstede-adapted persuasion copy.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <LiveDemo />
          </SectionReveal>
        </section>

        {/* Workflow Architecture Section */}
        <section id="how-it-works" className="py-24 border-t border-b border-zinc-800/80 bg-zinc-950">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionReveal>
              <div className="max-w-xl mx-auto text-center mb-16 space-y-3">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800">
                  PIPELINE_STAGES // 3_STEPS
                </span>
                <h2 className="text-h2 text-white">How ContraCulture Works</h2>
                <p className="text-body">
                  Transform raw English copy into high-converting localized variants.
                </p>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "1. Persuasion Analysis",
                  desc: "AI classifies source copy by persuasion strategy (individualist, authority, scarcity, uncertainty-reduction).",
                  tag: "NLP Classifier",
                },
                {
                  step: "02",
                  title: "2. Cultural Adaptation",
                  desc: "Rewrites copy according to target market scores across 6 Hofstede psychological dimensions.",
                  tag: "Hofstede Engine",
                },
                {
                  step: "03",
                  title: "3. Conversion Simulation",
                  desc: "Simulates A/B visitor behavior to calculate statistical conversion lift before launching.",
                  tag: "Bayesian Simulator",
                },
              ].map((item, i) => (
                <SectionReveal key={i} delay={i * 0.1}>
                  <div className="hairline-card p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4 font-mono text-xs text-zinc-500">
                        <span className="text-zinc-200 font-bold">{item.step}</span>
                        <span className="text-zinc-400">{item.tag}</span>
                      </div>
                      <h3 className="text-h3 text-white mb-2">{item.title}</h3>
                      <p className="text-body text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="container mx-auto px-6 py-20 text-center max-w-3xl">
          <SectionReveal>
            <div className="p-12 rounded-xl border border-zinc-800 bg-zinc-950 space-y-6">
              <h2 className="text-h2 text-white">Ready to test your landing page copy?</h2>
              <p className="text-body text-zinc-400 max-w-md mx-auto">
                No database setup required. Create projects, generate adaptations, and test shareable URL reports immediately.
              </p>
              <Link href="/projects/new">
                <Button size="lg" className="tactile-button-primary h-12 px-8 font-mono text-xs">
                  Launch New Project →
                </Button>
              </Link>
            </div>
          </SectionReveal>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800/80 py-8">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <AppLogo size="sm" clickable={false} />
            <p>ContraCulture · Cultural Persuasion Engine for Global Growth</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
