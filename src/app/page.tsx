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
import { FloatingElements } from "@/components/shared/floating-elements";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { TextReveal } from "@/components/shared/text-reveal";
import { SectionReveal } from "@/components/shared/section-reveal";
import { ProgressNav } from "@/components/shared/progress-nav";
import { TestimonialCarousel } from "@/components/shared/testimonial-carousel";
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
  GitBranch,
  Code,
  ChevronDown,
} from "lucide-react";

export default function HomePage() {
  const { locale, setLocale, mounted } = useLocale();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
          animate={{ rotate: [0, 180, 360], scale: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xl">🌍</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <ScrollProgress />
      <ProgressNav />

      <header className="border-b glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <AppLogo size="md" />
          <div className="flex gap-3 items-center">
            <LocaleSwitcher current={locale} onChange={setLocale} />
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-medium">
                {t("nav.signIn", locale)}
              </Button>
            </Link>
            <MagneticButton>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-indigo-500/25 font-medium"
                >
                  {t("nav.getStarted", locale)}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </header>

      <main>
        <section id="hero" ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center">
          <FloatingElements />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)" }}
              animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative container mx-auto px-4 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="outline"
                className="mb-8 px-5 py-2 text-sm border-indigo-500/30 text-indigo-600 bg-indigo-50/50 backdrop-blur-sm"
              >
                <Zap className="w-3.5 h-3.5 mr-2" />
                Built for the Lingo.dev Hackathon
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.05] text-balance"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your translated page
              <br />
              <span className="gradient-text">doesn&apos;t convert.</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t("app.description", locale)}
            </motion.p>

            <motion.p
              className="text-sm text-muted-foreground/80 max-w-lg mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              &ldquo;Start your free trial&rdquo; converts at <strong className="text-foreground">12% in the US</strong> but only <strong className="text-red-500">2% in Japan</strong>.
              Because individualist framing fails in collectivist cultures.
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <MagneticButton>
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="text-base px-10 h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 text-white border-0 shadow-2xl shadow-indigo-500/30 rounded-2xl font-semibold bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500"
                  >
                    Start Adapting Your Copy
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a href="#demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-10 h-14 rounded-2xl border-2 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 font-semibold transition-all duration-300"
                  >
                    See It In Action
                  </Button>
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div className="mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ChevronDown className="w-6 h-6 text-muted-foreground/50 mx-auto" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <Marquee />

        <section className="container mx-auto px-4 py-16">
          <SectionReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { value: 6, suffix: "", label: "Languages Supported", icon: "🌐" },
                { value: 47, suffix: "%", label: "Avg. Conversion Lift", icon: "📈" },
                { value: 6, suffix: "", label: "Hofstede Dimensions", icon: "🧠" },
                { value: 30, suffix: "s", label: "Time to Adapt", icon: "⚡" },
              ].map((stat, i) => (
                <motion.div key={i} className="text-center group" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                  <span className="text-2xl block mb-2 group-hover:scale-125 transition-transform duration-300">{stat.icon}</span>
                  <p className="text-3xl md:text-4xl font-extrabold gradient-text">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </section>

        <section id="demo" className="container mx-auto px-4 py-24">
          <SectionReveal>
            <div className="text-center mb-14">
              <Badge variant="outline" className="mb-5 text-xs font-semibold tracking-wider border-purple-300 text-purple-600 bg-purple-50/50">
                ✨ LIVE PREVIEW
              </Badge>
              <h3 className="text-4xl font-extrabold mb-4">
                <TextReveal>See Cultural Adaptation in Action</TextReveal>
              </h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Click a country below to see how the same English copy gets culturally rewritten
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <LiveDemo />
          </SectionReveal>
        </section>

        <section id="how-it-works" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/0 via-muted/50 to-muted/0" />
          <div className="container mx-auto px-4 relative">
            <SectionReveal>
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-5 text-xs font-semibold tracking-wider border-blue-300 text-blue-600 bg-blue-50/50">
                  🔧 HOW IT WORKS
                </Badge>
                <h3 className="text-4xl font-extrabold mb-4">
                  <TextReveal>Three Steps to Global Conversion</TextReveal>
                </h3>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  From English copy to culturally-optimized variants in under a minute
                </p>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { step: "01", icon: Sparkles, gradient: "from-blue-500 to-cyan-500", title: "1. Analyze", desc: "AI classifies persuasion patterns" },
                { step: "02", icon: Globe, gradient: "from-purple-500 to-pink-500", title: "2. Adapt", desc: "Hofstede-driven cultural rewriting" },
                { step: "03", icon: BarChart3, gradient: "from-green-500 to-emerald-500", title: "3. Simulate", desc: "Predicted conversion rates" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <SectionReveal key={i} delay={i * 0.15}>
                    <div className="card-3d relative overflow-hidden rounded-2xl bg-card border-2 h-full p-8 group">
                      <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${item.gradient} opacity-80`} />
                      <div className="flex items-start justify-between mb-5">
                        <motion.div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-xl`}
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <span className="text-5xl font-black text-muted-foreground/10">{item.step}</span>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="testimonials" className="container mx-auto px-4 py-24">
          <SectionReveal>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">💬 TESTIMONIALS</Badge>
              <h3 className="text-3xl font-bold mb-4">Trusted by Growth Teams</h3>
            </div>
          </SectionReveal>
          <TestimonialCarousel />
        </section>

        <Marquee />

        <section className="container mx-auto px-4 py-24">
          <SectionReveal>
            <div className="relative overflow-hidden rounded-3xl noise">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15),transparent_50%)]" />
              </div>
              <div className="relative p-12 md:p-20 text-center text-white">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8"
                >
                  <span className="text-6xl">🚀</span>
                </motion.div>
                <h3 className="text-4xl md:text-5xl font-extrabold mb-5">Ready to convert globally?</h3>
                <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">Stop losing customers to literal translations</p>
                <MagneticButton>
                  <Link href="/signup">
                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-50 text-lg px-10 h-14 shadow-2xl rounded-2xl font-bold">
                      Get Started Free
                    </Button>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </SectionReveal>
        </section>

        <footer className="border-t py-10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <AppLogo size="sm" clickable={false} />
            <p className="text-sm text-muted-foreground">
              Built for Lingo.dev Hackathon · Powered by Lingo.dev
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
