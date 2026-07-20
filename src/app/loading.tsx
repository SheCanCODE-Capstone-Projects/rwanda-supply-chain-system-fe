export default function Loading() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-(--background) text-(--text)">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
    </main>
  );
}
