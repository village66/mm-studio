import projectSchema from "../../content/schema/project.schema.json" with { type: "json" };
import type { ProjectInput, ValidationCheckName, ValidationResult } from "./types.ts";

const properties = projectSchema.properties;
const requiredKeys = new Set<string>(projectSchema.required);
const allowedKeys = new Set<string>(Object.keys(properties));
const statuses = new Set<string>(properties.status.enum);
const slugPattern = new RegExp(properties.slug.pattern);
const publishDatePattern = new RegExp(properties.publishDate.pattern);
const placeholderPattern = /待確認|待填寫|待根據|待補|replace-with/;
const imagePattern = /\.(avif|gif|jpe?g|png|webp)$/i;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const isUniqueTextArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(hasText) && new Set(value).size === value.length;
const isCalendarDate = (value: string): boolean => {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
};

export function validateProject(input: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const checks: Record<ValidationCheckName, boolean> = {
    schema: true, slug: true, title: true, subtitle: true, location: true,
    district: true, area: true, services: true, style: true, coverImage: true,
    gallery: true, before: true, after: true, publishDate: true, featured: true,
  };

  const fail = (check: ValidationCheckName, message: string) => {
    checks[check] = false;
    errors.push(message);
  };

  if (!isRecord(input)) {
    fail("schema", "案件資料必須是 JSON object");
    return { valid: false, errors, warnings, checks };
  }

  for (const key of requiredKeys) {
    if (!(key in input)) fail("schema", `缺少 Schema 必填欄位：${key}`);
  }
  for (const key of Object.keys(input)) {
    if (!allowedKeys.has(key)) fail("schema", `Schema 不允許欄位：${key}`);
  }

  if (input.schemaVersion !== properties.schemaVersion.const) fail("schema", "schemaVersion 必須為 1.0");
  if (!hasText(input.status) || !statuses.has(input.status)) fail("schema", "status 不在允許清單");

  if (!hasText(input.slug) || !slugPattern.test(input.slug)) fail("slug", "slug 必須使用小寫 kebab-case");
  else if (placeholderPattern.test(input.slug)) warnings.push("slug 仍是模板內容");

  if (!hasText(input.title) || input.title.length > properties.title.maxLength) fail("title", "title 必須為 1–80 字元");
  else if (placeholderPattern.test(input.title)) warnings.push("title 仍是模板內容");

  if (!hasText(input.subtitle) || input.subtitle.length > properties.subtitle.maxLength) fail("subtitle", "subtitle 必須為 1–160 字元");
  else if (placeholderPattern.test(input.subtitle)) warnings.push("subtitle 仍是模板內容");

  if (!hasText(input.location) || input.location.length > properties.location.maxLength) fail("location", "location 必須為 1–40 字元");
  else if (placeholderPattern.test(input.location)) warnings.push("location 尚待確認");

  if (input.district !== null && (!hasText(input.district) || input.district.length > properties.district.maxLength)) fail("district", "district 必須是 1–40 字元或 null");
  else if (input.district === null) warnings.push("district 尚待確認");

  if (input.area !== null && (typeof input.area !== "number" || !Number.isFinite(input.area) || input.area <= 0)) fail("area", "area 必須是大於 0 的數字或 null");
  else if (input.area === null) warnings.push("area 尚待確認");

  if (!isUniqueTextArray(input.services) || input.services.length < properties.services.minItems) fail("services", "services 至少需要一個不重複項目");
  if (!isUniqueTextArray(input.style) || input.style.length < properties.style.minItems) fail("style", "style 至少需要一個不重複項目");
  else if (input.style.some((item) => placeholderPattern.test(item))) warnings.push("style 尚待確認");

  if (!hasText(input.coverImage) || !imagePattern.test(input.coverImage)) fail("coverImage", "coverImage 必須是有效的相對圖片檔名");

  const validateImages = (key: "gallery" | "before" | "after", value: unknown) => {
    if (!isUniqueTextArray(value) || value.some((file) => !imagePattern.test(file))) {
      fail(key, `${key} 必須是不重複的圖片路徑陣列`);
    } else if (value.length === 0) {
      checks[key] = false;
      warnings.push(`${key} 尚未加入圖片`);
    }
  };
  validateImages("gallery", input.gallery);
  validateImages("before", input.before);
  validateImages("after", input.after);

  if (input.publishDate !== null) {
    if (!hasText(input.publishDate) || !publishDatePattern.test(input.publishDate) || !isCalendarDate(input.publishDate)) fail("publishDate", "publishDate 必須是有效 YYYY-MM-DD 或 null");
  } else {
    warnings.push("publishDate 尚未設定");
  }

  if (typeof input.featured !== "boolean") fail("featured", "featured 必須是 boolean");

  if (input.status === "approved" && warnings.length > 0) fail("schema", "approved 案件不得保留 Warning");
  return { valid: errors.length === 0, errors, warnings, checks };
}

export function isProjectInput(input: unknown): input is ProjectInput {
  return validateProject(input).valid;
}
