"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Monitor, Smartphone, ExternalLink } from "lucide-react";
import { getFlag, getCountryName } from "@/lib/utils";
import { AppLogo } from "@/components/shared/app-logo";
import { DashboardBackground } from "@/components/shared/dashboard-background";
import { ShimmerSkeleton } from "@/components/shared/shimmer-skeleton";
import type { Project, CopyString } from "@/types";

function getStringByType(strings: CopyString[], type: string, locale: string): string {
  const cs = strings.find((s) => s.string_type === type);
  if (!cs) return "";

  if (locale === "en") return cs.content;

  const adaptation = cs.adaptations?.find((a) => a.locale === locale);
  if (adaptation) return adaptation.content;

  return cs.content;
}

function PreviewLanding({ strings, locale }: { strings: CopyString[]; locale: string }) {
  const headline = getStringByType(strings, "headline", locale);
  const subheadline = getStringByType(strings, "subheadline", locale);
  const cta = getStringByType(strings, "cta", locale);
  const valueProp = getStringByType(strings, "value_prop", locale);
  const socialProof = getStringByType(strings, "social_proof", locale);
  const urgency = getStringByType(strings, "urgency", locale);
  const trustSignal = getStringByType(strings, "trust_signal", locale);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-full">
      <nav className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600" />
          <span className="font-bold text-sm text-gray-900 dark:text-white">YourApp</span>
        </div>
        <div className="flex gap-3">
          <span className="text-xs text-gray-500 py-1.5 px-3">Features</span>
          <span className="text-xs text-gray-500 py-1.5 px-3">Pricing</span>
          <div className="text-xs bg-indigo-600 text-white py-1.5 px-4 rounded-lg font-medium">
            {cta ? cta.slice(0, 20) : "Get Started"}
          </div>
        </div>
      </nav>

      <section className="px-6 py-16 text-center max-w-2xl mx-auto">
        <motion.h1
          key={headline}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight"
        >
          {headline || "Your Headline Here"}
        </motion.h1>

        <motion.p
          key={subheadline}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto"
        >
          {subheadline || "Your subheadline goes here"}
        </motion.p>

        <motion.div
          key={cta}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-shadow">
            {cta || "Get Started"}
          </button>
        </motion.div>

        {socialProof && (
          <motion.p
            key={socialProof}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-gray-500 mt-6"
          >
            {socialProof}
          </motion.p>
        )}
      </section>

      {valueProp && (
        <section className="px-6 py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p
              key={valueProp}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-700 dark:text-gray-300 font-medium"
            >
              {valueProp}
            </motion.p>
          </div>
        </section>
      )}

      {(urgency || trustSignal) && (
        <section className="px-6 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            {urgency && (
              <motion.p
                key={urgency}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-600 font-semibold bg-red-50 dark:bg-red-950 rounded-lg py-2 px-4 inline-block"
              >
                {urgency}
              </motion.p>
            )}
            {trustSignal && (
              <motion.p
                key={trustSignal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xs text-gray-500"
              >
                🛡️ {trustSignal}
              </motion.p>
            )}
          </div>
        </section>
      )}

      <footer className="border-t px-6 py-4 text-center">
        <p className="text-xs text-gray-400">Preview generated by ContraCulture</p>
      </footer>
    </div>
  );
}

export default function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLocale, setActiveLocale] = useState("en");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
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
        <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
          <ShimmerSkeleton className="h-10 w-64" />
          <ShimmerSkeleton className="h-[600px] w-full" />
        </div>
      </div>
    );
  }

  if (!project || !project.copy_strings) return null;

  const allLocales = ["en", ...project.target_locales];

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
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <Badge variant="outline" className="mb-2 text-xs font-semibold tracking-wider border-indigo-300 text-indigo-600 bg-indigo-50/50">
              <ExternalLink className="w-3 h-3 mr-1.5" />
              LIVE PREVIEW
            </Badge>
            <h2 className="text-2xl font-extrabold">Landing Page Preview</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex border-2 rounded-xl overflow-hidden">
              <button
                onClick={() => setDevice("desktop")}
                className={`px-3 py-2 text-xs font-medium transition-colors ${device === "desktop" ? "bg-indigo-50 text-indigo-700" : "text-muted-foreground hover:bg-muted"}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`px-3 py-2 text-xs font-medium transition-colors ${device === "mobile" ? "bg-indigo-50 text-indigo-700" : "text-muted-foreground hover:bg-muted"}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {allLocales.map((locale) => (
            <motion.button
              key={locale}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveLocale(locale)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer
                ${locale === activeLocale
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-500/10"
                  : "border-border hover:border-indigo-300 hover:bg-indigo-50/30"
                }
              `}
            >
              <span className="text-lg">{getFlag(locale)}</span>
              <span>{locale === "en" ? "Original" : getCountryName(locale)}</span>
            </motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="mx-auto"
          style={{ maxWidth: device === "mobile" ? "375px" : "100%" }}
        >
          <Card className="overflow-hidden border-2 shadow-2xl">
            <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 bg-white dark:bg-gray-700 rounded-md px-3 py-1 ml-2">
                <p className="text-xs text-gray-400 truncate">
                  https://yourapp.com/{activeLocale !== "en" ? activeLocale : ""}
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocale}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-[500px]"
              >
                <PreviewLanding
                  strings={project.copy_strings}
                  locale={activeLocale}
                />
              </motion.div>
            </AnimatePresence>
          </Card>
        </motion.div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {activeLocale === "en"
              ? "This is your original English landing page"
              : `This is the culturally adapted version for ${getCountryName(activeLocale)}`
            }
          </p>
        </div>
      </main>
    </div>
  );
}
