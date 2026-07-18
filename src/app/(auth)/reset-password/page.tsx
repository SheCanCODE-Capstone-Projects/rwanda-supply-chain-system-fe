"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/constants/routes";
import { resetPasswordSchema, type ResetPasswordValues } from "@/lib/validators";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  if (!token) {
    return (
      <div className="animate-fade-in-scale space-y-4 text-center">
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
        <h1 className="text-2xl font-semibold text-(--text)">Invalid link</h1>
        <p className="text-sm text-(--text-secondary)">
          This password reset link is missing or invalid. Please request a new one.
        </p>
        <Link
          href={ROUTES.FORGOT_PASSWORD}
          className="inline-block text-sm font-medium text-(--primary) hover:underline"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  if (success) {
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
          <h1 className="text-2xl font-semibold text-(--text)">Password updated</h1>
          <p className="text-sm text-(--text-secondary)">
            Your password has been changed successfully. You can now sign in with your new password.
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => router.push(ROUTES.LOGIN)}
        >
          Sign in
        </Button>
      </div>
    );
  }

  async function onSubmit(values: ResetPasswordValues) {
    setApiError(null);
    setLoading(true);
    try {
      await authService.resetPassword(token, values.password);
      setSuccess(true);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Failed to reset password. The link may have expired.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-fade-in-scale space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--primary)">
          Account recovery
        </p>
        <h1 className="text-2xl font-semibold text-(--text)">Set new password</h1>
        <p className="text-sm text-(--text-secondary)">
          Choose a strong password — at least 8 characters.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="New password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm new password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {apiError && (
          <div
            role="alert"
            className="rounded-xl border border-(--danger) bg-(--danger-bg) px-4 py-3 text-sm text-(--danger)"
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
          Reset password
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}
