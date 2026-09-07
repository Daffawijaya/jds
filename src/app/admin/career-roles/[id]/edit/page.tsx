import { createClient } from "@/lib/supabase-server";
import { updateCareerRole } from "@/app/admin/actions";
import { CareerRoleForm } from "../../CareerRoleForm";

export default async function EditCareerRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("career_roles").select("*").eq("id", id).single();
  return <CareerRoleForm initialData={data} onSubmit={updateCareerRole.bind(null, id)} />;
}
