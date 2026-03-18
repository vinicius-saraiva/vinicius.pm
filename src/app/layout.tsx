import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { GridOverlay } from "@/components/grid-overlay";
import { PostHogProvider } from "@/components/posthog-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinicius Andrade — Product Manager at Stone",
  description:
    "Product Manager at Stone Co. I teach product teams how to build with AI. Guest instructor at Product Heroes.",
  openGraph: {
    title: "Vinicius Andrade — Product Manager at Stone",
    description:
      "Product Manager at Stone Co. I teach product teams how to build with AI.",
    url: "https://vinicius.pm",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <PostHogProvider />
          <GridOverlay />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
