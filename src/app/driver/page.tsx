import { redirect } from "next/navigation";
import { roleDashboard } from "@/lib/auth/roles";

export default function DriverPage() {
  redirect(roleDashboard("driver"));
}
