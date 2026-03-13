"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/section-label";
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

const EXPERIENCE = [
  {
    period: "2022 — 2025",
    role: "Product Manager",
    company: "iBanFirst",
    companyNote: "",
    location: "Paris",
    desc: "Led client experience across web and mobile for a B2B cross-border payment platform. Owned UX/UI, Open Finance, Authentication, and FX product areas.",
    tags: ["B2B Payments", "Cross-border", "Open Finance", "FX"],
  },
  {
    period: "2022",
    role: "Intern, Innovation Lab",
    company: "Accenture",
    companyNote: "",
    location: "Milan",
    desc: "Innovation lab focused on emerging technologies and digital transformation projects.",
    tags: ["Consulting", "Innovation"],
  },
  {
    period: "2020",
    role: "Intern",
    company: "Startupbootcamp",
    companyNote: "",
    location: "Milan",
    desc: "Supported startups through the accelerator program — market research, pitch preparation, and go-to-market strategy.",
    tags: ["Startups", "Accelerator"],
  },
];

const STONE = {
  period: "2025 — Present",
  role: "Product Manager",
  company: "Stone Co",
  companyNote: "NYSE: STNE",
  location: "Rio de Janeiro",
  desc: "Building consumer banking experiences at Ton, Stone's consumer brand. Paycheck accounts, credit cards, cashback, investments, and Pix for millions of users across Brazil.",
  tags: ["Fintech", "Consumer Banking", "Cards", "Pix", "Growth"],
};

const EDUCATION = [
  {
    period: "2019 — 2022",
    school: "Bocconi University",
    degree: "BSc in Economics and Finance",
    location: "Milan",
    note: "Thesis: Business Model Strategy of Financial Super-Apps — Banco Inter Case Study. Member of JEME Bocconi, Junior Enterprise.",
  },
  {
    period: "2018 — 2019",
    school: "Dartmouth College",
    degree: "B.A. in Economics",
    location: "New Hampshire",
    note: "Dartmouth Entrepreneurial Network, TuckLAB Startup Ideation Program",
  },
];

const CERTIFICATIONS = [
  { name: "SAFe 6.0 Product Manager / Product Owner", org: "Scaled Agile", year: "2024" },
  { name: "Professional Scrum Product Owner I (PSPO I)", org: "Scrum.org", year: "2024" },
  { name: "AI Product Management Specialization", org: "Duke University", year: "2024" },
];

const LANGUAGES = [
  { lang: "English", level: "Native" },
  { lang: "Portuguese", level: "Native" },
  { lang: "Italian", level: "Native" },
  { lang: "French", level: "Fluent" },
];

const cx = "max-w-[1120px] mx-auto px-6 sm:px-10";

export default function Work() {
  const { visible, register } = useInView();
  const is = (name: string) => visible.has(name);

  return (
    <main className="relative z-10">
      {/* ─── HERO ─── */}
      <section
        ref={register("hero")}
        className="min-h-[60vh] flex flex-col justify-center relative pt-14"
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            left: "55%",
            width: 500,
            height: 500,
            background: "radial-gradient(circle, var(--warm-soft) 0%, transparent 65%)",
            filter: "blur(80px)",
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
                className="font-mono text-[11px] tracking-[0.08em] text-warm px-2.5 py-1"
                style={{ background: "var(--warm-soft)" }}
              >
                STONE CO
              </span>
              <span className="font-mono text-[11px] tracking-[0.08em] text-text-dim">
                NYSE: STNE
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-[56px] font-black leading-[1.1] tracking-[-0.04em] mb-6">
              Product Manager<br />
              building fintech at scale<span className="text-warm">.</span>
            </h1>
            <p className="text-lg text-text-muted leading-relaxed max-w-[520px]">
              Based in Rio de Janeiro, previously Paris and Milan.
            </p>
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section ref={register("experience")} className="py-24">
        <div
          className={cx}
          style={{
            opacity: is("experience") ? 1 : 0,
            transform: is("experience") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <SectionLabel variant="warm">EXPERIENCE</SectionLabel>

          <div className="flex flex-col gap-px bg-border">
            {/* Stone Co — featured */}
            <div className="bg-surface py-8 px-7 hover:bg-surface-hover transition-colors grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 sm:gap-8 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "var(--warm)" }}
              />
              <div>
                <span className="font-mono text-[11px] text-text-dim tracking-[0.03em]">
                  {STONE.period}
                </span>
                <div className="font-mono text-[11px] text-text-dim mt-1">
                  {STONE.location}
                </div>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
                  {STONE.company}
                  <span className="font-mono text-[11px] text-text-dim tracking-[0.03em] ml-2 font-normal">
                    ({STONE.companyNote})
                  </span>
                  <span className="font-mono text-[11px] text-text-dim tracking-[0.03em] ml-3 font-normal">
                    {STONE.role}
                  </span>
                </h3>
                <p className="text-[13px] text-text-muted leading-relaxed mb-3">
                  {STONE.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {STONE.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-text-dim px-2.5 py-1 tracking-[0.03em]"
                      style={{ background: "var(--warm-soft)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Other experience */}
            {EXPERIENCE.map((job) => (
              <div
                key={`${job.company}-${job.period}`}
                className="bg-surface py-8 px-7 hover:bg-surface-hover transition-colors grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 sm:gap-8"
              >
                <div>
                  <span className="font-mono text-[11px] text-text-dim tracking-[0.03em]">
                    {job.period}
                  </span>
                  <div className="font-mono text-[11px] text-text-dim mt-1">
                    {job.location}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
                    {job.company}
                    {job.companyNote && (
                      <span className="font-mono text-[11px] text-text-dim tracking-[0.03em] ml-2 font-normal">
                        ({job.companyNote})
                      </span>
                    )}
                    <span className="font-mono text-[11px] text-text-dim tracking-[0.03em] ml-3 font-normal">
                      {job.role}
                    </span>
                  </h3>
                  <p className="text-[13px] text-text-muted leading-relaxed mb-3">
                    {job.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-text-dim px-2.5 py-1 tracking-[0.03em]"
                        style={{ background: "var(--warm-soft)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDUCATION ─── */}
      <section ref={register("education")} className="pb-24">
        <div
          className={cx}
          style={{
            opacity: is("education") ? 1 : 0,
            transform: is("education") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <SectionLabel variant="warm">EDUCATION</SectionLabel>

          <div className="flex flex-col gap-px bg-border">
            {EDUCATION.map((edu) => (
              <div
                key={edu.school}
                className="bg-surface py-8 px-7 hover:bg-surface-hover transition-colors grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 sm:gap-8"
              >
                <div>
                  <span className="font-mono text-[11px] text-text-dim tracking-[0.03em]">
                    {edu.period}
                  </span>
                  <div className="font-mono text-[11px] text-text-dim mt-1">
                    {edu.location}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
                    {edu.school}
                  </h3>
                  <p className="text-[13px] text-text-muted leading-relaxed">
                    {edu.degree}
                  </p>
                  <p className="text-[12px] text-text-dim leading-relaxed mt-2 italic">
                    {edu.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS & LANGUAGES ─── */}
      <section ref={register("certs")} className="pb-24">
        <div
          className={cx}
          style={{
            opacity: is("certs") ? 1 : 0,
            transform: is("certs") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Certifications */}
            <div>
              <SectionLabel variant="warm">CERTIFICATIONS</SectionLabel>
              <div className="flex flex-col gap-px bg-border">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.name}
                    className="bg-surface py-5 px-7"
                  >
                    <h3 className="font-heading text-sm font-bold text-text-primary mb-1">
                      {cert.name}
                    </h3>
                    <span className="font-mono text-[11px] text-text-dim tracking-[0.03em]">
                      {cert.org} &middot; {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <SectionLabel variant="warm">LANGUAGES</SectionLabel>
              <div className="flex flex-col gap-px bg-border">
                {LANGUAGES.map((l) => (
                  <div
                    key={l.lang}
                    className="bg-surface py-5 px-7 flex justify-between items-center"
                  >
                    <span className="font-heading text-sm font-bold text-text-primary">
                      {l.lang}
                    </span>
                    <span className="font-mono text-[11px] text-text-dim tracking-[0.03em]">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="warm" />
    </main>
  );
}
