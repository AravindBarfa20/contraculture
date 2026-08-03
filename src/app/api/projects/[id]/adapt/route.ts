import { NextResponse } from "next/server";
import { generateAdaptations } from "@/lib/cultural/adapter";

export async function POST(request: Request) {
  try {
    const { copy_strings, source_locale, target_locales } = await request.json();

    if (!copy_strings || !source_locale || !target_locales) {
      return NextResponse.json({ error: "copy_strings, source_locale, and target_locales are required" }, { status: 400 });
    }

    const allAdaptations: Array<{
      copy_string_id: string;
      locale: string;
      variant_label: string;
      content: string;
      cultural_reasoning: string;
      hofstede_alignment: Record<string, number>;
    }> = [];

    for (const locale of target_locales) {
      const adaptations = await generateAdaptations(
        copy_strings.map(
          (s: { id: string; content: string; string_type: string; persuasion_category: string | null }) => ({
            id: s.id,
            content: s.content,
            string_type: s.string_type,
            persuasion_category: s.persuasion_category,
          })
        ),
        source_locale,
        locale
      );

      for (const a of adaptations) {
        allAdaptations.push(a);
      }
    }

    return NextResponse.json({ adaptations: allAdaptations });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Adaptation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
