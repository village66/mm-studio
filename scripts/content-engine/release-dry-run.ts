import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { generateProjectBundle, writeGeneratedFiles } from "./generate.ts";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { assessPublishReadiness } from "./publish-readiness.ts";
import {
  resolveProductionRouteSource,
  selectFeaturedProjects,
  selectSitemapProjects,
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
} from "./production-consumers.ts";
import type { ProjectInput } from "./types.ts";

const FIXTURE_SLUG = "release-dry-run-fixture";

async function createFixtureRoot(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "mm-final-release-"));
  const projectRoot = join(root, "content", "projects", FIXTURE_SLUG);
  await mkdir(join(projectRoot, "cover"), { recursive: true });
  await mkdir(join(projectRoot, "gallery"), { recursive: true });
  await writeFile(join(projectRoot, "cover", "fixture.jpg"), "isolated fixture");
  await writeFile(join(projectRoot, "gallery", "fixture.jpg"), "isolated fixture");
  return root;
}

function fixture(status: "approved" | "published", featured: boolean): ProjectInput {
  return {
    schemaVersion: "1.0",
    status,
    slug: FIXTURE_SLUG,
    title: "Release Dry Run Fixture",
    subtitle: "Synthetic isolated fixture used only to verify the final release workflow.",
    location: "Fixture Location",
    district: "Fixture District",
    area: 1,
    services: ["Fixture Service"],
    style: ["Fixture Style"],
    coverImage: "cover/fixture.jpg",
    gallery: ["gallery/fixture.jpg"],
    before: [],
    after: [],
    publishDate: "2099-01-01",
    featured,
  };
}

async function verifyStatus(root: string, status: "approved" | "published"): Promise<void> {
  const project = fixture(status, false);
  const projectPath = join(root, "content", "projects", FIXTURE_SLUG, "project.json");
  await writeFile(projectPath, `${JSON.stringify(project, null, 2)}\n`, "utf8");

  const readiness = await assessPublishReadiness(project, { repositoryRoot: root, legacySlugs: [] });
  assert.equal(readiness.productionEligible, true, JSON.stringify(readiness, null, 2));

  const outputDirectory = join(root, "generated", status);
  const bundle = await writeGeneratedFiles(project, outputDirectory, root);
  const generated = JSON.parse(await readFile(join(outputDirectory, "website.json"), "utf8")) as ProjectInput;
  assert.equal(generated.status, status);
  assert.deepEqual(bundle.seo.robots, { index: true, follow: true });
  assert.match(bundle.seo.canonical, new RegExp(`/portfolio/${FIXTURE_SLUG}$`));
  assert.equal(bundle.schema.name, project.title);
  assert.ok(bundle.schema.image.length >= 2);

  const assessed = [{ project, readiness }];
  assert.equal(resolveProductionRouteSource(FIXTURE_SLUG, [], assessed), "content-engine");
  assert.equal(selectSitemapProjects(assessed).length, 1);
  assert.equal(selectFeaturedProjects(assessed).length, 0);

  const featuredProject = { ...project, featured: true };
  assert.equal(selectFeaturedProjects([{ project: featuredProject, readiness }]).length, 1);

  const previewBundle = generateProjectBundle({ ...project, status: "review" });
  assert.deepEqual(previewBundle.seo.robots, { index: false, follow: false });
}

async function run(): Promise<void> {
  const root = await createFixtureRoot();
  try {
    await verifyStatus(root, "approved");
    await verifyStatus(root, "published");
    console.log(JSON.stringify({
      mode: "isolated-fixture-dry-run",
      productionDataTouched: false,
      statuses: ["approved", "published"],
      checks: ["validate", "generate", "publish-gate", "route", "sitemap", "featured", "canonical", "JSON-LD", "cover/gallery", "preview-noindex"],
      decision: "PASS",
    }, null, 2));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
