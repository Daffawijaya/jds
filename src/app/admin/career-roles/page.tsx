import { getCareerRoles, deleteCareerRole } from "../actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function CareerRolesPage() {
  const roles = await getCareerRoles();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Career Roles</h1>
        <Link href="/admin/career-roles/new"><Button><Plus className="mr-2 h-4 w-4" /> Tambah Role</Button></Link>
      </div>
      <div className="bg-white rounded-lg border border-zinc-200">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Group</TableHead><TableHead>Education</TableHead><TableHead>Pendaftaran</TableHead><TableHead>Publikasi</TableHead><TableHead className="w-[100px]">Aksi</TableHead></TableRow></TableHeader>
          <TableBody>
            {roles.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.title}</TableCell>
                <TableCell><Badge variant="outline">{r.group_label}</Badge></TableCell>
                <TableCell>{r.education}</TableCell>
                <TableCell><Badge variant={r.is_open ? "default" : "secondary"}>{r.is_open ? "Terbuka" : "Tertutup"}</Badge></TableCell>
                <TableCell><Badge variant={r.is_active ? "default" : "secondary"}>{r.is_active ? "Tampil" : "Disembunyikan"}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/admin/career-roles/${r.id}/edit`}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
                    <form action={async () => { "use server"; await deleteCareerRole(r.id); }}><Button variant="ghost" size="icon" type="submit"><Trash2 className="h-4 w-4 text-red-500" /></Button></form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {roles.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-zinc-500 py-8">Belum ada data</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
