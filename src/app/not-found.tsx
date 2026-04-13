import Link from "next/link";

/**
 * Root catch-all 404. Do not use `redirect()` here: it throws during render and breaks
 * the browser Performance API marks Next attaches to this tree ("negative time stamp").
 */
export default function NotFound() {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might
          have been moved, deleted, or you entered the wrong URL.
        </p>
        <Link
          href="/en/"
          className="text-foreground inline-flex rounded-md border border-border bg-background px-4 py-2 text-sm font-medium underline-offset-4 hover:underline"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
