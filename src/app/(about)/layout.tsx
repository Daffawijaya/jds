import { Navbar } from "@/components/layout/Navbar";
import { getCompanyInfo } from "@/lib/supabase-server";

export default async function AboutLayout({ children }: { children: React.ReactNode }) {
  const companyInfo = await getCompanyInfo();

  return (
    <>
      <Navbar
        companyName={companyInfo?.short_name ?? "JDS"}
        officialName={companyInfo?.official_name ?? "Jaya Dinara Sukses"}
        phone={companyInfo?.phone ?? "081928704503"}
        whatsappUrl={companyInfo?.whatsapp_url ?? "#"}
      />
      <main className="relative z-10 min-h-screen">{children}</main>
    </>
  );
}
