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
  initialData?: {
    title?: string | null;
    slug?: string | null;
    category?: string | null;
    category_label?: string | null;
    icon_name?: string | null;
    kbli_codes?: string[] | null;
    short_desc?: string | null;
    full_desc?: string | null;
    image_url?: string | null;
    is_active?: boolean | null;
    hero_tab_label?: string | null;
    hero_eyebrow?: string | null;
    hero_title?: string | null;
    hero_description?: string | null;
    hero_offer?: string | null;
    hero_cta_label?: string | null;
    hero_cta_href?: string | null;
    hero_video_url?: string | null;
    hero_icon_class?: string | null;
    features?: string[] | null;
    deliverables?: string[] | null;
  };
  onSubmit: (formData: FormData) => Promise<void>;
}

const iconOptions = [
  "Globe", "Code2", "Smartphone", "Layout", "Cpu", "Lightbulb", "Server", "Users", "FileText", "Film", "Palette",
];

export function ServiceForm({ initialData, onSubmit }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    formData.set("is_active", String(isActive));
    formData.set("features", JSON.stringify(features));
    formData.set("deliverables", JSON.stringify(deliverables));

    try {
      await onSubmit(formData);
      toast.success(initialData ? "Service updated" : "Service created");
      router.push("/admin/services");
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <input type="hidden" name="slug" defaultValue={initialData?.slug || ""} />
      <input type="hidden" name="kbli_codes" defaultValue={(initialData?.kbli_codes || []).join(", ")} />
      <input type="hidden" name="hero_icon_class" defaultValue={initialData?.hero_icon_class || "bg-blue-600"} />
      <input type="hidden" name="hero_eyebrow" defaultValue={initialData?.hero_eyebrow || ""} />
      <input type="hidden" name="hero_offer" defaultValue={initialData?.hero_offer || ""} />
      <input type="hidden" name="hero_cta_label" defaultValue={initialData?.hero_cta_label || ""} />
      <input type="hidden" name="hero_cta_href" defaultValue={initialData?.hero_cta_href || ""} />
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? "Edit Layanan" : "Layanan Baru"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Nama Layanan *</Label>
            <Input id="title" name="title" defaultValue={initialData?.title || ""} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category_label">Kategori *</Label>
              <Input id="category_label" name="category_label" defaultValue={initialData?.category_label || ""} placeholder="Contoh: Development" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon_name">Ikon</Label>
              <Select defaultValue={initialData?.icon_name || "Globe"} onValueChange={(v) => {
                const el = document.getElementById("icon_name") as HTMLInputElement;
                if (el) el.value = v || "Globe";
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
            <Label htmlFor="short_desc">Deskripsi Singkat</Label>
            <Textarea id="short_desc" name="short_desc" defaultValue={initialData?.short_desc || ""} rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_desc">Deskripsi Lengkap</Label>
            <Textarea id="full_desc" name="full_desc" defaultValue={initialData?.full_desc || ""} rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">URL Gambar</Label>
            <Input id="image_url" name="image_url" defaultValue={initialData?.image_url || ""} />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="is_active">Layanan aktif</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <details>
          <summary className="cursor-pointer list-none px-4 py-4 font-semibold text-zinc-900 marker:hidden">
            Pengaturan Hero <span className="ml-1 text-sm font-normal text-zinc-500">(opsional)</span>
          </summary>
        <CardContent className="space-y-4 border-t pt-4">
          <p className="text-sm text-zinc-500">Tidak wajib diisi. Jika kosong, hero memakai nama dan deskripsi layanan.</p>
          <div className="space-y-2">
            <Label htmlFor="hero_tab_label">Nama singkat pada tab</Label>
            <Input id="hero_tab_label" name="hero_tab_label" defaultValue={initialData?.hero_tab_label || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_title">Judul utama</Label>
            <Input id="hero_title" name="hero_title" defaultValue={initialData?.hero_title || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_description">Deskripsi hero</Label>
            <Textarea id="hero_description" name="hero_description" defaultValue={initialData?.hero_description || ""} rows={2} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_video_url">URL video</Label>
            <Input id="hero_video_url" name="hero_video_url" defaultValue={initialData?.hero_video_url || ""} />
          </div>
        </CardContent>
        </details>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fitur Layanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Tambahkan fitur..."
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
              Tambah
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
                  Hapus
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hasil Kerja</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Tambahkan hasil kerja..."
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
              Tambah
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
                  Hapus
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Simpan Perubahan" : "Buat Layanan"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Batal
        </Button>
      </div>
    </form>
  );
}
