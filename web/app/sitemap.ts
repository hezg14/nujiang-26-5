import type { MetadataRoute } from "next";
import { journalSlugs } from "@/lib/journal";
import { SITE_URL } from "@/lib/site";

type Entry = { path: string; freq: "weekly" | "monthly"; priority: number };

const ENTRIES: Entry[] = [
  { path: "", freq: "weekly", priority: 1 },
  { path: "/journal", freq: "weekly", priority: 0.8 },
  ...journalSlugs.map((slug) => ({
    path: `/journal/${slug}`,
    freq: "monthly" as const,
    priority: 0.7,
  })),
  { path: "/about", freq: "monthly", priority: 0.6 },
];

const LOCALES = ["en", "zh"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ENTRIES.map((entry) => ({
      url: `${SITE_URL}/${locale}${entry.path}`,
      lastModified: new Date(),
      changeFrequency: entry.freq,
      priority: entry.priority,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${entry.path}`,
          "zh-CN": `${SITE_URL}/zh${entry.path}`,
        },
      },
    }))
  );
}
