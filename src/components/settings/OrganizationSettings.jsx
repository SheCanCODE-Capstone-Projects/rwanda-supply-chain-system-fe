"use client";

import { useState } from "react";
import { Building2, Save } from "lucide-react";
import { Button, Card, Input } from "@/components/ui";
import BranchManagement from "./BranchManagement";
import TeamMembers from "./TeamMembers";

const initialProfile = {
  companyName: "Rwanda Supply Chain Network",
  businessType: "Logistics & Aggregation",
  email: "ops@rscn.rw",
  phoneNumber: "+250 788 000 000",
  address: "Kigali, Rwanda",
};

export default function OrganizationSettings() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-[#eaf7ee] p-2 text-[#0B6B2E]">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#061226]">Organization profile</h2>
            <p className="text-sm text-gray-600">Edit the public information that appears across onboarding and admin workflows.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Company Name"
              name="companyName"
              value={profile.companyName}
              onChange={handleChange}
            />
            <Input
              label="Business Type"
              name="businessType"
              value={profile.businessType}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <label className="space-y-2 text-sm font-medium text-gray-700">
            <span>Address</span>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B6B2E]"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" variant="primary">
              <Save className="mr-2 h-4 w-4" /> Save changes
            </Button>
            <Button type="button" variant="secondary" onClick={() => {
              setProfile(initialProfile);
              setSaved(false);
            }}>
              Reset
            </Button>
            {saved ? <span className="text-sm font-medium text-green-700">Profile updated successfully.</span> : null}
          </div>
        </form>
      </Card>

      <BranchManagement />
      <TeamMembers />
    </div>
  );
}
