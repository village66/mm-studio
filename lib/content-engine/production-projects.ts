import "server-only";

import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

import { projects as legacyProjects } from "@/data/projects";
import { generateProjectBundle } from "@/scripts/content-engine/generate";
import { assessPublishReadiness } from "@/scripts/content-engine/publish-readiness";
import { onlyProductionEligible } from "@/scripts/content-engine/production-eligibility";
import type { GeneratedProjectBundle, ProjectInput, PublishReadinessReport } from "@/scripts/content-engine/types";

export type ProductionContentProject = {
  bundle: GeneratedProjectBundle;
  readiness: PublishReadinessReport;
};

const CONTENT_ROOT = resolve(process.cwd(), "content/projects");

async function readContentProjects(): Promise<ProjectInput[]> {
  const entries = await readdir(CONTENT_ROOT, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory() && entry.name !== "_template");

  return Promise.all(directories.map(async (entry) =>
    JSON.parse(await readFile(resolve(CONTENT_ROOT, entry.name, "project.json"), "utf8")) as ProjectInput
  ));
}

/**
 * Production integration adapter. Consumers must use this allowlist instead of
 * reading generated files directly; review/draft or failed-gate projects never escape it.
 */
export async function getProductionContentProjects(): Promise<ProductionContentProject[]> {
  const projects = await readContentProjects();
  const assessed = await Promise.all(projects.map(async (project) => ({
    project,
    readiness: await assessPublishReadiness(project, {
      repositoryRoot: process.cwd(),
      legacySlugs: legacyProjects.map((item) => item.slug),
    }),
  })));

  return onlyProductionEligible(assessed)
    .map(({ project, readiness }) => ({ bundle: generateProjectBundle(project), readiness }));
}

export async function getProductionContentProject(slug: string): Promise<ProductionContentProject | null> {
  const projects = await getProductionContentProjects();
  return projects.find(({ bundle }) => bundle.website.slug === slug) ?? null;
}
