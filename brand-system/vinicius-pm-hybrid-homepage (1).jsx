import { useState, useEffect, useRef } from "react";

// ─── THEME ────────────────────────────────────────────────
const t = {
  bg: "#08080A",
  surface: "#0F0F13",
  surfaceHover: "#151519",
  border: "#1E1E24",
  borderStrong: "#2A2A32",
  text: "#EDEDF0",
  textMuted: "#8B8B95",
  textDim: "#505058",
  accent: "#4D6BFF",       // electric blue — colder than Contrast's, more premium than Terminal's green
  accentHover: "#3B55E0",
  accentSoft: "rgba(77,107,255,0.08)",
  accentGlow: "rgba(77,107,255,0.15)",
  warm: "#E8C47C",         // warm gold for select highlights — the human touch
  warmSoft: "rgba(232,196,124,0.08)",
  heading: "'Satoshi', 'Inter', sans-serif",
  body: "'Inter', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', monospace",
};

// ─── MAIN COMPONENT ──────────────────────────────────────
export default function ViniciusPM() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const registerRef = (name) => (el) => {
    if (el) {
      el.dataset.section = name;
      sectionRefs.current[name] = el;
    }
  };

  const isVisible = (name) => visibleSections.has(name);

  return (
    <div style={{ fontFamily: t.body, background: t.bg, color: t.text, minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Satoshi:ital,wght@0,400;0,500;0,700;0,800;0,900;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />

      {/* ─── GRID OVERLAY ─── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(90deg, ${t.border} 1px, transparent 1px)`,
        backgroundSize: "calc((100vw - 80px) / 12) 100%",
        backgroundPosition: "40px 0",
        opacity: 0.25,
      }} />

      {/* ─── NAV ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 56,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 40px",
        background: scrollY > 20 ? "rgba(8,8,10,0.85)" : "transparent",
        backdropFilter: scrollY > 20 ? "blur(12px) saturate(1.2)" : "none",
        borderBottom: scrollY > 20 ? `1px solid ${t.border}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <span style={{ fontFamily: t.mono, fontSize: 14, fontWeight: 500, color: t.text, letterSpacing: "-0.01em" }}>
          vinicius<span style={{ color: t.textDim }}>.pm</span>
        </span>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Work", "Speaking"].map((link) => (
            <span key={link} style={{ fontFamily: t.body, fontSize: 13, fontWeight: 500, color: t.textMuted, cursor: "pointer", transition: "color 0.2s" }}>
              {link}
            </span>
          ))}
          <span style={{
            fontFamily: t.mono, fontSize: 12, color: t.accent,
            border: `1px solid ${t.accent}`,
            padding: "6px 16px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}>
            Contact
          </span>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section
        ref={registerRef("hero")}
        style={{
          minHeight: "100vh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "0 40px",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div style={{
          position: "absolute", top: "15%", left: "55%",
          width: 500, height: 500,
          background: `radial-gradient(circle, ${t.accentGlow} 0%, transparent 65%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "relative", maxWidth: 720,
          opacity: isVisible("hero") ? 1 : 0,
          transform: isVisible("hero") ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <p style={{
            fontFamily: t.mono, fontSize: 12, color: t.accent,
            letterSpacing: "0.08em", marginBottom: 28,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ width: 24, height: 1, background: t.accent, display: "inline-block" }} />
            RIO DE JANEIRO
          </p>

          <h1 style={{
            fontFamily: t.heading,
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            marginBottom: 24,
          }}>
            Product Manager<br />
            at Stone Co<span style={{ color: t.accent }}>.</span>
          </h1>

          <p style={{
            fontSize: 18, fontWeight: 400, color: t.textMuted,
            lineHeight: 1.6, maxWidth: 480, marginBottom: 40,
          }}>
            I teach product teams how to build with AI.
            <br />
            <span style={{ color: t.textDim }}>
              Guest instructor at Product Heroes · 60+ PMs trained.
            </span>
          </p>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{
              fontFamily: t.body, fontSize: 14, fontWeight: 600,
              color: "#FFF", background: t.accent,
              padding: "12px 28px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}>
              Get in Touch
            </span>
            <span style={{
              fontFamily: t.body, fontSize: 14, fontWeight: 500,
              color: t.textMuted,
              padding: "12px 0",
              cursor: "pointer",
              borderBottom: `1px solid ${t.borderStrong}`,
              transition: "color 0.2s",
            }}>
              View Work →
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 40, left: 40,
          display: "flex", alignItems: "center", gap: 8,
          opacity: scrollY > 100 ? 0 : 0.4,
          transition: "opacity 0.3s",
        }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${t.textDim}, transparent)` }} />
          <span style={{ fontFamily: t.mono, fontSize: 10, color: t.textDim, letterSpacing: "0.08em", writingMode: "vertical-rl" }}>
            SCROLL
          </span>
        </div>
      </section>

      {/* ─── PROOF BAR ─── */}
      <section
        ref={registerRef("proof")}
        style={{
          borderTop: `1px solid ${t.border}`,
          borderBottom: `1px solid ${t.border}`,
          padding: "20px 40px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          opacity: isVisible("proof") ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}
      >
        {["Stone Co (NYSE: STNE)", "Product Heroes", "Bocconi University", "Dartmouth College", "iBanFirst"].map((name, i) => (
          <span key={i} style={{
            fontFamily: t.mono, fontSize: 11, color: t.textDim,
            letterSpacing: "0.03em",
            opacity: 0.7,
          }}>
            {name}
          </span>
        ))}
      </section>

      {/* ─── WHAT I DO ─── */}
      <section
        ref={registerRef("whatido")}
        style={{ padding: "96px 40px" }}
      >
        <div style={{
          opacity: isVisible("whatido") ? 1 : 0,
          transform: isVisible("whatido") ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48 }}>
            <span style={{ width: 24, height: 1, background: t.accent }} />
            <span style={{ fontFamily: t.mono, fontSize: 11, color: t.accent, letterSpacing: "0.1em" }}>WHAT I DO</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: t.border }}>
            {[
              {
                label: "BUILD",
                title: "Consumer Banking at Scale",
                desc: "I lead credit cards, Pix, investments, and account engagement for Ton — Stone's consumer brand serving millions of individual users across Brazil.",
                tags: ["Fintech", "Growth", "Cards", "Pix"],
                metric: "4M+ users",
              },
              {
                label: "TEACH",
                title: "AI for Product Teams",
                desc: "I train product managers, designers, and founders on integrating AI into their workflows — not as a novelty, but as core infrastructure for modern product development.",
                tags: ["AI", "Education", "Workshops"],
                metric: "60+ PMs trained",
              },
            ].map((card, i) => (
              <div key={i} style={{
                background: t.surface,
                padding: 40,
                position: "relative",
                overflow: "hidden",
                transition: "background 0.3s",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: i === 0 ? t.accent : t.warm,
                }} />
                <p style={{
                  fontFamily: t.mono, fontSize: 10,
                  color: i === 0 ? t.accent : t.warm,
                  letterSpacing: "0.12em", marginBottom: 20,
                }}>
                  {card.label}
                </p>
                <h3 style={{
                  fontFamily: t.heading, fontSize: 24, fontWeight: 800,
                  color: t.text, letterSpacing: "-0.02em", marginBottom: 12,
                }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.7, marginBottom: 24 }}>
                  {card.desc}
                </p>
                <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
                  {card.tags.map((tag, ti) => (
                    <span key={ti} style={{
                      fontFamily: t.mono, fontSize: 10, color: t.textDim,
                      background: i === 0 ? t.accentSoft : t.warmSoft,
                      padding: "4px 10px",
                      letterSpacing: "0.03em",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 16 }}>
                  <span style={{
                    fontFamily: t.mono, fontSize: 20, fontWeight: 700,
                    color: i === 0 ? t.accent : t.warm,
                  }}>
                    {card.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section
        ref={registerRef("stats")}
        style={{ padding: "0 40px 96px" }}
      >
        <div style={{
          opacity: isVisible("stats") ? 1 : 0,
          transform: isVisible("stats") ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
        }}>
          <div style={{
            borderTop: `2px solid ${t.borderStrong}`,
            borderBottom: `1px solid ${t.border}`,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}>
            {[
              { value: "4M+", label: "USERS IMPACTED", sub: "Stone · Ton" },
              { value: "60+", label: "PMS TRAINED", sub: "Product Heroes" },
              { value: "$2B+", label: "COMPANY VALUE", sub: "NYSE: STNE" },
              { value: "4", label: "COUNTRIES", sub: "BR · IT · US · FR" },
            ].map((stat, i) => (
              <div key={i} style={{
                padding: "32px 28px",
                borderRight: i < 3 ? `1px solid ${t.border}` : "none",
                transition: "background 0.3s",
              }}>
                <p style={{
                  fontFamily: t.heading, fontSize: 40, fontWeight: 900,
                  color: t.text, lineHeight: 1,
                  letterSpacing: "-0.04em", marginBottom: 8,
                }}>
                  {stat.value}
                </p>
                <p style={{
                  fontFamily: t.mono, fontSize: 10, color: t.textDim,
                  letterSpacing: "0.1em", marginBottom: 4,
                }}>
                  {stat.label}
                </p>
                <p style={{ fontFamily: t.body, fontSize: 12, color: t.textMuted }}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SELECTED WORK ─── */}
      <section
        ref={registerRef("work")}
        style={{ padding: "0 40px 96px" }}
      >
        <div style={{
          opacity: isVisible("work") ? 1 : 0,
          transform: isVisible("work") ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 24, height: 1, background: t.accent }} />
              <span style={{ fontFamily: t.mono, fontSize: 11, color: t.accent, letterSpacing: "0.1em" }}>SELECTED WORK</span>
            </div>
            <span style={{ fontFamily: t.mono, fontSize: 12, color: t.textDim, cursor: "pointer" }}>
              View All →
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 1, background: t.border }}>
            {[
              {
                num: "01",
                title: "Credit Card Activation Funnel",
                desc: "Redesigned onboarding flow for Ton's collateralized credit card. Identified drop-off points through Amplitude cohort analysis, ran A/B tests on 3 activation variants.",
                result: "+34% activation rate",
                year: "2025",
              },
              {
                num: "02",
                title: "Cash-In Facilitation",
                desc: "Repositioned the deposit button and simplified cash-in flows. Ran controlled experiments measuring incremental deposit frequency across user segments.",
                result: "+18% deposit frequency",
                year: "2025",
              },
              {
                num: "03",
                title: "AI per Product Builder",
                desc: "Designed and delivered a masterclass at Product Heroes (Italy's largest PM community). Curriculum covers prompt engineering, AI prototyping, and AI-native product strategy.",
                result: "60+ PMs trained",
                year: "2024–25",
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: t.surface,
                padding: "28px 32px",
                display: "grid",
                gridTemplateColumns: "48px 1fr auto",
                gap: 24,
                alignItems: "start",
                cursor: "pointer",
                transition: "background 0.2s",
              }}>
                <span style={{
                  fontFamily: t.mono, fontSize: 12, color: t.textDim,
                  paddingTop: 4,
                }}>
                  {item.num}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: t.heading, fontSize: 18, fontWeight: 700,
                    color: t.text, letterSpacing: "-0.01em", marginBottom: 6,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, maxWidth: 480 }}>
                    {item.desc}
                  </p>
                </div>
                <div style={{ textAlign: "right", paddingTop: 2 }}>
                  <p style={{
                    fontFamily: t.mono, fontSize: 14, fontWeight: 700,
                    color: t.accent, marginBottom: 4,
                  }}>
                    {item.result}
                  </p>
                  <p style={{ fontFamily: t.mono, fontSize: 10, color: t.textDim }}>
                    {item.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section
        ref={registerRef("social")}
        style={{ padding: "0 40px 96px" }}
      >
        <div style={{
          opacity: isVisible("social") ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ width: 24, height: 1, background: t.accent }} />
            <span style={{ fontFamily: t.mono, fontSize: 11, color: t.accent, letterSpacing: "0.1em" }}>WHERE MY STUDENTS WORK</span>
          </div>

          <div style={{
            borderTop: `1px solid ${t.borderStrong}`,
            borderBottom: `1px solid ${t.border}`,
            padding: "24px 0",
            overflow: "hidden",
            position: "relative",
          }}>
            <div style={{
              display: "flex", gap: 40,
              fontFamily: t.mono, fontSize: 13, color: t.textDim,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              animation: "ticker 25s linear infinite",
            }}>
              {["Google", "Nubank", "Stone", "iFood", "VTEX", "MercadoLibre", "Stripe", "Wise", "BTG Pactual", "XP Inc", "Rappi", "QuintoAndar",
                "Google", "Nubank", "Stone", "iFood", "VTEX", "MercadoLibre", "Stripe", "Wise", "BTG Pactual", "XP Inc", "Rappi", "QuintoAndar",
              ].map((name, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 4, height: 4, borderRadius: 1, background: t.borderStrong, display: "inline-block" }} />
                  {name}
                </span>
              ))}
            </div>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(90deg, ${t.bg}, transparent)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(-90deg, ${t.bg}, transparent)`, pointerEvents: "none" }} />
          </div>
          <p style={{ fontFamily: t.mono, fontSize: 11, color: t.textDim, marginTop: 12 }}>
            +40 more companies across Brazil, Europe, and the US
          </p>
        </div>
      </section>

      {/* ─── SPEAKING ─── */}
      <section
        ref={registerRef("speaking")}
        style={{ padding: "0 40px 96px" }}
      >
        <div style={{
          opacity: isVisible("speaking") ? 1 : 0,
          transform: isVisible("speaking") ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48 }}>
            <span style={{ width: 24, height: 1, background: t.warm }} />
            <span style={{ fontFamily: t.mono, fontSize: 11, color: t.warm, letterSpacing: "0.1em" }}>SPEAKING & TEACHING</span>
          </div>

          <div style={{ maxWidth: 640, marginBottom: 40 }}>
            <h2 style={{
              fontFamily: t.heading, fontSize: 32, fontWeight: 800,
              color: t.text, letterSpacing: "-0.03em", marginBottom: 16,
            }}>
              I teach from the inside<span style={{ color: t.warm }}>.</span>
            </h2>
            <p style={{ fontSize: 16, color: t.textMuted, lineHeight: 1.7 }}>
              Not theory from an ex-PM. Real frameworks from someone building financial products for millions of users — right now. My masterclass at Product Heroes has trained 60+ product professionals across 9 cohorts.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: t.border }}>
            {[
              { topic: "AI for Product Teams", desc: "Practical integration of AI tools into product workflows. From discovery to shipping.", icon: "⚡" },
              { topic: "Fintech Product Strategy", desc: "Building cards, payments, and credit products in regulated emerging markets.", icon: "◆" },
              { topic: "Growth in Consumer Banking", desc: "Activation funnels, engagement loops, and cohort-driven experimentation.", icon: "△" },
            ].map((card, i) => (
              <div key={i} style={{
                background: t.surface,
                padding: "32px 28px",
                transition: "background 0.3s",
              }}>
                <span style={{ fontSize: 18, display: "block", marginBottom: 16, opacity: 0.5 }}>{card.icon}</span>
                <h3 style={{
                  fontFamily: t.heading, fontSize: 16, fontWeight: 700,
                  color: t.text, marginBottom: 8,
                }}>
                  {card.topic}
                </h3>
                <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / FOOTER ─── */}
      <section
        ref={registerRef("cta")}
        style={{
          padding: "96px 40px",
          borderTop: `1px solid ${t.border}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", bottom: "-20%", right: "10%",
          width: 400, height: 400,
          background: `radial-gradient(circle, ${t.accentGlow} 0%, transparent 60%)`,
          filter: "blur(100px)", pointerEvents: "none",
        }} />

        <div style={{
          position: "relative",
          opacity: isVisible("cta") ? 1 : 0,
          transform: isVisible("cta") ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ maxWidth: 520 }}>
            <h2 style={{
              fontFamily: t.heading, fontSize: 48, fontWeight: 900,
              color: t.text, letterSpacing: "-0.04em", marginBottom: 16,
              lineHeight: 1.05,
            }}>
              Let's build<br />something<span style={{ color: t.accent }}>.</span>
            </h2>
            <p style={{ fontSize: 16, color: t.textMuted, lineHeight: 1.7, marginBottom: 40 }}>
              Open to senior PM roles, corporate training, and speaking engagements. Currently based in Rio de Janeiro — available for remote work worldwide.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 1, background: t.border, marginBottom: 64 }}>
              {[
                { label: "Email", value: "vinicius@pm.me", accent: true },
                { label: "LinkedIn", value: "/in/viniciuspm →", accent: false },
                { label: "Location", value: "Rio de Janeiro, Brazil", accent: false },
              ].map((row, i) => (
                <div key={i} style={{
                  background: t.surface,
                  padding: "16px 24px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  cursor: i < 2 ? "pointer" : "default",
                  transition: "background 0.2s",
                }}>
                  <span style={{ fontFamily: t.body, fontSize: 14, fontWeight: 600, color: t.text }}>{row.label}</span>
                  <span style={{
                    fontFamily: t.mono, fontSize: 13,
                    color: row.accent ? t.accent : t.textMuted,
                  }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderTop: `1px solid ${t.border}`, paddingTop: 24,
          }}>
            <span style={{ fontFamily: t.mono, fontSize: 11, color: t.textDim }}>
              © 2026 · vinicius.pm
            </span>
            <span style={{ fontFamily: t.mono, fontSize: 11, color: t.textDim }}>
              Built with Next.js · Deployed on Vercel
            </span>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${t.accentSoft}; color: ${t.accent}; }
      `}</style>
    </div>
  );
}
