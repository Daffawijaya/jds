"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AboutCardFormProps { initialData?: any; onSubmit: (formData: FormData) => Promise<void>; }

export function AboutCardForm({ initialData, onSubmit }: AboutCardFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("is_active", String(isActive));
    try { await onSubmit(formData); toast.success(initialData ? "Updated" : "Created"); router.push("/admin/about-cards"); router.refresh(); } catch (err: any) { toast.error(err.message); } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Card><CardHeader><CardTitle>{initialData ? "Edit" : "New"} About Card</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="label">Label</Label><Input id="label" name="label" defaultValue={initialData?.label} /></div>
            <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" name="title" defaultValue={initialData?.title} /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" name="description" defaultValue={initialData?.description} rows={3} /></div>
          <div className="space-y-2"><Label htmlFor="image_url">Image URL</Label><Input id="image_url" name="image_url" defaultValue={initialData?.image_url} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="button_label">Button Label</Label><Input id="button_label" name="button_label" defaultValue={initialData?.button_label} /></div>
            <div className="space-y-2"><Label htmlFor="button_href">Button Href</Label><Input id="button_href" name="button_href" defaultValue={initialData?.button_href} /></div>
          </div>
          <div className="flex items-center gap-2"><input type="checkbox" id="is_active" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded" /><Label htmlFor="is_active">Active</Label></div>
        </CardContent>
      </Card>
      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{initialData ? "Update" : "Create"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
