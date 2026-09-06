import { getCompanyInfo, getProjects } from "@/lib/supabase-server";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const [companyInfo, projectsData] = await Promise.all([
    getCompanyInfo(),
    getProjects(),
  ]);

  return (
    <ProjectsClient
      companyInfo={{
        official_name: companyInfo?.official_name ?? "Jaya Dinara Sukses",
        short_name: companyInfo?.short_name ?? "JDS",
        whatsapp_url: companyInfo?.whatsapp_url ?? "#",
      }}
      projectsData={projectsData.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        client: p.client,
        category: p.category,
        year: p.year,
        short_desc: p.short_desc,
        full_desc: p.full_desc,
        scope: p.scope as string[],
        tags: p.tags as string[],
        highlight_badge: p.highlight_badge,
      }))}
    />
  );
}
