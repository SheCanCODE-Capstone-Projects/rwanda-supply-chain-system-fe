import { z } from "zod";

export const emailSchema = z.string().email("Please enter a valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// ── Onboarding wizard schemas ────────────────────────────────────────────────

export const companyProfileSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(5, "Address is required"),
});

export const registrationDetailsSchema = z.object({
  registrationNumber: z.string().min(3, "Registration number is required"),
  taxId: z.string().min(3, "Tax ID is required"),
  yearFounded: z
    .string()
    .regex(/^\d{4}$/, "Enter a valid year (e.g. 2015)")
    .refine(
      (v) => Number(v) >= 1900 && Number(v) <= new Date().getFullYear(),
      "Year must be between 1900 and this year",
    ),
  employeeCount: z.string().min(1, "Employee count is required"),
});

export const contactInformationSchema = z.object({
  contactName: z.string().min(2, "Contact name is required"),
  contactEmail: emailSchema,
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(7, "Phone number must be at least 7 digits")
    .regex(/^[+\d\s\-()]+$/, "Enter a valid phone number"),
  website: z
    .string()
    .url("Enter a valid URL (e.g. https://example.com)")
    .optional()
    .or(z.literal("")),
});

export const accountCredentialsSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CompanyProfileValues = z.infer<typeof companyProfileSchema>;
export type RegistrationDetailsValues = z.infer<typeof registrationDetailsSchema>;
export type ContactInformationValues = z.infer<typeof contactInformationSchema>;
export type AccountCredentialsValues = z.infer<typeof accountCredentialsSchema>;

// ── Auth flow schemas ────────────────────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only digits"),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
export type OtpValues = z.infer<typeof otpSchema>;
