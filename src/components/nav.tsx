"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isWarm = pathname === "/work";

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
            <a
              href="#contact"
              className="font-mono text-base px-5 py-2 hover:text-white transition-all"
              style={{
                color: isWarm ? "var(--warm)" : "var(--accent)",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: isWarm ? "var(--warm)" : "var(--accent)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = isWarm ? "var(--warm)" : "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* ─── BOTTOM TAB BAR (mobile only) ─── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden border-t border-border"
        style={{
          background: "var(--nav-bg)",
          backdropFilter: "blur(12px) saturate(1.2)",
        }}
      >
        <div className="flex items-center justify-around h-14">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-text-muted hover:text-text-primary transition-colors py-2 px-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-[10px] font-mono tracking-[0.06em]">Home</span>
          </Link>
          <Link
            href="/work"
            className="flex flex-col items-center gap-1 text-text-muted hover:text-warm transition-colors py-2 px-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span className="text-[10px] font-mono tracking-[0.06em]">Work</span>
          </Link>
          <Link
            href="/product-heroes"
            className="flex flex-col items-center gap-1 text-text-muted hover:text-accent transition-colors py-2 px-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span className="text-[10px] font-mono tracking-[0.06em]">Teaching</span>
          </Link>
        </div>
      </div>
    </>
  );
}
