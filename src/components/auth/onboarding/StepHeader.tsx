import { cn } from "@/lib/utils";
import { STEP_LABELS, type OnboardingStep } from "./OnboardingWizard.types";

interface StepHeaderProps {
  currentStep: OnboardingStep;
  stepIndex: number; // 0-based index within wizard (not counting role-selection)
  totalSteps: number;
}

export function StepHeader({
  currentStep,
  stepIndex,
  totalSteps,
}: StepHeaderProps) {
  // stepIndex is 0-based within wizard; overall step is +2 because role-selection is step 1
  const overallStep = stepIndex + 2;
  const overallTotal = totalSteps + 1; // +1 for role-selection

  return (
    <div className="space-y-4">
      {/* Step label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-[--primary]">
        Step {overallStep} of {overallTotal}
      </p>

      <h2 className="text-2xl font-semibold text-[--text]">
        {STEP_LABELS[currentStep]}
      </h2>

      {/* Progress bar */}
      <div className="flex gap-1.5">
        {/* Role selection dot — always filled */}
        <div className="h-1.5 flex-1 rounded-full bg-[--primary]" />
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              i < stepIndex
                ? "bg-[--primary]"
                : i === stepIndex
                  ? "bg-[--primary] opacity-60"
                  : "bg-[--border]",
            )}
          />
        ))}
      </div>
    </div>
  );
}
