export const PROJECT_STATUSES = ["draft", "review", "approved"] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

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

export type ValidationCheckName =
  | "schema" | "slug" | "title" | "subtitle" | "location" | "district"
  | "area" | "services" | "style" | "coverImage" | "gallery"
  | "before" | "after" | "publishDate" | "featured";

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
