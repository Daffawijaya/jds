import Link from "next/link";
import { Plus } from "lucide-react";
import { getServices } from "../actions";
import { SortableAdminTable } from "@/components/admin/SortableAdminTable";
import { Button } from "@/components/ui/button";

export default async function ServicesPage() {
  const data = await getServices();
  const rows = data.map((item) => ({ id: item.id, sort_order: item.sort_order ?? 0, title: item.title, category: item.category, icon_name: item.icon_name, is_active: item.is_active }));
  return <div><div className="mb-8 flex items-center justify-between"><h1 className="text-2xl font-bold text-zinc-900">Services</h1><Link href="/admin/services/new"><Button><Plus className="mr-2 h-4 w-4" /> Tambah Service</Button></Link></div><SortableAdminTable key={rows.map((r) => `${r.id}:${r.sort_order}`).join("|")} entity="services" rows={rows} editPath="/admin/services" emptyMessage="Belum ada data service" columns={[{ key: "title", label: "Title" }, { key: "category", label: "Category", type: "badge" }, { key: "icon_name", label: "Icon" }, { key: "is_active", label: "Status", type: "status" }]} /></div>;
}
