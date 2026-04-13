"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

/**
 * Old gallery URL (`/photos/`). Canonical route is `/beyond-work/`; preserves query (e.g. `?g=`).
 */
function LegacyPhotosRedirectBody() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = String(params.locale ?? "en");

  useEffect(() => {
    const q = searchParams.toString();
    const target = `/${locale}/beyond-work/${q ? `?${q}` : ""}`;
    router.replace(target);
  }, [locale, router, searchParams]);

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
