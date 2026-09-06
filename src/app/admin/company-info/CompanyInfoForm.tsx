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
import { updateCompanyInfo } from "../actions";

interface CompanyInfoFormProps {
  initialData: any;
}

export function CompanyInfoForm({ initialData }: CompanyInfoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      await updateCompanyInfo(formData);
      toast.success("Company info updated");
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
          <CardTitle>Company Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="official_name">Official Name</Label>
              <Input id="official_name" name="official_name" defaultValue={initialData?.official_name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="short_name">Short Name</Label>
              <Input id="short_name" name="short_name" defaultValue={initialData?.short_name} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="positioning">Positioning</Label>
            <Input id="positioning" name="positioning" defaultValue={initialData?.positioning} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" name="tagline" defaultValue={initialData?.tagline} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Overview</Label>
            <Textarea id="overview" name="overview" defaultValue={initialData?.overview} rows={3} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea id="address" name="address" defaultValue={initialData?.address} rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="village">Village</Label>
              <Input id="village" name="village" defaultValue={initialData?.village} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" name="district" defaultValue={initialData?.district} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="regency">Regency</Label>
              <Input id="regency" name="regency" defaultValue={initialData?.regency} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Input id="province" name="province" defaultValue={initialData?.province} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" defaultValue={initialData?.country} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" defaultValue={initialData?.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={initialData?.email} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" name="whatsapp" defaultValue={initialData?.whatsapp} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp_url">WhatsApp URL</Label>
              <Input id="whatsapp_url" name="whatsapp_url" defaultValue={initialData?.whatsapp_url} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" name="instagram" defaultValue={initialData?.instagram} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input id="instagram_url" name="instagram_url" defaultValue={initialData?.instagram_url} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update Company Info
      </Button>
    </form>
  );
}
