import type { ProjectInput, PublishReadinessReport } from "./types.ts";

export type AssessedContentProject = {
  project: ProjectInput;
  readiness: PublishReadinessReport;
};

const publishableStatuses = new Set(["approved", "published"]);

export function selectProductionProjects(items: readonly AssessedContentProject[]): AssessedContentProject[] {
  return items.filter(({ project, readiness }) =>
    publishableStatuses.has(project.status) && readiness.productionEligible
  );
}

export function findProductionProject(
  slug: string,
  items: readonly AssessedContentProject[],
): AssessedContentProject | null {
  return selectProductionProjects(items).find(({ project }) => project.slug === slug) ?? null;
}

export function selectSitemapProjects(items: readonly AssessedContentProject[]): AssessedContentProject[] {
  return selectProductionProjects(items);
}

export function selectFeaturedProjects(items: readonly AssessedContentProject[]): AssessedContentProject[] {
  return selectProductionProjects(items).filter(({ project }) => project.featured);
}

export function resolveProductionRouteSource(
  slug: string,
  legacySlugs: readonly string[],
  items: readonly AssessedContentProject[],
): "legacy" | "content-engine" | "not-found" {
  if (legacySlugs.includes(slug)) return "legacy";
  return findProductionProject(slug, items) ? "content-engine" : "not-found";
}
