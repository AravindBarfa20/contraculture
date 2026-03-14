import { generateJSON } from "@/lib/gemini";

interface PersuasionAnalysis {
  copy_string_id: string;
  persuasion_category: string;
  persuasion_scores: Record<string, number>;
  explanation: string;
}

export async function analyzePersuasion(
  strings: Array<{ id: string; content: string; string_type: string }>
): Promise<PersuasionAnalysis[]> {
  const prompt = `You are a cultural psychology and marketing expert. Analyze each of the following copy strings and classify their persuasion pattern.

For each string, determine:
1. The PRIMARY persuasion category (one of: individualist, collectivist, authority, scarcity, social_proof, uncertainty_reducing, achievement, indulgent, restraint)
2. A score from 0.0 to 1.0 for each of these dimensions: individualism, collectivism, authority, scarcity, social_proof, uncertainty_reducing, achievement, indulgence
3. A brief explanation of why this category was assigned

Here are the strings to analyze:
${strings.map((s) => `- ID: "${s.id}" | Type: ${s.string_type} | Content: "${s.content}"`).join("\n")}

Return a JSON array with this exact structure:
[
  {
    "copy_string_id": "the id",
    "persuasion_category": "category_name",
    "persuasion_scores": {
      "individualism": 0.0,
      "collectivism": 0.0,
      "authority": 0.0,
      "scarcity": 0.0,
      "social_proof": 0.0,
      "uncertainty_reducing": 0.0,
      "achievement": 0.0,
      "indulgence": 0.0
    },
    "explanation": "brief explanation"
  }
]`;

  return generateJSON<PersuasionAnalysis[]>(prompt);
}
