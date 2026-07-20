import { redirect } from "next/navigation";
import { roleDashboard } from "@/lib/auth/roles";

export default function AdminPage() {
  redirect(roleDashboard("super_admin"));
}
