"use client";

import { useState } from "react";
import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import ProjectTransitionLink from "@/components/transitions/ProjectTransitionLink";

type ProjectCategory =
  | "residential"
  | "commercial"
  | "renovation";

type FilterValue = "all" | ProjectCategory;

type Project = {
  id: string;
  titleZh: string;
  titleEn: string;
  category: ProjectCategory;
  image: string;
  href: string;
  location?: string;
  year?: string;
  area?: string;
};

/*
  新增作品時，只需要在 projects 內新增一組資料。

  category 分類：
  residential = 住宅設計
  commercial  = 商業空間
  renovation  = 舊屋改造
*/
const projects: Project[] = [
  {
    id: "residence-01",
    titleZh: "柔光序居",
    titleEn: "Soft-Lit Residence",
    category: "residential",
    image:
      "/images/projects/residential/residence-01/cover/cover-01.jpg",
    href: "/portfolio/private-residence#residence-01",
    location: "Taiwan",
    year: "2026",
  },
  {
    id: "residence-02",
    titleZh: "藝境之家",
    titleEn: "Artful Residence",
    category: "residential",
    image:
      "/images/projects/residential/residence-02/completed/completed-00.jpg",
    href: "/portfolio/private-residence#residence-02",
    location: "Taiwan",
    year: "2026",
  },
  {
    id: "residence-03",
    titleZh: "黑白映居",
    titleEn: "Monochrome Residence",
    category: "residential",
    image:
      "/images/projects/residential/residence-03/cover/cover-01.jpg",
    href: "/portfolio/private-residence#residence-03",
    location: "Taiwan",
    year: "2026",
  },
  {
    id: "renovation-01",
    titleZh: "庭院老宅新生",
    titleEn: "Courtyard House Renewal",
    category: "renovation",
    image:
      "/images/projects/renovation/renovation-01/cover/cover-01.jpg",
    href: "/portfolio/modern-apartment#renovation-01",
    location: "Taiwan",
    year: "2026",
  },
  {
    id: "commercial-01",
    titleZh: "旅讀選物空間",
    titleEn: "Travel & Lifestyle Store",
    category: "commercial",
    image:
      "/images/projects/commercial/commercial-01/cover/cover01.jpg",
    href: "/portfolio/commercial-space#commercial-01",
    location: "Taiwan",
    year: "2026",
  },
  {
    id: "commercial-02",
    titleZh: "甜點品牌概念店",
    titleEn: "Patisserie Concept Store",
    category: "commercial",
    image:
      "/images/projects/commercial/commercial-02/completed/A1.jpg",
    href: "/portfolio/commercial-space#commercial-02",
    location: "Taiwan",
    year: "2026",
  },
  {
    id: "commercial-03",
    titleZh: "簡約服飾專櫃",
    titleEn: "Minimal Fashion Boutique",
    category: "commercial",
    image:
      "/images/projects/commercial/commercial-03/cover/cover-01.jpg",
    href: "/portfolio/commercial-space#commercial-03",
    location: "Taiwan",
    year: "2026",
  },
  {
    id: "commercial-04",
    titleZh: "開放式餐飲空間",
    titleEn: "Open Kitchen Dining",
    category: "commercial",
    image:
      "/images/projects/commercial/commercial-04/cover/cover-01.jpg",
    href: "/portfolio/commercial-space#commercial-04",
    location: "Taiwan",
    year: "2026",
  },
];

const filters: {
  value: FilterValue;
  zh: string;
  en: string;
}[] = [
  {
    value: "all",
    zh: "全部作品",
    en: "All",
  },
  {
    value: "residential",
    zh: "住宅設計",
    en: "Residential Design",
  },
  {
    value: "commercial",
    zh: "商業空間",
    en: "Commercial Space",
  },
  {
    value: "renovation",
    zh: "舊屋改造",
    en: "Home Renovation",
  },
];

const categoryLabels: Record<
  ProjectCategory,
  {
    zh: string;
    en: string;
  }
> = {
  residential: {
    zh: "住宅設計",
    en: "Residential Design",
  },
  commercial: {
    zh: "商業空間",
    en: "Commercial Space",
  },
  renovation: {
    zh: "舊屋改造",
    en: "Home Renovation",
  },
};

function getProjectMeta(project: Project) {
  return [
    project.location,
    project.year,
    project.area,
  ].filter(Boolean);
}

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] =
    useState<FilterValue>("all");

  const visibleProjects =
    activeFilter === "all"
      ? projects
      : projects.filter(
          (project) =>
            project.category === activeFilter
        );

  const getProjectCount = (
    category: FilterValue
  ) => {
    if (category === "all") {
      return projects.length;
    }

    return projects.filter(
      (project) => project.category === category
    ).length;
  };

  return (
    <Section
      id="portfolio"
      fullScreen={false}
      className="
        scroll-mt-[92px]
        overflow-hidden
        bg-[#f8f8f5]
        !py-16
        sm:!py-20
        lg:!py-20
        xl:!py-24
      "
    >
      <Container>
        {/* 標題區 */}
        <Reveal>
          <div
            className="
              grid
              gap-7
              border-b
              border-[#dcd8cf]
              pb-8
              lg:grid-cols-12
              lg:items-end
              lg:pb-10
            "
          >
            <div className="lg:col-span-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#9a7d56] sm:text-[11px]">
                Selected Works
              </p>

              <h2
                className="
                  mt-3
                  text-[34px]
                  font-extralight
                  leading-[1.2]
                  tracking-[-0.04em]
                  text-[#292929]
                  sm:text-[40px]
                  lg:text-[46px]
                  xl:text-[50px]
                "
              >
                精選作品
              </h2>
            </div>

            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <p className="max-w-[470px] text-[14px] font-light leading-7 text-[#68645f] sm:text-[15px]">
                彙集住宅設計、舊屋改造與商業空間案例，
                從格局、材質與生活需求，看見每個空間不同的設計回應。
              </p>
            </div>
          </div>
        </Reveal>

        {/* 作品分類 */}
        <Reveal delay={0.05}>
          <div className="border-b border-[#e2ded6]">
            <nav
              aria-label="作品分類"
              className="
                -mx-6
                flex
                overflow-x-auto
                px-6
                [scrollbar-width:none]
                sm:-mx-8
                sm:px-8
                lg:mx-0
                lg:px-0
                [&::-webkit-scrollbar]:hidden
              "
            >
              {filters.map((filter) => {
                const active =
                  filter.value === activeFilter;

                const count = getProjectCount(
                  filter.value
                );

                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setActiveFilter(filter.value)
                    }
                    className="
                      group/filter
                      relative
                      flex
                      shrink-0
                      items-center
                      gap-3
                      px-5
                      py-5
                      text-left
                      outline-none
                      first:pl-0
                      sm:px-7
                      lg:px-8
                      lg:py-6
                      lg:first:pl-0
                    "
                  >
                    <span
                      className={`
                        whitespace-nowrap
                        text-[14px]
                        font-light
                        tracking-[0.02em]
                        transition-colors
                        duration-300
                        sm:text-[15px]
                        ${
                          active
                            ? "text-[#292929]"
                            : "text-neutral-500 group-hover/filter:text-[#292929]"
                        }
                      `}
                    >
                      {filter.zh}
                    </span>

                    <span
                      className={`
                        whitespace-nowrap
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        transition-colors
                        duration-300
                        ${
                          active
                            ? "text-[#a4865d]"
                            : "text-neutral-400"
                        }
                      `}
                    >
                      {filter.en}
                    </span>

                    <span
                      className={`
                        text-[9px]
                        font-light
                        tracking-[0.08em]
                        ${
                          active
                            ? "text-[#a4865d]"
                            : "text-neutral-400"
                        }
                      `}
                    >
                      {String(count).padStart(2, "0")}
                    </span>

                    <span
                      className={`
                        absolute
                        inset-x-5
                        bottom-0
                        h-px
                        origin-left
                        bg-[#a4865d]
                        transition-transform
                        duration-500
                        first:left-0
                        ${
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover/filter:scale-x-100"
                        }
                      `}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </Reveal>

        {/* 作品列表 */}
        {visibleProjects.length > 0 ? (
          <div
            key={activeFilter}
            className="
              mt-10
              grid
              grid-cols-1
              gap-x-6
              gap-y-12
              sm:mt-12
              md:grid-cols-2
              lg:grid-cols-3
              lg:gap-x-7
              lg:gap-y-14
              2xl:grid-cols-4
              2xl:gap-x-6
            "
          >
            {visibleProjects.map(
              (project, index) => {
                const meta =
                  getProjectMeta(project);

                return (
                  <Reveal
                    key={project.id}
                    delay={index * 0.05}
                  >
                    <ProjectTransitionLink
                      href={project.href}
                      title={project.titleZh}
                      className="group block outline-none"
                    >
                      <article>
                        {/* 作品圖片 */}
                        <div
                          className="
                            relative
                            aspect-[4/3]
                            overflow-hidden
                            bg-[#e8e5de]
                          "
                        >
                          <Image
                            src={project.image}
                            alt={`${project.titleZh}｜${project.titleEn}`}
                            fill
                            sizes="
                              (max-width: 768px) 100vw,
                              (max-width: 1024px) 50vw,
                              (max-width: 1536px) 33vw,
                              25vw
                            "
                            className="
                              object-cover
                              transition-transform
                              duration-[900ms]
                              ease-out
                              group-hover:scale-[1.035]
                              group-focus-visible:scale-[1.035]
                            "
                          />

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-0
                              bg-gradient-to-t
                              from-black/25
                              via-transparent
                              to-transparent
                              opacity-30
                              transition-opacity
                              duration-500
                              group-hover:opacity-100
                            "
                          />

                          {/* 查看作品提示 */}
                          <div
                            className="
                              absolute
                              bottom-4
                              right-4
                              flex
                              translate-y-2
                              items-center
                              gap-3
                              opacity-0
                              transition-all
                              duration-500
                              group-hover:translate-y-0
                              group-hover:opacity-100
                              group-focus-visible:translate-y-0
                              group-focus-visible:opacity-100
                              sm:bottom-5
                              sm:right-5
                            "
                          >
                            <span className="hidden text-[9px] uppercase tracking-[0.22em] text-white sm:block">
                              View Project
                            </span>

                            <span
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/60
                                bg-black/10
                                text-[15px]
                                text-white
                                backdrop-blur-md
                                transition-transform
                                duration-500
                                group-hover:translate-x-1
                              "
                            >
                              →
                            </span>
                          </div>
                        </div>

                        {/* 作品資訊 */}
                        <div
                          className="
                            border-b
                            border-[#dcd8cf]
                            pb-5
                            pt-4
                            transition-colors
                            duration-500
                            group-hover:border-[#a4865d]
                          "
                        >
                          <div className="flex items-start justify-between gap-5">
                            <div>
                              <p className="text-[10px] font-light tracking-[0.16em] text-[#9a7d56]">
                                {
                                  categoryLabels[
                                    project.category
                                  ].zh
                                }
                              </p>

                              <h3
                                className="
                                  mt-2
                                  text-[21px]
                                  font-light
                                  leading-[1.3]
                                  tracking-[-0.025em]
                                  text-[#292929]
                                  transition-colors
                                  duration-300
                                  group-hover:text-[#9a7b54]
                                  xl:text-[23px]
                                "
                              >
                                {project.titleZh}
                              </h3>

                              <p className="mt-1.5 text-[10px] font-light uppercase tracking-[0.18em] text-neutral-400">
                                {project.titleEn}
                              </p>
                            </div>

                            <p className="pt-1 text-[10px] font-light tracking-[0.08em] text-neutral-400">
                              {String(
                                index + 1
                              ).padStart(2, "0")}
                            </p>
                          </div>

                          {meta.length > 0 && (
                            <p className="mt-4 text-[11px] font-light tracking-[0.06em] text-neutral-500">
                              {meta.join(" · ")}
                            </p>
                          )}
                        </div>
                      </article>
                    </ProjectTransitionLink>
                  </Reveal>
                );
              }
            )}
          </div>
        ) : (
          /* 分類尚無作品 */
          <Reveal>
            <div className="mt-10 border-b border-[#dcd8cf] py-20 text-center sm:mt-12 lg:py-24">
              <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#9a7d56]">
                Coming Soon
              </p>

              <h3 className="mt-4 text-[25px] font-extralight tracking-[-0.025em] text-[#292929] sm:text-[30px]">
                作品整理中
              </h3>

              <p className="mx-auto mt-4 max-w-[430px] text-[14px] font-light leading-7 text-neutral-500">
                此分類的完整作品內容正在整理，
                敬請期待 MM Studio 最新空間案例。
              </p>
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
