"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface CareerRoleFormProps { initialData?: any; onSubmit: (formData: FormData) => Promise<void>; }

export function CareerRoleForm({ initialData, onSubmit }: CareerRoleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [groupName, setGroupName] = useState(initialData?.group_name || "technology");
  const [qualifications, setQualifications] = useState<string[]>(initialData?.qualifications || []);
  const [newQual, setNewQual] = useState("");

  const groups: Record<string, string> = { technology: "Teknologi", creative: "Desain & Konten", program: "Program & Operasional" };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("is_active", String(isActive));
    formData.set("group_name", groupName);
    formData.set("group_label", groups[groupName] || groupName);
    formData.set("qualifications", JSON.stringify(qualifications));
    try { await onSubmit(formData); toast.success(initialData ? "Updated" : "Created"); router.push("/admin/career-roles"); router.refresh(); } catch (err: any) { toast.error(err.message); } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Card><CardHeader><CardTitle>{initialData ? "Edit" : "New"} Career Role</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="title">Title *</Label><Input id="title" name="title" defaultValue={initialData?.title} required /></div>
            <div className="space-y-2"><Label htmlFor="slug">Slug *</Label><Input id="slug" name="slug" defaultValue={initialData?.slug} required /></div>
          </div>
          <div className="space-y-2">
            <Label>Group *</Label>
            <Select value={groupName} onValueChange={setGroupName}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Teknologi</SelectItem>
                <SelectItem value="creative">Desain & Konten</SelectItem>
                <SelectItem value="program">Program & Operasional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="education">Education</Label><Input id="education" name="education" defaultValue={initialData?.education} /></div>
            <div className="space-y-2"><Label htmlFor="majors">Majors</Label><Input id="majors" name="majors" defaultValue={initialData?.majors} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="location">Location</Label><Input id="location" name="location" defaultValue={initialData?.location} /></div>
            <div className="space-y-2"><Label htmlFor="engagement">Engagement</Label><Input id="engagement" name="engagement" defaultValue={initialData?.engagement} /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="summary">Summary</Label><Textarea id="summary" name="summary" defaultValue={initialData?.summary} rows={3} /></div>
          <div className="space-y-2"><Label htmlFor="sort_order">Sort Order</Label><Input id="sort_order" name="sort_order" type="number" defaultValue={initialData?.sort_order || 0} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="is_active" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded" /><Label htmlFor="is_active">Active</Label></div>
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
