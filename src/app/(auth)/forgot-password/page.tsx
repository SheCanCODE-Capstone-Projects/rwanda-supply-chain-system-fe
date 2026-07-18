"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/constants/routes";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validators";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordValues) {
    setApiError(null);
    setLoading(true);
    try {
      await authService.forgotPassword(values.email);
      setSubmitted(true);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="animate-fade-in-scale space-y-6 text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[--primary-light]">
          <svg
            className="h-8 w-8 text-[--primary]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
            />
          </svg>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-[--text]">Check your inbox</h1>
          <p className="text-sm text-[--text-secondary]">
            We sent a password reset link to{" "}
            <span className="font-medium text-[--text]">{getValues("email")}</span>.
            It may take a minute to arrive.
          </p>
        </div>

        <p className="text-sm text-[--text-secondary]">
          Didn&apos;t receive it?{" "}
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="font-medium text-[--primary] hover:underline"
          >
            Try again
          </button>
        </p>

        <Link
          href={ROUTES.LOGIN}
          className="block text-sm font-medium text-[--text-secondary] hover:text-[--text]"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-scale space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[--primary]">
          Account recovery
        </p>
        <h1 className="text-2xl font-semibold text-[--text]">Forgot password?</h1>
        <p className="text-sm text-[--text-secondary]">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Email address"
          type="email"
          placeholder="you@company.rw"
          error={errors.email?.message}
          {...register("email")}
        />

        {apiError && (
          <div
            role="alert"
            className="rounded-xl border border-[--danger] bg-[--danger-bg] px-4 py-3 text-sm text-[--danger]"
          >
            {apiError}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={loading}
        >
          Send reset link
        </Button>
      </form>

      <p className="text-center text-sm text-[--text-secondary]">
        Remembered it?{" "}
        <Link
          href={ROUTES.LOGIN}
          className="font-medium text-[--primary] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
