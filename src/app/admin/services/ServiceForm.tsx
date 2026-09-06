"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ServiceFormProps {
  initialData?: any;
  onSubmit: (formData: FormData) => Promise<void>;
}

const categories = [
  { value: "development", label: "Development" },
  { value: "solutions", label: "Solutions" },
  { value: "consulting", label: "Consulting" },
  { value: "outsourcing", label: "Outsourcing" },
  { value: "media", label: "Media" },
];

const iconOptions = [
  "Globe", "Code2", "Layout", "Cpu", "Lightbulb", "Server", "Users", "Film",
];

export function ServiceForm({ initialData, onSubmit }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(initialData?.category || "development");
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [features, setFeatures] = useState<string[]>(initialData?.features || []);
  const [deliverables, setDeliverables] = useState<string[]>(initialData?.deliverables || []);
  const [newFeature, setNewFeature] = useState("");
  const [newDeliverable, setNewDeliverable] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("category", category);
    formData.set("is_active", String(isActive));
    formData.set("features", JSON.stringify(features));
    formData.set("deliverables", JSON.stringify(deliverables));

    try {
      await onSubmit(formData);
      toast.success(initialData ? "Service updated" : "Service created");
      router.push("/admin/services");
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
          <CardTitle>{initialData ? "Edit Service" : "New Service"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" name="title" defaultValue={initialData?.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" name="slug" defaultValue={initialData?.slug} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon_name">Icon</Label>
              <Select defaultValue={initialData?.icon_name || "Globe"} onValueChange={(v) => {
                const el = document.getElementById("icon_name") as HTMLInputElement;
                if (el) el.value = v;
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" id="icon_name" name="icon_name" defaultValue={initialData?.icon_name || "Globe"} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_desc">Short Description</Label>
            <Textarea id="short_desc" name="short_desc" defaultValue={initialData?.short_desc} rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_desc">Full Description</Label>
            <Textarea id="full_desc" name="full_desc" defaultValue={initialData?.full_desc} rows={4} />
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
            <input
              type="checkbox"
              id="is_active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="is_active">Active</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add feature..."
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (newFeature.trim()) {
                    setFeatures([...features, newFeature.trim()]);
                    setNewFeature("");
                  }
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (newFeature.trim()) {
                  setFeatures([...features, newFeature.trim()]);
                  setNewFeature("");
                }
              }}
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm flex-1">{f}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFeatures(features.filter((_, idx) => idx !== i))}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deliverables</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add deliverable..."
              value={newDeliverable}
              onChange={(e) => setNewDeliverable(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (newDeliverable.trim()) {
                    setDeliverables([...deliverables, newDeliverable.trim()]);
                    setNewDeliverable("");
                  }
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (newDeliverable.trim()) {
                  setDeliverables([...deliverables, newDeliverable.trim()]);
                  setNewDeliverable("");
                }
              }}
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {deliverables.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm flex-1">{d}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeliverables(deliverables.filter((_, idx) => idx !== i))}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update" : "Create"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
