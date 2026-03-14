import { HOFSTEDE_DATA } from "./hofstede";
import { generateJSON } from "@/lib/gemini";

export interface SimulationResult {
  locale: string;
  variant_label: string;
  simulated_visitors: number;
  simulated_conversions: number;
  conversion_rate: number;
  confidence_level: number;
  is_winner: boolean;
  insight: string;
}

function simulateConversion(
  baseRate: number,
  culturalBoost: number,
  visitors: number
): { conversions: number; rate: number } {
  const adjustedRate = Math.min(Math.max(baseRate + culturalBoost, 0.005), 0.25);
  const noise = (Math.random() - 0.5) * 0.01;
  const finalRate = Math.max(adjustedRate + noise, 0.001);
  const conversions = Math.round(visitors * finalRate);
  return { conversions, rate: conversions / visitors };
}

function calculateCulturalBoost(sourceLocale: string, targetLocale: string): number {
  const source = HOFSTEDE_DATA[sourceLocale];
  const target = HOFSTEDE_DATA[targetLocale];
  if (!source || !target) return 0;

  let totalGap = 0;
  totalGap += Math.abs(target.individualism - source.individualism);
  totalGap += Math.abs(target.uncertainty_avoidance - source.uncertainty_avoidance);
  totalGap += Math.abs(target.power_distance - source.power_distance);
  totalGap += Math.abs(target.masculinity - source.masculinity);
  totalGap += Math.abs(target.long_term_orientation - source.long_term_orientation);
  totalGap += Math.abs(target.indulgence - source.indulgence);

  return (totalGap / 600) * 0.06;
}

export async function runSimulation(
  projectId: string,
  sourceLocale: string,
  targetLocales: string[],
  visitorsPerVariant: number = 10000
): Promise<SimulationResult[]> {
  const results: SimulationResult[] = [];
  const baseConversionRate = 0.032;

  for (const locale of targetLocales) {
    const culturalBoost = calculateCulturalBoost(sourceLocale, locale);

    const literal = simulateConversion(baseConversionRate, 0, visitorsPerVariant);
    results.push({
      locale,
      variant_label: "literal_translation",
      simulated_visitors: visitorsPerVariant,
      simulated_conversions: literal.conversions,
      conversion_rate: literal.rate,
      confidence_level: 0.95,
      is_winner: false,
      insight: "",
    });

    const adapted = simulateConversion(baseConversionRate, culturalBoost, visitorsPerVariant);
    results.push({
      locale,
      variant_label: "culturally_adapted",
      simulated_visitors: visitorsPerVariant,
      simulated_conversions: adapted.conversions,
      conversion_rate: adapted.rate,
      confidence_level: 0.95,
      is_winner: true,
      insight: "",
    });
  }

  const insightPrompt = `You are a conversion rate optimization expert with deep knowledge of cultural psychology.

Given these A/B test simulation results, write a brief insight (2-3 sentences) for each locale explaining WHY the culturally adapted variant performed better, referencing specific Hofstede dimensions.

Results:
${results.map((r) => `- Locale: ${r.locale}, Variant: ${r.variant_label}, Rate: ${(r.conversion_rate * 100).toFixed(2)}%`).join("\n")}

Hofstede data:
${targetLocales.map((l) => `- ${l}: ${JSON.stringify(HOFSTEDE_DATA[l])}`).join("\n")}

Source (en): ${JSON.stringify(HOFSTEDE_DATA["en"])}

Return JSON array:
[
  {
    "locale": "locale_code",
    "literal_insight": "insight for literal translation",
    "adapted_insight": "insight for culturally adapted"
  }
]`;

  const insights = await generateJSON<
    Array<{
      locale: string;
      literal_insight: string;
      adapted_insight: string;
    }>
  >(insightPrompt);

  for (const result of results) {
    const localeInsight = insights.find((i) => i.locale === result.locale);
    if (localeInsight) {
      result.insight =
        result.variant_label === "literal_translation"
          ? localeInsight.literal_insight
          : localeInsight.adapted_insight;
    }
  }

  return results;
}
