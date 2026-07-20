import { redirect } from "next/navigation";
import { roleDashboard } from "@/lib/auth/roles";

export default function FarmerPage() {
  redirect(roleDashboard("farmer"));
}
