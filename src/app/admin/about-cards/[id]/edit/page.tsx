import { createClient } from "@/lib/supabase-server";
import { updateAboutCard } from "@/app/admin/actions";
import { AboutCardForm } from "../../AboutCardForm";

export default async function EditAboutCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("about_cards").select("*").eq("id", id).single();
  return <AboutCardForm initialData={data} onSubmit={updateAboutCard.bind(null, id)} />;
}
