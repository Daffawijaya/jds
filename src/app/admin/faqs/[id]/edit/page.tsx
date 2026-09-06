import { createClient } from "@/lib/supabase-server";
import { updateFaq } from "@/app/admin/actions";
import { FaqForm } from "../../FaqForm";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("faqs").select("*").eq("id", id).single();
  return <FaqForm initialData={data} onSubmit={(formData) => updateFaq(id, formData)} />;
}
