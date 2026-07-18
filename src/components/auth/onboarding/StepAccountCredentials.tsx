"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  accountCredentialsSchema,
  type AccountCredentialsValues,
} from "@/lib/validators";
import { StepHeader } from "./StepHeader";
import type { StepProps } from "./OnboardingWizard.types";

interface StepAccountCredentialsProps
  extends StepProps<AccountCredentialsValues> {
  loading?: boolean;
  apiError?: string | null;
}

export function StepAccountCredentials({
  defaultValues,
  onBack,
  onNext,
  stepIndex,
  totalSteps,
  loading = false,
  apiError,
}: StepAccountCredentialsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountCredentialsValues>({
    resolver: zodResolver(accountCredentialsSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="animate-fade-in space-y-6"
      noValidate
    >
      <StepHeader
        currentStep="account-credentials"
        stepIndex={stepIndex}
        totalSteps={totalSteps}
      />

      <p className="text-sm text-[--text-secondary]">
        Create your login credentials. You will use these to sign in after your
        account is approved.
      </p>

      <div className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@company.rw"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Repeat your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>

      {/* API-level error */}
      {apiError && (
        <div
          role="alert"
          className="rounded-xl border border-[--danger] bg-[--danger-bg] px-4 py-3 text-sm text-[--danger]"
        >
          {apiError}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="flex-1"
          onClick={onBack}
          disabled={loading}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="flex-1 gap-2"
          loading={loading}
        >
          {loading ? (
            <>
              <Spinner />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </div>
    </form>
  );
}
