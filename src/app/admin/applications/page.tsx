import { getApplications, deleteApplication, markApplicationRead } from "../actions";
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
import { Trash2, MailOpen } from "lucide-react";

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Career Applications</h1>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((a) => (
              <TableRow key={a.id} className={a.is_read ? "" : "bg-blue-50/50"}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell>{a.email}</TableCell>
                <TableCell>{a.position || a.expertise}</TableCell>
                <TableCell>{new Date(a.created_at).toLocaleDateString("id-ID")}</TableCell>
                <TableCell>
                  <Badge variant={a.is_read ? "secondary" : "default"}>
                    {a.is_read ? "Read" : "New"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {!a.is_read && (
                      <form
                        action={async () => {
                          "use server";
                          await markApplicationRead(a.id);
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
                        await deleteApplication(a.id);
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
            {applications.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-zinc-500 py-8">
                  Belum ada aplikasi
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
