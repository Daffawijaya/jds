import { getService, updateService } from "@/app/admin/actions";
import { ServiceForm } from "../../ServiceForm";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getService(id);
  return <ServiceForm initialData={service} onSubmit={updateService.bind(null, id)} />;
}
