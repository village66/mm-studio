import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { validateProject } from "./validate.ts";

async function run(): Promise<void> {
  const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const inputPath = resolve(repositoryRoot, process.argv[2] ?? "content/projects/_template/project.json");
  const input: unknown = JSON.parse(await readFile(inputPath, "utf8"));
  const result = validateProject(input);

  console.log(JSON.stringify(result, null, 2));

  if (!result.valid) {
    process.exitCode = 1;
  }
}

run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
