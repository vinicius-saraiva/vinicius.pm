"use client";

const CONTACT_ROWS = [
  { label: "Email", value: "v@vinicius.pm", href: "mailto:v@vinicius.pm", accent: true },
  { label: "LinkedIn", value: "vinicius-saraiva", href: "https://www.linkedin.com/in/vinicius-saraiva/", accent: true },
  { label: "Location", value: "Available worldwide", href: undefined, accent: false },
];

const cx = "max-w-[1120px] mx-auto px-6 sm:px-10";

const VARIANT = {
  accent: { glow: "rgba(77,107,255,0.15)", dot: "var(--accent)", link: "#6B8AFF" },
  warm:   { glow: "rgba(232,196,124,0.15)", dot: "var(--warm)",   link: "#E8C47C" },
};

export function Footer({ variant = "accent" }: { variant?: "accent" | "warm" }) {
  const v = VARIANT[variant];
  return (
    <section
      id="contact"
      className="border-t border-border relative overflow-hidden"
      style={{ background: "var(--footer-bg)" }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%",
          right: "10%",
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${v.glow} 0%, transparent 60%)`,
          filter: "blur(100px)",
        }}
      />

      <div className={`${cx} py-24 relative`}>
        <div className="max-w-[520px]">
          <h2 className="font-heading text-4xl sm:text-5xl font-black tracking-[-0.04em] mb-4 leading-tight text-white">
            Let&apos;s build<br />something<span style={{ color: v.dot }}>.</span>
          </h2>

          <div className="flex flex-col gap-px mb-16" style={{ background: "rgba(255,255,255,0.08)" }}>
            {CONTACT_ROWS.map((row) => (
              <ContactRow key={row.label} {...row} linkColor={v.link} />
            ))}
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="font-mono text-[11px]" style={{ color: "var(--footer-muted)" }}>
            &copy; 2026 &middot; vinicius.pm
          </span>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
  accent,
  linkColor,
}: {
  label: string;
  value: string;
  href?: string;
  accent: boolean;
  linkColor: string;
}) {
  const content = (
    <div
      className="py-4 px-6 flex justify-between items-center transition-colors"
      style={{
        background: "rgba(255,255,255,0.06)",
        cursor: href ? "pointer" : "default",
      }}
    >
      <span className="font-body text-sm font-semibold text-white">
        {label}
      </span>
      <span
        className="font-mono text-[13px]"
        style={{ color: accent ? linkColor : "#9B9BA3" }}
      >
        {value}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}
