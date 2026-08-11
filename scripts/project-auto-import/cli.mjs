import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { createDraft, scanProject } from "./core.mjs";

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const slug = readArgument("--project");
if (!slug || slug.startsWith("-") || slug.includes("/") || slug.includes("\\")) {
  console.error("用法：npm run project:scan -- --project <slug>");
  process.exitCode = 1;
} else {
  const root = process.cwd();
  try {
    const draft = createDraft(await scanProject(path.join(root, "content", "projects", slug)));
    const outputDir = path.join(root, "drafts", "project-auto-import");
    await mkdir(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, `${slug}.draft.json`);
    await writeFile(outputPath, `${JSON.stringify(draft, null, 2)}\n`, "utf8");
    console.log(`Draft 已建立：${path.relative(root, outputPath)}`);
    console.log("正式 data/projects.ts 未變更；請先人工審核 draft。");
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
