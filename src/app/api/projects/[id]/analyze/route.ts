import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { analyzePersuasion } from "@/lib/cultural/persuasion";

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
    const analysis = await analyzePersuasion(
      project.copy_strings.map((s: { id: string; content: string; string_type: string }) => ({
        id: s.id,
        content: s.content,
        string_type: s.string_type,
      }))
    );

    for (const item of analysis) {
      await supabase
        .from("copy_strings")
        .update({
          persuasion_category: item.persuasion_category,
          persuasion_scores: item.persuasion_scores,
        })
        .eq("id", item.copy_string_id);
    }

    await supabase
      .from("projects")
      .update({ status: "analyzed" })
      .eq("id", id);

    return NextResponse.json({ analysis });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
