import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { assessPublishReadiness } from "./publish-readiness.ts";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { PUBLISHABLE_PROJECT_STATUSES, type ProjectInput, type ProjectStatus } from "./types.ts";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { PUBLISH_POLICY } from "./publish-policy.ts";

const TARGET_FLAG = "--target-status";

function readTargetStatus(args: readonly string[]): ProjectStatus {
  const index = args.indexOf(TARGET_FLAG);
  const value = index >= 0 ? args[index + 1] : "approved";
  if (!PUBLISHABLE_PROJECT_STATUSES.includes(value as "approved" | "published")) {
    throw new Error(`${TARGET_FLAG} 僅接受 approved 或 published`);
  }
  return value as ProjectStatus;
}

async function run(): Promise<void> {
  const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const slug = process.argv[2];
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("請提供有效案件 slug");
  }

  const targetStatus = readTargetStatus(process.argv.slice(3));
  const source = JSON.parse(await readFile(resolve(repositoryRoot, "content/projects", slug, "project.json"), "utf8")) as ProjectInput;
  if (source.slug !== slug) throw new Error(`指定 slug（${slug}）與 project.json slug（${source.slug}）不一致`);

  // Dry-run only: assess a copy and never mutate project.json.
  const candidate: ProjectInput = { ...source, status: targetStatus };
  const report = await assessPublishReadiness(candidate, {
    repositoryRoot,
    legacySlugs: ["private-residence", "modern-apartment", "commercial-space"],
  });
  const decision = report.productionEligible ? "PASS" : "BLOCKED";

  console.log(JSON.stringify({
    mode: "dry-run",
    slug,
    currentStatus: source.status,
    targetStatus,
    decision,
    productionEligible: report.productionEligible,
    policy: PUBLISH_POLICY,
    warnings: report.warnings,
    blockers: report.blockers,
    checks: report.checks,
  }, null, 2));

  if (!report.productionEligible) process.exitCode = 2;
}

run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
