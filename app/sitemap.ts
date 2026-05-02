import type { MetadataRoute } from "next";
import { SITE_URL, SUPPORTED_LANGS } from "@/lib/seo";
import { getServices } from "@/lib/data";

export const revalidate = 3600; // refresh hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let services: { slug: string; updatedAt?: string }[] = [];
  try {
    services = await getServices();
  } catch {
    services = [];
  }

  const buildAlt = (path: string) => ({
    "ro-MD": `${SITE_URL}/ro${path}`,
    "ru-MD": `${SITE_URL}/ru${path}`,
  });

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of SUPPORTED_LANGS) {
    // Home
    entries.push({
      url: `${SITE_URL}/${lang}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: buildAlt("") },
    });
    // Services index
    entries.push({
      url: `${SITE_URL}/${lang}/servicii`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: buildAlt("/servicii") },
    });
    // Service detail pages
    for (const svc of services) {
      entries.push({
        url: `${SITE_URL}/${lang}/servicii/${svc.slug}`,
        lastModified: svc.updatedAt ? new Date(svc.updatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: buildAlt(`/servicii/${svc.slug}`) },
      });
    }
  }

  return entries;
}
