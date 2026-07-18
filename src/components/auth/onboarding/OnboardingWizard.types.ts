import type {
  CompanyProfileValues,
  RegistrationDetailsValues,
  ContactInformationValues,
  AccountCredentialsValues,
} from "@/lib/validators";

// All wizard data collected across the 4 steps
export interface OnboardingFormData {
  companyProfile: CompanyProfileValues;
  registrationDetails: RegistrationDetailsValues;
  contactInformation: ContactInformationValues;
  accountCredentials: AccountCredentialsValues;
}

export type OnboardingStep =
  | "company-profile"
  | "registration-details"
  | "contact-information"
  | "account-credentials";

export const ONBOARDING_STEPS: OnboardingStep[] = [
  "company-profile",
  "registration-details",
  "contact-information",
  "account-credentials",
];

export const STEP_LABELS: Record<OnboardingStep, string> = {
  "company-profile": "Company Profile",
  "registration-details": "Registration Details",
  "contact-information": "Contact Information",
  "account-credentials": "Account Setup",
};

export interface StepProps<T> {
  defaultValues?: Partial<T>;
  onBack: () => void;
  onNext: (data: T) => void;
  stepIndex: number;
  totalSteps: number;
}
