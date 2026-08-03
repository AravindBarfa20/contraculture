"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { AppLogo } from "@/components/shared/app-logo";
import { LiveDemo } from "@/components/shared/live-demo";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { SectionReveal } from "@/components/shared/section-reveal";
import { Marquee } from "@/components/shared/marquee";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { t } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";
import {
  ArrowRight,
  BarChart3,
  Globe,
  Sparkles,
  Zap,
  Terminal,
  Cpu,
  ShieldCheck,
  ChevronRight,
  Code,
  Layers,
} from "lucide-react";

export default function HomePage() {
  const { locale, setLocale, mounted } = useLocale();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono text-zinc-300 text-xs animate-pulse">
          CC
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-white/20">
      <ScrollProgress />

      {/* Top Navbar - Glass Blur */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50 transition-colors">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <AppLogo size="md" />
          <div className="flex gap-3 items-center">
            <LocaleSwitcher current={locale} onChange={setLocale} />
            <ThemeToggle />
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="font-medium text-xs font-mono text-zinc-300 hover:text-white">
                /dashboard
              </Button>
            </Link>
            <Link href="/projects/new">
              <Button
                size="sm"
                className="bg-gradient-to-b from-zinc-100 to-zinc-300 hover:from-white hover:to-zinc-200 text-zinc-950 font-mono text-xs shadow-md border border-white/40 font-bold transition-all"
              >
                + new_project
                <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-80" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Subtle Engineering Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />

        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="relative pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-zinc-700/10 via-zinc-800/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative container mx-auto px-4 text-center max-w-5xl"
          >
            {/* Engineering Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700/80 bg-zinc-900/90 text-zinc-200 text-xs font-mono mb-8 shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span className="font-semibold uppercase tracking-wider text-white">ContraCulture Engine v2.0</span>
              <span className="opacity-40">|</span>
              <span className="opacity-80 text-zinc-400">Hofstede Cultural Adapter</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-balance font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Translation preserves words.
              <br />
              <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Cultural adaptation preserves conversion.
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Stop losing international visitors to literal translations. ContraCulture rewrites your landing page copy using Hofstede framework psychology tailored for each market.
            </motion.p>

            {/* Callout Stats Banner */}
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 mb-10 shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-white font-bold">12% US conversion</span>
              <span className="text-zinc-600">→</span>
              <span className="text-zinc-400 font-bold">2% Japan (Literal)</span>
              <span className="text-zinc-600">vs</span>
              <span className="text-white font-extrabold underline decoration-zinc-500 underline-offset-4">14.7% Japan (Adapted)</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/projects/new">
                <Button
                  size="lg"
                  className="h-12 px-8 rounded-xl bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400 hover:from-white hover:to-zinc-300 text-zinc-950 font-mono text-sm font-bold shadow-xl border border-white/50 transition-all"
                >
                  <Terminal className="w-4 h-4 mr-2 text-zinc-950" />
                  Start Cultural Adaptation
                  <ArrowRight className="w-4 h-4 ml-2 opacity-80" />
                </Button>
              </Link>

              <a href="#demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm text-sm font-mono font-medium hover:bg-zinc-900 text-zinc-300 transition-all"
                >
                  <Code className="w-4 h-4 mr-2 opacity-70" />
                  View Interactive Demo
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Sentry-Style Terminal Code / Visual Frame Preview */}
          <motion.div
            className="container mx-auto px-4 mt-16 max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden text-left font-mono">
              <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="text-xs text-zinc-400 ml-2">contraculture-pipeline.ts</span>
                </div>
                <div className="text-[11px] text-zinc-400 flex items-center gap-3">
                  <span className="text-white font-semibold">● LIVE</span>
                  <span>GROQ Llama3.3 70B</span>
                </div>
              </div>

              <div className="p-6 text-xs text-zinc-300 leading-relaxed overflow-x-auto space-y-3 bg-zinc-950">
                <div className="text-zinc-500">// 1. Analyze persuasion pattern of original English string</div>
                <div>
                  <span className="text-zinc-100 font-bold">const</span> pattern = <span className="text-zinc-300">analyzePersuasion</span>(<span className="text-zinc-400">&quot;Start your free trial today — boost productivity by 40%&quot;</span>);
                </div>
                <div className="text-zinc-400 pl-4">
                  ➔ Pattern Classified: <span className="text-white font-bold">&quot;individualist_achievement&quot;</span> <span className="text-zinc-500">(US Index: IDV 91, MAS 62)</span>
                </div>

                <div className="text-zinc-500 pt-2">// 2. Execute Hofstede transformation for Japan (IDV 46, UAI 92)</div>
                <div>
                  <span className="text-zinc-100 font-bold">const</span> adaptation = <span className="text-zinc-300">adaptCopy</span>(pattern, &#123; targetLocale: <span className="text-zinc-400">&quot;ja&quot;</span> &#125;);
                </div>
                <div className="text-white pl-4 font-sans font-medium text-sm pt-1">
                  &ldquo;安心の無料トライアルをお試しください — チーム全体の効率化をサポート&rdquo;
                </div>
                <div className="text-zinc-500 pl-4 text-[11px]">
                  Reasoning: Replaced individual urgency with peace-of-mind safety language (&quot;安心&quot;) and team harmony (&quot;チーム全体&quot;).
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Marquee Ticker */}
        <Marquee />

        {/* Metrics Grid */}
        <section className="container mx-auto px-4 py-16">
          <SectionReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { value: 6, suffix: "", label: "Target Locales", sub: "JA, DE, PT-BR, FR, ES" },
                { value: 47, suffix: "%", label: "Avg. Conversion Lift", sub: "Predicted A/B Win Rate" },
                { value: 6, suffix: "", label: "Hofstede Dimensions", sub: "IDV, PDI, MAS, UAI, LTO, IND" },
                { value: 30, suffix: "s", label: "Analysis Latency", sub: "Stateless AI Pipeline" },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
                  <p className="text-3xl font-extrabold font-mono tracking-tight text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs font-semibold text-zinc-300">{stat.label}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5 font-mono">{stat.sub}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="container mx-auto px-4 py-20">
          <SectionReveal>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3 text-[11px] font-mono tracking-wider border-zinc-700 text-zinc-300 bg-zinc-900 font-bold">
                INSPECTION_TOOL // LIVE_PREVIEW
              </Badge>
              <h3 className="text-3xl font-extrabold tracking-tight mb-3">See Cultural Rewriting in Action</h3>
              <p className="text-sm text-zinc-400 max-w-lg mx-auto">
                Compare literal word-for-word translation against Hofstede-driven persuasion copy
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <LiveDemo />
          </SectionReveal>
        </section>

        {/* Workflow Architecture Section */}
        <section id="how-it-works" className="py-20 border-t border-b border-zinc-800/80 bg-zinc-950/60">
          <div className="container mx-auto px-4 max-w-5xl">
            <SectionReveal>
              <div className="text-center mb-14">
                <Badge variant="outline" className="mb-3 text-[11px] font-mono tracking-wider border-zinc-700 text-zinc-300 bg-zinc-900 font-bold">
                  SYSTEM_PIPELINE // 3_STEPS
                </Badge>
                <h3 className="text-3xl font-extrabold tracking-tight mb-3">Engineered for High-Converting Growth</h3>
                <p className="text-sm text-zinc-400 max-w-lg mx-auto">
                  From raw input to simulated market lift in seconds
                </p>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  icon: Sparkles,
                  title: "1. Classify Persuasion",
                  desc: "AI identifies whether source copy uses individualist, authority, scarcity, or uncertainty-reduction framing.",
                  tag: "NLP Classifier",
                },
                {
                  step: "02",
                  icon: Globe,
                  title: "2. Cultural Rewriting",
                  desc: "Rewrites strings according to target market scores across 6 Hofstede cultural dimensions.",
                  tag: "Hofstede Model",
                },
                {
                  step: "03",
                  icon: BarChart3,
                  title: "3. Conversion Simulation",
                  desc: "Simulates A/B visitor behavior to estimate lift and declare statistical winning variants.",
                  tag: "Bayesian Simulator",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <SectionReveal key={i} delay={i * 0.1}>
                    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 backdrop-blur-sm h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center font-mono">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-mono font-bold text-zinc-500">{item.step}</span>
                        </div>
                        <h4 className="text-base font-bold mb-2 text-white">{item.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-300 font-semibold">{item.tag}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                      </div>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="container mx-auto px-4 py-20 text-center max-w-3xl">
          <SectionReveal>
            <div className="p-10 rounded-2xl border border-border bg-gradient-to-b from-card to-muted/50 backdrop-blur-sm">
              <h3 className="text-3xl font-extrabold tracking-tight mb-3">Ready to optimize your global pages?</h3>
              <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                No database setup required. Create projects, generate adaptations, and test shareable URL links immediately.
              </p>
              <Link href="/projects/new">
                <Button size="lg" className="h-12 px-8 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-zinc-100 dark:text-zinc-900 font-mono text-sm font-semibold shadow-xl">
                  Launch New Project →
                </Button>
              </Link>
            </div>
          </SectionReveal>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <AppLogo size="sm" clickable={false} />
            <p>Built for Lingo.dev Hackathon · Powered by Lingo.dev & Groq AI</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
