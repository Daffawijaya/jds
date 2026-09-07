import { getCompanyInfo, getServices, getFaqs } from "@/lib/supabase-server";
import ContactClient from "./ContactClient";

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const requestedService = (await searchParams).service;
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
      servicesData={servicesData.map((service) => ({ id: service.id, title: service.title }))}
      faqsData={faqsData.map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }))}
      initialService={requestedService}
    />
  );
}
