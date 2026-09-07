import { getCareerRoles } from "@/lib/supabase-server";
import type { ApplicationStatus, RoleEngagement, WorkArrangement } from "@/lib/career-options";
import CareerClient from "./CareerClient";

type CareerRoleRow = {
  slug: string;
  title: string;
  group_name: "technology" | "creative" | "program";
  group_label: string | null;
  education: string | null;
  majors: string | null;
  location: WorkArrangement | null;
  engagement: RoleEngagement | null;
  summary: string | null;
  qualifications: string[];
  application_status: ApplicationStatus | null;
};

export default async function CareerPage() {
  const careerRoles = await getCareerRoles();

  return (
    <CareerClient
      careerRoles={(careerRoles as CareerRoleRow[]).map((r) => ({
        id: r.slug,
        title: r.title,
        group: r.group_name as "technology" | "creative" | "program",
        groupLabel: r.group_label ?? "",
        education: r.education ?? "",
        majors: r.majors ?? "",
        location: r.location ?? "flexible",
        engagement: r.engagement ?? "project_based",
        summary: r.summary ?? "",
        qualifications: r.qualifications as string[],
        applicationStatus: r.application_status ?? "open",
      }))}
    />
  );
}
