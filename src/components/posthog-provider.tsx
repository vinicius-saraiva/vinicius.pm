"use client";

import posthog from "posthog-js";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const POSTHOG_KEY = "phc_3ayeJX3suOHEcxBMR5jDXpYLJfFcarsviaZQRe180fM";
const POSTHOG_HOST = "https://us.i.posthog.com";

function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      posthog.capture("$pageview", {
        $current_url: window.location.origin + pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider() {
  useEffect(() => {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false,
    });
  }, []);

  return (
    <Suspense fallback={null}>
      <PostHogPageview />
    </Suspense>
  );
}
