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
import { Trash2, MailOpen, Eye } from "lucide-react";
import { createAdminClient } from "@/lib/supabase-admin";
import Link from "next/link";
import { getApplicationSourceLabel, getRoleEngagementLabel, getWorkArrangementLabel } from "@/lib/career-options";

export default async function ApplicationsPage() {
  const applications = await getApplications();
  const documentPaths = applications.flatMap((application) =>
    [application.photo_path, application.resume_path, application.diploma_path, application.transcript_path]
      .filter((path): path is string => Boolean(path)),
  );
  const admin = createAdminClient();
  const { data: signedDocuments } = documentPaths.length > 0
    ? await admin.storage.from("career-applications").createSignedUrls(documentPaths, 3600)
    : { data: [] };
  const documentUrls = new Map((signedDocuments ?? []).map((document) => [document.path, document.signedUrl]));

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
              <TableHead>Pendidikan</TableHead>
              <TableHead>Dokumen</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[140px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((a) => (
              <TableRow key={a.id} className={a.is_read ? "" : "bg-blue-50/50"}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell>{a.email}</TableCell>
                <TableCell>
                  <p>{a.position || a.expertise}</p>
                  <p className="text-xs text-zinc-500">
                    {getApplicationSourceLabel(a.application_source)} · {getRoleEngagementLabel(a.engagement_scheme)} · {getWorkArrangementLabel(a.work_arrangement)}
                  </p>
                </TableCell>
                <TableCell>
                  <p>{[a.education_level, a.major].filter(Boolean).join(" · ") || "-"}</p>
                  <p className="text-xs text-zinc-500">{a.institution || ""}</p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-blue-600">
                    {[
                      ["Pasfoto", a.photo_path],
                      ["CV", a.resume_path],
                      ["Ijazah", a.diploma_path],
                      ["Transkrip", a.transcript_path],
                    ].map(([label, path]) => path && documentUrls.get(path) ? (
                      <a key={label} href={documentUrls.get(path) ?? undefined} target="_blank" rel="noreferrer" className="hover:underline">{label}</a>
                    ) : null)}
                    {!a.resume_path && a.resume_url && <a href={a.resume_url} target="_blank" rel="noreferrer" className="hover:underline">CV lama</a>}
                  </div>
                </TableCell>
                <TableCell>{new Date(a.created_at).toLocaleDateString("id-ID")}</TableCell>
                <TableCell>
                  <Badge variant={a.is_read ? "secondary" : "default"}>
                    {a.is_read ? "Read" : "New"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Link href={`/admin/applications/${a.id}`}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
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
                <TableCell colSpan={8} className="text-center text-zinc-500 py-8">
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
