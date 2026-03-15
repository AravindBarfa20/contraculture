"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";
import { HOFSTEDE_DATA, type HofstedeScores } from "@/lib/cultural/hofstede";
import { getFlag, getCountryName } from "@/lib/utils";

function generateTips(locale: string): string[] {
  const data = HOFSTEDE_DATA[locale];
  const source = HOFSTEDE_DATA["en"];
  if (!data || !source) return [];

  const tips: string[] = [];

  if (data.individualism < source.individualism - 20) {
    tips.push("Use 'we' and 'together' instead of 'you' and 'your' in headlines");
  }
  if (data.individualism > source.individualism + 20) {
    tips.push("Emphasize personal achievement and individual benefits");
  }
  if (data.uncertainty_avoidance > source.uncertainty_avoidance + 20) {
    tips.push("Add guarantees, certifications, and trust badges prominently");
    tips.push("Include specific numbers and data points rather than vague claims");
  }
  if (data.power_distance > source.power_distance + 20) {
    tips.push("Reference expert endorsements and authority figures");
    tips.push("Use formal language and professional tone");
  }
  if (data.long_term_orientation > source.long_term_orientation + 20) {
    tips.push("Emphasize lasting value and long-term benefits over quick wins");
    tips.push("Highlight sustainability and tradition where relevant");
  }
  if (data.indulgence < source.indulgence - 20) {
    tips.push("Focus on practical benefits rather than emotional appeals");
    tips.push("Avoid overly enthusiastic or casual language");
  }
  if (data.masculinity > source.masculinity + 20) {
    tips.push("Use achievement-oriented and competitive language");
  }
  if (data.masculinity < source.masculinity - 20) {
    tips.push("Emphasize collaboration, quality of life, and work-life balance");
  }

  if (tips.length === 0) {
    tips.push("Cultural dimensions are similar — focus on natural language quality");
  }

  return tips;
}

interface CulturalTipsProps {
  locales: string[];
}

export function CulturalTips({ locales }: CulturalTipsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h4 className="font-bold text-base">Cultural Tips</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locales.map((locale, index) => {
          const tips = generateTips(locale);
          return (
            <motion.div
              key={locale}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-2 h-full bg-card/90 backdrop-blur-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{getFlag(locale)}</span>
                    <span className="font-semibold text-sm">{getCountryName(locale)}</span>
                  </div>
                  <ul className="space-y-2">
                    {tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs mt-0.5 shrink-0">
                          {i + 1}
                        </Badge>
                        <span className="text-xs text-muted-foreground leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
