import { getCompanyInfo, getServices, getFaqs } from "@/lib/supabase-server";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const [companyInfo, servicesData, faqsData] = await Promise.all([
    getCompanyInfo(),
    getServices(),
    getFaqs("contact"),
  ]);

  return (
    <ContactClient
      companyInfo={{
        email: companyInfo?.email ?? "",
        phone: companyInfo?.phone ?? "",
        official_name: companyInfo?.official_name ?? "Jaya Dinara Sukses",
        whatsapp_url: companyInfo?.whatsapp_url ?? "#",
        instagram_url: companyInfo?.instagram_url ?? "#",
        instagram: companyInfo?.instagram ?? "",
        address: companyInfo?.address ?? "",
      }}
      servicesData={servicesData.map((s: any) => ({ id: s.id, title: s.title }))}
      faqsData={faqsData.map((f: any) => ({ id: f.id, question: f.question, answer: f.answer }))}
    />
  );
}
