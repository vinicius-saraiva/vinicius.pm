"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/section-label";
import { StudentMap } from "@/components/student-map";
import { Footer } from "@/components/footer";

function useInView() {
  const [visible, setVisible] = useState<Set<string>>(new Set(["hero"]));
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const name = entry.target.getAttribute("data-section");
              if (name) setVisible((prev) => new Set([...prev, name]));
            }
          });
        },
        { threshold: 0.1 }
      );
    }
    return observerRef.current;
  }, []);

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  const register = useCallback(
    (name: string) => (el: HTMLElement | null) => {
      if (el) {
        el.setAttribute("data-section", name);
        getObserver().observe(el);
      }
    },
    [getObserver]
  );

  return { visible, register };
}

const MODULES = [
  {
    number: "01",
    title: "From Idea to Landing Page",
    subtitle: "Planning",
    desc: "Idea validation, PRD, competitor analysis, branding, and design system. Participants leave with a live landing page collecting signups.",
    builds: "Landing page live",
  },
  {
    number: "02",
    title: "From Plan to Prototype",
    subtitle: "Front-end",
    desc: "Software architecture, Lovable.dev, prompting best practices, debugging, and component libraries. Full clickable prototype with all main screens.",
    builds: "Working prototype",
  },
  {
    number: "03",
    title: "Adding Persistence",
    subtitle: "Backend & Database",
    desc: "Supabase, authentication, database design, Row Level Security, file storage, and realtime features. Data that survives a refresh.",
    builds: "Auth + data persistence",
  },
  {
    number: "04",
    title: "Integrating External Services",
    subtitle: "APIs",
    desc: "API vocabulary, Stripe payments, Edge Functions, webhooks, and external service integration. Products that talk to the real world.",
    builds: "Payments + integrations",
  },
  {
    number: "05",
    title: "The Grand Finale",
    subtitle: "AI & Demo Day",
    desc: "OpenAI integration (text + vision), PostHog analytics, A/B testing, and pitch coaching. Final 1-minute pitch at Demo Day with public vote.",
    builds: "AI feature + final pitch",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The masterclass emphasized an iterative, practical approach — each stage was immediately applicable with peer collaboration benefits.",
    name: "Marco Baldonero",
    role: "Product Owner @ Opyn",
  },
  {
    quote:
      "The tools for rapid prototype creation were revelatory. I built a functional prototype in a fraction of the time I expected.",
    name: "Irene Romanello",
    role: "PM @ Fiscozen",
  },
  {
    quote:
      "Practical exercises with immediate implementation provided concrete best practices and library integration strategies.",
    name: "Laura Serafin",
    role: "Designer @ MUGO",
  },
  {
    quote:
      "Best practice guidance and library recommendations offered immediately deployable solutions.",
    name: "Luca de Franceschi",
    role: "Senior PM @ Intento Inc.",
  },
];

const STATS = [
  { value: "60+", label: "Professionals trained" },
  { value: "3", label: "Seasons" },
  { value: "5", label: "Modules (4h each)" },
  { value: "100%", label: "Online" },
];

const TICKER_COMPANIES = [
  "Beko Europe", "AXA Italia", "PagoPA", "Fiscozen", "Everli", "Eurospin",
  "Mooney", "Lokalise", "ShopFully", "Italiaonline", "Intento", "BizAway",
  "Trainect", "Thales Alenia Space", "MUGO", "Dynamo", "Opyn", "Stayforlong",
  "The Data Appeal Company", "OpenEconomics", "HyWork", "Synthesia",
];

const TOOLS = [
  {
    name: "Claude Code",
    category: "CODING AGENT",
    desc: "AI-powered coding assistant for planning, debugging, and building features through natural language.",
    href: "https://claude.ai",
  },
  {
    name: "Lovable",
    category: "CLOUD IDE",
    desc: "Go from prompt to deployed app. The main tool participants use to build their product from scratch.",
    href: "https://lovable.dev",
  },
  {
    name: "Supabase",
    category: "BACKEND",
    desc: "Auth, database, storage, and realtime — all in one. The backend layer that makes prototypes into real products.",
    href: "https://supabase.com",
  },
  {
    name: "Postman",
    category: "API TESTING",
    desc: "Test and explore APIs hands-on. Participants use it to understand endpoints, methods, and JSON before integrating.",
    href: "https://postman.com",
  },
  {
    name: "PostHog",
    category: "ANALYTICS",
    desc: "Product analytics, funnels, and A/B testing. The last mile — understanding what users actually do.",
    href: "https://posthog.com",
  },
];

const cx = "max-w-[1120px] mx-auto px-6 sm:px-10";

export default function ProductHeroes() {
  const { visible, register } = useInView();
  const is = (name: string) => visible.has(name);

  return (
    <main className="relative z-10">
      {/* ─── HERO ─── */}
      <section
        ref={register("hero")}
        className="min-h-[80vh] flex flex-col justify-center relative pt-14"
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            left: "50%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)",
            filter: "blur(80px)",
            opacity: 0.6,
          }}
        />

        <div
          className={cx}
          style={{
            opacity: is("hero") ? 1 : 0,
            transform: is("hero") ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-dim hover:text-text-muted transition-colors mb-10"
          >
            &larr; Back to home
          </Link>

          <div className="max-w-[720px]">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="font-mono text-[11px] tracking-[0.08em] text-accent px-2.5 py-1"
                style={{ background: "var(--accent-soft)" }}
              >
                PRODUCT HEROES
              </span>
              <span className="font-mono text-[11px] tracking-[0.08em] text-text-dim">
                MASTERCLASS
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-[56px] font-black leading-[1.1] tracking-[-0.04em] mb-6">
              AI for Product<br />
              Builders<span className="text-accent">.</span>
            </h1>

            <p className="text-lg text-text-muted leading-relaxed max-w-[520px]">
              A hands-on masterclass where product people build a real product
              from scratch &mdash; with AI, without writing code. Running
              at{" "}
              <a
                href="https://www.productheroes.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:text-accent transition-colors"
              >
                Product Heroes
              </a>{" "}
              since 2025.
            </p>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section
        ref={register("stats")}
        className="border-t border-b border-border"
        style={{
          opacity: is("stats") ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}
      >
        <div
          className={`${cx} py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0`}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl font-black text-text-primary tracking-tight">
                {stat.value}
              </div>
              <div className="font-mono text-[11px] text-text-dim tracking-[0.06em] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TOOLS ─── */}
      <section
        ref={register("tools")}
        className="pt-24 pb-12"
        style={{
          opacity: is("tools") ? 1 : 0,
          transform: is("tools") ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className={cx}>
          <SectionLabel variant="accent">TOOLBOX</SectionLabel>

          <div className="max-w-[640px] mb-12">
            <h2 className="font-heading text-[32px] font-extrabold text-text-primary tracking-[-0.03em] mb-4">
              The stack we use<span className="text-accent">.</span>
            </h2>
            <p className="text-base text-text-muted leading-relaxed">
              No theory-only slides. Participants get hands-on with real tools used
              by product and engineering teams.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-10 sm:gap-16 flex-wrap px-6">
          {TOOLS.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 group"
            >
              <span className="font-heading text-xl sm:text-2xl font-bold text-text-dim group-hover:text-accent transition-colors">
                {tool.name}
              </span>
              <span className="font-mono text-[10px] text-text-dim tracking-[0.06em]">
                {tool.category}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ─── WHERE STUDENTS WORK ─── */}
      <section ref={register("students")} className="py-24">
        <div
          className={cx}
          style={{
            opacity: is("students") ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}
        >
          <SectionLabel>WHERE STUDENTS WORK</SectionLabel>

          <div className="mb-8">
            <StudentMap />
          </div>
        </div>

        <div
          className="border-t border-border-strong border-b border-b-border py-6 overflow-hidden relative"
          style={{
            opacity: is("students") ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}
        >
          <div className="ticker-track flex gap-10 font-mono text-[13px] text-text-dim tracking-[0.02em] whitespace-nowrap pl-10">
            {[...TICKER_COMPANIES, ...TICKER_COMPANIES].map((name, i) => (
              <span key={i} className="flex items-center gap-2 shrink-0">
                <span
                  className="w-1 h-1 bg-border-strong inline-block"
                  style={{ borderRadius: 1 }}
                />
                {name}
              </span>
            ))}
          </div>
          <div
            className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none"
            style={{ background: "linear-gradient(90deg, var(--bg), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none"
            style={{ background: "linear-gradient(-90deg, var(--bg), transparent)" }}
          />
        </div>
        <div
          className={cx}
          style={{
            opacity: is("students") ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}
        >
          <p className="font-mono text-[11px] text-text-dim mt-3">
            Alumni across product, design, engineering, and leadership roles
          </p>
        </div>
      </section>

      {/* ─── CURRICULUM ─── */}
      <section ref={register("modules")} className="pb-24">
        <div
          className={cx}
          style={{
            opacity: is("modules") ? 1 : 0,
            transform: is("modules") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <SectionLabel variant="accent">CURRICULUM</SectionLabel>

          <div className="max-w-[640px] mb-12">
            <h2 className="font-heading text-[32px] font-extrabold text-text-primary tracking-[-0.03em] mb-4">
              5 modules, 20 hours<span className="text-accent">.</span>
            </h2>
            <p className="text-base text-text-muted leading-relaxed">
              By the end, participants have shipped a real product &mdash; not a deck.
            </p>
          </div>

          <div className="flex flex-col gap-px bg-border">
            {MODULES.map((mod) => (
              <div
                key={mod.number}
                className="bg-surface py-8 px-7 hover:bg-surface-hover transition-colors grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-8 items-start"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-accent tracking-[0.1em]">
                    {mod.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
                    {mod.title}
                    <span className="font-mono text-[11px] text-text-dim tracking-[0.03em] ml-3 font-normal">
                      {mod.subtitle}
                    </span>
                  </h3>
                  <p className="text-[13px] text-text-muted leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <span
                    className="font-mono text-[10px] text-text-dim px-2.5 py-1 tracking-[0.03em] whitespace-nowrap"
                    style={{ background: "var(--accent-soft)" }}
                  >
                    {mod.builds}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─── */}
      <section ref={register("audience")} className="pb-24">
        <div
          className={cx}
          style={{
            opacity: is("audience") ? 1 : 0,
            transform: is("audience") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <SectionLabel>WHO IT&apos;S FOR</SectionLabel>

          <div className="bg-surface p-8 sm:p-10 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: "var(--accent)" }}
            />
            <div className="max-w-[600px]">
              <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-6">
                For anyone in product who wants to
                build, not just plan<span className="text-accent">.</span>
              </h2>
              <ul className="space-y-3">
                {[
                  "PMs who want to prototype and validate without depending on engineering",
                  "Founders who need to test ideas before raising or hiring",
                  "Designers who want to build what they design",
                  "Anyone in product who wants to use AI as real infrastructure, not just a buzzword",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 bg-accent mt-2 shrink-0"
                      style={{ borderRadius: 1 }}
                    />
                    <span className="text-sm text-text-muted leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section ref={register("testimonials")} className="pb-24">
        <div
          className={cx}
          style={{
            opacity: is("testimonials") ? 1 : 0,
            transform: is("testimonials")
              ? "translateY(0)"
              : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <SectionLabel variant="accent">WHAT STUDENTS SAY</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-surface py-8 px-7 flex flex-col justify-between"
              >
                <p className="text-sm text-text-muted leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-heading text-sm font-bold text-text-primary">
                    {t.name}
                  </div>
                  <div className="font-mono text-[11px] text-text-dim tracking-[0.03em]">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
