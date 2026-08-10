import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { assessPublishReadiness } from "./publish-readiness.ts";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { onlyProductionEligible } from "./production-eligibility.ts";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { PUBLISH_POLICY } from "./publish-policy.ts";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { validateProject } from "./validate.ts";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { generateProjectBundle } from "./generate.ts";
import {
  findProductionProject,
  resolveProductionRouteSource,
  selectFeaturedProjects,
  selectProductionProjects,
  selectSitemapProjects,
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
} from "./production-consumers.ts";
import type { ProjectInput, PublishReadinessReport } from "./types.ts";

const baseProject: ProjectInput = {
  schemaVersion: "1.0", status: "review", slug: "test-project", title: "測試案件",
  subtitle: "具備足夠長度且可用於搜尋摘要的真實案件說明。", location: "台灣", district: null,
  area: null, services: ["住宅空間設計"], style: ["現代"], coverImage: "cover/cover.jpg",
  gallery: ["gallery/gallery.jpg"], before: ["before/before.jpg"], after: ["after/after.jpg"], publishDate: null, featured: false,
};

async function fixture(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "mm-content-gate-"));
  const projectRoot = join(root, "content", "projects", baseProject.slug);
  await mkdir(join(projectRoot, "cover"), { recursive: true });
  await mkdir(join(projectRoot, "gallery"), { recursive: true });
  await mkdir(join(projectRoot, "before"), { recursive: true });
  await mkdir(join(projectRoot, "after"), { recursive: true });
  await writeFile(join(projectRoot, "project.json"), JSON.stringify(baseProject));
  await writeFile(join(projectRoot, "cover", "cover.jpg"), "fixture");
  await writeFile(join(projectRoot, "gallery", "gallery.jpg"), "fixture");
  await writeFile(join(projectRoot, "before", "before.jpg"), "fixture");
  await writeFile(join(projectRoot, "after", "after.jpg"), "fixture");
  return root;
}

test("review may warn but is never production eligible", async () => {
  const report = await assessPublishReadiness(baseProject, { repositoryRoot: await fixture() });
  assert.equal(report.level, "WARNING");
  assert.equal(report.productionEligible, false);
});

test("approved transition is blocked when real fields are missing", async () => {
  const report = await assessPublishReadiness({ ...baseProject, status: "approved" }, { repositoryRoot: await fixture() });
  assert.equal(report.productionEligible, false);
  assert.match(report.blockers.join(" "), /district/);
  assert.match(report.blockers.join(" "), /area/);
  assert.match(report.blockers.join(" "), /publishDate/);
});

test("approved project passes when required facts and technical checks pass", async () => {
  const project = { ...baseProject, status: "approved", district: "真實行政區", area: 30, publishDate: "2026-08-10" } satisfies ProjectInput;
  const root = await fixture();
  await writeFile(join(root, "content", "projects", baseProject.slug, "project.json"), JSON.stringify(project));
  const report = await assessPublishReadiness(project, { repositoryRoot: root });
  assert.equal(report.level, "PASS", JSON.stringify(report, null, 2));
  assert.equal(report.productionEligible, true);
});

test("optional enhancements may be empty without blocking publishing", async () => {
  const project = {
    ...baseProject,
    status: "approved",
    district: "真實行政區",
    area: 30,
    publishDate: "2026-08-10",
    before: [],
    after: [],
    featured: false,
  } satisfies ProjectInput;
  const root = await fixture();
  await writeFile(join(root, "content", "projects", baseProject.slug, "project.json"), JSON.stringify(project));

  const validation = validateProject(project);
  const report = await assessPublishReadiness(project, { repositoryRoot: root });

  assert.equal(validation.valid, true);
  assert.match(validation.warnings.join(" "), /before/);
  assert.match(validation.warnings.join(" "), /after/);
  assert.equal(report.productionEligible, true);
  assert.equal(PUBLISH_POLICY.optionalEnhancementsBlockPublishing, false);
});

test("production adapter excludes every non-eligible assessment", () => {
  const report = (productionEligible: boolean) => ({ productionEligible } as PublishReadinessReport);
  const output = onlyProductionEligible([
    { project: "review", readiness: report(false) },
    { project: "approved", readiness: report(true) },
  ]);
  assert.deepEqual(output.map(({ project }) => project), ["approved"]);
});

test("production consumers keep review projects out of route, sitemap, and featured", () => {
  const blocked = { level: "WARNING", productionEligible: false } as PublishReadinessReport;
  const items = [{ project: { ...baseProject, featured: true }, readiness: blocked }];

  assert.deepEqual(selectProductionProjects(items), []);
  assert.equal(findProductionProject(baseProject.slug, items), null);
  assert.equal(resolveProductionRouteSource(baseProject.slug, [], items), "not-found");
  assert.deepEqual(selectSitemapProjects(items), []);
  assert.deepEqual(selectFeaturedProjects(items), []);
});

test("approved synthetic fixture is allowed by route and sitemap while featured remains independent", () => {
  const eligible = { level: "PASS", productionEligible: true } as PublishReadinessReport;
  const approved = {
    ...baseProject,
    status: "approved",
    district: "測試行政區",
    area: 30,
    publishDate: "2026-08-10",
    featured: false,
  } satisfies ProjectInput;
  const items = [{ project: approved, readiness: eligible }];

  assert.equal(resolveProductionRouteSource(approved.slug, [], items), "content-engine");
  assert.equal(selectSitemapProjects(items).length, 1);
  assert.equal(selectFeaturedProjects(items).length, 0);
  assert.equal(selectFeaturedProjects([{ project: { ...approved, featured: true }, readiness: eligible }]).length, 1);
});

test("legacy route wins and production metadata never inherits preview noindex", () => {
  const eligible = { level: "PASS", productionEligible: true } as PublishReadinessReport;
  const approved = {
    ...baseProject,
    status: "published",
    district: "測試行政區",
    area: 30,
    publishDate: "2026-08-10",
  } satisfies ProjectInput;
  const items = [{ project: approved, readiness: eligible }];
  const bundle = generateProjectBundle(approved);

  assert.equal(resolveProductionRouteSource(approved.slug, [approved.slug], items), "legacy");
  assert.deepEqual(bundle.seo.robots, { index: true, follow: true });
  assert.match(bundle.schema.image[0], /^https:\/\/www\.mmstudio-design\.com\/content-assets\//);
});

test("approved and published fixtures satisfy every named final release consumer check", async () => {
  for (const status of ["approved", "published"] as const) {
    const project = {
      ...baseProject,
      status,
      district: "Fixture District",
      area: 1,
      publishDate: "2099-01-01",
      featured: false,
    } satisfies ProjectInput;
    const root = await fixture();
    await writeFile(join(root, "content", "projects", baseProject.slug, "project.json"), JSON.stringify(project));
    const readiness = await assessPublishReadiness(project, { repositoryRoot: root });
    const bundle = generateProjectBundle(project);
    const items = [{ project, readiness }];

    assert.equal(readiness.productionEligible, true);
    assert.equal(resolveProductionRouteSource(project.slug, [], items), "content-engine");
    assert.equal(selectSitemapProjects(items).length, 1);
    assert.equal(selectFeaturedProjects(items).length, 0);
    assert.equal(selectFeaturedProjects([{ project: { ...project, featured: true }, readiness }]).length, 1);
    assert.deepEqual(bundle.seo.robots, { index: true, follow: true });
    assert.match(bundle.seo.canonical, new RegExp(`/portfolio/${project.slug}$`));
    assert.equal(bundle.schema.name, project.title);
    assert.ok(bundle.schema.image.length > 0);
    assert.equal(readiness.checks.alt.level, "PASS");
    assert.equal(readiness.checks.cover.level, "PASS");
    assert.equal(readiness.checks.gallery.level, "PASS");
    assert.equal(readiness.checks.slugUniqueness.level, "PASS");
  }
});
