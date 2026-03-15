import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateJSON } from "@/lib/gemini";

interface GeneratedCopy {
  headline: string;
  subheadline: string;
  cta: string;
  value_prop: string;
  social_proof: string;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productDescription, industry, targetAudience } = await request.json();

  if (!productDescription) {
    return NextResponse.json({ error: "Product description is required" }, { status: 400 });
  }

  try {
    const prompt = `You are a world-class SaaS copywriter. Generate landing page copy for this product.

Product: ${productDescription}
Industry: ${industry || "SaaS"}
Target Audience: ${targetAudience || "Business professionals"}

Generate exactly 5 copy strings. Write compelling, conversion-focused English copy.

Return JSON:
{
  "headline": "A bold, attention-grabbing headline (max 15 words)",
  "subheadline": "Supporting text with a specific stat or proof point (max 25 words)",
  "cta": "A clear call-to-action button text (max 10 words)",
  "value_prop": "One sentence explaining the unique value (max 20 words)",
  "social_proof": "A trust/credibility statement (max 20 words)"
}`;

    const result = await generateJSON<GeneratedCopy>(prompt);

    return NextResponse.json({ copy: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
