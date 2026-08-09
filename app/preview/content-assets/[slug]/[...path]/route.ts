import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { NextResponse } from "next/server";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CONTENT_TYPES: Record<string, string> = {
  ".avif": "image/avif", ".gif": "image/gif", ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
};

type Props = { params: Promise<{ slug: string; path: string[] }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug, path } = await params;
  if (!SLUG_PATTERN.test(slug) || path.length === 0) return new NextResponse(null, { status: 404 });

  const projectDirectory = resolve(process.cwd(), "content", "projects", slug);
  const assetPath = resolve(projectDirectory, ...path);
  if (!assetPath.startsWith(`${projectDirectory}${sep}`)) return new NextResponse(null, { status: 404 });

  const contentType = CONTENT_TYPES[extname(assetPath).toLowerCase()];
  if (!contentType) return new NextResponse(null, { status: 404 });

  try {
    const asset = await readFile(assetPath);
    return new NextResponse(asset, { headers: {
      "Cache-Control": "private, no-store", "Content-Type": contentType,
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    } });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
