import { createTestimonial } from "@/app/admin/actions";
import { TestimonialForm } from "../TestimonialForm";

export default function NewTestimonialPage() {
  return <TestimonialForm onSubmit={createTestimonial} />;
}
