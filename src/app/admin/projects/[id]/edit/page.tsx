import { getProject, updateProject } from "@/app/admin/actions";
import { ProjectForm } from "../../ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  return <ProjectForm initialData={project} onSubmit={updateProject.bind(null, id)} />;
}
