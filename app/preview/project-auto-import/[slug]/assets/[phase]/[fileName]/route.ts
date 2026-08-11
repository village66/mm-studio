import { readFile } from "node:fs/promises";
import path from "node:path";

import { isSafeProjectSlug } from "@/lib/project-auto-import-preview";

const PHASE_FOLDERS = new Set(["original", "design", "completed"]);
const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};
const FILE_NAME_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9._ -]*$/;

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string; phase: string; fileName: string }> }
) {
  const { slug, phase, fileName } = await context.params;
  const extension = path.extname(fileName).toLowerCase();

  if (
    !isSafeProjectSlug(slug) ||
    !PHASE_FOLDERS.has(phase) ||
    !FILE_NAME_PATTERN.test(fileName) ||
    !CONTENT_TYPES[extension]
  ) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const image = await readFile(path.join(process.cwd(), "content", "projects", slug, phase, fileName));
    return new Response(image, {
      headers: {
        "Content-Type": CONTENT_TYPES[extension],
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return new Response("Not found", { status: 404 });
    }
    throw error;
  }
}
