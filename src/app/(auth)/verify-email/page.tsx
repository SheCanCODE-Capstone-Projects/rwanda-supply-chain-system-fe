"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/constants/routes";

type Status = "verifying" | "success" | "error" | "no-token";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [status, setStatus] = useState<Status>(token ? "verifying" : "no-token");

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    authService
      .verifyEmail(token)
      .then(() => {
        if (!cancelled) setStatus("success");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (status === "verifying") {
    return (
      <div className="animate-fade-in flex flex-col items-center gap-4 py-8">
        <Spinner />
        <p className="text-sm text-(--text-secondary)">Verifying your email…</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="animate-fade-in-scale space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--success-bg)">
          <svg
            className="h-8 w-8 text-(--success)"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-(--text)">Email verified</h1>
          <p className="text-sm text-(--text-secondary)">
            Your email address has been confirmed. You can now sign in.
          </p>
        </div>
        <Button asChild variant="primary" size="lg" className="w-full">
          <Link href={ROUTES.LOGIN}>Sign in</Link>
        </Button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="animate-fade-in-scale space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-(--danger-bg)">
          <svg
            className="h-8 w-8 text-(--danger)"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-(--text)">Verification failed</h1>
          <p className="text-sm text-(--text-secondary)">
            The link may have expired or already been used. Please register again or contact support.
          </p>
        </div>
        <Button asChild variant="outline" size="lg" className="w-full">
          <Link href={ROUTES.REGISTER}>Back to registration</Link>
        </Button>
      </div>
    );
  }

  // no-token fallback
  return (
    <div className="animate-fade-in-scale space-y-6 text-center">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-(--text)">Check your inbox</h1>
        <p className="text-sm text-(--text-secondary)">
          We&apos;ve sent a verification link to your email address. Click the link to
          activate your account.
        </p>
      </div>
      <p className="text-sm text-(--text-secondary)">
        Already verified?{" "}
        <Link href={ROUTES.LOGIN} className="font-medium text-(--primary) hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
