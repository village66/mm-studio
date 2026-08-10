import Image from "next/image";
import Link from "next/link";

import Header from "@/components/layout/Header";
import ProjectJsonLd from "@/components/seo/ProjectJsonLd";
import Container from "@/components/ui/Container";
import type { GeneratedProjectBundle } from "@/scripts/content-engine/types";

type Props = { bundle: GeneratedProjectBundle };

const assetUrl = (slug: string, path: string) =>
  `/content-assets/${slug}/${path.split("/").map(encodeURIComponent).join("/")}`;

export default function ProductionProjectPage({ bundle }: Props) {
  const { website: project, schema } = bundle;
  const groups = [
    { key: "gallery", title: "空間影像", images: project.gallery },
    { key: "before", title: "改造前", images: project.before },
    { key: "after", title: "改造後", images: project.after },
  ];

  return (
    <>
      <Header />
      <ProjectJsonLd schema={schema} />
      <main className="min-h-screen bg-[#f8f8f5] pb-24 pt-[132px] text-[#292929]">
        <Container>
          <header className="grid gap-8 border-b border-[#dcd8cf] pb-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a7d56]">{project.services.join(" · ")}</p>
              <h1 className="mt-5 text-4xl font-extralight tracking-[-0.04em] sm:text-6xl">{project.title}</h1>
              <p className="mt-6 max-w-3xl font-light leading-8 text-[#68645f]">{project.subtitle}</p>
            </div>
            <dl className="grid content-start gap-4 text-sm lg:col-span-4">
              <div><dt className="text-neutral-400">地點</dt><dd>{project.location}{project.district}</dd></div>
              <div><dt className="text-neutral-400">坪數</dt><dd>{project.area} 坪</dd></div>
              <div><dt className="text-neutral-400">風格</dt><dd>{project.style.join("、")}</dd></div>
              <div><dt className="text-neutral-400">發布日期</dt><dd>{project.publishDate}</dd></div>
            </dl>
          </header>

          <Image src={assetUrl(project.slug, project.coverImage)} alt={`${project.title}｜封面視角｜MM Studio`}
            width={1600} height={1067} unoptimized priority className="mt-10 h-auto w-full object-cover" />

          {groups.map((group) => group.images.length > 0 && <section key={group.key} className="mt-16">
            <h2 className="border-b border-[#dcd8cf] pb-4 text-2xl font-light">{group.title}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {group.images.map((image, index) => <Image key={image} src={assetUrl(project.slug, image)}
                alt={`${project.title}｜${group.title} ${index + 1}｜MM Studio`} width={1200} height={900}
                unoptimized className="h-auto w-full object-cover" />)}
            </div>
          </section>)}

          <Link href="/#portfolio" className="mt-16 inline-block border-b border-[#9a7d56] pb-2 text-sm">返回作品列表</Link>
        </Container>
      </main>
    </>
  );
}
