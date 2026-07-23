import Link from "next/link";

type PlaceholderPageProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <section className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-8 shadow-sm">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
        )}
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
