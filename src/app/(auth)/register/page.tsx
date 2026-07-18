"use client";

import { useState } from "react";
import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import type { UserRole } from "@/constants/roles";
import { RoleSelection } from "@/components/auth/role-selection";
import { OnboardingWizard } from "@/components/auth/onboarding";

type RegisterView = "role-selection" | "onboarding";

export default function RegisterPage() {
  const [view, setView] = useState<RegisterView>("role-selection");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  function handleRoleSelect(role: string) {
    setSelectedRole(role as UserRole);
  }

  function handleContinueToOnboarding() {
    if (selectedRole) {
      setView("onboarding");
    }
  }

  function handleBackToRoleSelection() {
    setView("role-selection");
  }

  return (
    <>
      {view === "role-selection" ? (
        <RoleSelection
          selectedRole={selectedRole}
          onRoleSelect={handleRoleSelect}
          onContinue={handleContinueToOnboarding}
        />
      ) : (
        <OnboardingWizard
          selectedRole={selectedRole!}
          onBack={handleBackToRoleSelection}
        />
      )}

      {/* Sign-in link — shown on role selection only */}
      {view === "role-selection" && (
        <p className="mt-6 text-center text-sm text-[--text-secondary]">
          Already have an account?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="font-medium text-[--primary] hover:underline"
          >
            Sign in
          </Link>
        </p>
      )}
    </>
  );
}
