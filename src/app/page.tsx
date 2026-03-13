"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/footer";

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrollY;
}

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

const PROOF_BAR = [
  { name: "Stone Co (NYSE: STNE)", href: "https://www.stone.com.br/" },
  { name: "iBanFirst", href: undefined },
  { name: "Product Heroes", href: "/product-heroes" },
  { name: "Bocconi University", href: undefined },
  { name: "Dartmouth College", href: undefined },
];

const cx = "max-w-[1120px] mx-auto px-6 sm:px-10";

export default function Home() {
  const scrollY = useScrollY();
  const { visible, register } = useInView();
  const is = (name: string) => visible.has(name);

  return (
    <main className="relative z-10">
      {/* ─── HERO ─── */}
      <section
        ref={register("hero")}
        className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      >
        <div
          className="absolute pointer-events-none w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]"
          style={{
            top: "15%",
            left: "55%",
            background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)",
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
          <div className="max-w-[720px]">
            <h1 className="font-heading text-4xl sm:text-[56px] font-black leading-[1.1] tracking-[-0.04em] mb-6">
              I help product teams<br />
              ship with AI<span className="text-accent">.</span>
            </h1>

            <p className="text-lg text-text-muted leading-relaxed max-w-[520px] mb-10">
              Product Manager at{" "}
              <a href="https://www.stone.com.br/" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent transition-colors">
                Stone Co
              </a>{" "}
              (NYSE: STNE).
              <br />
              <span className="text-text-dim">
                Available for consulting and corporate training.
              </span>
            </p>

            <div className="flex gap-4 items-center">
              <a
                href="#contact"
                className="font-body text-sm font-semibold text-white bg-accent px-7 py-3 hover:bg-accent-hover transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-6 sm:left-10 flex items-center gap-2 transition-opacity duration-300"
          style={{ opacity: scrollY > 100 ? 0 : 0.4 }}
        >
          <div
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, var(--text-dim), transparent)" }}
          />
          <span
            className="font-mono text-[10px] text-text-dim tracking-[0.08em]"
            style={{ writingMode: "vertical-rl" }}
          >
            SCROLL
          </span>
        </div>
      </section>

      {/* ─── PROOF BAR ─── */}
      <section
        ref={register("proof")}
        className="border-t border-b border-border"
        style={{
          opacity: is("proof") ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}
      >
        <div className={`${cx} py-5 flex flex-wrap justify-center sm:justify-between items-center gap-x-6 gap-y-2`}>
          {PROOF_BAR.map((item) =>
            item.href ? (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith("/") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="font-mono text-[11px] sm:text-xs text-text-muted tracking-[0.03em] font-medium hover:text-text-primary transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <span
                key={item.name}
                className="font-mono text-[11px] sm:text-xs text-text-muted tracking-[0.03em] font-medium"
              >
                {item.name}
              </span>
            )
          )}
        </div>
      </section>

      {/* ─── TWO PATHS ─── */}
      <section ref={register("paths")} className="py-24">
        <div
          className={cx}
          style={{
            opacity: is("paths") ? 1 : 0,
            transform: is("paths") ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {/* Work */}
            <Link
              href="/work"
              className="bg-surface p-8 sm:p-10 hover:bg-surface-hover transition-colors relative overflow-hidden group"
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "var(--warm)" }}
              />
              <span className="font-mono text-[11px] text-warm tracking-[0.08em] mb-4 block">
                WORK
              </span>
              <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-3 group-hover:text-warm transition-colors">
                Building fintech at scale<span className="text-warm">.</span>
              </h2>
              <ul className="text-sm text-text-muted leading-relaxed mb-6 space-y-1 marker:text-warm list-disc list-inside">
                <li>Product Manager at Stone Co (NYSE: STNE).</li>
                <li>Consumer banking experiences &mdash; paycheck accounts, credit cards, cashback, investments &mdash; for millions of users across Brazil.</li>
              </ul>
              <span className="font-mono text-[12px] text-warm tracking-[0.03em]">
                View experience &rarr;
              </span>
            </Link>

            {/* Teaching */}
            <Link
              href="/product-heroes"
              className="bg-surface p-8 sm:p-10 hover:bg-surface-hover transition-colors relative overflow-hidden group"
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "var(--accent)" }}
              />
              <span className="font-mono text-[11px] text-accent tracking-[0.08em] mb-4 block">
                TEACHING
              </span>
              <h2 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] mb-3 group-hover:text-accent transition-colors">
                AI for product teams<span className="text-accent">.</span>
              </h2>
              <ul className="text-sm text-text-muted leading-relaxed mb-6 space-y-1 marker:text-accent list-disc list-inside">
                <li>Hands-on training where product people build real products with AI.</li>
                <li>60+ professionals trained across 3 editions at Product Heroes.</li>
              </ul>
              <span className="font-mono text-[12px] text-accent tracking-[0.03em]">
                View masterclass &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
