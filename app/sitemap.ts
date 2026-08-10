import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { getSitemapContentProjects } from "@/lib/content-engine/production-projects";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectPages = projects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const contentProjectPages = (await getSitemapContentProjects()).map(({ bundle }) => ({
    url: bundle.seo.canonical,
    lastModified: new Date(bundle.website.publishDate!),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    ...projectPages,
    ...contentProjectPages,
  ];
}
