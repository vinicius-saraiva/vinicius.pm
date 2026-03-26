"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isWarm = pathname.startsWith("/work");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ─── TOP NAV (desktop) ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-300"
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(12px) saturate(1.2)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10 h-full flex justify-between items-center">
          <Link
            href="/"
            className="font-mono text-xl font-medium text-text-primary tracking-tight"
          >
            vinicius<span className="text-text-dim">.pm</span>
          </Link>

          <div className="flex gap-4 sm:gap-8 items-center">
            <Link
              href="/work"
              className="font-body text-lg font-medium text-text-muted hover:text-text-primary transition-colors hidden sm:block"
            >
              Work
            </Link>
            <Link
              href="/product-heroes"
              className="font-body text-lg font-medium text-text-muted hover:text-text-primary transition-colors hidden sm:block"
            >
              Teaching
            </Link>
            <Link
              href="/clauderio"
              className="font-body text-lg font-medium text-text-muted hover:text-text-primary transition-colors hidden sm:block"
            >
              Claude Rio
            </Link>
            <a
              href="#contact"
              onClick={() => posthog.capture("contact_click", { label: "Nav", value: "Contact button" })}
              className={`font-mono text-base px-5 py-2 border transition-all ${
                isWarm
                  ? "text-[var(--warm)] border-[var(--warm)] hover:bg-[var(--warm)] hover:!text-[#1a1a1a]"
                  : "text-[var(--accent)] border-[var(--accent)] hover:bg-[var(--accent)] hover:!text-white"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* ─── BOTTOM TAB BAR (mobile only) ─── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 block sm:hidden border-t border-border"
        style={{
          background: "var(--nav-bg)",
          backdropFilter: "blur(12px) saturate(1.2)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="flex items-stretch h-14 w-full">
          <Link
            href="/"
            className="flex-1 min-w-0 flex flex-col items-center justify-center gap-1 text-text-muted hover:text-text-primary transition-colors py-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-[10px] font-mono tracking-[0.06em]">Home</span>
          </Link>
          <Link
            href="/work"
            className="flex-1 min-w-0 flex flex-col items-center justify-center gap-1 text-text-muted hover:text-warm transition-colors py-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span className="text-[10px] font-mono tracking-[0.06em]">Work</span>
          </Link>
          <Link
            href="/product-heroes"
            className="flex-1 min-w-0 flex flex-col items-center justify-center gap-1 text-text-muted hover:text-accent transition-colors py-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span className="text-[10px] font-mono tracking-[0.06em]">Teaching</span>
          </Link>
          <Link
            href="/clauderio"
            className="flex-1 min-w-0 flex flex-col items-center justify-center gap-1 text-text-muted hover:text-accent transition-colors py-2"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
              <path d="m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212 2.736-.75.096-.324-.302.04-.496.154-.162 1.267-.871z" />
            </svg>
            <span className="text-[10px] font-mono tracking-[0.06em]">Claude Rio</span>
          </Link>
        </div>
      </div>
    </>
  );
}
