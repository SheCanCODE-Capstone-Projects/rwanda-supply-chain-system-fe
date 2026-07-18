"use client";

import { Button } from "@/components/ui/button";
import { UserRole } from "@/constants/roles";
import { RoleCard } from "./RoleCard";
import type { RoleSelectionProps } from "./RoleSelection.types";

const ROLE_OPTIONS = [
  {
    role: UserRole.FARMER,
    label: "Producer",
    description: "Farmers, growers, and agricultural producers supplying raw materials.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10" /><path d="M12 12 2 12" /><path d="M12 12V2" />
        <path d="M7 17c1 2 3 3 5 3s4-1 5-3" /><path d="M5 10c-1 3 0 6 2 8" /><path d="M19 10c1 3 0 6-2 8" />
      </svg>
    ),
  },
  {
    role: UserRole.COOPERATIVE,
    label: "Cooperative",
    description: "Farmer cooperatives pooling resources and coordinating supply.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    role: UserRole.MANUFACTURER,
    label: "Manufacturer",
    description: "Processing and manufacturing businesses transforming raw materials.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-6H4a2 2 0 0 0-2 2v16Z" />
        <path d="M14 2v6h6" /><path d="M12 18v-6" /><path d="M8 18v-1" /><path d="M16 18v-3" />
      </svg>
    ),
  },
  {
    role: UserRole.SUPPLIER,
    label: "Supplier",
    description: "Businesses supplying inputs, equipment, and materials to the chain.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    role: UserRole.TRANSPORT,
    label: "Transporter",
    description: "Logistics providers moving goods across the supply chain network.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    role: UserRole.DRIVER,
    label: "Driver",
    description: "Delivery drivers operating within the transportation network.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" />
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
      </svg>
    ),
  },
  {
    role: UserRole.WAREHOUSE,
    label: "Warehouse",
    description: "Storage and inventory management facilities in the distribution chain.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    role: UserRole.RETAILER,
    label: "Retailer",
    description: "Businesses selling products directly to end consumers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    role: UserRole.BUYER,
    label: "Buyer",
    description: "Businesses purchasing goods through the marketplace.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    role: UserRole.BANK,
    label: "Bank / Financier",
    description: "Financial institutions providing financing and payment services.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="3" y1="22" x2="21" y2="22" /><line x1="6" y1="18" x2="6" y2="11" />
        <line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" />
        <line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 7 4 7" />
      </svg>
    ),
  },
  {
    role: UserRole.GOVERNMENT,
    label: "Government",
    description: "Government agencies overseeing national supply chain compliance.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
        <p className="text-xs font-semibold uppercase tracking-widest text-(--primary)">
          Step 1 of 5
        </p>
        <h1 className="text-2xl font-semibold text-(--text)">
          What is your role?
        </h1>
        <p className="text-sm text-(--text-secondary)">
          Choose the option that best describes your business. This shapes your
          experience on the platform.
        </p>
      </div>

      {/* Role grid — 2 columns, scrollable on small screens */}
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
