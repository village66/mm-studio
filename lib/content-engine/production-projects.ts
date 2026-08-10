import "server-only";

import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

import { projects as legacyProjects } from "@/data/projects";
import { generateProjectBundle } from "@/scripts/content-engine/generate";
import {
  findProductionProject,
  selectFeaturedProjects,
  selectProductionProjects,
  selectSitemapProjects,
  type AssessedContentProject,
} from "@/scripts/content-engine/production-consumers";
import { assessPublishReadiness } from "@/scripts/content-engine/publish-readiness";
import type { GeneratedProjectBundle, ProjectInput, PublishReadinessReport } from "@/scripts/content-engine/types";

export type ProductionContentProject = {
  bundle: GeneratedProjectBundle;
  readiness: PublishReadinessReport;
};

const CONTENT_ROOT = resolve(process.cwd(), "content/projects");

async function readContentProjects(): Promise<ProjectInput[]> {
  const entries = await readdir(CONTENT_ROOT, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory() && entry.name !== "_template");

  const projects = await Promise.all(directories.map(async (entry) => {
    try {
      return JSON.parse(await readFile(resolve(CONTENT_ROOT, entry.name, "project.json"), "utf8")) as ProjectInput;
    } catch {
      return null;
    }
  }));
  return projects.filter((project): project is ProjectInput => project !== null);
}

async function assessContentProjects(): Promise<AssessedContentProject[]> {
  const projects = await readContentProjects();
  return Promise.all(projects.map(async (project) => ({
    project,
    readiness: await assessPublishReadiness(project, {
      repositoryRoot: process.cwd(),
      legacySlugs: legacyProjects.map((item) => item.slug),
    }),
  })));
}

/**
 * Production integration adapter. Consumers must use this allowlist instead of
 * reading generated files directly; review/draft or failed-gate projects never escape it.
 */
export async function getProductionContentProjects(): Promise<ProductionContentProject[]> {
  return selectProductionProjects(await assessContentProjects())
    .map(({ project, readiness }) => ({ bundle: generateProjectBundle(project), readiness }));
}

export async function getProductionContentProject(slug: string): Promise<ProductionContentProject | null> {
  const assessed = findProductionProject(slug, await assessContentProjects());
  return assessed ? { bundle: generateProjectBundle(assessed.project), readiness: assessed.readiness } : null;
}

export async function getSitemapContentProjects(): Promise<ProductionContentProject[]> {
  return selectSitemapProjects(await assessContentProjects())
    .map(({ project, readiness }) => ({ bundle: generateProjectBundle(project), readiness }));
}

export async function getFeaturedContentProjects(): Promise<ProductionContentProject[]> {
  return selectFeaturedProjects(await assessContentProjects())
    .map(({ project, readiness }) => ({ bundle: generateProjectBundle(project), readiness }));
}
