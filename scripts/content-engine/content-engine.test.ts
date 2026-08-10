import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { assessPublishReadiness } from "./publish-readiness.ts";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { onlyProductionEligible } from "./production-eligibility.ts";
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

test("production adapter excludes every non-eligible assessment", () => {
  const report = (productionEligible: boolean) => ({ productionEligible } as PublishReadinessReport);
  const output = onlyProductionEligible([
    { project: "review", readiness: report(false) },
    { project: "approved", readiness: report(true) },
  ]);
  assert.deepEqual(output.map(({ project }) => project), ["approved"]);
});
