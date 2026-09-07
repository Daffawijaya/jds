import { getCareerRoles } from "../actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CareerRolesTable } from "./CareerRolesTable";

export default async function CareerRolesPage() {
  const roles = await getCareerRoles();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Career Roles</h1>
        <Link href="/admin/career-roles/new"><Button><Plus className="mr-2 h-4 w-4" /> Tambah Role</Button></Link>
      </div>
      <CareerRolesTable key={roles.map((role) => `${role.id}:${role.sort_order}`).join("|")} roles={roles} />
    </div>
  );
}
