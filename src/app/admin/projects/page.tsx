import Link from "next/link";
import { Plus } from "lucide-react";
import { getProjects } from "../actions";
import { SortableAdminTable } from "@/components/admin/SortableAdminTable";
import { Button } from "@/components/ui/button";

export default async function ProjectsPage() {
  const data = await getProjects();
  const rows = data.map((item) => ({ id: item.id, sort_order: item.sort_order ?? 0, title: item.title, client: item.client, year: item.year, is_active: item.is_active }));
  return <div><div className="mb-8 flex items-center justify-between"><h1 className="text-2xl font-bold text-zinc-900">Projects</h1><Link href="/admin/projects/new"><Button><Plus className="mr-2 h-4 w-4" /> Tambah Project</Button></Link></div><SortableAdminTable key={rows.map((r) => `${r.id}:${r.sort_order}`).join("|")} entity="projects" rows={rows} editPath="/admin/projects" emptyMessage="Belum ada data project" columns={[{ key: "title", label: "Title" }, { key: "client", label: "Client" }, { key: "year", label: "Year" }, { key: "is_active", label: "Status", type: "status" }]} /></div>;
}
