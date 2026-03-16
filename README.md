# 🌍 ContraCulture — Translation ≠ Conversion

[![Built for Lingo.dev Hackathon](https://img.shields.io/badge/Built%20for-Lingo.dev%20Hackathon-6366f1?style=for-the-badge)](https://lingo.dev)
[![Powered by Lingo.dev](https://img.shields.io/badge/Powered%20by-Lingo.dev-22c55e?style=for-the-badge)](https://lingo.dev)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge)](https://nextjs.org)

🔗 **Live Demo:** [https://contraculture.vercel.app]

> **"Start your free trial"** converts at 12% in the US but only 2% in Japan. Why? Because individualist framing fails in collectivist cultures. **Translation preserves words. Cultural adaptation preserves conversion.**

---

## Demo Video

[Watch the demo on YouTube](https://youtu.be/L7NuoBxS6MA)

## What is ContraCulture?

ContraCulture is an AI-powered cultural adaptation engine that rewrites your landing page copy for each target market using **Hofstede's cultural psychology framework** — not just translating words, but transforming the persuasion strategy.

**Input:** Your English landing page copy + target markets

**Output:** Culturally adapted copy + predicted conversion lift + shareable results

---

## Key Features

| Feature | Description |
|---|---|
| Persuasion Analysis | AI classifies each copy string by persuasion pattern (individualist, collectivist, authority, scarcity, etc.) |
| Cultural Adaptation | Rewrites copy using Hofstede's 6 dimensions for each target culture |
| A/B Simulation | Predicts conversion rates: literal translation vs. culturally adapted |
| Live Preview | See your landing page rendered with adapted copy, switchable by locale |
| Comparison Matrix | All copy strings across all locales in one grid view |
| AI Copy Generator | Describe your product and AI writes the landing page copy for you |
| ROI Calculator | Convert conversion lift into estimated annual revenue impact |
| Export and Share | Export as JSON/CSV, copy to clipboard, shareable public results page |
| Dark Mode | Full dark/light theme support |
| Multilingual UI | App itself available in 6 languages (EN, JA, DE, PT-BR, FR, ES) |
| Cultural Tips | Actionable copywriting advice per target market |
| Readiness Scores | Visual cultural readiness grade per market |

---

## Lingo.dev Integration (4 Tools)

This project uses all four Lingo.dev tools as load-bearing infrastructure:

| Tool | How It Is Used |
|---|---|
| CLI | npx lingo.dev@latest run generates all 6 locale files for the app UI |
| CI/CD | GitHub Action auto-syncs translations on every push to i18n/en.json |
| MCP | .cursor/mcp.json configured for AI coding agent context in Cursor IDE |
| Compiler | Integrated in next.config.ts for build-time i18n injection |

Lingo.dev is not a feature. It is the engine. Remove it and the multilingual UI breaks.

---

## The Science: Hofstede's 6 Cultural Dimensions

| Dimension | What It Measures | Copy Impact |
|---|---|---|
| Power Distance | Acceptance of hierarchy | High = reference authority/experts |
| Individualism | I vs We orientation | Low = use collective framing |
| Masculinity | Competition vs cooperation | High = achievement language |
| Uncertainty Avoidance | Need for safety/structure | High = add guarantees/trust signals |
| Long-Term Orientation | Planning horizon | High = emphasize lasting value |
| Indulgence | Emotional expression | Low = practical over emotional |

---

## Demo Flow

1. Create project using SaaS template or AI generator
2. Select target markets (Japan, Germany, Brazil, France, Spain)
3. Click Analyze Persuasion to see persuasion badges appear
4. Click Generate Cultural Adaptations to see adapted copy
5. Click Preview Landing Page to switch between US and Japan versions
6. Click Simulate A/B Test to see confetti and conversion lift
7. View ROI Calculator to see estimated revenue impact
8. Share results via public URL anyone can view
9. Switch app language to see entire UI in Japanese

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack framework (App Router, RSC) |
| TypeScript | Type safety |
| Tailwind CSS + shadcn/ui | Premium UI components |
| Framer Motion | Animations, transitions, interactions |
| Supabase | Auth + PostgreSQL + RLS |
| Groq (Llama 3.3 70B) | AI for analysis, adaptation, insights |
| Recharts | Data visualization |
| Lingo.dev | i18n automation (CLI, CI/CD, MCP, Compiler) |
| Vercel | Deployment |

---

## Quick Start

```bash
git clone https://github.com/AravindBarfa20/Contraculture.git
cd Contraculture
pnpm install
cp .env.example .env.local
pnpm dev
```

Fill in your API keys in .env.local before running.

---

## Results Example

| Market | Literal Translation | Culturally Adapted | Lift |
|---|---|---|---|
| Japan | 3.2% | 5.0% | +47% |
| Germany | 3.5% | 4.5% | +32% |
| Brazil | 3.3% | 4.8% | +41% |

---

## Security

- Supabase RLS policies on all tables
- Auth validation on every API route
- Input validation with length limits
- Rate limiting per user
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- No secrets in client bundle

---

## Project Structure

```
src/
  app/              Next.js App Router pages + API routes
  components/       UI components (shared, layout, analysis)
  hooks/            Custom React hooks
  lib/              Utilities, Supabase clients, AI, cultural data
  types/            TypeScript interfaces
i18n/               Lingo.dev generated locale files (6 languages)
.cursor/            Lingo.dev MCP config
.github/workflows/  Lingo.dev CI/CD action
```

---

## Why This Wins

1. Originality: No one combines cultural psychology + CRO + i18n. This is a 3-domain intersection.
2. Real-World Utility: Every SaaS company expanding internationally has this problem.
3. Lingo.dev Depth: Uses all 4 tools as structural infrastructure, not decoration.
4. Demo Impact: Live preview, confetti, ROI calculator, shareable results.
5. Polish: 70+ motion effects, dark mode, premium UI, shimmer loaders, 3D tilt cards.

---

## License

MIT

## Author

Built by [Aravind](https://github.com/AravindBarfa20) for the Lingo.dev Invite-Only Hackathon
