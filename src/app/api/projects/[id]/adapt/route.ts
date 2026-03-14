import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { generateAdaptations } from "@/lib/cultural/adapter";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: project } = await supabase
    .from("projects")
    .select("*, copy_strings(*)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  try {
    await supabase
      .from("adaptations")
      .delete()
      .in(
        "copy_string_id",
        project.copy_strings.map((s: { id: string }) => s.id)
      );

    await supabase
      .from("translations")
      .delete()
      .in(
        "copy_string_id",
        project.copy_strings.map((s: { id: string }) => s.id)
      );

    const allTranslations: Array<{ copy_string_id: string; locale: string; content: string }> = [];
    const allAdaptations: Array<{
      copy_string_id: string;
      locale: string;
      variant_label: string;
      content: string;
      cultural_reasoning: string;
      hofstede_alignment: Record<string, number>;
    }> = [];

    for (const locale of project.target_locales) {
      const adaptations = await generateAdaptations(
        project.copy_strings.map(
          (s: { id: string; content: string; string_type: string; persuasion_category: string | null }) => ({
            id: s.id,
            content: s.content,
            string_type: s.string_type,
            persuasion_category: s.persuasion_category,
          })
        ),
        project.source_locale,
        locale
      );

      for (const a of adaptations) {
        allTranslations.push({
          copy_string_id: a.copy_string_id,
          locale: a.locale,
          content: a.content,
        });
        allAdaptations.push(a);
      }
    }

    if (allTranslations.length > 0) {
      await supabase.from("translations").insert(allTranslations);
    }

    if (allAdaptations.length > 0) {
      await supabase.from("adaptations").insert(allAdaptations);
    }

    await supabase
      .from("projects")
      .update({ status: "adapted" })
      .eq("id", id);

    return NextResponse.json({ translations: allTranslations, adaptations: allAdaptations });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Adaptation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
