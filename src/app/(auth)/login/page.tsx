"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { loginSchema } from "@/lib/validators";
import type { UserRole } from "@/constants/roles";

type LoginValues = z.infer<typeof loginSchema>;

// Map each role to its dashboard route
const ROLE_DASHBOARD: Record<UserRole, string> = {
  ADMIN: ROUTES.ADMIN,
  GOVERNMENT: ROUTES.GOVERNMENT,
  FARMER: ROUTES.FARMER,
  COOPERATIVE: ROUTES.COOPERATIVE,
  MANUFACTURER: ROUTES.MANUFACTURER,
  SUPPLIER: ROUTES.SUPPLIER,
  BUYER: ROUTES.BUYER,
  RETAILER: ROUTES.RETAILER,
  WAREHOUSE: ROUTES.WAREHOUSE,
  TRANSPORT: ROUTES.TRANSPORT,
  DRIVER: ROUTES.DRIVER,
  BANK: ROUTES.BANK,
};

export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAuth();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginValues) {
    setApiError(null);
    setLoading(true);

    try {
      const session = await authService.login(values);
      setSession(session.user, session.accessToken);
      router.push(ROLE_DASHBOARD[session.user.role] ?? ROUTES.HOME);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Invalid email or password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-fade-in-scale space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[--primary]">
          Welcome back
        </p>
        <h1 className="text-2xl font-semibold text-[--text]">Sign in</h1>
        <p className="text-sm text-[--text-secondary]">
          Enter your credentials to access your dashboard.
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
        <div className="space-y-1">
          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="flex justify-end">
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-xs font-medium text-[--primary] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* API error */}
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
          className="w-full gap-2"
          loading={loading}
        >
          {loading ? (
            <>
              <Spinner />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-[--text-secondary]">
        Don&apos;t have an account?{" "}
        <Link
          href={ROUTES.REGISTER}
          className="font-medium text-[--primary] hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
