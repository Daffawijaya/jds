import { createFaq } from "@/app/admin/actions";
import { FaqForm } from "../FaqForm";
export default function NewFaqPage() { return <FaqForm onSubmit={createFaq} />; }
