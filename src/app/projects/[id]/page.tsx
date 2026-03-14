"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Sparkles, Globe, BarChart3, Trash2, CheckCircle, ChevronRight } from "lucide-react";
import { getFlag, getCountryName } from "@/lib/utils";
import { PERSUASION_CATEGORIES } from "@/lib/constants";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ShimmerSkeleton } from "@/components/shared/shimmer-skeleton";
import { DashboardBackground } from "@/components/shared/dashboard-background";
import { MouseSpotlight } from "@/components/shared/mouse-spotlight";
import { LingoBadge } from "@/components/shared/lingo-badge";
import { TiltCard } from "@/components/shared/tilt-card";
import { triggerConfetti } from "@/lib/confetti";
import type { Project } from "@/types";

const statusSteps = [
  { key: "draft", label: "Created", icon: "📝" },
  { key: "analyzed", label: "Analyzed", icon: "🔍" },
  { key: "adapted", label: "Adapted", icon: "🌐" },
  { key: "simulated", label: "Simulated", icon: "📊" },
];

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [adapting, setAdapting] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [stepComplete, setStepComplete] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  const loadProject = async () => {
    const res = await fetch(`/api/projects/${id}`);
    if (res.ok) {
      const data = await res.json();
      setProject(data.project);
    }
    setLoading(false);
  };

  useEffect(() => { loadProject(); }, [id]);

  const handleAction = async (action: string) => {
    const setters: Record<string, (v: boolean) => void> = { 
      analyze: setAnalyzing, 
      adapt: setAdapting, 
      simulate: setSimulating 
    };
    setters[action](true);
    setStepComplete("");
    
    const res = await fetch(`/api/projects/${id}/${action}`, { method: "POST" });
    
    if (res.ok) {
      await loadProject();
      setStepComplete(action);
      
      if (action === "simulate" && !showConfetti) {
        triggerConfetti();
        setShowConfetti(true);
      }
      
      setTimeout(() => setStepComplete(""), 3000);
    }
    setters[action](false);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this project and all data?")) return;
    setDeleting(true);
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) router.push("/projects");
    setDeleting(false);
  };

  const getPersuasionStyle = (category: string | null) => {
    const found = PERSUASION_CATEGORIES.find((p) => p.value === category);
    if (!found) return { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" };
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      "bg-blue-500": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
      "bg-green-500": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
      "bg-purple-500": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
      "bg-red-500": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
      "bg-yellow-500": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
      "bg-teal-500": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
      "bg-orange-500": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
      "bg-pink-500": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
      "bg-gray-500": { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" },
    };
    return colorMap[found.color] || { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" };
  };

  const isProcessing = analyzing || adapting || simulating;
  const currentStepIndex = statusSteps.findIndex((s) => s.key === project?.status);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-20 mb-4" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <DashboardBackground />
      <header className="border-b glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/projects")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Projects
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDelete} disabled={deleting}>
            <Trash2 className="w-4 h-4 text-red-400" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex gap-2 flex-wrap">
              {project.target_locales.map((locale) => (
                <Badge key={locale} variant="outline" className="text-sm py-1 px-3">
                  {getFlag(locale)} {getCountryName(locale)}
                </Badge>
              ))}
            </div>
          </div>

          <TiltCard>
            <Card className="mb-8 border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, index) => {
                    const isComplete = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    return (
                      <div key={step.key} className="flex items-center flex-1">
                        <div className={`flex flex-col items-center ${isComplete ? "opacity-100" : "opacity-40"}`}>
                          <motion.div 
                            className={`
                              w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition-all
                              ${isCurrent ? "ring-4 ring-indigo-500/20 bg-indigo-50" : isComplete ? "bg-green-50" : "bg-muted"}
                            `}
                            whileHover={{ scale: 1.1 }}
                          >
                            {step.icon}
                          </motion.div>
                          <span className={`text-xs font-medium ${isCurrent ? "text-indigo-600" : ""}`}>{step.label}</span>
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-3 mb-6 ${index < currentStepIndex ? "bg-green-400" : "bg-border"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TiltCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { action: "analyze", label: "1. Analyze Persuasion", icon: Sparkles, color: "from-blue-500 to-blue-600", disabled: isProcessing },
              { action: "adapt", label: "2. Generate Cultural Adaptations", icon: Globe, color: "from-purple-500 to-purple-600", disabled: isProcessing || project.status === "draft" },
              { action: "simulate", label: "3. Simulate A/B Test", icon: BarChart3, color: "from-green-500 to-green-600", disabled: isProcessing || project.status === "draft" || project.status === "analyzed" },
            ].map((btn) => {
              const Icon = btn.icon;
              const isActive = btn.action === "analyze" ? analyzing : btn.action === "adapt" ? adapting : simulating;
              const isComplete = stepComplete === btn.action;
              
              return (
                <motion.div key={btn.action} whileHover={!btn.disabled ? { scale: 1.02 } : {}} whileTap={!btn.disabled ? { scale: 0.98 } : {}}>
                  <Button
                    onClick={() => handleAction(btn.action)}
                    disabled={btn.disabled}
                    className={`w-full h-14 bg-gradient-to-r ${btn.color} hover:brightness-110 text-white border-0 shadow-lg disabled:opacity-50 rounded-xl font-semibold`}
                  >
                    {isActive ? (
                      <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                    ) : isComplete ? (
                      <><CheckCircle className="w-5 h-5 mr-2" />Done!</>
                    ) : (
                      <><Icon className="w-5 h-5 mr-2" />{btn.label}</>
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {(project.status === "adapted" || project.status === "simulated") && (
            <div className="flex gap-3 mb-8">
              <motion.div whileHover={{ x: 4 }}>
                <Button variant="outline" className="border-2 rounded-xl" onClick={() => router.push(`/projects/${id}/adapt`)}>
                  View Adaptations
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
              {project.status === "simulated" && (
                <motion.div whileHover={{ x: 4 }}>
                  <Button variant="outline" className="border-2 rounded-xl" onClick={() => router.push(`/projects/${id}/results`)}>
                    View Results
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              )}
            </div>
          )}

          <AnimatePresence>
            {isProcessing && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <Card className="mb-8 border-2 border-indigo-200 bg-indigo-50/50">
                  <CardContent className="pt-6">
                    <LoadingSpinner
                      message={
                        analyzing ? "🔍 Analyzing persuasion patterns with AI..." :
                        adapting ? "🌐 Generating cultural adaptations using Hofstede dimensions..." :
                        "📊 Running A/B simulation across markets..."
                      }
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <Separator className="mb-8" />

          <h3 className="text-xl font-semibold mb-4">Copy Strings</h3>
          <div className="space-y-4">
            {project.copy_strings?.map((cs, index) => {
              const persuasionStyle = getPersuasionStyle(cs.persuasion_category);
              return (
                <motion.div
                  key={cs.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <TiltCard tiltAmount={5}>
                    <Card className="border-2 hover:shadow-md transition-shadow overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="font-medium">{cs.string_type}</Badge>
                          {cs.persuasion_category && (
                            <Badge className={`${persuasionStyle.bg} ${persuasionStyle.text} border ${persuasionStyle.border}`}>
                              {cs.persuasion_category}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-medium mb-1">{cs.content}</p>

                        {cs.adaptations && cs.adaptations.length > 0 && (
                          <div className="mt-4 space-y-3">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cultural Adaptations</p>
                            {cs.adaptations.map((a) => (
                              <motion.div
                                key={a.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="rounded-xl p-3 bg-gradient-to-r from-muted/50 to-muted/30 border"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-lg">{getFlag(a.locale)}</span>
                                  <span className="text-sm font-semibold">{getCountryName(a.locale)}</span>
                                </div>
                                <p className="text-sm font-medium">{a.content}</p>
                                <p className="text-xs text-muted-foreground mt-2 italic">{a.cultural_reasoning}</p>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          <LingoBadge />
        </motion.div>
      </main>
    </div>
  );
}
