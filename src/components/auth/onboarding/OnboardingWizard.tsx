"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import type { UserRole } from "@/constants/roles";
import type {
  CompanyProfileValues,
  RegistrationDetailsValues,
  ContactInformationValues,
  AccountCredentialsValues,
} from "@/lib/validators";

import { StepCompanyProfile } from "./StepCompanyProfile";
import { StepRegistrationDetails } from "./StepRegistrationDetails";
import { StepContactInformation } from "./StepContactInformation";
import { StepAccountCredentials } from "./StepAccountCredentials";
import { ONBOARDING_STEPS, type OnboardingFormData } from "./OnboardingWizard.types";

interface OnboardingWizardProps {
  selectedRole: UserRole;
  onBack: () => void; // go back to role selection
}

// Total wizard steps (not counting role selection)
const TOTAL_STEPS = ONBOARDING_STEPS.length;

export function OnboardingWizard({ selectedRole, onBack }: OnboardingWizardProps) {
  const router = useRouter();
  const { setCurrentUser } = useAuth();

  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Accumulated form data — partial while stepping through
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({});

  // ── Step handlers ──────────────────────────────────────────────────────────

  function handleCompanyProfile(data: CompanyProfileValues) {
    setFormData((prev) => ({ ...prev, companyProfile: data }));
    setStepIndex(1);
  }

  function handleRegistrationDetails(data: RegistrationDetailsValues) {
    setFormData((prev) => ({ ...prev, registrationDetails: data }));
    setStepIndex(2);
  }

  function handleContactInformation(data: ContactInformationValues) {
    setFormData((prev) => ({ ...prev, contactInformation: data }));
    setStepIndex(3);
  }

  async function handleAccountCredentials(data: AccountCredentialsValues) {
    setApiError(null);
    setLoading(true);

    try {
      // Build the register payload following the existing RegisterPayload type.
      // The backend receives the full onboarding data; extra fields beyond the
      // base payload are forwarded as-is so the API can store them.
      const payload = {
        name: formData.contactInformation?.contactName ?? "",
        email: data.email,
        password: data.password,
        role: selectedRole,
        // Extended onboarding fields
        companyName: formData.companyProfile?.companyName,
        industry: formData.companyProfile?.industry,
        country: formData.companyProfile?.country,
        address: formData.companyProfile?.address,
        registrationNumber: formData.registrationDetails?.registrationNumber,
        taxId: formData.registrationDetails?.taxId,
        yearFounded: formData.registrationDetails?.yearFounded,
        employeeCount: formData.registrationDetails?.employeeCount,
        contactName: formData.contactInformation?.contactName,
        contactEmail: formData.contactInformation?.contactEmail,
        phone: formData.contactInformation?.phone,
        website: formData.contactInformation?.website,
      };

      const session = await authService.register(payload);

      // Persist user in the AuthContext (existing pattern from AuthProvider)
      setCurrentUser(session.user);

      // Route to the role-specific dashboard
      const roleDashboards: Record<string, string> = {
        FARMER: ROUTES.FARMER,
        TRANSPORT: ROUTES.TRANSPORT,
        WAREHOUSE: ROUTES.WAREHOUSE,
        RETAILER: ROUTES.RETAILER,
      };

      router.push(roleDashboards[selectedRole] ?? ROUTES.HOME);
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

  // ── Back navigation ────────────────────────────────────────────────────────

  function handleBack() {
    if (stepIndex === 0) {
      onBack(); // back to role selection
    } else {
      setStepIndex((i) => i - 1);
    }
  }

  // ── Render current step ────────────────────────────────────────────────────

  const sharedProps = {
    stepIndex,
    totalSteps: TOTAL_STEPS,
    onBack: handleBack,
  };

  if (stepIndex === 0) {
    return (
      <StepCompanyProfile
        {...sharedProps}
        defaultValues={formData.companyProfile}
        onNext={handleCompanyProfile}
      />
    );
  }

  if (stepIndex === 1) {
    return (
      <StepRegistrationDetails
        {...sharedProps}
        defaultValues={formData.registrationDetails}
        onNext={handleRegistrationDetails}
      />
    );
  }

  if (stepIndex === 2) {
    return (
      <StepContactInformation
        {...sharedProps}
        defaultValues={formData.contactInformation}
        onNext={handleContactInformation}
      />
    );
  }

  return (
    <StepAccountCredentials
      {...sharedProps}
      defaultValues={formData.accountCredentials}
      onNext={handleAccountCredentials}
      loading={loading}
      apiError={apiError}
    />
  );
}
