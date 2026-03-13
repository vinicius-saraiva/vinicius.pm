# vinicius.pm v2 — Implementation Plan

## Stack

- **Next.js 15** (App Router, static export)
- **Tailwind CSS v4** (CSS variables for theme tokens)
- **Framer Motion** (scroll-triggered reveals only)
- **next-themes** (dark/light toggle, system preference)
- **Vercel** (deploy + custom domain vinicius.pm)
- **Mapbox GL** (student map visualization)

## Brand System

Reference files in `/brand-system/`. Key decisions:
- **Fonts:** Satoshi (headings), Inter (body), JetBrains Mono (mono/data)
- **Colors:** Electric blue `#4D6BFF` (Build/PM), warm gold `#E8C47C` (Teach/Speaking)
- **Style:** Sharp corners (0 border-radius everywhere), gap-borders, data-forward
- **Dark mode default**, light mode available via toggle
- **12-column grid overlay** visible as texture

## Pages

### Page 1: Home (`/`)

Sections in order:

1. **Nav** — Fixed, 56px. Wordmark `vinicius.pm` left (mono). Links: Work, Speaking, Contact (border CTA). Blur bg on scroll.

2. **Hero** — Full viewport height.
   - Location label: `— RIO DE JANEIRO` (mono, accent)
   - Headline: `Product Manager\nat Stone Co.` (Satoshi 64px/900)
   - Subtitle: `I teach product teams how to build with AI.` + `Guest instructor at Product Heroes · 60+ PMs trained.` (dimmer)
   - CTAs: "Get in Touch" (primary, accent bg) + "View Work →" (ghost)
   - Subtle accent glow (radial gradient, blurred)
   - Scroll indicator bottom-left

3. **Proof Bar** — Single row, border top/bottom. Mono 11px dim:
   `Stone Co (NYSE: STNE) · Product Heroes · Bocconi University · Dartmouth College · iBanFirst`

4. **What I Do** — Two cards side by side, gap-border:
   - **BUILD** card (accent/blue top-line): "Consumer Banking at Scale" — Stone/Ton, credit cards, Pix, investments. Tags: Fintech, Growth, Cards, Pix. Metric: `4M+ users`
   - **TEACH** card (warm/gold top-line): "AI for Product Teams" — Product Heroes masterclass, PMs/designers/founders. Tags: AI, Education, Workshops. Metric: `60+ PMs trained`

5. **Stats** — 4-column grid, heavy top border:
   - `4M+` Users Impacted (Stone · Ton)
   - `60+` PMs Trained (Product Heroes)
   - `$2B+` Company Value (NYSE: STNE)
   - `4` Countries (BR · IT · US · FR)

6. **Selected Work** — 3 numbered rows (see Work section for content). "View All →" link to /work.

7. **Social Proof** — Section label: `WHERE MY STUDENTS WORK`
   - Animated ticker with company names (CSS translateX, 25s loop, fade edges)
   - Student location map (Mapbox, dots on Italy/Europe/Brazil) — optional, can be on /speaking instead
   - `+40 more companies across Brazil, Europe, and the US`

8. **Speaking Preview** — Section label: `SPEAKING & TEACHING` (warm/gold)
   - Headline: `I teach from the inside.`
   - 3 topic cards: AI for Product Teams, Fintech Product Strategy, Growth in Consumer Banking

9. **CTA Footer** — Dark bg (even in light mode).
   - Headline: `Let's build\nsomething.`
   - Paragraph: Open to senior PM roles, corporate training, speaking. Rio de Janeiro, remote worldwide.
   - Contact rows: Email (accent), LinkedIn, Location
   - Copyright: `© 2026 · vinicius.pm`

### Page 2: Work (`/work`)

1. **Page Hero** — H1: `What I Build` + context paragraph about PM role
2. **Current Role** — Stone/Ton details, key outcomes
3. **Projects** — Expanded work rows:
   - Chrome Extension (Stone) — automated 1000+ monthly payments for client retention (keep vague, not public)
   - AI Localization Platform (iBanFirst) — reduced translation time weeks→hours, 10,000+ keys, enabled expansion to Poland/Greece
   - Bulk Payment Processor (iBanFirst) — POC that validated feature for dev team
   - AI per Product Builder (Product Heroes) — masterclass, 60+ PMs, 3 editions
4. **Career Timeline** — Horizontal: Stone → iBanFirst → Bocconi → Dartmouth

### Page 3: Speaking (`/speaking`)

1. **Page Hero** — H1: `Speaking & Teaching`
2. **Masterclass Detail** — Product Heroes card with stats, curriculum overview
3. **Topics** — 3 topic cards (reuse from home)
4. **Student Map** — Mapbox visualization with 61 student dots across 28 cities
5. **Talks Gallery** — YouTube embed (iBanFirst keynote), photos
6. **Availability CTA** — Contact rows

## Data Files

- `/data/student-locations.json` — 61 students, 28 cities, 3 editions (already created)
- Company names for ticker — TBD (need to extract from student data or collect manually)

## Project Structure

```
vinicius.pm-v2/
├── app/
│   ├── layout.tsx          ← fonts, theme provider, grid overlay, nav
│   ├── page.tsx            ← home
│   ├── work/page.tsx       ← work
│   └── speaking/page.tsx   ← speaking
├── components/
│   ├── nav.tsx
│   ├── section-label.tsx
│   ├── stat-grid.tsx
│   ├── work-row.tsx
│   ├── ticker.tsx
│   ├── topic-card.tsx
│   ├── contact-rows.tsx
│   ├── student-map.tsx
│   ├── grid-overlay.tsx
│   └── theme-toggle.tsx
├── styles/
│   └── globals.css         ← CSS variables, resets, ticker animation
├── data/
│   └── student-locations.json
├── public/
│   ├── files/              ← CV PDF, thesis PDF
│   ├── images/             ← photos, project screenshots
│   └── videos/             ← keynote excerpt
├── brand-system/           ← reference mockups (not deployed)
├── piano.md                ← strategy doc
├── IMPLEMENTATION.md       ← this file
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Implementation Order

### Phase 1: Scaffold + Home (priority)
1. `npx create-next-app` with TypeScript + Tailwind
2. Set up CSS variables (dark/light tokens from brand system)
3. Load fonts (Satoshi, Inter, JetBrains Mono)
4. Build layout.tsx (nav, grid overlay, theme provider)
5. Build home page sections top-to-bottom
6. Deploy to Vercel, test on vinicius.pm subdomain or preview URL

### Phase 2: Inner Pages
7. Build /work page
8. Build /speaking page with student map
9. Add Mapbox student map component

### Phase 3: Content + Polish
10. Migrate static assets (CV, thesis, photos, videos) from v1
11. Social proof ticker — populate with real company names
12. Scroll animations (Framer Motion)
13. Responsive breakpoints (mobile/tablet)
14. SEO meta tags, OG images

### Phase 4: Launch
15. Point vinicius.pm domain to new Vercel deploy
16. Keep v1 repo as archive

## Content to Prepare (user action needed)

- [ ] Updated CV PDF with Stone + Product Heroes
- [ ] List of companies where students work (for ticker)
- [ ] Confirm which Stone projects can be mentioned publicly
- [ ] Photo for hero section (optional — site works without one)
- [ ] Confirm email: v.saraiva.andrade@gmail.com or vinicius@pm.me?
