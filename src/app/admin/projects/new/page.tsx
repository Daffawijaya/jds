import { createProject } from "@/app/admin/actions";
import { ProjectForm } from "../ProjectForm";

export default function NewProjectPage() {
  return <ProjectForm onSubmit={createProject} />;
}
