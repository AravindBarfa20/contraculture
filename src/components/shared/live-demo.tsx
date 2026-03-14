"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

const demoData = [
  {
    locale: "🇯🇵",
    country: "Japan",
    original: "Start your free trial today!",
    adapted: "安心の無料トライアルをお試しください",
    category: "uncertainty-reducing",
    categoryColor: "bg-teal-100 text-teal-700 border-teal-200",
    insight: "Japan scores 92 on Uncertainty Avoidance. Added safety language (安心 = peace of mind) instead of urgency.",
    lift: "+47%",
  },
  {
    locale: "🇩🇪",
    country: "Germany",
    original: "Join 10,000+ happy customers!",
    adapted: "Von 10.000+ Unternehmen vertraut — nachweislich effizient",
    category: "authority",
    categoryColor: "bg-purple-100 text-purple-700 border-purple-200",
    insight: "Germany scores 83 on Long-Term Orientation. Replaced emotional 'happy' with factual 'proven efficient'.",
    lift: "+32%",
  },
  {
    locale: "🇧🇷",
    country: "Brazil",
    original: "The #1 tool for professionals",
    adapted: "A ferramenta que sua equipe pode confiar — juntos, vamos mais longe",
    category: "collectivist",
    categoryColor: "bg-green-100 text-green-700 border-green-200",
    insight: "Brazil scores 38 on Individualism. Shifted from '#1 for you' to 'together we go further'.",
    lift: "+41%",
  },
];

export function LiveDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = demoData[activeIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center gap-3 mb-8">
        {demoData.map((item, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer
              ${i === activeIndex
                ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10"
                : "border-border hover:border-blue-300"
              }
            `}
          >
            <span className="text-xl">{item.locale}</span>
            <span>{item.country}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="overflow-hidden border-2">
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x">
              <div className="md:col-span-5 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">🇺🇸</span>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Original (English)</p>
                </div>
                <p className="text-lg font-medium mb-4">&ldquo;{active.original}&rdquo;</p>
                <Badge variant="outline" className="text-xs">individualist</Badge>
              </div>

              <div className="md:col-span-1 flex items-center justify-center py-4 md:py-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="md:col-span-4 p-6 bg-gradient-to-br from-green-50/50 to-green-100/30">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">{active.locale}</span>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Culturally Adapted</p>
                </div>
                <p className="text-lg font-medium mb-4">&ldquo;{active.adapted}&rdquo;</p>
                <Badge className={`text-xs border ${active.categoryColor}`}>{active.category}</Badge>
              </div>

              <div className="md:col-span-2 p-6 flex flex-col items-center justify-center bg-green-50">
                <p className="text-3xl font-bold text-green-600">{active.lift}</p>
                <p className="text-xs text-muted-foreground text-center">conversion lift</p>
              </div>
            </div>

            <div className="px-6 py-4 bg-muted/30 border-t">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">💡 Why:</span> {active.insight}
              </p>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
