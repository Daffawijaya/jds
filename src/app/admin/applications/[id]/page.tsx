import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getApplication } from "@/app/admin/actions";
import { createAdminClient } from "@/lib/supabase-admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApplicationSourceLabel, getRoleEngagementLabel, getWorkArrangementLabel } from "@/lib/career-options";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const application = await getApplication(id);
  const documentEntries = [
    ["Pasfoto", application.photo_path],
    ["CV / Resume", application.resume_path],
    ["Ijazah", application.diploma_path],
    ["Transkrip nilai", application.transcript_path],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  const admin = createAdminClient();
  const { data: signedDocuments } = documentEntries.length > 0
    ? await admin.storage.from("career-applications").createSignedUrls(documentEntries.map(([, path]) => path), 3600)
    : { data: [] };
  const documentUrls = new Map((signedDocuments ?? []).map((document) => [document.path, document.signedUrl]));

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/applications"><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div>
          <p className="text-sm text-zinc-500">Detail kandidat</p>
          <h1 className="text-2xl font-bold text-zinc-900">{application.name}</h1>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Posisi & kontak</CardTitle></CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Detail label="Posisi" value={application.position || application.expertise} />
          <Detail label="Jalur pendaftaran" value={getApplicationSourceLabel(application.application_source)} />
          <Detail label="Skema keterlibatan" value={getRoleEngagementLabel(application.engagement_scheme)} />
          <Detail label="Cara kerja" value={getWorkArrangementLabel(application.work_arrangement)} />
          <Detail label="Email" value={application.email} />
          <Detail label="WhatsApp / telepon" value={application.phone} />
          <Detail label="Domisili" value={application.domicile} />
          <Detail label="Tanggal masuk" value={new Date(application.created_at).toLocaleString("id-ID")} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Pendidikan & pengalaman</CardTitle></CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Detail label="Pendidikan terakhir" value={application.education_level} />
          <Detail label="Jurusan" value={application.major} />
          <Detail label="Institusi" value={application.institution} />
          <Detail label="Tahun lulus" value={application.graduation_year} />
          <Detail label="Lama pengalaman" value={application.experience_years != null ? `${application.experience_years} tahun` : null} />
          <Detail label="Posisi terakhir" value={application.latest_position} />
          <Detail label="Perusahaan terakhir" value={application.latest_company} />
          <Detail label="Ketersediaan" value={application.availability} />
          <Detail label="Ekspektasi kompensasi" value={application.expected_salary} />
          <div className="sm:col-span-2 lg:col-span-3"><Detail label="Keahlian utama" value={application.skills} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Tautan & dokumen</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-3">
            {application.linkedin_url && <DocumentLink label="LinkedIn" href={application.linkedin_url} />}
            {application.portfolio_url && <DocumentLink label="Portofolio / GitHub" href={application.portfolio_url} />}
            {documentEntries.map(([label, path]) => {
              const url = documentUrls.get(path);
              return url ? <DocumentLink key={path} label={label} href={url} /> : null;
            })}
            {!application.resume_path && application.resume_url && <DocumentLink label="CV lama" href={application.resume_url} />}
          </div>
          <Detail label="Motivasi / catatan" value={application.notes} />
        </CardContent>
      </Card>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number | null | undefined }) {
  return <div><p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</p><p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-zinc-900">{value || "-"}</p></div>;
}

function DocumentLink({ label, href }: { label: string; href: string }) {
  return <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">{label}<ExternalLink className="h-3.5 w-3.5" /></a>;
}
