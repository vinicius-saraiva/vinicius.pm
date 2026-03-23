"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Footer } from "@/components/footer";
import { supabase } from "@/lib/supabase";
import posthog from "posthog-js";

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

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.toLowerCase().trim() });

    const subscribedEmail = email.toLowerCase().trim();

    if (error) {
      if (error.code === "23505") {
        posthog.identify(subscribedEmail, { email: subscribedEmail });
        posthog.capture("newsletter_signup", { email: subscribedEmail, source: "claude_rio" });
        setState("done");
      } else {
        setState("error");
      }
    } else {
      posthog.identify(subscribedEmail, { email: subscribedEmail });
      posthog.capture("newsletter_signup", { email: subscribedEmail, source: "claude_rio" });
      setState("done");
    }
  }

  if (state === "done") {
    return (
      <p className="text-sm text-accent font-medium">
        You&apos;re in. Talk soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 min-w-0 bg-surface border border-border px-4 py-2.5 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="font-body text-sm font-semibold text-white bg-accent px-6 py-2.5 hover:bg-accent-hover transition-colors disabled:opacity-50"
      >
        {state === "loading" ? "..." : "Subscribe"}
      </button>
      {state === "error" && (
        <p className="text-sm text-red-500 mt-2">Something went wrong. Try again.</p>
      )}
    </form>
  );
}

function MapImage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => { setOpen(true); posthog.capture("claude_map_click", { source: "claude_rio" }); }}
        className="block border border-border hover:border-accent transition-colors overflow-hidden cursor-zoom-in w-full"
      >
        <img
          src="/clauderio/claude-map.png"
          alt="Claude Code Map"
          className="w-full h-auto"
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center cursor-zoom-out p-4"
          onClick={() => setOpen(false)}
        >
          <img
            src="/clauderio/claude-map.png"
            alt="Claude Code Map"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}

export default function ClaudeRio() {
  const { visible, register } = useInView();
  const is = (name: string) => visible.has(name);

  useEffect(() => {
    posthog.capture("$pageview", { page: "/clauderio", source: "claude_rio" });
  }, []);

  return (
    <main className="relative z-10">
      {/* ─── HEADER ─── */}
      <section ref={register("hero")} className="pt-32 pb-2">
        <div
          className={cx}
          style={{
            opacity: is("hero") ? 1 : 0,
            transform: is("hero") ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[11px] tracking-[0.08em] text-accent px-2.5 py-1"
              style={{ background: "var(--accent-soft)" }}
            >
              CLAUDE RIO
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] text-text-dim">
              23 MAR 2026
            </span>
          </div>
        </div>
      </section>

      {/* ─── 01 NEWSLETTER ─── */}
      <section
        ref={register("newsletter")}
        className="py-12"
      >
        <div
          className={cx}
          style={{
            opacity: is("newsletter") ? 1 : 0,
            transform: is("newsletter") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="max-w-[640px]">
            <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-2">
              <span className="text-accent">01.</span> Sign up for my newsletter<span className="text-accent">.</span>
            </h2>

            <h3 className="font-mono text-sm text-text-dim tracking-[0.03em] mb-4">
              Things I Build
            </h3>

            <p className="text-sm text-text-muted leading-relaxed mb-6">
              I write occasionally about projects, tools, and ideas I&apos;m working on.
              No spam, no fluff &mdash; just the things worth sharing.
            </p>

            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* ─── 02 REPPIT ─── */}
      <section
        ref={register("reppit")}
        className="py-12 border-t border-border"
      >
        <div
          className={cx}
          style={{
            opacity: is("reppit") ? 1 : 0,
            transform: is("reppit") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="max-w-[640px]">
            <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-4">
              <span className="text-accent">02.</span> Check how RePPIT works<span className="text-accent">.</span>
            </h2>

            <p className="text-sm text-text-muted leading-relaxed mb-6">
              The workflow I use to go from a rough idea to a working product with AI.
              Requirements, Pseudocode, Prompt, Implement, Test &mdash; rinse and repeat.
            </p>

            <a
              href="/reppit"
              onClick={() => posthog.capture("reppit_click", { source: "claude_rio" })}
              className="inline-flex items-center gap-2 font-mono text-[12px] text-accent tracking-[0.03em] hover:text-accent-hover transition-colors"
            >
              Read the full breakdown &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ─── CLAUDE CODE MAP ─── */}
      <section
        ref={register("map")}
        className="py-12 border-t border-border"
      >
        <div
          className={cx}
          style={{
            opacity: is("map") ? 1 : 0,
            transform: is("map") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="max-w-[640px]">
            <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-4">
              <span className="text-accent">03.</span> Check out my Claude Code map<span className="text-accent">.</span>
            </h2>

            <p className="text-sm text-text-muted leading-relaxed mb-6">
              A visual overview of how I navigate Claude Code &mdash; the commands, workflows, and mental model behind it.
            </p>

            <MapImage />
          </div>
        </div>
      </section>

      {/* ─── 04 MENTORSHIP ─── */}
      <section
        ref={register("mentorship")}
        className="py-12 border-t border-border"
      >
        <div
          className={cx}
          style={{
            opacity: is("mentorship") ? 1 : 0,
            transform: is("mentorship") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="max-w-[640px]">
            <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-4">
              <span className="text-accent">04.</span> Want to go deeper?<span className="text-accent">.</span>
            </h2>

            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Individual mentorship &mdash; 3 sessions, fully adapted to your needs.
              Claude Code, Supabase, APIs, workflow setup &mdash; whatever you need to unblock.
            </p>

            <a
              href="/mentorship"
              onClick={() => posthog.capture("mentorship_click", { source: "claude_rio" })}
              className="inline-flex items-center gap-2 font-mono text-[12px] text-accent tracking-[0.03em] hover:text-accent-hover transition-colors"
            >
              Learn more &rarr;
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
