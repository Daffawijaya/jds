import { getCoreValues, deleteCoreValue } from "../actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function CoreValuesPage() {
  const values = await getCoreValues();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Core Values</h1>
        <Link href="/admin/core-values/new"><Button><Plus className="mr-2 h-4 w-4" /> Tambah</Button></Link>
      </div>
      <div className="bg-white rounded-lg border border-zinc-200">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Icon</TableHead><TableHead>Status</TableHead><TableHead className="w-[100px]">Aksi</TableHead></TableRow></TableHeader>
          <TableBody>
            {values.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-medium">{v.title}</TableCell>
                <TableCell>{v.icon_name}</TableCell>
                <TableCell><Badge variant={v.is_active ? "default" : "secondary"}>{v.is_active ? "Active" : "Inactive"}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/admin/core-values/${v.id}/edit`}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
                    <form action={async () => { "use server"; await deleteCoreValue(v.id); }}><Button variant="ghost" size="icon" type="submit"><Trash2 className="h-4 w-4 text-red-500" /></Button></form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {values.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-zinc-500 py-8">Belum ada data</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
