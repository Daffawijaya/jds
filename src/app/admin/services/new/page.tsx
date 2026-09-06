import { createService } from "@/app/admin/actions";
import { ServiceForm } from "../ServiceForm";

export default function NewServicePage() {
  return <ServiceForm onSubmit={createService} />;
}
