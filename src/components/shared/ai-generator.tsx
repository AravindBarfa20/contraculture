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
    <Card className="border-2 border-dashed border-purple-300 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 overflow-hidden">
      <CardHeader className="pb-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">AI Copy Generator</CardTitle>
              <CardDescription className="text-xs">Describe your product and AI writes the copy</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="border-purple-300 text-purple-600 bg-purple-50">
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
              <div className="space-y-2">
                <Label>Describe your product</Label>
                <Textarea
                  placeholder="e.g., A project management tool for remote teams that uses AI to automate task assignment..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Industry (optional)</Label>
                  <Input
                    placeholder="e.g., SaaS, E-commerce"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Target Audience (optional)</Label>
                  <Input
                    placeholder="e.g., Startup founders"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generating || !description.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 rounded-xl"
              >
                {generating ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
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
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Generated Copy</p>

                  {[
                    { label: "Headline", value: generated.headline },
                    { label: "Subheadline", value: generated.subheadline },
                    { label: "CTA", value: generated.cta },
                    { label: "Value Prop", value: generated.value_prop },
                    { label: "Social Proof", value: generated.social_proof },
                  ].map((item) => (
                    <div key={item.label} className="bg-white dark:bg-gray-900 rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  ))}

                  <Button
                    onClick={handleUse}
                    className="w-full bg-green-600 hover:bg-green-700 text-white border-0 rounded-xl"
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
