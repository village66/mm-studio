import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { GeneratedProjectBundle, ProjectInput } from "./types.ts";
// @ts-expect-error Node 24 direct TypeScript execution requires the explicit extension.
import { validateProject } from "./validate.ts";

const SITE_URL = "https://www.mmstudio-design.com";

export function generateProjectBundle(project: ProjectInput): GeneratedProjectBundle {
  const qa = validateProject(project);
  const canonical = `${SITE_URL}/portfolio/${project.slug}`;
  const shouldIndex = project.status === "approved" && qa.valid;
  const images = [project.coverImage, ...project.gallery, ...project.before, ...project.after];

  return {
    website: project,
    seo: {
      title: `${project.title}｜工厘設計 MM Studio`,
      description: project.subtitle,
      canonical,
      keywords: [...project.style, ...project.services, project.location].slice(0, 3),
      robots: { index: shouldIndex, follow: shouldIndex },
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.subtitle,
      url: canonical,
      contentLocation: [project.location, project.district].filter(Boolean).join(""),
      image: images,
      provider: {
        "@type": "Organization",
        name: "工厘設計 MM Studio",
        url: SITE_URL,
      },
    },
    qa,
  };
}

export async function writeGeneratedFiles(project: ProjectInput, outputDirectory: string): Promise<GeneratedProjectBundle> {
  const bundle = generateProjectBundle(project);
  await mkdir(outputDirectory, { recursive: true });
  const outputs: Record<string, unknown> = {
    "website.json": bundle.website,
    "seo.json": bundle.seo,
    "schema.json": bundle.schema,
    "qa-report.json": bundle.qa,
  };

  await Promise.all(Object.entries(outputs).map(([filename, value]) =>
    writeFile(resolve(outputDirectory, filename), `${JSON.stringify(value, null, 2)}\n`, "utf8")
  ));
  return bundle;
}

async function run(): Promise<void> {
  const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const slug = process.argv[2] ?? "_template";
  if (slug !== "_template" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("案件 slug 必須使用小寫 kebab-case");
  }
  const inputPath = resolve(repositoryRoot, "content/projects", slug, "project.json");
  const project = JSON.parse(await readFile(inputPath, "utf8")) as ProjectInput;
  if (slug !== "_template" && project.slug !== slug) {
    throw new Error(`指定 slug（${slug}）與 project.json slug（${project.slug}）不一致`);
  }
  const outputDirectory = resolve(repositoryRoot, "generated", slug);
  const bundle = await writeGeneratedFiles(project, outputDirectory);
  if (!bundle.qa.valid) throw new Error(`案件驗證失敗：${bundle.qa.errors.join("；")}`);
}

const executedFile = process.argv[1] ? resolve(process.argv[1]) : "";
if (executedFile === fileURLToPath(import.meta.url)) {
  run().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
