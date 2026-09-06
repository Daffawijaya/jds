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

interface TestimonialFormProps {
  initialData?: any;
  onSubmit: (formData: FormData) => Promise<void>;
}

export function TestimonialForm({ initialData, onSubmit }: TestimonialFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("is_active", String(isActive));

    try {
      await onSubmit(formData);
      toast.success(initialData ? "Testimonial updated" : "Testimonial created");
      router.push("/admin/testimonials");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? "Edit Testimonial" : "New Testimonial"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" defaultValue={initialData?.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" defaultValue={initialData?.role} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={initialData?.title} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote">Quote</Label>
            <Textarea id="quote" name="quote" defaultValue={initialData?.quote} rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input id="image_url" name="image_url" defaultValue={initialData?.image_url} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort_order">Sort Order</Label>
            <Input id="sort_order" name="sort_order" type="number" defaultValue={initialData?.sort_order || 0} />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_active" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded" />
            <Label htmlFor="is_active">Active</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
