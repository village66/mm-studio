import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import golden from "./golden-sample.json" with { type: "json" };
import { createDraft, scanProject } from "./core.mjs";
import {
  resolveImageAnalysisCapability,
  VISION_PROVIDER_REQUIRED,
} from "./providers/capability.mjs";

test("掃描三個現有階段並輸出與 golden sample 相同的層級", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "mm-project-import-"));
  const projectDir = path.join(root, "sample-project");
  await Promise.all(["before", "progress", "completed"].map((folder) =>
    mkdir(path.join(projectDir, folder), { recursive: true })
  ));
  await writeFile(path.join(projectDir, "project.json"), JSON.stringify({
    titleZh: "測試作品", titleEn: "Test Project", category: "renovation",
  }));
  await writeFile(path.join(projectDir, "before", "10.jpg"), "");
  await writeFile(path.join(projectDir, "before", "2.jpg"), "");
  await writeFile(path.join(projectDir, "progress", "施工.png"), "");
  await writeFile(path.join(projectDir, "completed", "完成.webp"), "");

  const draft = createDraft(await scanProject(projectDir));
  const projectCase = draft.compatibility.projectCase;
  assert.deepEqual(projectCase.phases.map((phase) => phase.key), golden.phaseKeys);
  assert.deepEqual(projectCase.phases.map((phase) => phase.titleZh), golden.phaseTitlesZh);
  assert.deepEqual(Object.keys(projectCase).sort(), golden.projectCaseKeys.toSorted());
  assert.deepEqual(projectCase.phases[0].images.map((image) => image.src), [
    "/images/projects/renovation/sample-project/before/2.jpg",
    "/images/projects/renovation/sample-project/before/10.jpg",
  ]);
  assert.equal(draft.status, "draft");
  assert.equal(draft.review.productionDataChanged, false);
  assert.equal(draft.review.imageAnalysis.status, "pending");
  assert.equal(draft.review.imageAnalysis.provider, null);
  assert.equal(draft.review.analysisReviewed, false);
  assert.equal(draft.review.imageAnalysis.totalImages, 4);
  assert.equal(draft.review.imageAnalysis.generatedImages, 0);
});

test("只放 original、design、completed 照片也能建立待補資料 draft", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "mm-project-import-"));
  const projectDir = path.join(root, "photos-only");
  await Promise.all(["original", "design", "completed"].map((folder) =>
    mkdir(path.join(projectDir, folder), { recursive: true })
  ));
  await writeFile(path.join(projectDir, "original", "10.jpg"), "");
  await writeFile(path.join(projectDir, "original", "2.jpg"), "");
  await writeFile(path.join(projectDir, "design", "01.jpg"), "");
  await writeFile(path.join(projectDir, "completed", "01.jpg"), "");

  const draft = createDraft(await scanProject(projectDir));
  assert.deepEqual(draft.compatibility.projectCase.phases.map((phase) => phase.key), golden.phaseKeys);
  assert.deepEqual(draft.compatibility.projectCase.phases.map((phase) => phase.titleZh), golden.phaseTitlesZh);
  assert.deepEqual(draft.assetInventory[0].images.map((image) => image.sourcePath), [
    "original/2.jpg",
    "original/10.jpg",
  ]);
  assert.deepEqual(Object.keys(draft.compatibility.projectCase.phases[0].images[0]).sort(), golden.imageKeys.toSorted());
  assert.equal(draft.coverCandidate.sourcePath, "completed/01.jpg");
  assert.equal(
    draft.coverCandidate.previewSrc,
    "/preview/project-auto-import/photos-only/assets/completed/01.jpg"
  );
  assert.equal(draft.compatibility.previewReady, true);
  assert.equal(draft.compatibility.publishReady, false);
  assert.equal(draft.compatibility.ready, true);
  assert.equal(draft.compatibility.projectCase.titleZh, "待命名作品");
  assert.equal(draft.compatibility.projectCase.titleEn, null);
  assert.deepEqual(
    draft.compatibility.previewProjectCase.phases.map((phase) => phase.key),
    golden.phaseKeys
  );
  assert.deepEqual(
    draft.compatibility.previewProjectCase.phases.map((phase) => phase.titleZh),
    golden.phaseTitlesZh
  );
  assert.equal(
    draft.compatibility.previewProjectCase.phases[0].images[0].src,
    "/preview/project-auto-import/photos-only/assets/original/2.jpg"
  );
  assert.equal(draft.compatibility.featuredProject.image, null);
  assert.equal(draft.copyPlan[0].to, null);
  assert.deepEqual(draft.compatibility.missingRequiredFields, ["titleZh", "category"]);
});

test("拒絕非既有首頁分類", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "mm-project-import-"));
  const projectDir = path.join(root, "bad-category");
  await mkdir(projectDir, { recursive: true });
  await writeFile(path.join(projectDir, "project.json"), JSON.stringify({
    titleZh: "測試", titleEn: "Test", category: "district",
  }));
  await assert.rejects(() => scanProject(projectDir), /category 必須是/);
});

test("允許注入未來影像分析 provider，但預設不假造描述", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "mm-project-import-"));
  const projectDir = path.join(root, "analysis-contract");
  await mkdir(path.join(projectDir, "completed"), { recursive: true });
  await writeFile(path.join(projectDir, "project.json"), JSON.stringify({
    titleZh: "分析測試", titleEn: "Analysis Test", category: "commercial",
  }));
  await writeFile(path.join(projectDir, "completed", "space.jpg"), "");

  const scanned = await scanProject(projectDir, {
    analyzeImage: async ({ phaseKey, fileName }) => ({
      status: "generated",
      alt: `${phaseKey}:${fileName}`,
      captionZh: "待人工審核的 provider 輸出",
      descriptionZh: null,
      provider: "test-provider",
    }),
  });

  assert.equal(scanned.phases[2].images[0].analysis.provider, "test-provider");
  const draft = createDraft(scanned);
  assert.equal(draft.review.imageAnalysis.status, "generated");
  assert.equal(draft.review.imageAnalysis.provider, "test-provider");
  assert.equal(draft.review.analysisReviewed, false);
});

test("未設定 Vision provider 時回報穩定機器碼且不生成假文字", async () => {
  const capability = resolveImageAnalysisCapability();
  const result = await capability.analyzeImage();

  assert.equal(capability.available, false);
  assert.equal(capability.code, VISION_PROVIDER_REQUIRED);
  assert.equal(capability.capability, "not-configured");
  assert.ok(capability.requirements.length > 0);
  assert.deepEqual(result, {
    status: "pending",
    alt: null,
    captionZh: null,
    descriptionZh: null,
    provider: null,
  });
});
