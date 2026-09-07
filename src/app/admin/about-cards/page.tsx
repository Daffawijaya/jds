import Link from "next/link";
import { Plus } from "lucide-react";
import { getAboutCards } from "../actions";
import { SortableAdminTable } from "@/components/admin/SortableAdminTable";
import { Button } from "@/components/ui/button";

export default async function AboutCardsPage() {
  const data = await getAboutCards();
  const rows = data.map((item) => ({ id: item.id, sort_order: item.sort_order ?? 0, label: item.label, title: item.title, is_active: item.is_active }));
  return <div><div className="mb-8 flex items-center justify-between"><h1 className="text-2xl font-bold text-zinc-900">About Cards</h1><Link href="/admin/about-cards/new"><Button><Plus className="mr-2 h-4 w-4" /> Tambah</Button></Link></div><SortableAdminTable key={rows.map((r) => `${r.id}:${r.sort_order}`).join("|")} entity="aboutCards" rows={rows} editPath="/admin/about-cards" emptyMessage="Belum ada data" columns={[{ key: "label", label: "Label", type: "badge" }, { key: "title", label: "Title" }, { key: "is_active", label: "Status", type: "status" }]} /></div>;
}
