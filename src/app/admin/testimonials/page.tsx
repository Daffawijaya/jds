import { getTestimonials, deleteTestimonial } from "../actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Testimonials</h1>
        <Link href="/admin/testimonials/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Testimonial
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell>{t.role}</TableCell>
                <TableCell className="max-w-[300px] truncate">{t.quote}</TableCell>
                <TableCell>
                  <Badge variant={t.is_active ? "default" : "secondary"}>
                    {t.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/admin/testimonials/${t.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteTestimonial(t.id);
                      }}
                    >
                      <Button variant="ghost" size="icon" type="submit">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {testimonials.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                  Belum ada data testimonial
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
