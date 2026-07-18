"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  registrationDetailsSchema,
  type RegistrationDetailsValues,
} from "@/lib/validators";
import { StepHeader } from "./StepHeader";
import type { StepProps } from "./OnboardingWizard.types";

export function StepRegistrationDetails({
  defaultValues,
  onBack,
  onNext,
  stepIndex,
  totalSteps,
}: StepProps<RegistrationDetailsValues>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationDetailsValues>({
    resolver: zodResolver(registrationDetailsSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="animate-fade-in space-y-6"
      noValidate
    >
      <StepHeader
        currentStep="registration-details"
        stepIndex={stepIndex}
        totalSteps={totalSteps}
      />

      <p className="text-sm text-[--text-secondary]">
        Provide your official registration and tax details. These are used for
        compliance verification.
      </p>

      <div className="space-y-4">
        <Input
          label="Business registration number"
          placeholder="e.g. 100012345678"
          error={errors.registrationNumber?.message}
          {...register("registrationNumber")}
        />
        <Input
          label="Tax Identification Number (TIN)"
          placeholder="e.g. 123456789"
          error={errors.taxId?.message}
          {...register("taxId")}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Year founded"
            placeholder="e.g. 2015"
            maxLength={4}
            error={errors.yearFounded?.message}
            {...register("yearFounded")}
          />
          <Input
            label="Number of employees"
            placeholder="e.g. 25"
            error={errors.employeeCount?.message}
            {...register("employeeCount")}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="flex-1"
          onClick={onBack}
        >
          Back
        </Button>
        <Button type="submit" variant="primary" size="lg" className="flex-1">
          Continue
        </Button>
      </div>
    </form>
  );
}
