import { generateJSON } from "@/lib/gemini";
import { HOFSTEDE_DATA, getHofstedeGap } from "./hofstede";
import { getCountryName } from "@/lib/utils";

interface CulturalAdaptation {
  copy_string_id: string;
  locale: string;
  variant_label: string;
  content: string;
  cultural_reasoning: string;
  hofstede_alignment: Record<string, number>;
}

export async function generateAdaptations(
  strings: Array<{
    id: string;
    content: string;
    string_type: string;
    persuasion_category: string | null;
  }>,
  sourceLocale: string,
  targetLocale: string
): Promise<CulturalAdaptation[]> {
  const sourceCountry = getCountryName(sourceLocale);
  const targetCountry = getCountryName(targetLocale);
  const sourceScores = HOFSTEDE_DATA[sourceLocale];
  const targetScores = HOFSTEDE_DATA[targetLocale];
  const gap = getHofstedeGap(sourceLocale, targetLocale);

  const langMap: Record<string, string> = {
    ja: "Japanese (日本語)",
    de: "German (Deutsch)",
    "pt-BR": "Brazilian Portuguese (Português)",
    fr: "French (Français)",
    es: "Spanish (Español)",
  };
  const targetLang = langMap[targetLocale] || targetLocale;

  const exampleMap: Record<string, { original: string; adapted: string }> = {
    ja: {
      original: "Take control of your projects.",
      adapted: "チームと共にプロジェクトを成功へ導きましょう。",
    },
    de: {
      original: "Start your free trial today!",
      adapted: "Starten Sie jetzt Ihre kostenlose Testphase – sicher und unverbindlich.",
    },
    "pt-BR": {
      original: "Join 10,000+ teams worldwide.",
      adapted: "Junte-se a mais de 10.000 equipes que confiam em nossa solução.",
    },
    fr: {
      original: "Work smarter, not harder.",
      adapted: "Travaillez plus intelligemment, ensemble, pour des résultats durables.",
    },
    es: {
      original: "The only tool you need.",
      adapted: "La herramienta en la que su equipo puede confiar.",
    },
  };
  const example = exampleMap[targetLocale] || exampleMap["de"];

  const prompt = `You are a cultural marketing copywriter. Your job is to REWRITE English marketing copy into ${targetLang} using cultural adaptation based on Hofstede dimensions.

SOURCE: ${sourceCountry} (IDV=${sourceScores.individualism}, UAI=${sourceScores.uncertainty_avoidance}, PDI=${sourceScores.power_distance}, MAS=${sourceScores.masculinity}, LTO=${sourceScores.long_term_orientation}, IVR=${sourceScores.indulgence})
TARGET: ${targetCountry} (IDV=${targetScores.individualism}, UAI=${targetScores.uncertainty_avoidance}, PDI=${targetScores.power_distance}, MAS=${targetScores.masculinity}, LTO=${targetScores.long_term_orientation}, IVR=${targetScores.indulgence})

EXAMPLE of what I expect:
Original English: "${example.original}"
Adapted ${targetLang}: "${example.adapted}"

ABSOLUTE RULES:
1. The "content" field MUST be written ENTIRELY in ${targetLang}. Not English. If the target is Japanese, write in Japanese characters. If German, write in German. No exceptions.
2. The "content" field must contain ONLY the marketing copy. No explanation. No reasoning. Just the adapted slogan/headline/CTA in ${targetLang}.
3. The "cultural_reasoning" field must be 1-2 sentences in English explaining your adaptation choices.
4. NEVER put English text or reasoning in the "content" field.
5. Keep adapted copy similar length to original.

Adapt these strings:
${strings.map((s) => `ID: "${s.id}" | Type: ${s.string_type} | English: "${s.content}"`).join("\n")}

Return JSON array:
[
  {
    "copy_string_id": "id",
    "locale": "${targetLocale}",
    "variant_label": "culturally_adapted",
    "content": "ADAPTED COPY IN ${targetLang} ONLY - NO ENGLISH",
    "cultural_reasoning": "English explanation of adaptation choices",
    "hofstede_alignment": {"power_distance":${targetScores.power_distance},"individualism":${targetScores.individualism},"masculinity":${targetScores.masculinity},"uncertainty_avoidance":${targetScores.uncertainty_avoidance},"long_term_orientation":${targetScores.long_term_orientation},"indulgence":${targetScores.indulgence}}
  }
]`;

  return generateJSON<CulturalAdaptation[]>(prompt);
}
