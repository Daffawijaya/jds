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

interface FaqFormProps { initialData?: any; onSubmit: (formData: FormData) => Promise<void>; }

export function FaqForm({ initialData, onSubmit }: FaqFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [page, setPage] = useState(initialData?.page || "contact");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("is_active", String(isActive));
    formData.set("page", page);
    try { await onSubmit(formData); toast.success(initialData ? "Updated" : "Created"); router.push("/admin/faqs"); router.refresh(); } catch (err: any) { toast.error(err.message); } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Card><CardHeader><CardTitle>{initialData ? "Edit" : "New"} FAQ</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Page *</Label>
            <Select value={page} onValueChange={setPage}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="contact">Contact</SelectItem>
                <SelectItem value="career">Career</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="home">Home</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label htmlFor="question">Question *</Label><Input id="question" name="question" defaultValue={initialData?.question} required /></div>
          <div className="space-y-2"><Label htmlFor="answer">Answer *</Label><Textarea id="answer" name="answer" defaultValue={initialData?.answer} rows={4} required /></div>
          <div className="space-y-2"><Label htmlFor="sort_order">Sort Order</Label><Input id="sort_order" name="sort_order" type="number" defaultValue={initialData?.sort_order || 0} /></div>
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
