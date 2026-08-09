import "server-only";

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import type { GeneratedProjectBundle, GeneratedSchemaData, GeneratedSeo, ProjectInput } from "@/scripts/content-engine/types";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ContentProjectPreview = Pick<GeneratedProjectBundle, "website" | "seo" | "schema">;

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

export async function readGeneratedProject(slug: string): Promise<ContentProjectPreview | null> {
  if (!SLUG_PATTERN.test(slug)) return null;
  const projectDirectory = resolve(process.cwd(), "generated", slug);

  try {
    const [website, seo, schema] = await Promise.all([
      readJson<ProjectInput>(resolve(projectDirectory, "website.json")),
      readJson<GeneratedSeo>(resolve(projectDirectory, "seo.json")),
      readJson<GeneratedSchemaData>(resolve(projectDirectory, "schema.json")),
    ]);
    if (website.slug !== slug) return null;
    return { website, seo, schema };
  } catch {
    return null;
  }
}

export function getPreviewAssetUrl(slug: string, relativePath: string): string {
  return `/preview/content-assets/${slug}/${relativePath.split("/").map(encodeURIComponent).join("/")}`;
}
