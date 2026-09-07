import { getCareerRoles } from "@/lib/supabase-server";
import { getApplicationWindowState, type ApplicationStatus, type ApplicationWindowState, type EducationLevel, type RoleEngagement, type WorkArrangement } from "@/lib/career-options";
import CareerClient from "./CareerClient";

type CareerRoleRow = {
  slug: string;
  title: string;
  group_name: "technology" | "creative" | "program";
  group_label: string | null;
  education_levels: EducationLevel[] | null;
  majors: string | null;
  location: WorkArrangement | null;
  engagement: RoleEngagement | null;
  summary: string | null;
  qualifications: string[];
  application_status: ApplicationStatus | null;
  application_open_date: string | null;
  application_close_date: string | null;
};

export default async function CareerPage() {
  const careerRoles = await getCareerRoles();

  return (
    <CareerClient
      careerRoles={(careerRoles as CareerRoleRow[]).map((r) => {
        const applicationStatus = r.application_status ?? "closed";
        const windowState: ApplicationWindowState = getApplicationWindowState(applicationStatus, r.application_open_date, r.application_close_date);
        return {
        id: r.slug,
        title: r.title,
        group: r.group_name as "technology" | "creative" | "program",
        groupLabel: r.group_label ?? "",
        education: r.education_levels ?? [],
        majors: r.majors ?? "",
        location: r.location ?? "flexible",
        engagement: r.engagement ?? "project_based",
        summary: r.summary ?? "",
        qualifications: r.qualifications as string[],
        applicationStatus,
        applicationOpenDate: r.application_open_date,
        applicationCloseDate: r.application_close_date,
        applicationWindowState: windowState,
        isAcceptingApplications: windowState === "open",
      }})}
    />
  );
}
