import { getCompanyInfo, getServices } from "@/lib/supabase-server";
import ServicesClient from "./ServicesClient";

export default async function ServicesPage() {
  const [companyInfo, servicesData] = await Promise.all([
    getCompanyInfo(),
    getServices(),
  ]);

  return (
    <ServicesClient
      companyInfo={{
        short_name: companyInfo?.short_name ?? "JDS",
        whatsapp_url: companyInfo?.whatsapp_url ?? "#",
      }}
      servicesData={servicesData.map((s: any) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        category: s.category,
        short_desc: s.short_desc,
        full_desc: s.full_desc,
        icon_name: s.icon_name,
        features: s.features as string[],
        deliverables: s.deliverables as string[],
      }))}
    />
  );
}
