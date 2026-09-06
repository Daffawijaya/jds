import { createCareerRole } from "@/app/admin/actions";
import { CareerRoleForm } from "../CareerRoleForm";
export default function NewCareerRolePage() { return <CareerRoleForm onSubmit={createCareerRole} />; }
