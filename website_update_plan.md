# Website Update Plan

## Stories Backlog

Organized by priority and dependency. Each story is independent and can be implemented/reviewed separately.

---

### Phase 1: Critical Updates (Core Identity)

#### Story 1: Update Location ✅ DECIDED
**Current:** Paris, France | Rio de Janeiro, Brazil
**Target:** Rio de Janeiro, Brazil (only)

**Headline:** Keep "PM who likes to code" — validated by recruiter feedback, stays authentic.

**Files:** `content/_index.md`
**Effort:** Small

---

#### Story 2: Add Stone Co as Current Role
**Current:** iBanFirst shown as current role
**Target:** Stone Co (Ton brand) as primary current role

**Content to add:**
- Product Manager at Stone Co (Ton brand)
- Rio de Janeiro, Brazil (June 2025 - Present)
- Leading Product Journeys squad
- Building credit cards, Pix, investments, and financial products
- Stone: NYSE-listed, one of Brazil's largest fintechs

**Files:** `content/_index.md`
**Effort:** Small

---

#### Story 3: Add Product Heroes Instructor Role
**Current:** Not mentioned
**Target:** Show as second current role

**Content to add:**
- Guest Instructor at Product Heroes
- Teaching "AI per Product Builder" masterclass
- Italy's largest PM community (9,000+ members)
- Curriculum: AI-powered development, API integration, MVP building

**Files:** `content/_index.md`
**Effort:** Small

---

#### Story 4: Move iBanFirst to "Previously" Section
**Current:** iBanFirst shown as current/primary role
**Target:** iBanFirst in a "Previously" section with dates

**Content:**
- Product Manager at iBanFirst (Sept 2022 - May 2025)
- Paris, France
- Led client experience for B2B cross-border payment platform
- Scope: UX/UI, Open Finance, Authentication, FX

**Files:** `content/_index.md`
**Effort:** Small
**Depends on:** Story 2

---

### Phase 2: Content Additions

#### Story 5: Add Product Heroes Masterclass to Projects
**Current:** Projects page has 4 projects (Flappy Chouette, AutoTranslator, PoissonBlanc, Bulk Payment)
**Target:** Add AI per Product Builder masterclass as a project/achievement

**Content to add:**
- AI per Product Builder (Masterclass)
- Guest instructor at Product Heroes
- 4-module curriculum (16 hours)
- Topics: Design/Frontend, Backend, API Integration, AI Services
- Tools taught: Lovable, Cursor, Claude, Supabase
- Link to course page

**Files:** `content/_projects.md`
**Effort:** Medium

---

#### Story 6: Add Student Testimonials Section
**Current:** No testimonials
**Target:** Show 2-3 student quotes on Projects or dedicated section

**Content available:**
- Marco Baldonero (Product Owner @ Opyn)
- Irene Romanello (Product Manager @ Fiscozen)
- Laura Serafin (Designer @ MUGO)
- Luca de Franceschi (Senior PM @ Intento)

**Files:** `content/_projects.md` or new section
**Effort:** Medium
**Depends on:** Story 5

---

#### Story 7: Create Teaching/Speaking Section
**Current:** Talks section exists but removed from navigation
**Target:** Repurpose as Teaching & Speaking with updated content

**Content:**
- AI per Product Builder — Product Heroes (2025)
- How AI is Changing Product Management — iBanFirst keynote
- Any other talks/presentations

**Files:** `content/_speaking.md` (rename/update), `config.toml` (add to nav)
**Effort:** Medium

---

### Phase 3: Refinements

#### Story 8: Update Toolbox Section
**Current:** Good tools shown but could add teaching-specific tools
**Target:** Potentially add Lovable, Supabase, v0.dev (tools you teach)

**Files:** `content/_index.md`, potentially new images in `static/images/tools/`
**Effort:** Small

---

#### Story 9: Strengthen Thesis Connection
**Current:** Thesis mentioned in Education section
**Target:** Add narrative connecting thesis (super-apps) to Stone work

**Content:**
- Add brief note: "Research on fintech super-apps now informs my work at Stone"
- Or highlight in Stone role description

**Files:** `content/_index.md`
**Effort:** Small

---

#### Story 10: Update CV Download Link
**Current:** Links to `012025-EN-CV_Vinicius_Saraiva_Andrade.pdf`
**Target:** Upload new CV with Stone role and Product Heroes, update link

**Files:** `content/_index.md`, new PDF in `static/files/`
**Effort:** Small (requires user to provide new CV)
**Note:** User action required — provide updated CV file

---

### Phase 4: Optional Enhancements

#### Story 11: Add Metrics to Roles
**Current:** No quantified impact
**Target:** Add at least one metric per major role

**Examples:**
- Stone: "Products serving X users" or "X Pix transactions"
- Product Heroes: "X students taught across Y cohorts"

**Files:** `content/_index.md`
**Effort:** Small
**Note:** User input required — provide numbers you can share

---

#### Story 12: Add GitHub Link
**Current:** No GitHub link
**Target:** Add GitHub to contact section (if public repos exist)

**Files:** `content/_index.md`
**Effort:** Small
**Note:** User action required — confirm GitHub username/repos to show

---

## Implementation Order

```
Story 1 (Location only — headline stays) ✅ DECIDED
    ↓
Story 2 (Add Stone Co)
    ↓
Story 3 (Add Product Heroes)
    ↓
Story 4 (Move iBanFirst to Previously)
    ↓
Story 5 (Masterclass on Projects page)
    ↓
Story 6 (Testimonials)
    ↓
Story 7 (Teaching/Speaking section)
    ↓
Stories 8-12 (Refinements — can be done in any order)
```

---

## Ready to Start

Let me know when you want to begin. We'll tackle Story 1 first, then proceed through the list. Each story can be reviewed and deployed independently.
