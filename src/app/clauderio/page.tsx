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
              <span className="text-accent">01.</span> Se inscreva na minha newsletter<span className="text-accent">.</span>
            </h2>

            <h3 className="font-mono text-sm text-text-dim tracking-[0.03em] mb-4">
              Things I Build
            </h3>

            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Escrevo de vez em quando sobre projetos, ferramentas e ideias em que estou trabalhando.
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
              <span className="text-accent">02.</span> Workflow RePPIT<span className="text-accent">.</span>
            </h2>

            <p className="text-sm text-text-muted leading-relaxed mb-6">
              O workflow que uso no dia a dia para construir com agentes: Research, Propose, Plan, Implement, Test.
            </p>

            <a
              href="/reppit"
              onClick={() => posthog.capture("reppit_click", { source: "claude_rio" })}
              className="inline-flex items-center gap-2 font-mono text-[12px] text-accent tracking-[0.03em] hover:text-accent-hover transition-colors"
            >
              Leia o breakdown completo &rarr;
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
              <span className="text-accent">03.</span> Veja meu mapa do Claude Code<span className="text-accent">.</span>
            </h2>

            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Uma vis&atilde;o geral do contexto e ferramentas que forne&ccedil;o para trabalhar diariamente com o Claude Code.
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
            <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-2">
              <span className="text-accent">04.</span> Sess&otilde;es 1:<span className="text-accent">1</span>
            </h2>

            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Abri algumas vagas em Abril pra quem quer aprofundar. A gente trabalha junto no seu setup com Claude Code.
            </p>

            <div className="flex flex-col gap-6">
              <span
                className="inline-block font-mono text-[11px] tracking-[0.06em] font-medium border px-2.5 py-1 w-fit"
                style={{ color: "#25D366", background: "rgba(37, 211, 102, 0.08)", borderColor: "rgba(37, 211, 102, 0.25)" }}
              >
                20% OFF CLAUDERIO
              </span>
              <a
                href="/mentorship"
                onClick={() => posthog.capture("mentorship_click", { source: "claude_rio" })}
                className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-accent-hover transition-colors"
              >
                Ver detalhes
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </a>

              <div className="flex items-center gap-3">
                <span className="text-sm text-text-muted">Outras propostas?</span>
                <a
                  href="https://wa.me/5524992679147"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => posthog.capture("whatsapp_click", { source: "claude_rio" })}
                  className="inline-flex items-center gap-2 font-mono text-[12px] text-text-muted px-4 py-2 border border-border hover:text-accent hover:border-accent transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
