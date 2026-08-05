import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Container from "@/components/ui/Container";
import ProjectLightbox from "@/components/gallery/ProjectLightbox";

import { projects } from "@/data/projects";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "找不到作品",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = `/portfolio/${project.slug}`;
  const title = `${project.titleZh}｜${project.categoryZh}`;

  return {
    title,
    description: project.descriptionZh,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title}｜工厘設計 MM Studio`,
      description: project.descriptionZh,
      url: canonical,
      type: "article",
      locale: "zh_TW",
      images: [
        {
          url: project.cover,
          alt: `${project.titleZh}－${project.categoryZh}作品`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}｜工厘設計 MM Studio`,
      description: project.descriptionZh,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({
  params,
}: Props) {
  const { slug } = await params;

  const projectIndex = projects.findIndex(
    (project) => project.slug === slug
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];

  const previousProject =
    projectIndex > 0
      ? projects[projectIndex - 1]
      : null;

  const nextProject =
    projectIndex < projects.length - 1
      ? projects[projectIndex + 1]
      : null;

  const collectionDetails = [
    ...project.highlights,
    {
      labelZh: "影像收錄",
      labelEn: "Image Collection",
      valueZh: `${project.images.length} 組空間影像`,
      valueEn: `${project.images.length} Curated Images`,
    },
  ];

  return (
    <>
      <Header />

      <main
        className="
          min-h-screen
          bg-[#f8f8f5]
          pb-20
          pt-[120px]
          sm:pb-24
          sm:pt-[132px]
          lg:pb-28
          lg:pt-[142px]
        "
      >
        <Container>
          {/* 返回作品案例 */}
          <div>
            <Link
              href="/#portfolio"
              className="
                group/back
                inline-flex
                items-center
                gap-4
                border-b
                border-[#cfc7ba]
                pb-3
                transition-colors
                duration-500
                hover:border-[#9a7d56]
              "
            >
              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#b8aa96]
                  text-[16px]
                  text-[#8c704d]
                  transition-all
                  duration-500
                  group-hover/back:-translate-x-1
                  group-hover/back:border-[#9a7d56]
                  group-hover/back:bg-[#9a7d56]
                  group-hover/back:text-white
                "
              >
                ←
              </span>

              <span>
                <span className="block text-[14px] font-light tracking-[0.08em] text-[#343330]">
                  返回作品案例
                </span>

                <span className="mt-1 block text-[8px] uppercase tracking-[0.3em] text-[#9a7d56]">
                  Back to Projects
                </span>
              </span>
            </Link>
          </div>

          {/*
            集合介紹區：
            中文預設顯示，桌機滑鼠移入後切換英文。
            手機版維持中文，確保閱讀穩定。
          */}
          <header
            className="
              group/intro
              mt-12
              grid
              gap-10
              border-b
              border-[#dcd8cf]
              pb-10
              sm:mt-14
              sm:pb-12
              lg:grid-cols-12
              lg:items-end
              lg:gap-14
              lg:pb-14
            "
          >
            {/* 分類與標題 */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-4">
                <div className="grid">
                  <p
                    className="
                      col-start-1
                      row-start-1
                      text-[10px]
                      font-medium
                      tracking-[0.24em]
                      text-[#9a7d56]
                      transition-all
                      duration-500
                      lg:group-hover/intro:-translate-y-1
                      lg:group-hover/intro:opacity-0
                    "
                  >
                    {project.categoryZh}
                  </p>

                  <p
                    className="
                      col-start-1
                      row-start-1
                      translate-y-1
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.32em]
                      text-[#9a7d56]
                      opacity-0
                      transition-all
                      duration-500
                      lg:group-hover/intro:translate-y-0
                      lg:group-hover/intro:opacity-100
                    "
                  >
                    {project.categoryEn}
                  </p>
                </div>

                <span className="h-px w-10 bg-[#c7b79f]" />

                <p className="text-[9px] uppercase tracking-[0.24em] text-neutral-400">
                  Curated Collection
                </p>
              </div>

              <div className="mt-5 grid">
                <h1
                  className="
                    col-start-1
                    row-start-1
                    text-[38px]
                    font-extralight
                    leading-[1.15]
                    tracking-[-0.04em]
                    text-[#292929]
                    transition-all
                    duration-500
                    sm:text-[48px]
                    lg:text-[56px]
                    lg:group-hover/intro:-translate-y-2
                    lg:group-hover/intro:opacity-0
                    xl:text-[64px]
                  "
                >
                  {project.titleZh}
                </h1>

                <h1
                  aria-hidden="true"
                  className="
                    col-start-1
                    row-start-1
                    translate-y-2
                    text-[34px]
                    font-extralight
                    leading-[1.15]
                    tracking-[-0.04em]
                    text-[#292929]
                    opacity-0
                    transition-all
                    duration-500
                    sm:text-[44px]
                    lg:text-[50px]
                    lg:group-hover/intro:translate-y-0
                    lg:group-hover/intro:opacity-100
                    xl:text-[58px]
                  "
                >
                  {project.titleEn}
                </h1>
              </div>

              <div className="mt-7 flex items-center gap-4">
                <span className="h-px w-8 bg-[#c7b79f]" />

                <p className="text-[8px] uppercase tracking-[0.26em] text-neutral-400">
                  移入查看英文 · Hover for English
                </p>
              </div>
            </div>

            {/* 集合觀點與內容特色 */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-3 border-y border-[#ded9d1]">
                {collectionDetails.map(
                  (detail, detailIndex) => (
                    <div
                      key={detail.labelEn}
                      className={`
                        py-4
                        ${
                          detailIndex === 0
                            ? "pr-3"
                            : "border-l border-[#ded9d1] px-3 sm:px-4"
                        }
                      `}
                    >
                      <div className="grid">
                        <p
                          className="
                            col-start-1
                            row-start-1
                            text-[9px]
                            tracking-[0.14em]
                            text-neutral-400
                            transition-all
                            duration-500
                            lg:group-hover/intro:-translate-y-1
                            lg:group-hover/intro:opacity-0
                          "
                        >
                          {detail.labelZh}
                        </p>

                        <p
                          className="
                            col-start-1
                            row-start-1
                            translate-y-1
                            text-[7px]
                            uppercase
                            tracking-[0.18em]
                            text-neutral-400
                            opacity-0
                            transition-all
                            duration-500
                            lg:group-hover/intro:translate-y-0
                            lg:group-hover/intro:opacity-100
                          "
                        >
                          {detail.labelEn}
                        </p>
                      </div>

                      <div className="mt-2 grid">
                        <p
                          className="
                            col-start-1
                            row-start-1
                            text-[12px]
                            font-light
                            leading-5
                            text-[#45423d]
                            transition-all
                            duration-500
                            sm:text-[13px]
                            lg:group-hover/intro:-translate-y-1
                            lg:group-hover/intro:opacity-0
                          "
                        >
                          {detail.valueZh}
                        </p>

                        <p
                          className="
                            col-start-1
                            row-start-1
                            translate-y-1
                            text-[10px]
                            font-light
                            leading-5
                            text-[#45423d]
                            opacity-0
                            transition-all
                            duration-500
                            sm:text-[11px]
                            lg:group-hover/intro:translate-y-0
                            lg:group-hover/intro:opacity-100
                          "
                        >
                          {detail.valueEn}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* 中英文集合說明 */}
              <div className="mt-6 grid">
                <p
                  className="
                    col-start-1
                    row-start-1
                    max-w-[570px]
                    text-[14px]
                    font-light
                    leading-7
                    text-[#68645f]
                    transition-all
                    duration-500
                    sm:text-[15px]
                    sm:leading-8
                    lg:group-hover/intro:-translate-y-2
                    lg:group-hover/intro:opacity-0
                  "
                >
                  {project.descriptionZh}
                </p>

                <p
                  className="
                    col-start-1
                    row-start-1
                    max-w-[570px]
                    translate-y-2
                    text-[13px]
                    font-light
                    leading-7
                    text-[#68645f]
                    opacity-0
                    transition-all
                    duration-500
                    sm:text-[14px]
                    sm:leading-8
                    lg:group-hover/intro:translate-y-0
                    lg:group-hover/intro:opacity-100
                  "
                >
                  {project.descriptionEn}
                </p>
              </div>
            </div>
          </header>

          {/* 作品選集 */}
          <ProjectLightbox
            title={project.titleZh}
            cases={project.cases}
          />

          {/* 前後作品分類 */}
          <nav
            aria-label="作品選集導覽"
            className="
              mt-20
              grid
              border-y
              border-[#d7d2ca]
              sm:mt-24
              md:grid-cols-2
              lg:mt-28
            "
          >
            <div className="border-b border-[#d7d2ca] md:border-b-0 md:border-r">
              {previousProject ? (
                <Link
                  href={`/portfolio/${previousProject.slug}`}
                  className="
                    group/previous
                    flex
                    min-h-[150px]
                    items-center
                    gap-5
                    px-5
                    py-8
                    transition-colors
                    duration-500
                    hover:bg-[#f1eee7]
                    sm:px-8
                    lg:min-h-[170px]
                    lg:px-10
                  "
                >
                  <span className="text-[22px] font-extralight text-[#a4865d] transition-transform duration-500 group-hover/previous:-translate-x-2">
                    ←
                  </span>

                  <span>
                    <span className="block text-[9px] uppercase tracking-[0.3em] text-neutral-400">
                      Previous Collection
                    </span>

                    <span className="mt-2 block text-[12px] font-light tracking-[0.1em] text-[#9a7d56]">
                      上一個作品分類
                    </span>

                    <span className="mt-3 block text-[21px] font-light tracking-[-0.02em] text-[#292929] sm:text-[24px]">
                      {previousProject.titleZh}
                    </span>
                  </span>
                </Link>
              ) : (
                <div className="hidden min-h-[150px] md:block lg:min-h-[170px]" />
              )}
            </div>

            <div>
              {nextProject ? (
                <Link
                  href={`/portfolio/${nextProject.slug}`}
                  className="
                    group/next
                    flex
                    min-h-[150px]
                    items-center
                    justify-end
                    gap-5
                    px-5
                    py-8
                    text-right
                    transition-colors
                    duration-500
                    hover:bg-[#f1eee7]
                    sm:px-8
                    lg:min-h-[170px]
                    lg:px-10
                  "
                >
                  <span>
                    <span className="block text-[9px] uppercase tracking-[0.3em] text-neutral-400">
                      Next Collection
                    </span>

                    <span className="mt-2 block text-[12px] font-light tracking-[0.1em] text-[#9a7d56]">
                      下一個作品分類
                    </span>

                    <span className="mt-3 block text-[21px] font-light tracking-[-0.02em] text-[#292929] sm:text-[24px]">
                      {nextProject.titleZh}
                    </span>
                  </span>

                  <span className="text-[22px] font-extralight text-[#a4865d] transition-transform duration-500 group-hover/next:translate-x-2">
                    →
                  </span>
                </Link>
              ) : (
                <div className="hidden min-h-[150px] md:block lg:min-h-[170px]" />
              )}
            </div>
          </nav>

          {/* 底部返回按鈕 */}
          <div className="mt-12 flex justify-center sm:mt-14">
            <Link
              href="/#portfolio"
              className="
                group/footer-back
                inline-flex
                items-center
                gap-5
                border
                border-[#b9aa95]
                px-7
                py-4
                transition-all
                duration-500
                hover:border-[#9a7d56]
                hover:bg-[#9a7d56]
                sm:px-9
              "
            >
              <span className="text-[15px] text-[#9a7d56] transition-all duration-500 group-hover/footer-back:-translate-x-1 group-hover/footer-back:text-white">
                ←
              </span>

              <span>
                <span className="block text-[13px] font-light tracking-[0.12em] text-[#383632] transition-colors duration-500 group-hover/footer-back:text-white">
                  返回作品案例
                </span>

                <span className="mt-1 block text-[8px] uppercase tracking-[0.28em] text-[#9a7d56] transition-colors duration-500 group-hover/footer-back:text-white/75">
                  View All Collections
                </span>
              </span>
            </Link>
          </div>
        </Container>
      </main>
    </>
  );
}
