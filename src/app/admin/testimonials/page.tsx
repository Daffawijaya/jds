import Link from "next/link";
import { Plus } from "lucide-react";
import { getTestimonials } from "../actions";
import { SortableAdminTable } from "@/components/admin/SortableAdminTable";
import { Button } from "@/components/ui/button";

export default async function TestimonialsPage() {
  const data = await getTestimonials();
  const rows = data.map((item) => ({ id: item.id, sort_order: item.sort_order ?? 0, name: item.name, role: item.role, quote: item.quote, is_active: item.is_active }));
  return <div><div className="mb-8 flex items-center justify-between"><h1 className="text-2xl font-bold text-zinc-900">Testimonials</h1><Link href="/admin/testimonials/new"><Button><Plus className="mr-2 h-4 w-4" /> Tambah Testimonial</Button></Link></div><SortableAdminTable key={rows.map((r) => `${r.id}:${r.sort_order}`).join("|")} entity="testimonials" rows={rows} editPath="/admin/testimonials" emptyMessage="Belum ada data testimonial" columns={[{ key: "name", label: "Name" }, { key: "role", label: "Role" }, { key: "quote", label: "Quote", className: "max-w-[300px] truncate" }, { key: "is_active", label: "Status", type: "status" }]} /></div>;
}
