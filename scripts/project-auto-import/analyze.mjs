import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { createDraft, scanProject } from "./core.mjs";
import { resolveImageAnalysisCapability } from "./providers/capability.mjs";

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const slug = readArgument("--project");
if (!slug || slug.startsWith("-") || slug.includes("/") || slug.includes("\\")) {
  console.error("用法：npm run project:analyze -- --project <slug>");
  process.exitCode = 1;
} else {
  const root = process.cwd();
  const capability = resolveImageAnalysisCapability();

  try {
    const scanned = await scanProject(path.join(root, "content", "projects", slug), {
      analyzeImage: capability.analyzeImage,
    });
    const draft = createDraft(scanned);
    draft.review.imageAnalysis.capability = capability.capability;
    draft.review.imageAnalysis.provider = capability.provider;
    draft.review.imageAnalysis.note = capability.available
      ? draft.review.imageAnalysis.note
      : `${capability.reason} 未產生任何 ALT、caption 或 description。`;

    const outputDir = path.join(root, "drafts", "project-auto-import");
    const outputPath = path.join(outputDir, `${slug}.draft.json`);
    await mkdir(outputDir, { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(draft, null, 2)}\n`, "utf8");

    console.log(`Capability：${capability.capability}`);
    console.log(`圖片：${draft.review.imageAnalysis.generatedImages}/${draft.review.imageAnalysis.totalImages} 已真實分析`);
    console.log(`Draft 已更新：${path.relative(root, outputPath)}`);
    if (!capability.available) console.log(capability.reason);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
