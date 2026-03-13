import { useState } from "react";

// ─── TOKENS ───────────────────────────────────────────────
const dark = {
  bg: "#08080A", surface: "#0F0F13", surfaceHover: "#151519",
  border: "#1E1E24", borderStrong: "#2A2A32",
  text: "#EDEDF0", textMuted: "#8B8B95", textDim: "#505058",
  accent: "#4D6BFF", accentHover: "#3B55E0", accentSoft: "rgba(77,107,255,0.08)", accentGlow: "rgba(77,107,255,0.15)",
  warm: "#E8C47C", warmHover: "#D4B06A", warmSoft: "rgba(232,196,124,0.08)",
  navBg: "rgba(8,8,10,0.85)", footerBg: "#08080A", footerText: "#EDEDF0", footerMuted: "#505058",
};
const light = {
  bg: "#FAFAF8", surface: "#FFFFFF", surfaceHover: "#F5F5F2",
  border: "#E6E4E0", borderStrong: "#C8C5BF",
  text: "#161614", textMuted: "#6B6964", textDim: "#A09D97",
  accent: "#3450DB", accentHover: "#2A3FB5", accentSoft: "rgba(52,80,219,0.06)", accentGlow: "rgba(52,80,219,0.08)",
  warm: "#B47A1A", warmHover: "#9A6815", warmSoft: "rgba(180,122,26,0.06)",
  navBg: "rgba(250,250,248,0.88)", footerBg: "#161614", footerText: "#EDEDF0", footerMuted: "#505058",
};

const fonts = {
  heading: { name: "Satoshi", stack: "'Satoshi', 'Inter', sans-serif", weights: [700, 800, 900], source: "fontshare.com (free)" },
  body: { name: "Inter", stack: "'Inter', 'Helvetica Neue', sans-serif", weights: [400, 500, 600], source: "Google Fonts (free)" },
  mono: { name: "JetBrains Mono", stack: "'JetBrains Mono', 'SF Mono', monospace", weights: [400, 500, 700], source: "Google Fonts (free)" },
};

const typeScale = [
  { name: "Display", size: "64px", weight: 900, lh: "1.0", ls: "-0.04em", font: "heading", usage: "Hero headline only" },
  { name: "H1", size: "48px", weight: 900, lh: "1.05", ls: "-0.04em", font: "heading", usage: "CTA sections, page titles" },
  { name: "H2", size: "32px", weight: 800, lh: "1.15", ls: "-0.03em", font: "heading", usage: "Section headings" },
  { name: "H3", size: "24px", weight: 800, lh: "1.2", ls: "-0.02em", font: "heading", usage: "Card titles, subsections" },
  { name: "H4", size: "18px", weight: 700, lh: "1.3", ls: "-0.01em", font: "heading", usage: "Work item titles" },
  { name: "Body L", size: "18px", weight: 400, lh: "1.6", ls: "0", font: "body", usage: "Hero subtitle, intro text" },
  { name: "Body", size: "14–15px", weight: 400, lh: "1.6", ls: "0", font: "body", usage: "Paragraphs, descriptions" },
  { name: "Caption", size: "13px", weight: 500, lh: "1.4", ls: "0", font: "body", usage: "Card descriptions, metadata" },
  { name: "Label", size: "11px", weight: 500, lh: "1", ls: "0.10em", font: "mono", usage: "Section labels, uppercase tags" },
  { name: "Data XL", size: "40px", weight: 900, lh: "1", ls: "-0.04em", font: "heading", usage: "Stat numbers" },
  { name: "Data", size: "20px", weight: 700, lh: "1", ls: "0", font: "mono", usage: "Card metrics, inline data" },
  { name: "Code", size: "12–13px", weight: 400, lh: "1.5", ls: "0.02em", font: "mono", usage: "Ticker, nav wordmark, footer" },
];

const components = [
  { name: "Nav Bar", specs: "Fixed, h-56px. Wordmark left (mono 14/500), links right (body 13/500). Border-bottom on scroll. Backdrop-blur in dark; solid bg in light. CTA link: accent border, mono 12.", dark: "bg: rgba(8,8,10,0.85) + blur(12px)", light: "bg: rgba(250,250,248,0.88) + blur(14px)" },
  { name: "Section Label", specs: "24px accent line + mono 11px uppercase, 0.10em tracking. Accent color for Build sections, warm color for Teach sections.", dark: "accent: #4D6BFF / warm: #E8C47C", light: "accent: #3450DB / warm: #B47A1A" },
  { name: "Card (Build/Teach)", specs: "Surface bg. 1px gap-border (no radius). 2px colored top-line (accent or warm). 40px padding. Tags: mono 10px in accentSoft/warmSoft bg.", dark: "bg: #0F0F13, border gap: #1E1E24", light: "bg: #FFFFFF, border gap: #E6E4E0" },
  { name: "Work Row", specs: "Grid: 48px (num) | 1fr (content) | auto (metric). Surface bg. 1px gap-border between rows. Num: mono 12 dim. Title: heading 18/700. Metric: mono 14/700 accent. Year: mono 10 dim.", dark: "bg: #0F0F13", light: "bg: #FFFFFF" },
  { name: "Stat Cell", specs: "In 4-col grid. 2px top border (borderStrong in dark, text in light). 32px padding. Value: heading 40/900 -0.04em. Label: mono 10 dim uppercase. Sub: body 12 muted.", dark: "top-border: #2A2A32", light: "top-border: #161614 (black)" },
  { name: "Ticker (Social)", specs: "Overflow hidden, CSS animation 25s linear infinite. Mono 13px muted. 4px square dots between names. Fade gradient on both edges (80px wide).", dark: "text: #505058, fade to #08080A", light: "text: #A09D97, fade to #FFFFFF (surface)" },
  { name: "CTA Button (Primary)", specs: "Body 14/600. Color: white. Bg: accent. Padding: 12px 28px. No radius. Hover: accentHover.", dark: "bg: #4D6BFF → #3B55E0", light: "bg: #3450DB → #2A3FB5" },
  { name: "CTA Button (Ghost)", specs: "Body 14/500. Color: textMuted. Border-bottom: 1px borderStrong. Padding: 12px 0. Hover: text color.", dark: "border: #2A2A32", light: "border: #C8C5BF" },
  { name: "Contact Row", specs: "Surface bg. 1px gap-border. Flex space-between. Label: body 14/600. Value: mono 13, accent for email, muted for rest.", dark: "bg: #0F0F13", light: "bg: #1E1E22 (dark footer inverted)" },
  { name: "Footer", specs: "In dark mode: same bg. In light mode: INVERTED to dark (#161614 bg). Contains contact rows + copyright line. Glow: accent radial gradient, blur 100px.", dark: "bg: #08080A", light: "bg: #161614 (inverted)" },
  { name: "Tag / Chip", specs: "Mono 10px. Padding 4px 10px. No radius. Bg: accentSoft or warmSoft depending on section. Color inherits from section accent.", dark: "subtle tinted bg", light: "subtle tinted bg" },
  { name: "Grid Overlay", specs: "Fixed, full viewport. 12-col grid lines. backgroundImage: linear-gradient 90deg with border color. Opacity: 0.25 dark, 0.35 light. Pointer-events: none.", dark: "opacity: 0.25", light: "opacity: 0.35" },
];

const pages = [
  { name: "Home", sections: [
    "Hero — Display headline, subtitle, 2 CTAs, scroll indicator",
    "Proof Bar — 5 credentials in mono, horizontal, surface bg",
    "What I Do — 2 cards side-by-side: Build (accent) + Teach (warm)",
    "Stats — 4-column grid with heavy top border",
    "Selected Work — 3 numbered rows with metrics",
    "Social Proof — Animated ticker + count",
    "Speaking Preview — Headline + 3 topic cards",
    "CTA Footer — Big headline, contact rows, copyright",
  ]},
  { name: "Work", sections: [
    "Page Hero — H1 'What I Build' + role context paragraph",
    "Current Role — Stone/Ton details, 3-4 outcome paragraphs",
    "Projects — Expanded work rows (clickable → detail view)",
    "Career Timeline — Horizontal: Stone → iBanFirst → Dartmouth → Bocconi",
  ]},
  { name: "Speaking", sections: [
    "Page Hero — H1 'Speaking & Teaching' + positioning line",
    "Masterclass — Product Heroes detail card with stats",
    "Topics — 3 cards (reuse from homepage)",
    "Availability CTA — 'Invite me' + contact rows",
  ]},
];

const tabs = ["Overview", "Colors", "Typography", "Components", "Logo", "Layout", "Dev Specs"];

export default function BrandSystem() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [mode, setMode] = useState("dark");
  const th = mode === "dark" ? dark : light;

  const Swatch = ({ color, label, token, wide }) => (
    <div style={{ flex: wide ? "1 1 100%" : "1 1 0", minWidth: wide ? undefined : 0 }}>
      <div style={{ height: wide ? 48 : 56, background: color, border: `1px solid ${color === "#FFFFFF" || color === "#FAFAF8" || color === "#F5F5F2" ? "#DDD" : "transparent"}`, marginBottom: 8 }} />
      <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, fontWeight: 500, color: th.text, marginBottom: 2 }}>{label}</p>
      <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.textDim }}>{color}</p>
      {token && <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: th.textDim, marginTop: 2 }}>{token}</p>}
    </div>
  );

  return (
    <div style={{ fontFamily: fonts.body.stack, background: th.bg, color: th.text, minHeight: "100vh", transition: "background 0.4s, color 0.4s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Satoshi:ital,wght@0,400;0,500;0,700;0,800;0,900;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />

      {/* ─── HEADER ─── */}
      <div style={{ padding: "48px 40px 40px", borderBottom: `1px solid ${th.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontFamily: fonts.mono.stack, fontSize: 11, color: th.accent, letterSpacing: "0.12em", marginBottom: 12 }}>BRAND SYSTEM v1.0</p>
            <h1 style={{ fontFamily: fonts.heading.stack, fontSize: 40, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 8 }}>
              vinicius<span style={{ color: th.textDim }}>.pm</span>
            </h1>
            <p style={{ fontSize: 15, color: th.textMuted, maxWidth: 520, lineHeight: 1.5 }}>
              Complete visual identity system — colors, typography, components, and implementation specs for both light and dark modes.
            </p>
          </div>
          {/* Mode Toggle */}
          <button
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            style={{
              fontFamily: fonts.mono.stack, fontSize: 12, fontWeight: 500,
              color: th.accent, background: th.accentSoft,
              border: `1px solid ${th.accent}33`,
              padding: "8px 20px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              transition: "all 0.3s",
            }}
          >
            <span style={{ fontSize: 14 }}>{mode === "dark" ? "●" : "○"}</span>
            {mode === "dark" ? "DARK MODE" : "LIGHT MODE"}
          </button>
        </div>
      </div>

      {/* ─── TABS ─── */}
      <div style={{ borderBottom: `1px solid ${th.border}`, position: "sticky", top: 0, zIndex: 20, background: th.bg, transition: "background 0.4s" }}>
        <div style={{ display: "flex", padding: "0 40px" }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "14px 24px", fontSize: 13,
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? th.text : th.textMuted,
              background: "none", border: "none",
              borderBottom: activeTab === tab ? `2px solid ${th.accent}` : "2px solid transparent",
              cursor: "pointer", fontFamily: fonts.body.stack, transition: "color 0.2s",
            }}>{tab}</button>
          ))}
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div style={{ padding: "40px 40px 96px", maxWidth: 1040, margin: "0 auto" }}>

        {/* ══════════ OVERVIEW ══════════ */}
        {activeTab === "Overview" && (
          <div>
            <SectionHead th={th} label="IDENTITY" title="Design Principles" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: th.border, marginBottom: 48 }}>
              {[
                { n: "01", t: "Precision", d: "Every element earns its place. No decoration without function. Sharp corners, tight grids, deliberate spacing. The restraint is the brand." },
                { n: "02", t: "Dual Authority", d: "Two accent colors separate two identities. Blue = build (PM at Stone). Gold = teach (AI educator). The visitor understands the duality without explanation." },
                { n: "03", t: "Data-Forward", d: "Numbers lead. Monospaced metrics. Stats before stories. The site communicates outcomes the way a PM deck does — quantified impact first." },
              ].map((p, i) => (
                <div key={i} style={{ background: th.surface, padding: 32, transition: "background 0.4s" }}>
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 28, fontWeight: 700, color: th.border, display: "block", marginBottom: 16 }}>{p.n}</span>
                  <h3 style={{ fontFamily: fonts.heading.stack, fontSize: 18, fontWeight: 800, color: th.text, marginBottom: 8, letterSpacing: "-0.01em" }}>{p.t}</h3>
                  <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6 }}>{p.d}</p>
                </div>
              ))}
            </div>

            <SectionHead th={th} label="POSITIONING" title="Who this is for" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
              <div style={{ background: th.accentSoft, padding: 28, border: `1px solid ${th.accent}22` }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.1em", marginBottom: 12 }}>PRIMARY AUDIENCE</p>
                <p style={{ fontSize: 14, color: th.text, lineHeight: 1.7, marginBottom: 12 }}>
                  <strong>Hiring managers at US startups and top tech companies</strong> evaluating remote PM candidates. They should land on the site and register: senior, technical, international, ships.
                </p>
                <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6 }}>
                  Secondary: training companies, corporate L&D, Product Heroes-style platforms, product leaders seeking AI workshops.
                </p>
              </div>
              <div style={{ background: th.warmSoft, padding: 28, border: `1px solid ${th.warm}22` }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.warm, letterSpacing: "0.1em", marginBottom: 12 }}>TONE OF VOICE</p>
                <p style={{ fontSize: 14, color: th.text, lineHeight: 1.7, marginBottom: 12 }}>
                  <strong>Understated confidence.</strong> The site of someone who doesn't need to prove themselves — the work and numbers speak. Professional but not corporate. Technical but not cold.
                </p>
                <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6 }}>
                  Write in short, direct sentences. Cut adjectives. Lead with outcomes. Let the structure do the talking.
                </p>
              </div>
            </div>

            {/* Live mini-preview */}
            <SectionHead th={th} label="PREVIEW" title="Hero — Current Mode" />
            <div style={{ background: th.bg, border: `1px solid ${th.border}`, padding: "56px 40px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "10%", right: "8%", width: 400, height: 400, background: `radial-gradient(circle, ${th.accentGlow} 0%, transparent 60%)`, filter: "blur(80px)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 12, color: th.accent, letterSpacing: "0.08em", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 24, height: 1, background: th.accent }} /> RIO DE JANEIRO
                </p>
                <h1 style={{ fontFamily: fonts.heading.stack, fontSize: 56, fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: 20 }}>
                  Product Manager<br />at Stone Co<span style={{ color: th.accent }}>.</span>
                </h1>
                <p style={{ fontSize: 17, color: th.textMuted, lineHeight: 1.6, maxWidth: 440, marginBottom: 32 }}>
                  I teach product teams how to build with AI.<br />
                  <span style={{ color: th.textDim }}>Guest instructor at Product Heroes · 60+ PMs trained.</span>
                </p>
                <div style={{ display: "flex", gap: 16 }}>
                  <span style={{ fontFamily: fonts.body.stack, fontSize: 14, fontWeight: 600, color: "#FFF", background: th.accent, padding: "12px 28px" }}>Get in Touch</span>
                  <span style={{ fontFamily: fonts.body.stack, fontSize: 14, fontWeight: 500, color: th.textMuted, padding: "12px 0", borderBottom: `1px solid ${th.borderStrong}` }}>View Work →</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ COLORS ══════════ */}
        {activeTab === "Colors" && (
          <div>
            <SectionHead th={th} label="PALETTE" title="Color Tokens" sub="Toggle between modes with the button above. All values shift — the structure stays." />

            <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.1em", marginBottom: 16, marginTop: 32 }}>SURFACES</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
              <Swatch color={th.bg} label="bg" token="--bg" />
              <Swatch color={th.surface} label="surface" token="--surface" />
              <Swatch color={th.surfaceHover} label="surfaceHover" token="--surface-hover" />
              <Swatch color={th.border} label="border" token="--border" />
              <Swatch color={th.borderStrong} label="borderStrong" token="--border-strong" />
            </div>

            <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.1em", marginBottom: 16 }}>TEXT</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
              <Swatch color={th.text} label="text" token="--text" />
              <Swatch color={th.textMuted} label="textMuted" token="--text-muted" />
              <Swatch color={th.textDim} label="textDim" token="--text-dim" />
            </div>

            <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.1em", marginBottom: 16 }}>ACCENT — BUILD</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
              <Swatch color={th.accent} label="accent" token="--accent" />
              <Swatch color={th.accentHover} label="accentHover" token="--accent-hover" />
              <Swatch color={th.accentSoft} label="accentSoft" token="--accent-soft" />
            </div>

            <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.warm, letterSpacing: "0.1em", marginBottom: 16 }}>ACCENT — TEACH</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
              <Swatch color={th.warm} label="warm" token="--warm" />
              <Swatch color={th.warmHover} label="warmHover" token="--warm-hover" />
              <Swatch color={th.warmSoft} label="warmSoft" token="--warm-soft" />
            </div>

            <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.textDim, letterSpacing: "0.1em", marginBottom: 16 }}>SPECIAL</p>
            <div style={{ display: "flex", gap: 12, marginBottom: 48 }}>
              <Swatch color={th.navBg} label="navBg" token="--nav-bg" />
              <Swatch color={th.footerBg} label="footerBg" token="--footer-bg" />
              <Swatch color={th.footerText} label="footerText" token="--footer-text" />
              <Swatch color={th.accentGlow} label="accentGlow" token="--accent-glow" />
            </div>

            {/* Usage Rules */}
            <SectionHead th={th} label="RULES" title="Color Usage" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: th.border }}>
              {[
                { rule: "Accent blue for all 'Build' content", detail: "Hero dot, Build card top-line, work metrics, primary CTA, section labels for Work content." },
                { rule: "Warm gold for all 'Teach' content", detail: "Teach card top-line, Speaking section labels, Speaking headline dot. Never mix with Build sections." },
                { rule: "Footer always dark", detail: "In light mode, footer inverts to dark bg (#161614). In dark mode, it's the same bg. Contact rows always live on dark surface." },
                { rule: "No color mixing", detail: "A section is either accent-coded or warm-coded. Never use both in the same component. Stats section is neutral (no accent)." },
                { rule: "Glow is ambient, not decorative", detail: "One radial gradient in hero, one in footer. blur(80-100px), opacity via accentGlow token. Never a visible circle." },
                { rule: "Grid lines are structural", detail: "The 12-col grid overlay is always visible. opacity 0.25 dark / 0.35 light. It adds texture without competing with content." },
              ].map((r, i) => (
                <div key={i} style={{ background: th.surface, padding: "16px 20px", transition: "background 0.4s" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: th.text, marginBottom: 4 }}>{r.rule}</p>
                  <p style={{ fontSize: 12, color: th.textMuted, lineHeight: 1.5 }}>{r.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════ TYPOGRAPHY ══════════ */}
        {activeTab === "Typography" && (
          <div>
            <SectionHead th={th} label="TYPEFACES" title="Font Stack" />

            {Object.entries(fonts).map(([key, f]) => (
              <div key={key} style={{ background: th.surface, border: `1px solid ${th.border}`, padding: 32, marginBottom: 16, transition: "all 0.4s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: key === "heading" ? th.accent : key === "mono" ? th.warm : th.textMuted, letterSpacing: "0.1em", marginBottom: 4 }}>
                      {key.toUpperCase()}
                    </p>
                    <p style={{ fontFamily: fonts.heading.stack, fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>{f.name}</p>
                  </div>
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 11, color: th.textDim, background: th.accentSoft, padding: "4px 10px" }}>{f.source}</span>
                </div>
                <p style={{ fontFamily: f.stack, fontSize: key === "heading" ? 36 : key === "mono" ? 16 : 18, fontWeight: key === "heading" ? 900 : 400, color: th.text, letterSpacing: key === "heading" ? "-0.03em" : 0, lineHeight: 1.3, marginBottom: 12 }}>
                  {key === "heading" ? "Product Manager at Stone Co." : key === "mono" ? "4,000,000+ · 60+ PMs · NYSE:STNE" : "Building financial products for millions of individual users across Brazil."}
                </p>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 11, color: th.textDim }}>
                  Weights: {f.weights.join(", ")} · Stack: {f.stack}
                </p>
              </div>
            ))}

            {/* Type Scale */}
            <SectionHead th={th} label="SCALE" title="Type Scale" />
            <div style={{ border: `1px solid ${th.border}`, overflow: "hidden" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "100px 80px 60px 60px 80px 1fr", padding: "10px 16px", background: th.surface, borderBottom: `1px solid ${th.border}` }}>
                {["Name", "Size", "Wt", "LH", "LS", "Usage"].map(h => (
                  <span key={h} style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: th.textDim, letterSpacing: "0.08em" }}>{h}</span>
                ))}
              </div>
              {typeScale.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 80px 60px 60px 80px 1fr", padding: "10px 16px", borderBottom: i < typeScale.length - 1 ? `1px solid ${th.border}` : "none", alignItems: "center" }}>
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 12, fontWeight: 500, color: row.font === "heading" ? th.accent : row.font === "mono" ? th.warm : th.text }}>{row.name}</span>
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 11, color: th.textMuted }}>{row.size}</span>
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 11, color: th.textMuted }}>{row.weight}</span>
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 11, color: th.textMuted }}>{row.lh}</span>
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 11, color: th.textDim }}>{row.ls}</span>
                  <span style={{ fontSize: 12, color: th.textDim }}>{row.usage}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════ COMPONENTS ══════════ */}
        {activeTab === "Components" && (
          <div>
            <SectionHead th={th} label="COMPONENTS" title="UI Component Specs" sub="Each component listed with behavior, dark values, and light values." />

            <div style={{ display: "flex", flexDirection: "column", gap: 1, background: th.border }}>
              {components.map((c, i) => (
                <div key={i} style={{ background: th.surface, padding: "24px 28px", transition: "background 0.4s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ fontFamily: fonts.heading.stack, fontSize: 16, fontWeight: 700, color: th.text }}>{c.name}</h3>
                    <span style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.textDim }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6, marginBottom: 16 }}>{c.specs}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={{ background: th.accentSoft, padding: "8px 12px" }}>
                      <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: th.accent, letterSpacing: "0.08em", marginBottom: 4 }}>DARK</p>
                      <p style={{ fontFamily: fonts.mono.stack, fontSize: 11, color: th.textMuted }}>{c.dark}</p>
                    </div>
                    <div style={{ background: th.warmSoft, padding: "8px 12px" }}>
                      <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: th.warm, letterSpacing: "0.08em", marginBottom: 4 }}>LIGHT</p>
                      <p style={{ fontFamily: fonts.mono.stack, fontSize: 11, color: th.textMuted }}>{c.light}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live component samples */}
            <SectionHead th={th} label="LIVE" title="Component Samples" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: th.border }}>
              {/* CTA Buttons */}
              <div style={{ background: th.surface, padding: 28, transition: "background 0.4s" }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.textDim, letterSpacing: "0.1em", marginBottom: 16 }}>BUTTONS</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontFamily: fonts.body.stack, fontSize: 14, fontWeight: 600, color: "#FFF", background: th.accent, padding: "12px 28px" }}>Primary</span>
                  <span style={{ fontFamily: fonts.body.stack, fontSize: 14, fontWeight: 500, color: th.textMuted, padding: "12px 0", borderBottom: `1px solid ${th.borderStrong}` }}>Ghost Link →</span>
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 12, color: th.accent, border: `1px solid ${th.accent}`, padding: "6px 16px" }}>Nav CTA</span>
                </div>
              </div>
              {/* Tags */}
              <div style={{ background: th.surface, padding: 28, transition: "background 0.4s" }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.textDim, letterSpacing: "0.1em", marginBottom: 16 }}>TAGS</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["Fintech", "Growth", "Cards"].map(tag => (
                    <span key={tag} style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, background: th.accentSoft, padding: "4px 10px", letterSpacing: "0.03em" }}>{tag}</span>
                  ))}
                  {["AI", "Education"].map(tag => (
                    <span key={tag} style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.warm, background: th.warmSoft, padding: "4px 10px", letterSpacing: "0.03em" }}>{tag}</span>
                  ))}
                </div>
              </div>
              {/* Section Label */}
              <div style={{ background: th.surface, padding: 28, transition: "background 0.4s" }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.textDim, letterSpacing: "0.1em", marginBottom: 16 }}>SECTION LABELS</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ width: 24, height: 1, background: th.accent }} />
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 11, color: th.accent, letterSpacing: "0.1em" }}>SELECTED WORK</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 24, height: 1, background: th.warm }} />
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 11, color: th.warm, letterSpacing: "0.1em" }}>SPEAKING & TEACHING</span>
                </div>
              </div>
              {/* Stat Cell */}
              <div style={{ background: th.surface, padding: 28, transition: "background 0.4s" }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.textDim, letterSpacing: "0.1em", marginBottom: 16 }}>STAT CELL</p>
                <div style={{ borderTop: `2px solid ${mode === "dark" ? th.borderStrong : th.text}`, paddingTop: 16 }}>
                  <p style={{ fontFamily: fonts.heading.stack, fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 6 }}>4M+</p>
                  <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.textDim, letterSpacing: "0.1em", marginBottom: 2 }}>USERS IMPACTED</p>
                  <p style={{ fontSize: 12, color: th.textMuted }}>Stone · Ton</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ LOGO ══════════ */}
        {activeTab === "Logo" && (
          <div>
            <SectionHead th={th} label="MARK" title="Logo System" sub="Three tiers — icon mark, compact mark, wordmark. All built on JetBrains Mono 700. The framed V with accent dot is the primary mark." />

            {/* Concept */}
            <div style={{ background: th.accentSoft, border: `1px solid ${th.accent}22`, padding: 28, marginBottom: 40 }}>
              <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.1em", marginBottom: 12 }}>CORE CONCEPT</p>
              <p style={{ fontSize: 15, color: th.text, lineHeight: 1.7, marginBottom: 12 }}>
                <strong>The V from JetBrains Mono 700, framed in a square border with an accent dot.</strong> The frame gives the mark its own structure — it doesn't depend on the OS or container to hold its shape. It works as favicon, app icon, avatar, and email signature without adaptation.
              </p>
              <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6 }}>
                The dot is always <strong>square</strong> (never round) — matching the 0px border-radius identity. The border weight scales proportionally with the V. Everything is JetBrains Mono 700 — the same font used in the compact mark and wordmark.
              </p>
            </div>

            {/* ─── ICON MARK ─── */}
            <SectionHead th={th} label="TIER 1" title="Icon Mark — Framed V" />
            <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6, marginBottom: 24, maxWidth: 560 }}>
              The primary mark. JetBrains Mono 700 "V" inside a square border, with a square accent dot at the bottom-right interior. The frame provides structure at every size from 16px to 512px.
            </p>

            {/* Icon grid — all sizes, both backgrounds */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: th.border, marginBottom: 40 }}>
              {/* Dark background */}
              <div style={{ background: "#08080A", padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: "#505058", letterSpacing: "0.1em", alignSelf: "flex-start" }}>ON DARK</p>
                <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
                  {[128, 80, 48, 32, 16].map(size => {
                    const borderW = Math.max(size * 0.04, 1);
                    const dotSize = Math.max(size * 0.13, 2);
                    const inset = size * 0.1;
                    return (
                      <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: size, height: size,
                          border: `${borderW}px solid #EDEDF0`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          position: "relative", background: "#0F0F13",
                        }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: size * 0.55, fontWeight: 700, color: "#EDEDF0", lineHeight: 1 }}>V</span>
                          <div style={{ position: "absolute", bottom: inset, right: inset, width: dotSize, height: dotSize, background: "#4D6BFF" }} />
                        </div>
                        <span style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: "#505058" }}>{size}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Light background */}
              <div style={{ background: "#FAFAF8", padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: "#A09D97", letterSpacing: "0.1em", alignSelf: "flex-start" }}>ON LIGHT</p>
                <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
                  {[128, 80, 48, 32, 16].map(size => {
                    const borderW = Math.max(size * 0.04, 1);
                    const dotSize = Math.max(size * 0.13, 2);
                    const inset = size * 0.1;
                    return (
                      <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: size, height: size,
                          border: `${borderW}px solid #161614`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          position: "relative", background: "#FFFFFF",
                        }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: size * 0.55, fontWeight: 700, color: "#161614", lineHeight: 1 }}>V</span>
                          <div style={{ position: "absolute", bottom: inset, right: inset, width: dotSize, height: dotSize, background: "#3450DB" }} />
                        </div>
                        <span style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: "#A09D97" }}>{size}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Construction detail */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: th.border, marginBottom: 40 }}>
              {[
                { label: "Frame", value: "4% of size", detail: "Border width scales linearly. Min 1px. Stroke color matches V color." },
                { label: "V Size", value: "55% of frame", detail: "JetBrains Mono 700. Centered horizontally and vertically in the frame." },
                { label: "Dot", value: "13% of frame", detail: "Square, never rounded. Accent-colored. Positioned at 10% inset from bottom-right." },
                { label: "Background", value: "Surface fill", detail: "Dark: #0F0F13. Light: #FFFFFF. Transparent variant available for overlays." },
              ].map((spec, i) => (
                <div key={i} style={{ background: th.surface, padding: "20px 16px", transition: "background 0.4s" }}>
                  <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.08em", marginBottom: 6 }}>{spec.label}</p>
                  <p style={{ fontFamily: fonts.heading.stack, fontSize: 16, fontWeight: 800, color: th.text, letterSpacing: "-0.02em", marginBottom: 4 }}>{spec.value}</p>
                  <p style={{ fontSize: 11, color: th.textDim, lineHeight: 1.5 }}>{spec.detail}</p>
                </div>
              ))}
            </div>

            {/* Favicon & app icon contexts */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: th.border, marginBottom: 40 }}>
              {[
                { label: "Favicon", size: "16×16 / 32×32", note: "Browser tab. Frame border at 1px. Dot may be 2px. V still legible." },
                { label: "App Icon", size: "180×180 / 512×512", note: "iOS/Android. Use surface bg fill. OS applies its own rounding — the square frame inside reads as intentional contrast." },
                { label: "Social Avatar", size: "400×400", note: "LinkedIn, X, GitHub. Use dark bg variant. The frame prevents the mark from floating in circular crops." },
                { label: "Email Signature", size: "48×48 / 64×64", note: "Inline with email. Pair with compact mark 'V.PM' or full name text." },
              ].map((ctx, i) => (
                <div key={i} style={{ background: th.surface, padding: "20px 16px", transition: "background 0.4s" }}>
                  <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.08em", marginBottom: 6 }}>{ctx.label}</p>
                  <p style={{ fontFamily: fonts.heading.stack, fontSize: 14, fontWeight: 700, color: th.text, marginBottom: 4 }}>{ctx.size}</p>
                  <p style={{ fontSize: 11, color: th.textDim, lineHeight: 1.5 }}>{ctx.note}</p>
                </div>
              ))}
            </div>

            {/* ─── COMPACT MARK ─── */}
            <SectionHead th={th} label="TIER 2" title="Compact Mark" />
            <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6, marginBottom: 24, maxWidth: 560 }}>
              "V.PM" in JetBrains Mono 700. The dot is accent-colored. Used for email signatures (next to icon), social bios, slide decks, and small print where the full wordmark is too wide.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: th.border, marginBottom: 40 }}>
              <div style={{ background: "#08080A", padding: "40px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: "#505058", letterSpacing: "0.1em" }}>ON DARK</p>
                {[36, 24, 16].map(size => (
                  <p key={size} style={{ fontFamily: fonts.mono.stack, fontSize: size, fontWeight: 700, color: "#EDEDF0", letterSpacing: "-0.02em" }}>
                    V<span style={{ color: "#4D6BFF" }}>.</span>PM
                  </p>
                ))}
              </div>
              <div style={{ background: "#FAFAF8", padding: "40px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: "#A09D97", letterSpacing: "0.1em" }}>ON LIGHT</p>
                {[36, 24, 16].map(size => (
                  <p key={size} style={{ fontFamily: fonts.mono.stack, fontSize: size, fontWeight: 700, color: "#161614", letterSpacing: "-0.02em" }}>
                    V<span style={{ color: "#3450DB" }}>.</span>PM
                  </p>
                ))}
              </div>
            </div>

            {/* ─── WORDMARK ─── */}
            <SectionHead th={th} label="TIER 3" title="Wordmark" />
            <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6, marginBottom: 24, maxWidth: 560 }}>
              The full "vinicius.pm" in JetBrains Mono 500. The ".pm" is dimmed. Used in the site nav, letterheads, and any context with enough horizontal space. This is the most recognizable form — it IS the domain.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: th.border, marginBottom: 40 }}>
              <div style={{ background: "#08080A", padding: "40px 40px", display: "flex", flexDirection: "column", gap: 20 }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: "#505058", letterSpacing: "0.1em" }}>ON DARK</p>
                {[24, 18, 14].map(size => (
                  <p key={size} style={{ fontFamily: fonts.mono.stack, fontSize: size, fontWeight: 500, color: "#EDEDF0", letterSpacing: "-0.01em" }}>
                    vinicius<span style={{ color: "#505058" }}>.pm</span>
                  </p>
                ))}
              </div>
              <div style={{ background: "#FAFAF8", padding: "40px 40px", display: "flex", flexDirection: "column", gap: 20 }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: "#A09D97", letterSpacing: "0.1em" }}>ON LIGHT</p>
                {[24, 18, 14].map(size => (
                  <p key={size} style={{ fontFamily: fonts.mono.stack, fontSize: size, fontWeight: 500, color: "#161614", letterSpacing: "-0.01em" }}>
                    vinicius<span style={{ color: "#A09D97" }}>.pm</span>
                  </p>
                ))}
              </div>
            </div>

            {/* ─── COLOR VARIATIONS ─── */}
            <SectionHead th={th} label="VARIANTS" title="Color Variations" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: th.border, marginBottom: 40 }}>
              {[
                { label: "Primary Dark", bg: "#08080A", fill: "#0F0F13", border: "#EDEDF0", vColor: "#EDEDF0", dotColor: "#4D6BFF", desc: "Default on dark" },
                { label: "Primary Light", bg: "#FAFAF8", fill: "#FFFFFF", border: "#161614", vColor: "#161614", dotColor: "#3450DB", desc: "Default on light" },
                { label: "Mono Dark", bg: "#08080A", fill: "#0F0F13", border: "#EDEDF0", vColor: "#EDEDF0", dotColor: "#EDEDF0", desc: "Single-color, formal" },
                { label: "Mono Light", bg: "#FAFAF8", fill: "#FFFFFF", border: "#161614", vColor: "#161614", dotColor: "#161614", desc: "Single-color, print" },
                { label: "Knockout", bg: "#3450DB", fill: "#3450DB", border: "#FFFFFF", vColor: "#FFFFFF", dotColor: "#FFFFFF", desc: "On colored surfaces" },
              ].map((v, i) => (
                <div key={i} style={{ background: v.bg, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, border: v.bg === "#FAFAF8" ? "1px solid #E6E4E0" : "none" }}>
                  <div style={{
                    width: 48, height: 48,
                    border: `2px solid ${v.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", background: v.fill,
                  }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 700, color: v.vColor, lineHeight: 1 }}>V</span>
                    <div style={{ position: "absolute", bottom: 5, right: 5, width: 6, height: 6, background: v.dotColor }} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: v.vColor, opacity: 0.5, letterSpacing: "0.06em", marginBottom: 2 }}>{v.label}</p>
                    <p style={{ fontFamily: fonts.mono.stack, fontSize: 8, color: v.vColor, opacity: 0.35 }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ─── CLEAR SPACE & RULES ─── */}
            <SectionHead th={th} label="RULES" title="Usage Guidelines" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: th.border, marginBottom: 40 }}>
              {/* Clear space */}
              <div style={{ background: th.surface, padding: 28, transition: "background 0.4s" }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.1em", marginBottom: 12 }}>CLEAR SPACE</p>
                <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <div style={{ border: `1px dashed ${th.borderStrong}`, padding: 24 }}>
                      <div style={{
                        width: 64, height: 64,
                        border: `3px solid ${th.text}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        position: "relative",
                      }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 35, fontWeight: 700, color: th.text, lineHeight: 1 }}>V</span>
                        <div style={{ position: "absolute", bottom: 6, right: 6, width: 8, height: 8, background: th.accent }} />
                      </div>
                    </div>
                    <span style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", fontFamily: fonts.mono.stack, fontSize: 9, color: th.textDim, whiteSpace: "nowrap" }}>min padding = ½ mark size</span>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: th.textMuted, lineHeight: 1.6, marginTop: 8 }}>
                  Minimum clear space around the mark equals half the mark's size. No text, icons, or other borders may enter this zone.
                </p>
              </div>
              {/* Do / Don't */}
              <div style={{ background: th.surface, padding: 28, transition: "background 0.4s" }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.1em", marginBottom: 12 }}>RULES</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { do: true, rule: "Frame, V, and dot are always the same proportions at any size." },
                    { do: true, rule: "Dot is always square. Never round it." },
                    { do: true, rule: "Dot is always accent-colored (or same as V in mono variants)." },
                    { do: true, rule: "Frame border weight scales with size — never thinner than 1px." },
                    { do: false, rule: "Don't add shadows, gradients, or glow to the mark." },
                    { do: false, rule: "Don't round the frame corners. 0px radius always." },
                    { do: false, rule: "Don't place on busy backgrounds without a surface fill inside the frame." },
                    { do: false, rule: "Don't use the warm/gold color for the dot — it's always accent blue." },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: r.do ? th.accent : "#E05050", flexShrink: 0, paddingTop: 2 }}>
                        {r.do ? "✓" : "✗"}
                      </span>
                      <p style={{ fontSize: 12, color: th.textMuted, lineHeight: 1.5 }}>{r.rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── PRACTICAL EXAMPLES ─── */}
            <SectionHead th={th} label="IN CONTEXT" title="Real-World Usage" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: th.border }}>
              {/* Email signature */}
              <div style={{ background: "#FFFFFF", padding: 24 }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: "#A09D97", letterSpacing: "0.1em", marginBottom: 16 }}>EMAIL SIGNATURE</p>
                <div style={{ borderTop: "2px solid #161614", paddingTop: 12, maxWidth: 240 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 28, height: 28, border: "1px solid #161614", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", background: "#F5F5F2", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 700, color: "#161614", lineHeight: 1 }}>V</span>
                      <div style={{ position: "absolute", bottom: 3, right: 3, width: 3, height: 3, background: "#3450DB" }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: "#161614" }}>Vinicius</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6B6964" }}>Product Manager at Stone Co</p>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#A09D97" }}>vinicius.pm · Rio de Janeiro</p>
                </div>
              </div>
              {/* Browser tab */}
              <div style={{ background: "#2A2A32", padding: 24 }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: "#505058", letterSpacing: "0.1em", marginBottom: 16 }}>BROWSER TAB</p>
                <div style={{ background: "#1E1E24", borderRadius: "8px 8px 0 0", padding: "8px 12px", display: "inline-flex", alignItems: "center", gap: 8, maxWidth: 200 }}>
                  <div style={{ width: 14, height: 14, border: "1px solid #EDEDF0", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, fontWeight: 700, color: "#EDEDF0", lineHeight: 1 }}>V</span>
                    <div style={{ position: "absolute", bottom: 1, right: 1, width: 2, height: 2, background: "#4D6BFF" }} />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#EDEDF0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>vinicius.pm</span>
                </div>
              </div>
              {/* Social card / OG image */}
              <div style={{ background: th.surface, padding: 24, transition: "background 0.4s" }}>
                <p style={{ fontFamily: fonts.mono.stack, fontSize: 9, color: th.textDim, letterSpacing: "0.1em", marginBottom: 16 }}>OG / SOCIAL CARD</p>
                <div style={{ background: "#08080A", aspectRatio: "1200/630", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "10%", right: "5%", width: 120, height: 120, background: "radial-gradient(circle, rgba(77,107,255,0.2) 0%, transparent 65%)", filter: "blur(30px)" }} />
                  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 16, fontWeight: 900, color: "#EDEDF0", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 4, position: "relative" }}>
                    Product Manager<br />at Stone Co<span style={{ color: "#4D6BFF" }}>.</span>
                  </p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, color: "#505058", position: "relative" }}>vinicius.pm</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ LAYOUT ══════════ */}
        {activeTab === "Layout" && (
          <div>
            <SectionHead th={th} label="STRUCTURE" title="Page Architecture" />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: th.border, marginBottom: 48 }}>
              {[
                { k: "Max Width", v: "1200px", n: "Page container" },
                { k: "Content Max", v: "720px", n: "Readable prose width" },
                { k: "Side Padding", v: "40px", n: "Desktop; 20px mobile" },
                { k: "Section Gap", v: "96px", n: "Vertical between sections" },
                { k: "Grid", v: "12 columns", n: "Visible overlay, no gutters" },
                { k: "Border Radius", v: "0px", n: "Everywhere. Sharp = identity" },
                { k: "Nav Height", v: "56px", n: "Fixed position" },
                { k: "Card Padding", v: "28–40px", n: "Consistent internal" },
                { k: "Gap Borders", v: "1px gap", n: "Cards separated by bg-color gap" },
              ].map((item, i) => (
                <div key={i} style={{ background: th.surface, padding: "16px 20px", transition: "background 0.4s" }}>
                  <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.06em", marginBottom: 4 }}>{item.k}</p>
                  <p style={{ fontFamily: fonts.heading.stack, fontSize: 18, fontWeight: 800, color: th.text, letterSpacing: "-0.02em", marginBottom: 2 }}>{item.v}</p>
                  <p style={{ fontSize: 12, color: th.textDim }}>{item.n}</p>
                </div>
              ))}
            </div>

            <SectionHead th={th} label="PAGES" title="Site Map" />
            {pages.map((page, pi) => (
              <div key={pi} style={{ background: th.surface, border: `1px solid ${th.border}`, padding: 28, marginBottom: 12, transition: "all 0.4s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, background: th.accentSoft, padding: "4px 10px" }}>PAGE {pi + 1}</span>
                  <h3 style={{ fontFamily: fonts.heading.stack, fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>{page.name}</h3>
                </div>
                {page.sections.map((s, si) => (
                  <div key={si} style={{ display: "flex", gap: 12, padding: "8px 0", borderTop: si > 0 ? `1px solid ${th.border}` : "none" }}>
                    <span style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.textDim, width: 20, flexShrink: 0, paddingTop: 2 }}>{si + 1}</span>
                    <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.5 }}>{s}</p>
                  </div>
                ))}
              </div>
            ))}

            <SectionHead th={th} label="RESPONSIVE" title="Breakpoints" />
            <div style={{ display: "flex", flexDirection: "column", gap: 1, background: th.border }}>
              {[
                { bp: "Mobile", range: "0–640px", notes: "1 column. H1 at 36px. Padding 20px. Hamburger nav → slide from right. Stats stack 2×2." },
                { bp: "Tablet", range: "641–1024px", notes: "Content centered. H1 at 44px. Padding 32px. What-I-Do cards stack vertically. Work rows stay horizontal." },
                { bp: "Desktop", range: "1025px+", notes: "Full layout. H1 at 64px. Padding 40px. All grids active. Grid overlay visible." },
              ].map((row, i) => (
                <div key={i} style={{ background: th.surface, padding: "16px 24px", display: "grid", gridTemplateColumns: "100px 120px 1fr", gap: 16, transition: "background 0.4s" }}>
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 12, fontWeight: 500, color: th.text }}>{row.bp}</span>
                  <span style={{ fontFamily: fonts.mono.stack, fontSize: 12, color: th.textDim }}>{row.range}</span>
                  <span style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.5 }}>{row.notes}</span>
                </div>
              ))}
            </div>

            <SectionHead th={th} label="MOTION" title="Animation" />
            <div style={{ background: th.surface, border: `1px solid ${th.border}`, padding: 28, transition: "all 0.4s" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                <div>
                  <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.08em", marginBottom: 8 }}>SCROLL REVEAL</p>
                  <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6 }}>Sections fade in + translateY(16–20px). Duration: 0.7s. Easing: cubic-bezier(0.16, 1, 0.3, 1). IntersectionObserver at 15% threshold.</p>
                </div>
                <div>
                  <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.08em", marginBottom: 8 }}>TICKER</p>
                  <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6 }}>CSS translateX animation, 25s linear infinite. Content duplicated for seamless loop. Fade gradients on edges.</p>
                </div>
                <div>
                  <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.08em", marginBottom: 8 }}>HOVER</p>
                  <p style={{ fontSize: 13, color: th.textMuted, lineHeight: 1.6 }}>Work rows: background shifts to surfaceHover. Buttons: color/bg transitions, 0.2s ease. No transforms on hover — no translateY, no scale.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ DEV SPECS ══════════ */}
        {activeTab === "Dev Specs" && (
          <div>
            <SectionHead th={th} label="IMPLEMENTATION" title="Developer Guide" />

            {/* Stack */}
            <div style={{ background: th.surface, border: `1px solid ${th.border}`, padding: 28, marginBottom: 24, transition: "all 0.4s" }}>
              <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.1em", marginBottom: 16 }}>RECOMMENDED STACK</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {[
                  { t: "Next.js 15", d: "App router. Static export. /work, /speaking routes." },
                  { t: "Tailwind CSS v4", d: "Utility-first. CSS variables for theme tokens." },
                  { t: "Vercel", d: "Deploy + custom domain vinicius.pm." },
                  { t: "Framer Motion", d: "Scroll-triggered reveals only. Keep it minimal." },
                  { t: "next-themes", d: "Dark/light toggle. System preference detection." },
                  { t: "Plausible", d: "Privacy-first analytics. Better optics than GA." },
                ].map((s, i) => (
                  <div key={i}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: th.text, marginBottom: 4 }}>{s.t}</p>
                    <p style={{ fontSize: 12, color: th.textMuted, lineHeight: 1.5 }}>{s.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CSS Variables */}
            <div style={{ background: mode === "dark" ? "#0F0F13" : "#1a1a1e", borderRadius: 0, padding: 28, marginBottom: 24, overflow: "auto" }}>
              <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: "#4D6BFF", letterSpacing: "0.1em", marginBottom: 16 }}>CSS CUSTOM PROPERTIES</p>
              <pre style={{ fontFamily: fonts.mono.stack, fontSize: 12, color: "#8B8B95", lineHeight: 2, whiteSpace: "pre-wrap" }}>
{`/* ─── Dark Mode (default) ─── */
:root {
  --bg: ${dark.bg};
  --surface: ${dark.surface};
  --surface-hover: ${dark.surfaceHover};
  --border: ${dark.border};
  --border-strong: ${dark.borderStrong};
  --text: ${dark.text};
  --text-muted: ${dark.textMuted};
  --text-dim: ${dark.textDim};
  --accent: ${dark.accent};
  --accent-hover: ${dark.accentHover};
  --accent-soft: ${dark.accentSoft};
  --accent-glow: ${dark.accentGlow};
  --warm: ${dark.warm};
  --warm-hover: ${dark.warmHover};
  --warm-soft: ${dark.warmSoft};
  --nav-bg: ${dark.navBg};
  --grid-opacity: 0.25;
}

/* ─── Light Mode ─── */
[data-theme="light"] {
  --bg: ${light.bg};
  --surface: ${light.surface};
  --surface-hover: ${light.surfaceHover};
  --border: ${light.border};
  --border-strong: ${light.borderStrong};
  --text: ${light.text};
  --text-muted: ${light.textMuted};
  --text-dim: ${light.textDim};
  --accent: ${light.accent};
  --accent-hover: ${light.accentHover};
  --accent-soft: ${light.accentSoft};
  --accent-glow: ${light.accentGlow};
  --warm: ${light.warm};
  --warm-hover: ${light.warmHover};
  --warm-soft: ${light.warmSoft};
  --nav-bg: ${light.navBg};
  --grid-opacity: 0.35;
}

/* ─── Fonts ─── */
--font-heading: ${fonts.heading.stack};
--font-body: ${fonts.body.stack};
--font-mono: ${fonts.mono.stack};

/* ─── Spacing ─── */
--section-gap: 96px;
--content-max: 720px;
--page-max: 1200px;
--padding-x: 40px;
--nav-h: 56px;`}
              </pre>
            </div>

            {/* Font Loading */}
            <div style={{ background: mode === "dark" ? "#0F0F13" : "#1a1a1e", padding: 28, marginBottom: 24, overflow: "auto" }}>
              <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: "#E8C47C", letterSpacing: "0.1em", marginBottom: 16 }}>FONT LOADING</p>
              <pre style={{ fontFamily: fonts.mono.stack, fontSize: 12, color: "#8B8B95", lineHeight: 2, whiteSpace: "pre-wrap" }}>
{`/* Satoshi — from fontshare.com (free) */
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,800,900&display=swap');

/* Inter + JetBrains Mono — Google Fonts */
<link href="https://fonts.googleapis.com/css2?family=
  Inter:wght@300;400;500;600;700&
  JetBrains+Mono:wght@400;500;700&
  display=swap" rel="stylesheet">

/* Preconnect (add to <head>) */
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://api.fontshare.com">`}
              </pre>
            </div>

            {/* Tailwind Config */}
            <div style={{ background: mode === "dark" ? "#0F0F13" : "#1a1a1e", padding: 28, marginBottom: 24, overflow: "auto" }}>
              <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: "#4D6BFF", letterSpacing: "0.1em", marginBottom: 16 }}>TAILWIND THEME EXTENSION</p>
              <pre style={{ fontFamily: fonts.mono.stack, fontSize: 12, color: "#8B8B95", lineHeight: 2, whiteSpace: "pre-wrap" }}>
{`// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-hover': 'var(--surface-hover)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        'text-dim': 'var(--text-dim)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-soft': 'var(--accent-soft)',
        warm: 'var(--warm)',
        'warm-hover': 'var(--warm-hover)',
        'warm-soft': 'var(--warm-soft)',
      },
      fontFamily: {
        heading: ['Satoshi', 'Inter', 'sans-serif'],
        body: ['Inter', 'Helvetica Neue', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      borderRadius: {
        none: '0px', // enforce everywhere
      },
    },
  },
}`}
              </pre>
            </div>

            {/* File Structure */}
            <div style={{ background: th.surface, border: `1px solid ${th.border}`, padding: 28, transition: "all 0.4s" }}>
              <p style={{ fontFamily: fonts.mono.stack, fontSize: 10, color: th.accent, letterSpacing: "0.1em", marginBottom: 16 }}>PROJECT STRUCTURE</p>
              <pre style={{ fontFamily: fonts.mono.stack, fontSize: 12, color: th.textMuted, lineHeight: 2 }}>
{`vinicius.pm/
├── app/
│   ├── layout.tsx          ← fonts, theme provider, grid overlay
│   ├── page.tsx            ← home (hero, proof, cards, stats, work, social, speaking, cta)
│   ├── work/page.tsx       ← expanded work + timeline
│   └── speaking/page.tsx   ← teaching details + topics + availability
├── components/
│   ├── nav.tsx             ← fixed nav with scroll detection
│   ├── section-label.tsx   ← reusable accent/warm label with line
│   ├── stat-grid.tsx       ← 4-column stats
│   ├── work-row.tsx        ← numbered project row
│   ├── ticker.tsx          ← animated company names
│   ├── topic-card.tsx      ← speaking topic card
│   ├── contact-rows.tsx    ← email/linkedin/location rows
│   ├── grid-overlay.tsx    ← fixed 12-col grid lines
│   └── theme-toggle.tsx    ← dark/light switch
├── styles/
│   └── globals.css         ← CSS variables, base resets, ticker animation
├── tailwind.config.ts
└── next.config.ts`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHead({ th, label, title, sub }) {
  return (
    <div style={{ marginBottom: 24, marginTop: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ width: 24, height: 1, background: th.accent }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: th.accent, letterSpacing: "0.1em" }}>{label}</span>
      </div>
      <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: sub ? 6 : 0 }}>{title}</h2>
      {sub && <p style={{ fontSize: 14, color: th.textMuted, lineHeight: 1.5 }}>{sub}</p>}
    </div>
  );
}
