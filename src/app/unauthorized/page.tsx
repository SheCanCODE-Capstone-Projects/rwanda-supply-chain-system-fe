import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[var(--background)] px-6 text-[var(--text)]">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--danger)]">
          Unauthorized
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Access restricted</h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          Your current account does not have permission to view this area.
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
