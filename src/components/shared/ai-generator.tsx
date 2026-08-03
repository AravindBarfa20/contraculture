"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Wand2, Sparkles } from "lucide-react";

interface GeneratedCopy {
  headline: string;
  subheadline: string;
  cta: string;
  value_prop: string;
  social_proof: string;
}

interface AIGeneratorProps {
  onGenerated: (copy: GeneratedCopy) => void;
}

export function AIGenerator({ onGenerated }: AIGeneratorProps) {
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [audience, setAudience] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedCopy | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setGenerating(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productDescription: description.trim(),
        industry: industry.trim() || undefined,
        targetAudience: audience.trim() || undefined,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setGenerated(data.copy);
    }

    setGenerating(false);
  };

  const handleUse = () => {
    if (generated) {
      onGenerated(generated);
      setExpanded(false);
    }
  };

  return (
    <Card className="border border-zinc-800 bg-zinc-950 overflow-hidden shadow-md">
      <CardHeader className="pb-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-sm">
              <Wand2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold font-mono text-white">AI_COPY_GENERATOR</CardTitle>
              <CardDescription className="text-xs text-zinc-400">Describe your product and AI writes the copy</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900 text-xs font-mono">
            {expanded ? "Collapse" : "Try it"}
          </Badge>
        </div>
      </CardHeader>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-mono text-zinc-300">PRODUCT_DESCRIPTION</Label>
                <Textarea
                  placeholder="e.g., A project management tool for remote teams that uses AI to automate task assignment..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="resize-none text-sm bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-mono text-zinc-300">INDUSTRY (OPTIONAL)</Label>
                  <Input
                    placeholder="e.g., SaaS, E-commerce"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="h-9 text-sm bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-mono text-zinc-300">TARGET_AUDIENCE (OPTIONAL)</Label>
                  <Input
                    placeholder="e.g., Startup founders"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="h-9 text-sm bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generating || !description.trim()}
                className="w-full bg-gradient-to-b from-zinc-100 to-zinc-300 hover:from-white hover:to-zinc-200 text-zinc-950 font-mono text-xs font-bold rounded-xl shadow-md border border-white/40"
              >
                {generating ? (
                  <motion.div
                    className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Copy with AI
                  </>
                )}
              </Button>

              {generated && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">GENERATED_COPY</p>

                  {[
                    { label: "Headline", value: generated.headline },
                    { label: "Subheadline", value: generated.subheadline },
                    { label: "CTA", value: generated.cta },
                    { label: "Value Prop", value: generated.value_prop },
                    { label: "Social Proof", value: generated.social_proof },
                  ].map((item) => (
                    <div key={item.label} className="bg-zinc-900 rounded-lg border border-zinc-800 p-3">
                      <p className="text-xs font-mono text-zinc-400 mb-1">{item.label}</p>
                      <p className="text-sm font-medium text-white">{item.value}</p>
                    </div>
                  ))}

                  <Button
                    onClick={handleUse}
                    className="w-full bg-white text-zinc-950 hover:bg-zinc-100 border-0 rounded-xl font-bold font-mono text-xs"
                  >
                    Use This Copy in Project
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
