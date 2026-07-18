"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { companyProfileSchema, type CompanyProfileValues } from "@/lib/validators";
import type { UserRole } from "@/constants/roles";

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

const INDUSTRIES = [
  "Agriculture",
  "Manufacturing",
  "Logistics & Transport",
  "Retail",
  "Finance & Banking",
  "Government",
  "Cooperative",
  "Warehousing",
  "Other",
];

export default function CompleteProfilePage() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyProfileValues>({
    resolver: zodResolver(companyProfileSchema),
  });

  async function onSubmit(_values: CompanyProfileValues) {
    setApiError(null);
    setLoading(true);
    try {
      // TODO: wire to PATCH /auth/complete-profile when backend is ready
      // await apiFetch("/auth/complete-profile", { method: "PATCH", body: JSON.stringify(values) });

      // Redirect to the user's role dashboard
      const dashboard = currentUser
        ? (ROLE_DASHBOARD[currentUser.role] ?? ROUTES.HOME)
        : ROUTES.HOME;
      router.push(dashboard);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Failed to save profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-fade-in-scale space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[--primary]">
          Almost there
        </p>
        <h1 className="text-2xl font-semibold text-[--text]">Complete your profile</h1>
        <p className="text-sm text-[--text-secondary]">
          Tell us a bit about your organization to personalize your experience.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Company / organization name"
          type="text"
          placeholder="e.g. Kigali Grains Ltd."
          error={errors.companyName?.message}
          {...register("companyName")}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[--text]">Industry</label>
          <select
            className="flex h-11 w-full rounded-xl border border-[--border] bg-white px-4 py-2 text-sm text-[--text] shadow-sm transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[--primary] disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue=""
            {...register("industry")}
          >
            <option value="" disabled>
              Select your industry
            </option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          {errors.industry?.message && (
            <p role="alert" className="text-xs text-[--danger]">
              {errors.industry.message}
            </p>
          )}
        </div>

        <Input
          label="Country"
          type="text"
          placeholder="e.g. Rwanda"
          error={errors.country?.message}
          {...register("country")}
        />

        <Input
          label="Address"
          type="text"
          placeholder="e.g. KG 7 Ave, Kigali"
          error={errors.address?.message}
          {...register("address")}
        />

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
          className="w-full"
          loading={loading}
        >
          Save and continue
        </Button>
      </form>
    </div>
  );
}
