import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import ProjectJsonLd from "@/components/seo/ProjectJsonLd";
import Container from "@/components/ui/Container";
import { getPreviewAssetUrl, readGeneratedProject } from "@/lib/content-engine/project-reader";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await readGeneratedProject(slug);
  if (!project) return { title: "找不到預覽案件", robots: { index: false, follow: false } };

  return {
    title: `[Preview] ${project.seo.title}`,
    description: project.seo.description,
    robots: { index: false, follow: false, noarchive: true },
  };
}

export default async function ContentProjectPreviewPage({ params }: Props) {
  const { slug } = await params;
  const bundle = await readGeneratedProject(slug);
  if (!bundle) notFound();

  const { website: project, schema } = bundle;
  const groups = [
    { key: "gallery", title: "空間影像", images: project.gallery },
    { key: "before", title: "改造前", images: project.before },
    { key: "after", title: "改造後", images: project.after },
  ];
  const warnings = [
    project.district === null && "district 尚待確認",
    project.area === null && "area 尚待確認",
    project.publishDate === null && "publishDate 尚待確認",
  ].filter((message): message is string => Boolean(message));

  return (
    <>
      <Header />
      <ProjectJsonLd schema={schema} />
      <main className="min-h-screen bg-[#f8f8f5] pb-24 pt-[132px] text-[#292929]">
        <Container>
          <div className="border border-amber-300 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950">
            <strong className="mr-2 uppercase tracking-[0.14em]">Content Preview</strong>
            狀態：{project.status}。此頁固定 noindex，且不會加入首頁、正式導覽或 sitemap。
          </div>

          <header className="mt-10 grid gap-8 border-b border-[#dcd8cf] pb-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a7d56]">{project.services.join(" · ")}</p>
              <h1 className="mt-5 text-4xl font-extralight tracking-[-0.04em] sm:text-6xl">{project.title}</h1>
              <p className="mt-6 max-w-3xl font-light leading-8 text-[#68645f]">{project.subtitle}</p>
            </div>
            <dl className="grid content-start gap-4 text-sm lg:col-span-4">
              <div><dt className="text-neutral-400">地點</dt><dd>{project.location}{project.district ?? "（行政區待確認）"}</dd></div>
              <div><dt className="text-neutral-400">坪數</dt><dd>{project.area ? `${project.area} 坪` : "待確認"}</dd></div>
              <div><dt className="text-neutral-400">風格</dt><dd>{project.style.join("、")}</dd></div>
            </dl>
          </header>

          {warnings.length > 0 && <section className="mt-8 border-l-2 border-amber-500 pl-5">
            <h2 className="text-sm font-medium">發布前待補資料</h2>
            <ul className="mt-2 text-sm leading-6 text-[#68645f]">
              {warnings.map((warning) => <li key={warning}>• {warning}</li>)}
            </ul>
          </section>}

          <Image src={getPreviewAssetUrl(slug, project.coverImage)} alt={`${project.title}｜封面視角｜MM Studio`}
            width={1600} height={1067} unoptimized priority className="mt-10 h-auto w-full object-cover" />

          {groups.map((group) => group.images.length > 0 && <section key={group.key} className="mt-16">
            <h2 className="border-b border-[#dcd8cf] pb-4 text-2xl font-light">{group.title}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {group.images.map((image, index) => <Image key={image} src={getPreviewAssetUrl(slug, image)}
                alt={`${project.title}｜${group.title} ${index + 1}｜MM Studio`} width={1200} height={900}
                unoptimized className="h-auto w-full object-cover" />)}
            </div>
          </section>)}

          <Link href="/#portfolio" className="mt-16 inline-block border-b border-[#9a7d56] pb-2 text-sm">返回正式作品列表</Link>
        </Container>
      </main>
    </>
  );
}
