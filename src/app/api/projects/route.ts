import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { validateProjectInput, checkRateLimit } from "@/lib/security";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*, copy_strings(id)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const formatted = projects.map((p: Record<string, unknown>) => ({
    ...p,
    _count: {
      copy_strings: Array.isArray(p.copy_strings) ? p.copy_strings.length : 0,
    },
    copy_strings: undefined,
  }));

  return NextResponse.json({ projects: formatted });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!checkRateLimit(user.id, 10, 60000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { name, description, target_locales, copy_strings } = body;

  const validationError = validateProjectInput(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  if (!name || !target_locales?.length || !copy_strings?.length) {
    return NextResponse.json(
      { error: "Name, target locales, and at least one copy string are required" },
      { status: 400 }
    );
  }

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      name: name.trim(),
      description: (description || "").trim(),
      target_locales,
      source_locale: "en",
      status: "draft",
    })
    .select()
    .single();

  if (projectError) {
    return NextResponse.json({ error: projectError.message }, { status: 500 });
  }

  const stringsToInsert = copy_strings.map(
    (s: { string_key: string; content: string; string_type: string; sort_order: number }) => ({
      project_id: project.id,
      string_key: s.string_key,
      content: s.content.trim(),
      string_type: s.string_type,
      sort_order: s.sort_order,
    })
  );

  const { data: insertedStrings, error: stringsError } = await supabase
    .from("copy_strings")
    .insert(stringsToInsert)
    .select();

  if (stringsError) {
    return NextResponse.json({ error: stringsError.message }, { status: 500 });
  }

  return NextResponse.json(
    { project: { ...project, copy_strings: insertedStrings } },
    { status: 201 }
  );
}
