import { NextResponse } from "next/server";
import { analyzePersuasion } from "@/lib/cultural/persuasion";

export async function POST(request: Request) {
  try {
    const { copy_strings } = await request.json();

    if (!copy_strings || !Array.isArray(copy_strings) || copy_strings.length === 0) {
      return NextResponse.json({ error: "copy_strings array is required" }, { status: 400 });
    }

    const analysis = await analyzePersuasion(
      copy_strings.map((s: { id: string; content: string; string_type: string }) => ({
        id: s.id,
        content: s.content,
        string_type: s.string_type,
      }))
    );

    return NextResponse.json({ analysis });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
