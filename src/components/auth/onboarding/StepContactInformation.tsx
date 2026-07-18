"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  contactInformationSchema,
  type ContactInformationValues,
} from "@/lib/validators";
import { StepHeader } from "./StepHeader";
import type { StepProps } from "./OnboardingWizard.types";

export function StepContactInformation({
  defaultValues,
  onBack,
  onNext,
  stepIndex,
  totalSteps,
}: StepProps<ContactInformationValues>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInformationValues>({
    resolver: zodResolver(contactInformationSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="animate-fade-in space-y-6"
      noValidate
    >
      <StepHeader
        currentStep="contact-information"
        stepIndex={stepIndex}
        totalSteps={totalSteps}
      />

      <p className="text-sm text-[--text-secondary]">
        Who should we contact for your account? This information stays private.
      </p>

      <div className="space-y-4">
        <Input
          label="Primary contact name"
          placeholder="e.g. Jean-Pierre Nkurunziza"
          error={errors.contactName?.message}
          {...register("contactName")}
        />
        <Input
          label="Contact email"
          type="email"
          placeholder="contact@company.rw"
          error={errors.contactEmail?.message}
          {...register("contactEmail")}
        />
        <Input
          label="Phone number"
          type="tel"
          placeholder="+250 7xx xxx xxx"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Website (optional)"
          type="url"
          placeholder="https://www.company.rw"
          error={errors.website?.message}
          {...register("website")}
        />
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
