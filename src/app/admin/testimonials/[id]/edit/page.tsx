import { createClient } from "@/lib/supabase-server";
import { updateTestimonial } from "@/app/admin/actions";
import { TestimonialForm } from "../../TestimonialForm";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).single();
  return <TestimonialForm initialData={data} onSubmit={(formData) => updateTestimonial(id, formData)} />;
}
