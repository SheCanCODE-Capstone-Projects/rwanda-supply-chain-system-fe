"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  companyProfileSchema,
  type CompanyProfileValues,
} from "@/lib/validators";
import { StepHeader } from "./StepHeader";
import type { StepProps } from "./OnboardingWizard.types";

export function StepCompanyProfile({
  defaultValues,
  onBack,
  onNext,
  stepIndex,
  totalSteps,
}: StepProps<CompanyProfileValues>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyProfileValues>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="animate-fade-in space-y-6"
      noValidate
    >
      <StepHeader
        currentStep="company-profile"
        stepIndex={stepIndex}
        totalSteps={totalSteps}
      />

      <p className="text-sm text-[--text-secondary]">
        Tell us about your organisation. This information will appear on your
        business profile.
      </p>

      <div className="space-y-4">
        <Input
          label="Company name"
          placeholder="e.g. Kigali Growers Ltd"
          error={errors.companyName?.message}
          {...register("companyName")}
        />
        <Input
          label="Industry / sector"
          placeholder="e.g. Agriculture, Logistics"
          error={errors.industry?.message}
          {...register("industry")}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Country"
            placeholder="Rwanda"
            error={errors.country?.message}
            {...register("country")}
          />
          <Input
            label="Physical address"
            placeholder="KG 123 St, Kigali"
            error={errors.address?.message}
            {...register("address")}
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
