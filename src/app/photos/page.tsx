"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

/**
 * Old gallery URL (`/photos/`). Canonical route is `/beyond-work/`; preserves query (e.g. `?g=`).
 */
function LegacyPhotosRedirectBody() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.toString();
    const target = `/beyond-work/${q ? `?${q}` : ""}`;
    router.replace(target);
  }, [router, searchParams]);

  return (
    <p className="text-muted-foreground p-6 text-center text-sm">
      Redirecting…
    </p>
  );
}

export default function LegacyPhotosPage() {
  return (
    <Suspense fallback={null}>
      <LegacyPhotosRedirectBody />
    </Suspense>
  );
}
