import { getFaqs, deleteFaq } from "../actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function FaqsPage() {
  const faqs = await getFaqs();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">FAQs</h1>
        <Link href="/admin/faqs/new"><Button><Plus className="mr-2 h-4 w-4" /> Tambah FAQ</Button></Link>
      </div>
      <div className="bg-white rounded-lg border border-zinc-200">
        <Table>
          <TableHeader><TableRow><TableHead>Page</TableHead><TableHead>Question</TableHead><TableHead>Status</TableHead><TableHead className="w-[100px]">Aksi</TableHead></TableRow></TableHeader>
          <TableBody>
            {faqs.map((f) => (
              <TableRow key={f.id}>
                <TableCell><Badge variant="outline">{f.page}</Badge></TableCell>
                <TableCell className="font-medium max-w-[400px] truncate">{f.question}</TableCell>
                <TableCell><Badge variant={f.is_active ? "default" : "secondary"}>{f.is_active ? "Active" : "Inactive"}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/admin/faqs/${f.id}/edit`}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
                    <form action={async () => { "use server"; await deleteFaq(f.id); }}><Button variant="ghost" size="icon" type="submit"><Trash2 className="h-4 w-4 text-red-500" /></Button></form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {faqs.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-zinc-500 py-8">Belum ada FAQ</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
