import { getCareerRoles } from "@/lib/supabase-server";
import CareerClient from "./CareerClient";

type CareerRoleRow = {
  slug: string;
  title: string;
  group_name: "technology" | "creative" | "program";
  group_label: string | null;
  education: string | null;
  majors: string | null;
  location: string | null;
  engagement: string | null;
  summary: string | null;
  qualifications: string[];
  is_open: boolean | null;
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
        location: r.location ?? "",
        engagement: r.engagement ?? "",
        summary: r.summary ?? "",
        qualifications: r.qualifications as string[],
        isOpen: r.is_open ?? true,
      }))}
    />
  );
}
