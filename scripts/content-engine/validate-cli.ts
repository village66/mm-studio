import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { validateProject } from "./validate.ts";

async function run(): Promise<void> {
  const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const slug = process.argv[2] ?? "_template";
  if (slug !== "_template" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("案件 slug 必須使用小寫 kebab-case");
  }
  const inputPath = resolve(repositoryRoot, "content/projects", slug, "project.json");
  const input: unknown = JSON.parse(await readFile(inputPath, "utf8"));
  const result = validateProject(input);

  if (slug !== "_template" && typeof input === "object" && input !== null && "slug" in input && input.slug !== slug) {
    result.valid = false;
    result.errors.push(`指定 slug（${slug}）與 project.json slug（${String(input.slug)}）不一致`);
    result.checks.slug = false;
  }

  console.log(JSON.stringify(result, null, 2));

  if (!result.valid) {
    process.exitCode = 1;
  }
}

run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
