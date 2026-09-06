import { getCareerRoles } from "@/lib/supabase-server";
import CareerClient from "./CareerClient";

export default async function CareerPage() {
  const careerRoles = await getCareerRoles();

  return (
    <CareerClient
      careerRoles={careerRoles.map((r: any) => ({
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
      }))}
    />
  );
}
