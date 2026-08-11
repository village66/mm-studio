import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export const PHASES = Object.freeze([
  { folder: "original", legacyFolder: "before", key: "before", titleZh: "原始空間", titleEn: "Before" },
  { folder: "design", legacyFolder: "progress", key: "progress", titleZh: "設計實現", titleEn: "In Progress" },
  { folder: "completed", key: "completed", titleZh: "完成空間", titleEn: "Completed" },
]);

export const CATEGORIES = Object.freeze({
  residential: { collectionSlug: "private-residence", labelZh: "住宅設計" },
  commercial: { collectionSlug: "commercial-space", labelZh: "商業空間" },
  renovation: { collectionSlug: "modern-apartment", labelZh: "舊屋改造" },
});

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const naturalCompare = new Intl.Collator("en", { numeric: true, sensitivity: "base" }).compare;

export async function unavailableImageAnalyzer() {
  return {
    status: "pending",
    alt: null,
    captionZh: null,
    descriptionZh: null,
    provider: null,
  };
}

function assertMetadata(metadata, slug) {
  if (metadata.category != null && metadata.category !== "" && !(metadata.category in CATEGORIES)) {
    throw new Error(`category 必須是 ${Object.keys(CATEGORIES).join("、")} 之一，目前為 ${metadata.category}`);
  }
  if (metadata.slug && metadata.slug !== slug) {
    throw new Error(`project.json 的 slug 必須與資料夾名稱一致：${slug}`);
  }
}

async function readMetadata(projectDir, slug) {
  try {
    const metadata = JSON.parse(await readFile(path.join(projectDir, "project.json"), "utf8"));
    assertMetadata(metadata, slug);
    return metadata;
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

async function scanImages(projectDir, phase, analyzeImage) {
  let entries;
  let sourceFolder = phase.folder;
  try {
    entries = await readdir(path.join(projectDir, sourceFolder), { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT" && phase.legacyFolder) {
      sourceFolder = phase.legacyFolder;
      try {
        entries = await readdir(path.join(projectDir, sourceFolder), { withFileTypes: true });
      } catch (legacyError) {
        if (legacyError?.code === "ENOENT") return [];
        throw legacyError;
      }
    } else if (error?.code === "ENOENT") return [];
    else throw error;
  }
  const images = entries
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort(naturalCompare)
    .map((fileName) => ({ fileName, sourcePath: path.join(sourceFolder, fileName).replaceAll("\\", "/") }));

  return Promise.all(images.map(async (image) => ({
    ...image,
    phaseKey: phase.key,
    analysis: await analyzeImage({
      absolutePath: path.join(projectDir, image.sourcePath),
      phaseKey: phase.key,
      fileName: image.fileName,
    }),
  })));
}

export async function scanProject(projectDir, { analyzeImage = unavailableImageAnalyzer } = {}) {
  const slug = path.basename(path.resolve(projectDir));
  const metadata = await readMetadata(projectDir, slug);
  const phases = await Promise.all(
    PHASES.map(async (phase) => ({ ...phase, images: await scanImages(projectDir, phase, analyzeImage) }))
  );
  if (phases.every((phase) => phase.images.length === 0)) {
    throw new Error("三個階段資料夾內都沒有支援的圖片");
  }
  return { slug, metadata, phases };
}

export function createDraft({ slug, metadata, phases }) {
  const titleZh = metadata?.titleZh?.trim() || "待命名作品";
  const titleEn = metadata?.titleEn?.trim() || null;
  const categoryKey = metadata?.category?.trim() || null;
  const category = categoryKey ? CATEGORIES[categoryKey] : null;
  const preferredCover = phases.find((phase) => phase.key === "completed")?.images[0]
    ?? phases.find((phase) => phase.key === "progress")?.images[0]
    ?? phases.find((phase) => phase.key === "before")?.images[0];
  const publicBase = categoryKey ? `/images/projects/${categoryKey}/${slug}` : null;
  const toPublicSrc = (image) => publicBase ? `${publicBase}/${image.phaseKey}/${image.fileName}` : null;
  const toPreviewSrc = (image) =>
    `/preview/project-auto-import/${slug}/assets/${image.sourcePath}`;
  const createProjectCase = (imageSource) => ({
    id: slug,
    titleZh,
    titleEn,
    storyZh: "",
    storyEn: "",
    phases: phases.map((phase) => ({
      key: phase.key,
      titleZh: phase.titleZh,
      titleEn: phase.titleEn,
      summaryZh: "",
      images: phase.images.map((image) => ({
        src: imageSource(image),
        captionZh: image.analysis.captionZh,
      })),
    })),
  });
  const projectCase = createProjectCase(toPublicSrc);
  const previewProjectCase = createProjectCase(toPreviewSrc);

  return {
    schemaVersion: 1,
    status: "draft",
    source: `content/projects/${slug}`,
    coverCandidate: preferredCover ? {
      phaseKey: preferredCover.phaseKey,
      sourcePath: preferredCover.sourcePath,
      previewSrc: toPreviewSrc(preferredCover),
      publicSrc: toPublicSrc(preferredCover),
    } : null,
    assetInventory: phases.map((phase) => ({
      key: phase.key,
      titleZh: phase.titleZh,
      sourceFolder: phase.images[0]?.sourcePath.split("/")[0] ?? phase.folder,
      images: phase.images.map((image) => ({
        fileName: image.fileName,
        sourcePath: image.sourcePath,
        analysis: image.analysis,
      })),
    })),
    compatibility: {
      previewReady: true,
      publishReady: Boolean(metadata?.titleZh?.trim() && categoryKey),
      ready: true,
      missingRequiredFields: [
        ...(!metadata?.titleZh?.trim() ? ["titleZh"] : []),
        ...(!categoryKey ? ["category"] : []),
      ],
      collectionSlug: category?.collectionSlug ?? null,
      featuredProject: {
        id: slug,
        titleZh,
        titleEn,
        category: categoryKey,
        image: toPublicSrc(preferredCover),
        href: category ? `/portfolio/${category.collectionSlug}#${slug}` : null,
      },
      projectCase,
      previewProjectCase,
    },
    copyPlan: phases.flatMap((phase) => phase.images.map((image) => ({
      from: `${slug}/${image.sourcePath}`,
      to: toPublicSrc(image),
    }))),
    review: {
      productionDataChanged: false,
      requiredBeforePublish: [
        ...(!metadata?.titleZh?.trim() ? ["補齊 titleZh"] : []),
        ...(!categoryKey ? ["選擇現有 category（residential / commercial / renovation）"] : []),
        "確認首頁封面與圖片排序",
        "逐張審核 ALT 與 Caption",
        "補齊作品故事與各階段摘要後再人工寫入 data/projects.ts",
      ],
      imageAnalysis: {
        status: "pending",
        provider: null,
        capability: "not-configured",
        note: "目前 repo 沒有可用的影像模型或 API；未產生任何假描述。",
      },
    },
  };
}
