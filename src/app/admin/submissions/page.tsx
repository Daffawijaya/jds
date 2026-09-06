import { getSubmissions, deleteSubmission, markSubmissionRead } from "../actions";
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
import { Trash2, Mail, MailOpen } from "lucide-react";

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Contact Submissions</h1>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((s) => (
              <TableRow key={s.id} className={s.is_read ? "" : "bg-blue-50/50"}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.phone}</TableCell>
                <TableCell>{s.service}</TableCell>
                <TableCell>{new Date(s.created_at).toLocaleDateString("id-ID")}</TableCell>
                <TableCell>
                  <Badge variant={s.is_read ? "secondary" : "default"}>
                    {s.is_read ? "Read" : "New"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {!s.is_read && (
                      <form
                        action={async () => {
                          "use server";
                          await markSubmissionRead(s.id);
                        }}
                      >
                        <Button variant="ghost" size="icon" type="submit">
                          <MailOpen className="h-4 w-4" />
                        </Button>
                      </form>
                    )}
                    <form
                      action={async () => {
                        "use server";
                        await deleteSubmission(s.id);
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
            {submissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-zinc-500 py-8">
                  Belum ada submission
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
