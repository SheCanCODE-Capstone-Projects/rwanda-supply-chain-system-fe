"use client";

import { Button } from "@/components/ui/button";
import { UserRole } from "@/constants/roles";
import { RoleCard } from "./RoleCard";
import type { RoleSelectionProps } from "./RoleSelection.types";

// The four roles required by the task. Icons are inline SVGs to avoid
// adding an icon library dependency — project already uses lucide-react
// but the installed version exports differently, so we keep it safe here.
const ROLE_OPTIONS = [
  {
    role: UserRole.FARMER,
    label: "Producer",
    description:
      "Farmers, growers, and agricultural producers supplying raw materials.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a10 10 0 0 1 10 10" />
        <path d="M12 12 2 12" />
        <path d="M12 12V2" />
        <path d="M7 17c1 2 3 3 5 3s4-1 5-3" />
        <path d="M5 10c-1 3 0 6 2 8" />
        <path d="M19 10c1 3 0 6-2 8" />
      </svg>
    ),
  },
  {
    role: UserRole.TRANSPORT,
    label: "Transporter",
    description:
      "Logistics providers moving goods across the supply chain network.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    role: UserRole.WAREHOUSE,
    label: "Warehouse",
    description:
      "Storage and inventory management facilities in the distribution chain.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    role: UserRole.RETAILER,
    label: "Retailer",
    description:
      "Businesses selling products directly to end consumers.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
] as const;

export function RoleSelection({
  selectedRole,
  onRoleSelect,
  onContinue,
}: RoleSelectionProps) {
  return (
    <div className="animate-fade-in-scale space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[--primary]">
          Step 1 of 5
        </p>
        <h1 className="text-2xl font-semibold text-[--text]">
          What is your role?
        </h1>
        <p className="text-sm text-[--text-secondary]">
          Choose the option that best describes your business. This shapes your
          experience on the platform.
        </p>
      </div>

      {/* Role grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ROLE_OPTIONS.map((option) => (
          <RoleCard
            key={option.role}
            role={option.role}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={selectedRole === option.role}
            onSelect={onRoleSelect}
          />
        ))}
      </div>

      {/* Continue */}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!selectedRole}
        onClick={onContinue}
      >
        Continue
      </Button>
    </div>
  );
}
