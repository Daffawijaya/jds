import { getServices, deleteService } from "../actions";
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

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Services</h1>
        <Link href="/admin/services/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Service
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{service.category}</Badge>
                </TableCell>
                <TableCell>{service.icon_name}</TableCell>
                <TableCell>
                  <Badge variant={service.is_active ? "default" : "secondary"}>
                    {service.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/admin/services/${service.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteService(service.id);
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
            {services.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-zinc-500 py-8">
                  Belum ada data service
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
