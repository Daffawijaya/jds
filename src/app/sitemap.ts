import type { MetadataRoute } from "next";
import { siteNavLinks } from "@/data/companyData";

const baseUrl = "https://jayadinarasukses.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteNavLinks.map((link) => ({
    url: `${baseUrl}${link.href}`,
    lastModified: new Date(),
    changeFrequency: link.href === "/" ? "weekly" : "monthly",
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
