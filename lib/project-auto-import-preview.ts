import { readFile } from "node:fs/promises";
import path from "node:path";

import type { ProjectCase, ProjectPhaseKey } from "@/data/projects";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PHASE_KEYS = new Set<ProjectPhaseKey>(["before", "progress", "completed"]);

type DraftImage = {
  src?: unknown;
  captionZh?: unknown;
};

type DraftPhase = {
  key?: unknown;
  titleZh?: unknown;
  titleEn?: unknown;
  summaryZh?: unknown;
  images?: unknown;
};

type DraftProjectCase = {
  id?: unknown;
  titleZh?: unknown;
  titleEn?: unknown;
  storyZh?: unknown;
  storyEn?: unknown;
  phases?: unknown;
};

type PreviewDraft = {
  compatibility?: {
    previewReady?: unknown;
    previewProjectCase?: DraftProjectCase;
  };
  review?: {
    imageAnalysis?: {
      status?: unknown;
    };
  };
};

export function isSafeProjectSlug(value: string) {
  return SLUG_PATTERN.test(value);
}

export async function readPreviewDraft(slug: string): Promise<{
  projectCase: ProjectCase;
  analysisStatus: string;
} | null> {
  if (!isSafeProjectSlug(slug)) return null;

  const draftPath = path.join(
    process.cwd(),
    "drafts",
    "project-auto-import",
    `${slug}.draft.json`
  );

  let draft: PreviewDraft;
  try {
    draft = JSON.parse(await readFile(draftPath, "utf8")) as PreviewDraft;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }

  const source = draft.compatibility?.previewProjectCase;
  if (draft.compatibility?.previewReady !== true || !source || !Array.isArray(source.phases)) {
    return null;
  }

  const phases = source.phases.flatMap((phaseValue) => {
    const phase = phaseValue as DraftPhase;
    if (typeof phase.key !== "string" || !PHASE_KEYS.has(phase.key as ProjectPhaseKey)) return [];

    const images = Array.isArray(phase.images)
      ? phase.images.flatMap((imageValue) => {
          const image = imageValue as DraftImage;
          if (typeof image.src !== "string" || !image.src.startsWith(`/preview/project-auto-import/${slug}/assets/`)) {
            return [];
          }
          return [{
            src: image.src,
            captionZh: typeof image.captionZh === "string" ? image.captionZh : undefined,
          }];
        })
      : [];

    return [{
      key: phase.key as ProjectPhaseKey,
      titleZh: typeof phase.titleZh === "string" ? phase.titleZh : "",
      titleEn: typeof phase.titleEn === "string" ? phase.titleEn : "",
      summaryZh: typeof phase.summaryZh === "string" ? phase.summaryZh : "",
      images,
    }];
  });

  return {
    projectCase: {
      id: typeof source.id === "string" ? source.id : slug,
      titleZh: typeof source.titleZh === "string" ? source.titleZh : "待命名作品",
      titleEn: typeof source.titleEn === "string" ? source.titleEn : "",
      storyZh: typeof source.storyZh === "string" ? source.storyZh : "",
      storyEn: typeof source.storyEn === "string" ? source.storyEn : "",
      phases,
    },
    analysisStatus:
      typeof draft.review?.imageAnalysis?.status === "string"
        ? draft.review.imageAnalysis.status
        : "pending",
  };
}
