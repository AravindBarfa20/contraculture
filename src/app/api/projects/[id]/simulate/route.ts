import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { runSimulation } from "@/lib/cultural/simulator";

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
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  try {
    await supabase
      .from("simulation_results")
      .delete()
      .eq("project_id", id);

    const results = await runSimulation(
      id,
      project.source_locale,
      project.target_locales
    );

    const toInsert = results.map((r) => ({
      project_id: id,
      locale: r.locale,
      variant_label: r.variant_label,
      simulated_visitors: r.simulated_visitors,
      simulated_conversions: r.simulated_conversions,
      conversion_rate: r.conversion_rate,
      confidence_level: r.confidence_level,
      is_winner: r.is_winner,
      insight: r.insight,
    }));

    await supabase.from("simulation_results").insert(toInsert);

    await supabase
      .from("projects")
      .update({ status: "simulated" })
      .eq("id", id);

    return NextResponse.json({ results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Simulation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
