import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Slide Remote — Ticker",
  description: "Phone-based remote clicker for Google Slides",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function TickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ticker-root fixed inset-0 overflow-hidden bg-gray-950" style={{ touchAction: "manipulation" }}>
      {children}
    </div>
  );
}
