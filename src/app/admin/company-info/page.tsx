import { getCompanyInfo, updateCompanyInfo } from "../actions";
import { CompanyInfoForm } from "./CompanyInfoForm";

export default async function CompanyInfoPage() {
  const info = await getCompanyInfo();
  return <CompanyInfoForm initialData={info} />;
}
