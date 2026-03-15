import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, name, description, source_locale, target_locales, status")
    .eq("id", id)
    .single();

  if (projectError || !project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (project.status !== "simulated") {
    return NextResponse.json({ error: "Results not available" }, { status: 404 });
  }

  const { data: results } = await supabase
    .from("simulation_results")
    .select("locale, variant_label, simulated_visitors, simulated_conversions, conversion_rate, is_winner, insight")
    .eq("project_id", id);

  return NextResponse.json({
    project: {
      name: project.name,
      description: project.description,
      source_locale: project.source_locale,
      target_locales: project.target_locales,
    },
    results: results || [],
  });
}
