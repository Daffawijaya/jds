import Link from "next/link";
import { Plus } from "lucide-react";
import { getFaqs } from "../actions";
import { SortableAdminTable } from "@/components/admin/SortableAdminTable";
import { Button } from "@/components/ui/button";

export default async function FaqsPage() {
  const data = await getFaqs();
  const rows = data.map((item) => ({ id: item.id, sort_order: item.sort_order ?? 0, page: item.page, question: item.question, is_active: item.is_active }));
  return <div><div className="mb-8 flex items-center justify-between"><h1 className="text-2xl font-bold text-zinc-900">FAQs</h1><Link href="/admin/faqs/new"><Button><Plus className="mr-2 h-4 w-4" /> Tambah FAQ</Button></Link></div><SortableAdminTable key={rows.map((r) => `${r.id}:${r.sort_order}`).join("|")} entity="faqs" rows={rows} editPath="/admin/faqs" emptyMessage="Belum ada FAQ" columns={[{ key: "page", label: "Page", type: "badge" }, { key: "question", label: "Question", className: "max-w-[520px] truncate" }, { key: "is_active", label: "Status", type: "status" }]} /></div>;
}
