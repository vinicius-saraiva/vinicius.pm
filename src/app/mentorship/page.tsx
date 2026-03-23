"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/footer";
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

const PAYMENT_LINK = "https://payment-link-v3.stone.com.br/pl_9NywRQEg245ezbDC1tn8P07ArXjbYq6o";

const SESSIONS = [
  {
    number: "01",
    title: "Diagn\u00f3stico",
    desc: "Entendo seu contexto, stack e objetivos. Sa\u00edmos com o Claude Code configurado e um plano claro do que atacar.",
    topics: ["Seu workflow e onde voc\u00ea trava hoje", "Setup completo do Claude Code", "Plano das pr\u00f3ximas sess\u00f5es"],
  },
  {
    number: "02",
    title: "Deep Dive",
    desc: "Mergulhamos no que importa pra voc\u00ea. Pode ser APIs, banco de dados, prompt engineering. A gente constr\u00f3i junto.",
    topics: ["T\u00f3pico escolhido por voc\u00ea", "Construindo algo real de ponta a ponta", "Debugging e resolu\u00e7\u00e3o de problemas"],
  },
  {
    number: "03",
    title: "Refinamento",
    desc: "Revisamos o que voc\u00ea construiu, resolvemos o que ficou travado e te deixo com autonomia pra continuar sozinho.",
    topics: ["Revis\u00e3o do que foi constru\u00eddo", "Resolver o que ficou pendente", "Autonomia pra seguir evoluindo"],
  },
];

export default function Mentorship() {
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
            &larr; Voltar para Claude Rio
          </Link>

          <div className="max-w-[720px]">
            <div className="flex items-center gap-3 mb-8">
              <span
                className="font-mono text-[11px] tracking-[0.08em] text-accent px-2.5 py-1"
                style={{ background: "var(--accent-soft)" }}
              >
                SESS&Otilde;ES INDIVIDUAIS
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-[56px] font-black leading-[1.1] tracking-[-0.04em] mb-6">
              Sess&otilde;es 1:<span className="text-accent">1</span>
            </h1>

            <p className="text-lg text-text-muted leading-relaxed max-w-[600px] mb-6">
              Abri alguns hor&aacute;rios em Abril pra quem quiser aprofundar.
              A gente trabalha junto no seu setup com Claude Code.
            </p>

          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section ref={register("sessions")} className="pb-16 border-t border-border">
        <div
          className={cx}
          style={{
            opacity: is("sessions") ? 1 : 0,
            transform: is("sessions") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="pt-16 mb-12">
            <h2 className="font-heading text-[32px] font-extrabold text-text-primary tracking-[-0.03em]">
              Como funciona<span className="text-accent">.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-px bg-border">
            {SESSIONS.map((session) => (
              <div
                key={session.number}
                className="bg-surface p-8 sm:p-10 hover:bg-surface-hover transition-colors"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-mono text-[11px] text-accent tracking-[0.1em]">
                    {session.number}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                    {session.title}
                  </h3>
                </div>

                <p className="text-sm text-text-muted leading-relaxed mb-5 max-w-[640px]">
                  {session.desc}
                </p>

                <ul className="space-y-1.5">
                  {session.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2.5">
                      <span
                        className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0"
                        style={{ borderRadius: 1 }}
                      />
                      <span className="text-[13px] text-text-dim leading-relaxed">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOPICS ─── */}
      <section
        ref={register("topics")}
        className="py-16 border-t border-border"
      >
        <div
          className={cx}
          style={{
            opacity: is("topics") ? 1 : 0,
            transform: is("topics") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="max-w-[640px] mb-12">
            <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-3">
              O que a gente explora<span className="text-accent">.</span>
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Tudo que faz do Claude Code uma ferramenta de verdade, n&atilde;o s&oacute; um chatbot.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap px-6">
          {[
            { name: "CLAUDE.md", category: "CONTEXTO" },
            { name: "Sub-Agents", category: "DELEGA\u00c7\u00c3O" },
            { name: "MCP Servers", category: "INTEGRA\u00c7\u00d5ES" },
            { name: "Hooks", category: "WORKFLOWS" },
            { name: "Supabase", category: "BACKEND" },
          ].map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-1">
              <span className="font-heading text-xl sm:text-2xl font-bold text-text-dim">
                {item.name}
              </span>
              <span className="font-mono text-[10px] text-text-dim tracking-[0.06em]">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section ref={register("pricing")} className="py-16 border-t border-border">
        <div
          className={cx}
          style={{
            opacity: is("pricing") ? 1 : 0,
            transform: is("pricing") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="max-w-[640px]">
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-heading text-lg text-text-dim line-through">
                  R$1.490
                </span>
                <span className="font-heading text-3xl sm:text-4xl font-black text-text-primary">
                  R$1.192
                </span>
                <span className="font-mono text-sm text-text-dim">
                  / 3 sess&otilde;es
                </span>
              </div>
              <p className="font-mono text-sm text-text-muted mt-2">
                ou 12x de <span className="font-semibold">R$99,33</span> sem juros
              </p>
              <span
                className="inline-block font-mono text-[11px] tracking-[0.06em] font-medium border px-2.5 py-1 mt-2"
                style={{ color: "#25D366", background: "rgba(37, 211, 102, 0.08)", borderColor: "rgba(37, 211, 102, 0.25)" }}
              >
                20% OFF CLAUDERIO
              </span>
              <p className="font-mono text-[11px] text-text-dim mt-2">
                V&aacute;lido at&eacute; ter&ccedil;a-feira, 25 de mar&ccedil;o &agrave;s 23h59
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("mentorship_payment_click", { source: "mentorship_page" })}
                className="inline-block font-body text-sm font-semibold text-white bg-accent px-7 py-3 hover:bg-accent-hover transition-colors"
              >
                Reservar hor&aacute;rio
              </a>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-accent shrink-0"
                  style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                />
                <span className="font-mono text-[12px] text-accent tracking-[0.03em] font-medium">
                  4 vagas dispon&iacute;veis em Abril
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHATSAPP ─── */}
      <section ref={register("whatsapp")} className="py-16 border-t border-border">
        <div
          className={cx}
          style={{
            opacity: is("whatsapp") ? 1 : 0,
            transform: is("whatsapp") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="max-w-[640px]">
            <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-3">
              Tem d&uacute;vidas?<span className="text-accent">.</span>
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Me manda uma mensagem no WhatsApp.
            </p>
            <a
              href="https://wa.me/5524992679147"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("mentorship_whatsapp_click", { source: "mentorship_page" })}
              className="inline-flex items-center gap-2 font-mono text-[12px] text-text-muted px-4 py-2 border border-border hover:text-accent hover:border-accent transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
