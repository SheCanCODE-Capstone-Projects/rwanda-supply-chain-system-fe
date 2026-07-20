import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="grid min-h-dvh place-items-center bg-background px-4">
      <div className="text-center">
        <div className="text-6xl font-bold text-primary">403</div>
        <h1 className="mt-4 text-2xl font-semibold">Access denied</h1>
        <p className="mt-2 text-muted-foreground">You don't have permission to view this page.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium hover:bg-surface">Go home</Link>
          <Link href="/auth/login" className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary-hover">Login</Link>
        </div>
      </div>
    </div>
  );
}
