"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

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
  新增作品时，只需要在 projects 内新增一组资料。

  category 分类：
  residential = 居住空间
  commercial  = 商业空间
  renovation  = 老屋新生
*/
const projects: Project[] = [
  {
    id: "private-residence",
    titleZh: "静谧私宅",
    titleEn: "Private Residence",
    category: "residential",
    image: "/images/projects/project01.jpg",
    href: "/portfolio/private-residence",
    location: "Taiwan",
    year: "2026",
  },
  {
    id: "modern-apartment",
    titleZh: "现代寓所",
    titleEn: "Modern Apartment",
    category: "residential",
    image: "/images/projects/project02.jpg",
    href: "/portfolio/modern-apartment",
    location: "Taiwan",
    year: "2026",
  },
  {
    id: "commercial-space",
    titleZh: "品牌商业空间",
    titleEn: "Commercial Space",
    category: "commercial",
    image: "/images/projects/project03.jpg",
    href: "/portfolio/commercial-space",
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
    zh: "居住空间",
    en: "Residential",
  },
  {
    value: "commercial",
    zh: "商业空间",
    en: "Commercial",
  },
  {
    value: "renovation",
    zh: "老屋新生",
    en: "Renovation",
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
    zh: "居住空间",
    en: "Residential",
  },
  commercial: {
    zh: "商业空间",
    en: "Commercial",
  },
  renovation: {
    zh: "老屋新生",
    en: "Renovation",
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
        {/* Heading */}
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
                精选作品
              </h2>
            </div>

            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <p className="max-w-[470px] text-[14px] font-light leading-7 text-[#68645f] sm:text-[15px]">
                汇集居住空间、商业空间与老屋新生案例，
                从格局、材质与生活需求，看见每个空间不同的设计回应。
              </p>
            </div>
          </div>
        </Reveal>

        {/* Category navigation */}
        <Reveal delay={0.05}>
          <div className="border-b border-[#e2ded6]">
            <nav
              aria-label="作品分类"
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

        {/* Project index */}
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
                    <Link
                      href={project.href}
                      className="
                        group
                        block
                        outline-none
                      "
                    >
                      <article>
                        {/* Image */}
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

                          {/* Category label */}
                          <div
                            className="
                              absolute
                              left-4
                              top-4
                              bg-[#f8f8f5]/90
                              px-3
                              py-2
                              backdrop-blur-md
                              sm:left-5
                              sm:top-5
                            "
                          >
                            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#796446]">
                              {
                                categoryLabels[
                                  project.category
                                ].en
                              }
                            </p>
                          </div>

                          {/* View indicator */}
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

                        {/* Information */}
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
                    </Link>
                  </Reveal>
                );
              }
            )}
          </div>
        ) : (
          /* Category without projects */
          <Reveal>
            <div className="mt-10 border-b border-[#dcd8cf] py-20 text-center sm:mt-12 lg:py-24">
              <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#9a7d56]">
                Coming Soon
              </p>

              <h3 className="mt-4 text-[25px] font-extralight tracking-[-0.025em] text-[#292929] sm:text-[30px]">
                作品整理中
              </h3>

              <p className="mx-auto mt-4 max-w-[430px] text-[14px] font-light leading-7 text-neutral-500">
                此分类的完整作品内容正在整理，
                敬请期待 MM Studio 最新空间案例。
              </p>
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}