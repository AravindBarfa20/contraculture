import { NextResponse } from "next/server";
import { runSimulation } from "@/lib/cultural/simulator";

export async function POST(request: Request) {
  try {
    const { project_id, source_locale, target_locales } = await request.json();

    if (!source_locale || !target_locales) {
      return NextResponse.json({ error: "source_locale and target_locales are required" }, { status: 400 });
    }

    const results = await runSimulation(
      project_id || "local",
      source_locale,
      target_locales
    );

    return NextResponse.json({ results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Simulation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
