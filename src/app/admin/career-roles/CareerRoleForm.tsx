"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  APPLICATION_STATUS_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
  ROLE_ENGAGEMENT_OPTIONS,
  WORK_ARRANGEMENT_OPTIONS,
  type ApplicationStatus,
  type EducationLevel,
  type RoleEngagement,
  type WorkArrangement,
} from "@/lib/career-options";

interface CareerRoleFormData {
  title?: string;
  group_name?: string;
  education?: string;
  education_levels?: EducationLevel[];
  majors?: string;
  location?: WorkArrangement;
  engagement?: RoleEngagement;
  summary?: string;
  qualifications?: string[];
  is_active?: boolean;
  application_status?: ApplicationStatus;
  application_open_date?: string | null;
  application_close_date?: string | null;
}

interface CareerRoleFormProps { initialData?: CareerRoleFormData; onSubmit: (formData: FormData) => Promise<void>; }

export function CareerRoleForm({ initialData, onSubmit }: CareerRoleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>(initialData?.application_status ?? "open");
  const [groupName, setGroupName] = useState(initialData?.group_name || "technology");
  const [location, setLocation] = useState<WorkArrangement>(initialData?.location ?? "flexible");
  const [engagement, setEngagement] = useState<RoleEngagement>(initialData?.engagement ?? "project_based");
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>(
    initialData?.education_levels
      ?? EDUCATION_LEVEL_OPTIONS.filter((level) => initialData?.education?.toUpperCase().includes(level.split("/")[0])),
  );
  const [qualifications, setQualifications] = useState<string[]>(initialData?.qualifications || []);
  const [newQual, setNewQual] = useState("");

  const groups: Record<string, string> = { technology: "Teknologi", creative: "Desain & Konten", program: "Program & Operasional" };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("is_active", String(isActive));
    formData.set("application_status", applicationStatus);
    formData.set("group_name", groupName);
    formData.set("group_label", groups[groupName] || groupName);
    formData.set("location", location);
    formData.set("engagement", engagement);
    formData.set("education_levels", JSON.stringify(educationLevels));
    formData.set("qualifications", JSON.stringify(qualifications));
    if (educationLevels.length === 0) {
      toast.error("Pilih minimal satu jenjang pendidikan");
      setLoading(false);
      return;
    }
    if (applicationStatus === "closed") {
      formData.set("application_open_date", "");
      formData.set("application_close_date", "");
    } else {
      const openDate = String(formData.get("application_open_date") ?? "");
      const closeDate = String(formData.get("application_close_date") ?? "");
      if (!openDate || !closeDate || openDate > closeDate) {
        toast.error("Tanggal selesai harus sama atau setelah tanggal mulai");
        setLoading(false);
        return;
      }
    }
    try { await onSubmit(formData); toast.success(initialData ? "Updated" : "Created"); router.push("/admin/career-roles"); router.refresh(); } catch (err: unknown) { toast.error(err instanceof Error ? err.message : "Terjadi kesalahan"); } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Card><CardHeader><CardTitle>{initialData ? "Edit" : "New"} Career Role</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" defaultValue={initialData?.title} required />
            <p className="text-xs text-zinc-500">Slug dibuat otomatis dari judul posisi.</p>
          </div>
          <div className="space-y-2">
            <Label>Group *</Label>
            <Select value={groupName} onValueChange={(value) => value && setGroupName(value)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Teknologi</SelectItem>
                <SelectItem value="creative">Desain & Konten</SelectItem>
                <SelectItem value="program">Program & Operasional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Jenjang pendidikan *</Label>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button type="button" variant="outline" className="w-full justify-between font-normal" />}>
                  <span className="truncate">{educationLevels.length > 0 ? educationLevels.join(" / ") : "Pilih jenjang pendidikan"}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[var(--anchor-width)] p-2">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Bisa memilih lebih dari satu</DropdownMenuLabel>
                    {EDUCATION_LEVEL_OPTIONS.map((level) => (
                      <DropdownMenuCheckboxItem
                        key={level}
                        checked={educationLevels.includes(level)}
                        closeOnClick={false}
                        onCheckedChange={(checked) => {
                          setEducationLevels((current) => checked
                            ? [...current, level].sort((a, b) => EDUCATION_LEVEL_OPTIONS.indexOf(a) - EDUCATION_LEVEL_OPTIONS.indexOf(b))
                            : current.filter((item) => item !== level));
                        }}
                        className="py-2"
                      >
                        {level}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-2"><Label htmlFor="majors">Majors</Label><Input id="majors" name="majors" defaultValue={initialData?.majors} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Lokasi kerja</Label>
              <Select value={location} onValueChange={(value) => value && setLocation(value as WorkArrangement)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {WORK_ARRANGEMENT_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Skema keterlibatan</Label>
              <Select value={engagement} onValueChange={(value) => value && setEngagement(value as RoleEngagement)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ROLE_ENGAGEMENT_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2"><Label htmlFor="summary">Summary</Label><Textarea id="summary" name="summary" defaultValue={initialData?.summary} rows={3} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status pendaftaran</Label>
              <Select value={applicationStatus} onValueChange={(value) => value && setApplicationStatus(value as ApplicationStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {APPLICATION_STATUS_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end pb-2">
              <div className="flex items-center gap-2"><input type="checkbox" id="is_active" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded" /><Label htmlFor="is_active">Tampilkan di website</Label></div>
            </div>
          </div>
          {applicationStatus === "open" && (
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-blue-200 bg-blue-50/60 p-4">
              <div className="space-y-2">
                <Label htmlFor="application_open_date">Tanggal mulai *</Label>
                <Input id="application_open_date" name="application_open_date" type="date" defaultValue={initialData?.application_open_date ?? ""} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="application_close_date">Tanggal selesai *</Label>
                <Input id="application_close_date" name="application_close_date" type="date" defaultValue={initialData?.application_close_date ?? ""} required />
              </div>
              <p className="col-span-2 text-xs leading-5 text-zinc-600">Pendaftaran hanya dapat dikirim pada rentang tanggal ini. Tanggal mulai dan selesai sama-sama dihitung aktif.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card><CardHeader><CardTitle>Qualifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Add qualification..." value={newQual} onChange={(e) => setNewQual(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (newQual.trim()) { setQualifications([...qualifications, newQual.trim()]); setNewQual(""); } } }} />
            <Button type="button" variant="outline" onClick={() => { if (newQual.trim()) { setQualifications([...qualifications, newQual.trim()]); setNewQual(""); } }}>Add</Button>
          </div>
          <div className="space-y-2">
            {qualifications.map((q, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm flex-1">{q}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => setQualifications(qualifications.filter((_, idx) => idx !== i))}>Remove</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{initialData ? "Update" : "Create"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
