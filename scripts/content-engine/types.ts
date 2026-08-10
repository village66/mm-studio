export const PROJECT_STATUSES = ["draft", "review", "approved", "published"] as const;

export const PUBLISHABLE_PROJECT_STATUSES = ["approved", "published"] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const PROJECT_FIELDS = [
  "schemaVersion", "status", "slug", "title", "subtitle", "location", "district",
  "area", "services", "style", "coverImage", "gallery", "before", "after",
  "publishDate", "featured",
] as const;

/** 完全對應 content/schema/project.schema.json。 */
export interface ProjectInput {
  schemaVersion: "1.0";
  status: ProjectStatus;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  district: string | null;
  area: number | null;
  services: string[];
  style: string[];
  coverImage: string;
  gallery: string[];
  before: string[];
  after: string[];
  publishDate: string | null;
  featured: boolean;
}

export type ProjectField = (typeof PROJECT_FIELDS)[number];
export type ValidationCheckName = "schema" | Exclude<ProjectField, "schemaVersion" | "status">;

export type ValidationChecks = Record<ValidationCheckName, boolean>;
export interface ValidationResult { valid: boolean; errors: string[]; warnings: string[]; checks: ValidationChecks; }
export interface GeneratedSeo {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  robots: { index: boolean; follow: boolean; };
}
export interface GeneratedSchemaData {
  "@context": "https://schema.org";
  "@type": "CreativeWork";
  name: string;
  description: string;
  url: string;
  contentLocation: string;
  image: string[];
  provider: { "@type": "Organization"; name: "工厘設計 MM Studio"; url: "https://www.mmstudio-design.com"; };
}
export interface GeneratedProjectBundle { website: ProjectInput; seo: GeneratedSeo; schema: GeneratedSchemaData; qa: ValidationResult; }

export const PUBLISH_READINESS_CHECKS = [
  "district", "area", "publishDate", "cover", "gallery", "seoTitle", "seoMeta",
  "canonical", "jsonLd", "alt", "slugUniqueness", "status", "noindexRemoval",
] as const;

export type PublishReadinessCheckName = (typeof PUBLISH_READINESS_CHECKS)[number];
export type PublishReadinessLevel = "PASS" | "WARNING" | "BLOCKER";

export interface PublishReadinessCheck {
  level: PublishReadinessLevel;
  message: string;
}

export interface PublishReadinessReport {
  level: PublishReadinessLevel;
  productionEligible: boolean;
  checks: Record<PublishReadinessCheckName, PublishReadinessCheck>;
  warnings: string[];
  blockers: string[];
}
