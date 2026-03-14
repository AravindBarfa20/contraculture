# 🌍 ContraCulture

**Translation ≠ Conversion**

ContraCulture is an AI-powered product that helps companies expand globally by adapting copy to different cultures, not just translating words. It analyzes persuasion patterns in landing page copy, rewrites messaging for different markets using Hofstede’s cultural psychology framework, and simulates conversion lift across regions like Japan, Germany, and Brazil.

Built for the **Lingo.dev Invite-Only Hackathon**.

---

## Problem

Most companies localize by translating text literally.

That works for language, but not for persuasion.

A headline like **"Take control of your projects"** can work in the US and underperform in Japan because the underlying message is culturally individualistic. Translation preserves words. It does not preserve conversion.

ContraCulture solves that gap.

---

## What ContraCulture Does

### 1. Analyze persuasion
It reads your landing page copy and classifies the persuasion style behind it:
- individualist
- collectivist
- authority
- scarcity
- social proof
- uncertainty-reducing
- achievement
- indulgence
- restraint

### 2. Culturally adapt copy
It rewrites the copy for each target market using **Hofstede’s 6 cultural dimensions**:
- Power Distance
- Individualism
- Masculinity
- Uncertainty Avoidance
- Long-Term Orientation
- Indulgence

### 3. Simulate conversion lift
It compares:
- literal translation
- culturally adapted copy

and shows predicted conversion improvement by market.

---

## Key Features

- Premium landing page with advanced motion and interaction design
- Authentication with Supabase
- Project creation flow for landing page copy
- Persuasion analysis using AI
- Cultural adaptation engine using Hofstede dimensions
- A/B simulation dashboard with charts and insights
- Country-by-country adaptation views
- Multilingual app UI
- Dark mode
- Premium dashboard UI with animated interactions

---

## Powered by Lingo.dev

ContraCulture is not just mentioning Lingo.dev — it uses it structurally.

### Lingo.dev CLI
Used to generate multilingual locale files for the app UI.

### Lingo.dev MCP
Configured for AI coding agents through `.cursor/mcp.json`.

### Lingo.dev CI/CD
GitHub Action is set up to keep translations synced automatically.

### Lingo.dev Compiler
Integrated in the Next.js build path for build-time i18n workflow.

---

## Tech Stack

- **Next.js 16**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Framer Motion**
- **Supabase**
- **Groq**
- **Recharts**
- **Lingo.dev**

---

## How It Works

1. Create a project
2. Add English landing page copy
3. Choose target markets
4. Analyze persuasion style
5. Generate cultural adaptations
6. Simulate conversion outcomes
7. Compare results across countries

---

## Example Use Case

Original English:
> Take control of your projects. Work smarter, not harder.

Culturally adapted for Japan:
> チームと共にプロジェクトを成功へ導きましょう。スマートに仕事をしましょう。

The wording shifts from individual control to collaborative success, matching cultural expectations more closely.

---

## Local Setup

```bash
pnpm install
pnpm dev
```

Create `.env.local` using `.env.example`.

---

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GROQ_API_KEY`
- `LINGODOTDEV_API_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_APP_NAME`

---

## Current Status

This is the public registration version of ContraCulture.

Next steps:
- final deployment
- demo video
- submission polish
- additional product refinements

---

## Why This Matters

Global expansion fails when teams assume translation is enough.

ContraCulture helps startups localize for **conversion**, not just **comprehension**.

---

## Author

Built by **Aravind**  
GitHub: [@AravindBarfa20](https://github.com/AravindBarfa20)

