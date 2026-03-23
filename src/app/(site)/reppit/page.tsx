"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
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

const cx = "max-w-[1120px] mx-auto px-6 sm:px-10";

const PHASES = [
  {
    number: "01",
    letter: "Re",
    name: "Research",
    short: "Understand what exists before changing anything.",
    desc: "Document the current state of your codebase. Decompose the problem into focused areas, explore relevant files, and produce a structured document with findings, code references, and cross-component connections.",
    prompt: "Research and document the existing codebase exactly as it is today. No improvements, no suggestions — just what's there.",
    output: "Research document with high-level summary, detailed findings by area, and file path references.",
  },
  {
    number: "02",
    letter: "P",
    name: "Propose",
    short: "Generate options, not code.",
    desc: "With research in hand, ask for two or three distinct solution proposals. Each grounded in what you actually found. Describe the approach, key changes, trade-offs, validation strategy, and open questions.",
    prompt: "Given this research and this feature request, generate two distinct solution proposals. Stay grounded in the research findings.",
    output: "Two or three proposals with trade-offs, risks, and open questions surfaced before any code is written.",
  },
  {
    number: "03",
    letter: "P",
    name: "Plan",
    short: "Turn the chosen proposal into a contract.",
    desc: "Pick a direction and draft an actionable implementation plan — a design document with clear scope, requirements, design decisions, and steps. Cover testing and rollout only when relevant.",
    prompt: "Clarify scope and constraints. Draft a plan covering context, requirements, design decisions, and implementation steps. Do not implement anything — only plan.",
    output: "A concise plan document — the contract between you and the agent about what will be built.",
  },
  {
    number: "04",
    letter: "I",
    name: "Implement",
    short: "Now — and only now — write code.",
    desc: "All the context lives in the plan. The implementation prompt is deliberately minimal because all the upfront work already happened. Implementation becomes execution, not exploration.",
    prompt: "Implement the plan described in the plan document.",
    output: "Working code that follows the plan. Focused, scoped, no surprises.",
  },
  {
    number: "05",
    letter: "T",
    name: "Test",
    short: "Review everything with fresh eyes.",
    desc: "Look at all uncommitted changes and produce prioritized action items. Analyze for security, performance, consistency, missing edge cases, and integration risks.",
    prompt: "Review all uncommitted changes. Produce a prioritized action list — must-fix, recommended, and consider.",
    output: "A clear checklist before committing. Catches what you missed.",
  },
];

export default function RePPIT() {
  const { visible, register } = useInView();
  const is = (name: string) => visible.has(name);

  return (
    <main className="relative z-10">
      {/* ─── HERO ─── */}
      <section
        ref={register("hero")}
        className="pt-32 pb-16 relative overflow-hidden"
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            left: "50%",
            width: 500,
            height: 500,
            background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)",
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
            href="/clauderio"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-dim hover:text-text-muted transition-colors mb-10"
          >
            &larr; Back to Claude Rio
          </Link>

          <div className="max-w-[720px]">
            <h1 className="font-heading text-4xl sm:text-[56px] font-black leading-[1.1] tracking-[-0.04em] mb-6">
              The RePPIT Workflow<span className="text-accent">.</span>
            </h1>

            <p className="text-lg text-text-muted leading-relaxed max-w-[600px] mb-4">
              A simple framework for building with AI coding agents.
              Five phases, each one constraining the next. Research, Propose, Plan, Implement, Test.
            </p>

            <p className="text-sm text-text-dim leading-relaxed max-w-[600px]">
              I learned this from{" "}
              <a
                href="https://www.mihaileric.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors"
              >
                Mihail Eric&apos;s
              </a>{" "}
              AI Software Development course. It completely changed the way I work with Claude Code.
              All credit to him for putting this together.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHY ─── */}
      <section
        ref={register("why")}
        className="py-16 border-t border-border"
      >
        <div
          className={cx}
          style={{
            opacity: is("why") ? 1 : 0,
            transform: is("why") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="max-w-[640px]">
            <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-4">
              Why you need a workflow<span className="text-accent">.</span>
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              If you&apos;ve used AI coding agents, you know the temptation: dump your entire
              feature request in one shot and hope for the best. Sometimes it works. Most of
              the time, you get code that misses context, ignores constraints, or solves the wrong problem.
            </p>
            <p className="text-sm text-text-muted leading-relaxed">
              RePPIT forces you to slow down just enough to get dramatically better results.
              Each phase is a separate prompt, a separate conversation turn, a separate moment of clarity.
            </p>
          </div>
        </div>
      </section>

      {/* ─── THE FIVE PHASES ─── */}
      <section ref={register("phases")} className="pb-16 border-t border-border">
        <div
          className={cx}
          style={{
            opacity: is("phases") ? 1 : 0,
            transform: is("phases") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="pt-16 mb-12">
            <h2 className="font-heading text-[32px] font-extrabold text-text-primary tracking-[-0.03em]">
              The five phases<span className="text-accent">.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-px bg-border">
            {PHASES.map((phase) => (
              <div
                key={phase.number}
                className="bg-surface p-8 sm:p-10 hover:bg-surface-hover transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono text-[11px] text-accent tracking-[0.1em]">
                    {phase.number}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                    {phase.name}
                  </h3>
                </div>

                <p className="font-heading text-base font-semibold text-text-primary mb-3">
                  {phase.short}
                </p>

                <p className="text-sm text-text-muted leading-relaxed mb-6 max-w-[640px]">
                  {phase.desc}
                </p>

                <div
                  className="border-l-2 border-accent pl-4 py-3 mb-4"
                  style={{ background: "var(--accent-soft)" }}
                >
                  <span className="font-mono text-[10px] text-text-dim tracking-[0.08em] block mb-1.5">
                    CORE PROMPT
                  </span>
                  <p className="text-sm text-text-primary leading-relaxed italic">
                    &ldquo;{phase.prompt}&rdquo;
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-text-dim tracking-[0.08em] mt-0.5 shrink-0">
                    OUTPUT
                  </span>
                  <p className="text-[13px] text-text-dim leading-relaxed">
                    {phase.output}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY IT WORKS ─── */}
      <section ref={register("works")} className="py-16 border-t border-border">
        <div
          className={cx}
          style={{
            opacity: is("works") ? 1 : 0,
            transform: is("works") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="max-w-[640px] mb-12">
            <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-4">
              Why it works<span className="text-accent">.</span>
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Each phase constrains the next one. Research prevents the agent from
              hallucinating context. Proposals prevent premature commitment. The plan
              prevents scope creep. Implementation stays focused. Review catches what
              slipped through.
            </p>
            <p className="text-sm text-text-muted leading-relaxed">
              You&apos;re not asking the AI to do less &mdash; you&apos;re asking it to do one
              thing at a time, and do it well.
            </p>
          </div>

          <img
            src="/reppit/badresearch.png"
            alt="Bad research compounds into bad plans and bad code"
            className="w-full max-w-[640px] h-auto mt-8"
          />
          <p className="font-mono text-[11px] text-text-dim mt-4 tracking-[0.03em]">
            Small gaps in research compound into big problems in code.
          </p>
        </div>
      </section>

      {/* ─── GETTING STARTED ─── */}
      <section ref={register("start")} className="py-16 border-t border-border">
        <div
          className={cx}
          style={{
            opacity: is("start") ? 1 : 0,
            transform: is("start") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="max-w-[640px]">
            <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-4">
              Getting started<span className="text-accent">.</span>
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              You don&apos;t need a fancy setup. Just use these phases as separate prompts
              in your AI coding workflow. Start with Research, let it finish, then move
              to Propose, and so on.
            </p>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              The discipline of separating the phases is the whole point. Give it a try
              on your next feature &mdash; you&apos;ll be surprised how much better the output
              gets when you stop asking your agent to do everything at once.
            </p>
            <p className="text-xs text-text-dim leading-relaxed italic mb-6">
              This workflow was created by{" "}
              <a
                href="https://www.mihaileric.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors"
              >
                Mihail Eric
              </a>
              . I&apos;m sharing what I learned in his course because it genuinely improved
              how I build software with AI agents.
            </p>

            <a
              href="https://themodernsoftware.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[12px] text-accent tracking-[0.03em] hover:text-accent-hover transition-colors"
            >
              Check out Mihail&apos;s Stanford course &rarr;
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
