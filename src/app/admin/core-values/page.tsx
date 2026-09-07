import Link from "next/link";
import { Plus } from "lucide-react";
import { getCoreValues } from "../actions";
import { SortableAdminTable } from "@/components/admin/SortableAdminTable";
import { Button } from "@/components/ui/button";

export default async function CoreValuesPage() {
  const data = await getCoreValues();
  const rows = data.map((item) => ({ id: item.id, sort_order: item.sort_order ?? 0, title: item.title, icon_name: item.icon_name, is_active: item.is_active }));
  return <div><div className="mb-8 flex items-center justify-between"><h1 className="text-2xl font-bold text-zinc-900">Core Values</h1><Link href="/admin/core-values/new"><Button><Plus className="mr-2 h-4 w-4" /> Tambah</Button></Link></div><SortableAdminTable key={rows.map((r) => `${r.id}:${r.sort_order}`).join("|")} entity="coreValues" rows={rows} editPath="/admin/core-values" emptyMessage="Belum ada data" columns={[{ key: "title", label: "Title" }, { key: "icon_name", label: "Icon" }, { key: "is_active", label: "Status", type: "status" }]} /></div>;
}
