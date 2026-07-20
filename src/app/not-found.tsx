import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[var(--background)] px-6 text-[var(--text)]">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-[var(--primary)] px-4 text-sm font-medium text-white"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
