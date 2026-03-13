"use client";

export function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `linear-gradient(90deg, var(--border) 1px, transparent 1px), linear-gradient(0deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: "calc((100vw - 80px) / 12) calc((100vw - 80px) / 12)",
        backgroundPosition: "40px 0",
        opacity: "var(--grid-opacity)",
      }}
    />
  );
}
