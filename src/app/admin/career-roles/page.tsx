import { getCareerRoles, deleteCareerRole } from "../actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { formatApplicationPeriod, getApplicationWindowState, getRoleEngagementLabel, getWorkArrangementLabel } from "@/lib/career-options";

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
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Group</TableHead><TableHead>Pendidikan</TableHead><TableHead>Lokasi</TableHead><TableHead>Skema</TableHead><TableHead>Status</TableHead><TableHead>Periode pendaftaran</TableHead><TableHead>Publikasi</TableHead><TableHead className="w-[100px]">Aksi</TableHead></TableRow></TableHeader>
          <TableBody>
            {roles.map((r) => {
              const isOpen = getApplicationWindowState(r.application_status, r.application_open_date, r.application_close_date) === "open";
              return (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.title}</TableCell>
                <TableCell><Badge variant="outline">{r.group_label}</Badge></TableCell>
                <TableCell>{r.education_levels?.join(" / ") || "-"}</TableCell>
                <TableCell>{getWorkArrangementLabel(r.location)}</TableCell>
                <TableCell>{getRoleEngagementLabel(r.engagement)}</TableCell>
                <TableCell><Badge variant={isOpen ? "default" : "secondary"}>{isOpen ? "Open" : "Closed"}</Badge></TableCell>
                <TableCell>{formatApplicationPeriod(r.application_open_date, r.application_close_date)}</TableCell>
                <TableCell><Badge variant={r.is_active ? "default" : "secondary"}>{r.is_active ? "Tampil" : "Disembunyikan"}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/admin/career-roles/${r.id}/edit`}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
                    <form action={async () => { "use server"; await deleteCareerRole(r.id); }}><Button variant="ghost" size="icon" type="submit"><Trash2 className="h-4 w-4 text-red-500" /></Button></form>
                  </div>
                </TableCell>
              </TableRow>
              );
            })}
            {roles.length === 0 && <TableRow><TableCell colSpan={9} className="text-center text-zinc-500 py-8">Belum ada data</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
