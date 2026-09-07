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

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (formData: FormData) => Promise<void>;
}

export function ProjectForm({ initialData, onSubmit }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [scope, setScope] = useState<string[]>(initialData?.scope || []);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newScope, setNewScope] = useState("");
  const [newTag, setNewTag] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("is_active", String(isActive));
    formData.set("scope", JSON.stringify(scope));
    formData.set("tags", JSON.stringify(tags));

    try {
      await onSubmit(formData);
      toast.success(initialData ? "Project updated" : "Project created");
      router.push("/admin/projects");
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
          <CardTitle>{initialData ? "Edit Project" : "New Project"}</CardTitle>
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
              <Label htmlFor="client">Client</Label>
              <Input id="client" name="client" defaultValue={initialData?.client} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" name="year" defaultValue={initialData?.year} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" defaultValue={initialData?.category} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="highlight_badge">Highlight Badge</Label>
              <Input id="highlight_badge" name="highlight_badge" defaultValue={initialData?.highlight_badge} />
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

          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_active" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded" />
            <Label htmlFor="is_active">Active</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scope</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Add scope..." value={newScope} onChange={(e) => setNewScope(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (newScope.trim()) { setScope([...scope, newScope.trim()]); setNewScope(""); } } }} />
            <Button type="button" variant="outline" onClick={() => { if (newScope.trim()) { setScope([...scope, newScope.trim()]); setNewScope(""); } }}>Add</Button>
          </div>
          <div className="space-y-2">
            {scope.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm flex-1">{s}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => setScope(scope.filter((_, idx) => idx !== i))}>Remove</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Add tag..." value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (newTag.trim()) { setTags([...tags, newTag.trim()]); setNewTag(""); } } }} />
            <Button type="button" variant="outline" onClick={() => { if (newTag.trim()) { setTags([...tags, newTag.trim()]); setNewTag(""); } }}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded text-sm">
                {t}
                <button type="button" onClick={() => setTags(tags.filter((_, idx) => idx !== i))} className="text-zinc-500 hover:text-red-500">&times;</button>
              </span>
            ))}
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
