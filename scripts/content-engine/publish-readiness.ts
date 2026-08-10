import { access, readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { PUBLISHABLE_PROJECT_STATUSES, type ProjectInput, type PublishReadinessCheck, type PublishReadinessCheckName, type PublishReadinessReport } from "./types.ts";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { validateProject } from "./validate.ts";

const SITE_URL = "https://www.mmstudio-design.com";
const publishableStatuses = new Set<string>(PUBLISHABLE_PROJECT_STATUSES);

type ReadinessOptions = {
  repositoryRoot: string;
  legacySlugs?: readonly string[];
};

const check = (level: PublishReadinessCheck["level"], message: string): PublishReadinessCheck => ({ level, message });

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function findContentSlugOccurrences(repositoryRoot: string, slug: string): Promise<number> {
  const root = resolve(repositoryRoot, "content/projects");
  const entries = await readdir(root, { withFileTypes: true });
  let occurrences = 0;

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === "_template") continue;
    try {
      const input = JSON.parse(await readFile(resolve(root, entry.name, "project.json"), "utf8")) as { slug?: unknown };
      if (input.slug === slug) occurrences += 1;
    } catch {
      // Malformed sibling projects are handled by their own validation run.
    }
  }

  return occurrences;
}

export async function assessPublishReadiness(project: ProjectInput, options: ReadinessOptions): Promise<PublishReadinessReport> {
  const validation = validateProject(project);
  const projectRoot = resolve(options.repositoryRoot, "content/projects", project.slug);
  const allImages = [project.coverImage, ...project.gallery, ...project.before, ...project.after];
  const imageExistence = await Promise.all(allImages.map((image) => pathExists(resolve(projectRoot, image))));
  const contentOccurrences = await findContentSlugOccurrences(options.repositoryRoot, project.slug);
  const conflictsWithLegacy = (options.legacySlugs ?? []).includes(project.slug);
  const publishableStatus = publishableStatuses.has(project.status);
  const expectedCanonical = `${SITE_URL}/portfolio/${project.slug}`;
  const seoTitle = `${project.title}｜工厘設計 MM Studio`;
  const blockersFromValidation = validation.errors.length > 0;

  const checks: Record<PublishReadinessCheckName, PublishReadinessCheck> = {
    district: project.district
      ? check("PASS", `district 已設定：${project.district}`)
      : check(publishableStatus ? "BLOCKER" : "WARNING", "district 尚待真實資料"),
    area: project.area
      ? check("PASS", `area 已設定：${project.area} 坪`)
      : check(publishableStatus ? "BLOCKER" : "WARNING", "area 尚待真實資料"),
    publishDate: project.publishDate
      ? check("PASS", `publishDate 已設定：${project.publishDate}`)
      : check(publishableStatus ? "BLOCKER" : "WARNING", "publishDate 尚待真實資料"),
    cover: project.coverImage && imageExistence[0]
      ? check("PASS", "coverImage 存在且可讀取")
      : check("BLOCKER", "coverImage 缺失或檔案不存在"),
    gallery: project.gallery.length > 0 && imageExistence.slice(1, 1 + project.gallery.length).every(Boolean)
      ? check("PASS", `gallery ${project.gallery.length} 張圖片皆存在`)
      : check("BLOCKER", "gallery 必須至少一張且所有檔案需存在"),
    seoTitle: seoTitle.length > 0 && seoTitle.length <= 100
      ? check("PASS", "SEO title 可由案件標題穩定產生")
      : check("BLOCKER", "SEO title 缺失或過長"),
    seoMeta: project.subtitle.length > 0 && project.subtitle.length <= 160
      ? check("PASS", "SEO meta description 已符合 1–160 字元")
      : check("BLOCKER", "SEO meta description 缺失或過長"),
    canonical: expectedCanonical.endsWith(`/portfolio/${project.slug}`)
      ? check("PASS", `canonical：${expectedCanonical}`)
      : check("BLOCKER", "canonical 無法由 slug 正確產生"),
    jsonLd: project.title.length > 0 && project.subtitle.length > 0 && allImages.length > 0
      ? check("PASS", "JSON-LD 必要欄位可由案件資料產生")
      : check("BLOCKER", "JSON-LD 缺少 name、description 或 image"),
    alt: project.title.length > 0 && allImages.every((image) => image.length > 0)
      ? check("PASS", "所有圖片可套用「案件標題＋影像群組＋序號」ALT 規則")
      : check("BLOCKER", "圖片 ALT 產生條件不完整"),
    slugUniqueness: contentOccurrences === 1 && !conflictsWithLegacy
      ? check("PASS", "slug 在 Content Engine 與舊作品 route 中唯一")
      : check("BLOCKER", "slug 與 Content Engine 同層案件或舊作品 route 衝突"),
    status: publishableStatus
      ? check("PASS", `status=${project.status} 允許進入 publish gate`)
      : check("WARNING", `status=${project.status}，僅允許 preview`),
    noindexRemoval: publishableStatus && validation.valid
      ? check("PASS", "通過 gate 後正式 route 可移除 noindex；preview 仍固定 noindex")
      : check("WARNING", "尚未通過 gate，正式 route 不得建立，noindex 不得移除"),
  };

  if (blockersFromValidation && !Object.values(checks).some((item) => item.level === "BLOCKER")) {
    checks.status = check("BLOCKER", `Schema validation 未通過：${validation.errors.join("；")}`);
  }

  const warnings = Object.values(checks).filter((item) => item.level === "WARNING").map((item) => item.message);
  const blockers = Object.values(checks).filter((item) => item.level === "BLOCKER").map((item) => item.message);
  const productionEligible = publishableStatus && validation.valid && blockers.length === 0;

  return {
    level: blockers.length > 0 ? "BLOCKER" : warnings.length > 0 ? "WARNING" : "PASS",
    productionEligible,
    checks,
    warnings,
    blockers,
  };
}
