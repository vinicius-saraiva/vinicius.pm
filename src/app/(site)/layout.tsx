import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { GridOverlay } from "@/components/grid-overlay";
import { PostHogProvider } from "@/components/posthog-provider";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <PostHogProvider />
      <GridOverlay />
      <Nav />
      {children}
    </ThemeProvider>
  );
}
