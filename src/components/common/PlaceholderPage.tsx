type PlaceholderPageProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function PlaceholderPage({
  title,
  description,
  eyebrow = "RSCN",
}: PlaceholderPageProps) {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[var(--background)] px-6 py-16 text-[var(--text)] sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </main>
  );
}
