"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[var(--background)] px-6 text-[var(--text)]">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--danger)]">
          Error
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-4 text-[var(--text-secondary)]">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-[var(--primary)] px-4 text-sm font-medium text-white"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
