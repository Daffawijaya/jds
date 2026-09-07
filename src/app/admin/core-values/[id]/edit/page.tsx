import { createClient } from "@/lib/supabase-server";
import { updateCoreValue } from "@/app/admin/actions";
import { CoreValueForm } from "../../CoreValueForm";

export default async function EditCoreValuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("core_values").select("*").eq("id", id).single();
  return <CoreValueForm initialData={data} onSubmit={updateCoreValue.bind(null, id)} />;
}
