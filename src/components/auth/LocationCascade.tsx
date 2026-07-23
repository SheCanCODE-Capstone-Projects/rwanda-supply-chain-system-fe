"use client";
import { useMemo } from "react";
import { Field, inputCls } from "./AuthShell";
import {
  RWANDA_PROVINCES,
  getCells,
  getDistricts,
  getSectors,
  getVillages,
  type RwandaLocation,
} from "@/lib/auth/onboarding";

export function LocationCascade({ value, onChange, compact = false, visibleLevels, }: { value: Partial<RwandaLocation>; onChange: (next: Partial<RwandaLocation>) => void; compact?: boolean; visibleLevels?: Array<keyof RwandaLocation>; }) {
  const districts = useMemo(() => getDistricts(value.province ?? ""), [value.province]);
  const sectors = useMemo(() => getSectors(value.district ?? ""), [value.district]);
  const cells = useMemo(() => getCells(value.sector ?? ""), [value.sector]);
  const villages = useMemo(() => getVillages(value.cell ?? ""), [value.cell]);

  const levels: Array<keyof RwandaLocation> = ["province", "district", "sector", "cell", "village"];
  const shownLevels = visibleLevels && visibleLevels.length > 0 ? levels.filter((level) => visibleLevels.includes(level)) : levels;

  return (
    <div className={`grid gap-4 ${compact ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {shownLevels.includes("province") && (
        <Select label="Province" value={value.province ?? ""} options={[...RWANDA_PROVINCES]} onChange={(province) => onChange({ province, district: "", sector: "", cell: "", village: "" })} />
      )}
      {shownLevels.includes("district") && (
        <Select label="District" value={value.district ?? ""} options={districts} disabled={!value.province} onChange={(district) => onChange({ ...value, district, sector: "", cell: "", village: "" })} />
      )}
      {shownLevels.includes("sector") && (
        <Select label="Sector" value={value.sector ?? ""} options={sectors} disabled={!value.district} onChange={(sector) => onChange({ ...value, sector, cell: "", village: "" })} />
      )}
      {shownLevels.includes("cell") && (
        <Select label="Cell" value={value.cell ?? ""} options={cells} disabled={!value.sector} onChange={(cell) => onChange({ ...value, cell, village: "" })} />
      )}
      {shownLevels.includes("village") && (
        <Select label="Village" value={value.village ?? ""} options={villages} disabled={!value.cell} onChange={(village) => onChange({ ...value, village })} />
      )}
    </div>
  );
}

function Select({ label, value, options, disabled, onChange }: { label: string; value: string; options: string[]; disabled?: boolean; onChange: (value: string) => void }) {
  return (
    <Field label={label}>
      <select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className={`${inputCls} disabled:cursor-not-allowed disabled:opacity-60`}>
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </Field>
  );
}
