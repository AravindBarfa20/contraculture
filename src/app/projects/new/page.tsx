"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SUPPORTED_LOCALES, STRING_TYPES } from "@/lib/constants";
import { AppLogo } from "@/components/shared/app-logo";
import { LingoBadge } from "@/components/shared/lingo-badge";
import { DashboardBackground } from "@/components/shared/dashboard-background";
import { MouseSpotlight } from "@/components/shared/mouse-spotlight";
import { AIGenerator } from "@/components/shared/ai-generator";
import { Plus, Trash2, ArrowLeft, Rocket, Wand2, CheckCircle } from "lucide-react";
import { createProject } from "@/lib/local-projects";

interface CopyField {
  string_key: string;
  content: string;
  string_type: string;
  sort_order: number;
}

const TEMPLATES = [
  {
    name: "SaaS Landing Page", emoji: "🚀",
    strings: [
      { string_key: "headline_0", content: "Take control of your projects. Work smarter, not harder.", string_type: "headline", sort_order: 0 },
      { string_key: "subheadline_1", content: "Join 10,000+ teams who boosted productivity by 40% in their first month.", string_type: "subheadline", sort_order: 1 },
      { string_key: "cta_2", content: "Start your free trial — no credit card needed", string_type: "cta", sort_order: 2 },
      { string_key: "value_prop_3", content: "The only project management tool that adapts to how you work.", string_type: "value_prop", sort_order: 3 },
      { string_key: "social_proof_4", content: "Trusted by teams at Google, Stripe, and 500+ startups worldwide.", string_type: "social_proof", sort_order: 4 },
    ],
  },
  {
    name: "E-commerce", emoji: "🛒",
    strings: [
      { string_key: "headline_0", content: "Premium quality, delivered to your door.", string_type: "headline", sort_order: 0 },
      { string_key: "subheadline_1", content: "Over 2 million happy customers in 30 countries.", string_type: "subheadline", sort_order: 1 },
      { string_key: "cta_2", content: "Shop now — free shipping on your first order", string_type: "cta", sort_order: 2 },
      { string_key: "urgency_3", content: "Limited time offer: 30% off everything this weekend only!", string_type: "urgency", sort_order: 3 },
      { string_key: "trust_4", content: "30-day money-back guarantee. No questions asked.", string_type: "trust_signal", sort_order: 4 },
    ],
  },
  {
    name: "Developer Tool", emoji: "⚡",
    strings: [
      { string_key: "headline_0", content: "Ship faster. Debug smarter. Scale effortlessly.", string_type: "headline", sort_order: 0 },
      { string_key: "subheadline_1", content: "The API platform that 50,000+ developers trust for production workloads.", string_type: "subheadline", sort_order: 1 },
      { string_key: "cta_2", content: "Get your free API key in 30 seconds", string_type: "cta", sort_order: 2 },
      { string_key: "value_prop_3", content: "99.99% uptime SLA. Sub-50ms latency. Enterprise-grade security.", string_type: "value_prop", sort_order: 3 },
      { string_key: "social_proof_4", content: "Used by engineering teams at Vercel, Shopify, and Linear.", string_type: "social_proof", sort_order: 4 },
    ],
  },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targetLocales, setTargetLocales] = useState<string[]>([]);
  const [copyStrings, setCopyStrings] = useState<CopyField[]>([
    { string_key: "headline_0", content: "", string_type: "headline", sort_order: 0 },
    { string_key: "subheadline_1", content: "", string_type: "subheadline", sort_order: 1 },
    { string_key: "cta_2", content: "", string_type: "cta", sort_order: 2 },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const toggleLocale = (code: string) => {
    setTargetLocales((prev) => prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code]);
  };

  const selectAllLocales = () => setTargetLocales(SUPPORTED_LOCALES.map((l) => l.code));

  const applyTemplate = (index: number) => {
    const template = TEMPLATES[index];
    setName(template.name);
    setDescription(`${template.name} copy for cultural adaptation`);
    setCopyStrings(template.strings);
    setSelectedTemplate(index);
    if (targetLocales.length === 0) selectAllLocales();
  };

  const handleAIGenerated = (copy: { headline: string; subheadline: string; cta: string; value_prop: string; social_proof: string }) => {
    setCopyStrings([
      { string_key: "headline_0", content: copy.headline, string_type: "headline", sort_order: 0 },
      { string_key: "subheadline_1", content: copy.subheadline, string_type: "subheadline", sort_order: 1 },
      { string_key: "cta_2", content: copy.cta, string_type: "cta", sort_order: 2 },
      { string_key: "value_prop_3", content: copy.value_prop, string_type: "value_prop", sort_order: 3 },
      { string_key: "social_proof_4", content: copy.social_proof, string_type: "social_proof", sort_order: 4 },
    ]);
    setSelectedTemplate(null);
    if (!name) setName("AI Generated Project");
    if (targetLocales.length === 0) selectAllLocales();
  };

  const addCopyField = () => {
    setCopyStrings((prev) => [...prev, { string_key: `copy_${prev.length}`, content: "", string_type: "body", sort_order: prev.length }]);
    setSelectedTemplate(null);
  };

  const removeCopyField = (index: number) => {
    setCopyStrings((prev) => prev.filter((_, i) => i !== index));
    setSelectedTemplate(null);
  };

  const updateCopyField = (index: number, field: Partial<CopyField>) => {
    setCopyStrings((prev) => prev.map((s, i) => (i === index ? { ...s, ...field } : s)));
    setSelectedTemplate(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    if (!name.trim()) { setError("Project name is required"); setSubmitting(false); return; }
    if (targetLocales.length === 0) { setError("Select at least one target market"); setSubmitting(false); return; }
    const filledStrings = copyStrings.filter((s) => s.content.trim());
    if (filledStrings.length === 0) { setError("Add at least one copy string"); setSubmitting(false); return; }

    try {
      const project = createProject({
        name: name.trim(),
        description: description.trim(),
        target_locales: targetLocales,
        copy_strings: filledStrings,
      });
      router.push(`/projects/${project.id}`);
    } catch (err) {
      setError("Failed to create project");
    }
    setSubmitting(false);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <DashboardBackground />
      <header className="border-b glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <AppLogo size="md" />
          <Button variant="ghost" size="sm" onClick={() => router.push("/projects")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <h2 className="text-3xl font-extrabold mb-2">Create New Project</h2>
          <p className="text-muted-foreground mb-8">Add your English copy and select target markets for cultural adaptation</p>

          <div className="mb-8">
            <AIGenerator onGenerated={handleAIGenerated} />
          </div>

          <MouseSpotlight className="rounded-2xl mb-8">
            <Card className="border border-border/80 overflow-hidden bg-card shadow-sm rounded-xl">
              <CardHeader className="pb-3 border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-emerald-500" />
                  <CardTitle className="text-sm font-bold font-mono">PRESET_TEMPLATES</CardTitle>
                </div>
                <CardDescription className="text-xs">Quick start with pre-configured SaaS copy strings</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex gap-3 flex-wrap">
                  {TEMPLATES.map((template, i) => (
                    <motion.button
                      key={i}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => applyTemplate(i)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer ${selectedTemplate === i ? "border-emerald-500/80 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-bold shadow-sm" : "border-border/80 bg-card hover:bg-accent"}`}
                    >
                      <span className="text-base">{template.emoji}</span>
                      <span>{template.name}</span>
                      {selectedTemplate === i && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </MouseSpotlight>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="border border-border/80 bg-card rounded-xl shadow-sm">
              <CardHeader className="pb-3 border-b border-border/50 bg-muted/30"><CardTitle className="text-sm font-bold font-mono">PROJECT_METADATA</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-mono">PROJECT_NAME *</Label>
                  <Input id="name" placeholder="e.g., Global SaaS Landing Page" value={name} onChange={(e) => setName(e.target.value)} className="h-10 text-sm font-sans" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description" className="text-xs font-mono">DESCRIPTION</Label>
                  <Textarea id="description" placeholder="Brief description of the product or campaign target..." value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="text-sm font-sans resize-none" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-card rounded-xl shadow-sm">
              <CardHeader className="pb-3 border-b border-border/50 bg-muted/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold font-mono">TARGET_MARKETS</CardTitle>
                  <Button type="button" variant="ghost" size="sm" onClick={selectAllLocales} className="text-xs font-mono text-emerald-600 dark:text-emerald-400 h-7">select_all</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-wrap gap-2.5">
                  {SUPPORTED_LOCALES.map((locale) => {
                    const isSelected = targetLocales.includes(locale.code);
                    return (
                      <motion.button key={locale.code} type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => toggleLocale(locale.code)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer ${isSelected ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-bold shadow-sm" : "border-border/80 bg-card hover:bg-accent"}`}
                      >
                        <span className="text-base">{locale.flag}</span>
                        <span>{locale.country}</span>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                      </motion.button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <MouseSpotlight className="rounded-2xl">
              <Card className="border-2 bg-card/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Copy Strings (English)</CardTitle>
                      <CardDescription>Your landing page copy that will be culturally adapted</CardDescription>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={addCopyField} className="border-2">
                      <Plus className="w-4 h-4 mr-1" />Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatePresence>
                    {copyStrings.map((field, index) => (
                      <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ delay: index * 0.05 }}
                        className="border-2 rounded-xl p-4 space-y-3 hover:border-teal-300 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <select className="text-sm border-2 rounded-lg px-3 py-1.5 bg-background font-medium focus:outline-none focus:border-teal-500" value={field.string_type}
                            onChange={(e) => updateCopyField(index, { string_type: e.target.value, string_key: e.target.value + "_" + index })}
                          >
                            {STRING_TYPES.map((t) => (<option key={t.value} value={t.value}>{t.label}</option>))}
                          </select>
                          {copyStrings.length > 1 && (
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeCopyField(index)}>
                              <Trash2 className="w-4 h-4 text-rose-400 hover:text-rose-600" />
                            </Button>
                          )}
                        </div>
                        <Textarea placeholder={`Enter your ${field.string_type} copy in English...`} value={field.content} onChange={(e) => updateCopyField(index, { content: e.target.value })} rows={2} className="resize-none border-2 focus:border-teal-500" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </MouseSpotlight>

            {error && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 bg-red-50 rounded-xl p-4 border border-red-200">{error}</motion.p>)}

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button type="submit" className="w-full h-14 text-lg bg-gradient-to-r from-teal-600 via-amber-600 to-rose-600 hover:from-teal-700 hover:via-amber-700 hover:to-rose-700 text-white border-0 shadow-xl shadow-teal-500/25 rounded-2xl font-bold bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500" disabled={submitting}>
                {submitting ? (
                  <motion.div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                ) : (
                  <><Rocket className="w-5 h-5 mr-2" />Create Project & Start Adapting</>
                )}
              </Button>
            </motion.div>
          </form>

          <LingoBadge />
        </motion.div>
      </main>
    </div>
  );
}
