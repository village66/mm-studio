import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectLightbox from "@/components/gallery/ProjectLightbox";
import Header from "@/components/layout/Header";
import Container from "@/components/ui/Container";
import { readPreviewDraft } from "@/lib/project-auto-import-preview";

export const metadata: Metadata = {
  title: "作品草稿預覽",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectAutoImportPreviewPage({
  params,
}: Props) {
  const { slug } = await params;
  const preview = await readPreviewDraft(slug);

  if (!preview) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f8f5] pb-20 pt-[120px] sm:pb-24 sm:pt-[132px] lg:pb-28 lg:pt-[142px]">
        <Container>
          <aside className="border border-[#d7d2ca] bg-[#f1eee7] px-5 py-4 text-[12px] font-light leading-6 text-[#68645f] sm:px-6">
            <p className="font-medium tracking-[0.08em] text-[#806746]">DRAFT PREVIEW · 僅供審核</p>
            <p className="mt-1">
              影像分析狀態：{preview.analysisStatus}。目前未產生 AI 說明；標題、分類與文案會在正式發布前另行審核。
            </p>
          </aside>

          <ProjectLightbox title={preview.projectCase.titleZh} cases={[preview.projectCase]} />
        </Container>
      </main>
    </>
  );
}
