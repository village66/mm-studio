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

type FilterValue = "all" | ProjectCategory;

/*
  新增作品時，只需複製其中一組資料並修改內容。

  category 可使用：
  residential = 居住空間
  commercial  = 商業空間
  renovation  = 老屋新生
*/
const projects: Project[] = [
  {
    id: "private-residence",
    titleZh: "靜謐私宅",
    titleEn: "Private Residence",
    category: "residential",
    image: "/images/projects/project01.jpg",
    href: "/portfolio/private-residence",
    location: "Taiwan",
    year: "2026",
  },
  {
    id: "modern-apartment",
    titleZh: "現代寓所",
    titleEn: "Modern Apartment",
    category: "residential",
    image: "/images/projects/project02.jpg",
    href: "/portfolio/modern-apartment",
    location: "Taiwan",
    year: "2026",
  },
  {
    id: "commercial-space",
    titleZh: "品牌商業空間",
    titleEn: "Commercial Space",
    category: "commercial",
    image: "/images/projects/project03.jpg",
    href: "/portfolio/commercial-space",
    location: "Taiwan",
    year: "2026",
  },
];

const categories: {
  value: FilterValue;
  zh: string;
  en: string;
}[] = [
  {
    value: "all",
    zh: "全部作品",
    en: "All Projects",
  },
  {
    value: "residential",
    zh: "居住空間",
    en: "Residential",
  },
  {
    value: "commercial",
    zh: "商業空間",
    en: "Commercial",
  },
  {
    value: "renovation",
    zh: "老屋新生",
    en: "Renovation",
  },
];

const categoryNames: Record<
  ProjectCategory,
  {
    zh: string;
    en: string;
  }
> = {
  residential: {
    zh: "居住空間",
    en: "Residential",
  },
  commercial: {
    zh: "商業空間",
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
  const [activeCategory, setActiveCategory] =
    useState<FilterValue>("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter(
          (project) =>
            project.category === activeCategory
        );

  const featuredProject = filteredProjects[0];
  const remainingProjects = filteredProjects.slice(1);

  const getCategoryCount = (
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
        lg:!py-24
        xl:!py-28
      "
    >
      <Container>
        {/* Heading */}
        <Reveal>
          <div className="grid gap-8 border-b border-[#dcd8cf] pb-9 lg:grid-cols-12 lg:items-end lg:pb-12">
            <div className="lg:col-span-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#9a7d56] sm:text-[11px]">
                Selected Works
              </p>

              <h2
                className="
                  mt-4
                  text-[36px]
                  font-extralight
                  leading-[1.2]
                  tracking-[-0.04em]
                  text-[#292929]
                  sm:text-[44px]
                  lg:text-[52px]
                  xl:text-[58px]
                "
              >
                精選作品
              </h2>
            </div>

            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <p className="max-w-[430px] text-[14px] font-light leading-7 text-[#68645f] sm:text-[15px] sm:leading-8">
                從生活需求、空間條件到材質細節，
                每個作品都回應不同的居住與使用方式。
              </p>
            </div>
          </div>
        </Reveal>

        {/* Categories */}
        <Reveal delay={0.06}>
          <div className="relative">
            <nav
              aria-label="作品分類"
              className="
                -mx-6
                flex
                gap-8
                overflow-x-auto
                px-6
                py-6
                [scrollbar-width:none]
                sm:-mx-8
                sm:px-8
                lg:mx-0
                lg:gap-12
                lg:px-0
                lg:py-8
                [&::-webkit-scrollbar]:hidden
              "
            >
              {categories.map((category) => {
                const active =
                  activeCategory === category.value;

                const count = getCategoryCount(
                  category.value
                );

                return (
                  <button
                    key={category.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setActiveCategory(category.value)
                    }
                    className="
                      group/filter
                      relative
                      shrink-0
                      pb-4
                      text-left
                      outline-none
                    "
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`
                          whitespace-nowrap
                          text-[15px]
                          font-light
                          tracking-[0.02em]
                          transition-colors
                          duration-300
                          sm:text-[16px]
                          ${
                            active
                              ? "text-[#292929]"
                              : "text-neutral-500 group-hover/filter:text-[#292929]"
                          }
                        `}
                      >
                        {category.zh}
                      </span>

                      <span
                        className={`
                          pt-[1px]
                          text-[9px]
                          tracking-[0.12em]
                          transition-colors
                          duration-300
                          ${
                            active
                              ? "text-[#a4865d]"
                              : "text-neutral-400"
                          }
                        `}
                      >
                        {String(count).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-neutral-400">
                      {category.en}
                    </p>

                    <span
                      className={`
                        absolute
                        bottom-0
                        left-0
                        h-px
                        bg-[#a4865d]
                        transition-all
                        duration-500
                        ${
                          active
                            ? "w-full"
                            : "w-0 group-hover/filter:w-full"
                        }
                      `}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </Reveal>

        {/* Projects */}
        <div
          key={activeCategory}
          className="mt-2 lg:mt-4"
        >
          {featuredProject ? (
            <>
              {/* Featured project */}
              <Reveal>
                <Link
                  href={featuredProject.href}
                  className="group block"
                >
                  <article>
                    <div
                      className="
                        relative
                        aspect-[4/3]
                        w-full
                        overflow-hidden
                        bg-[#e8e5de]
                        sm:aspect-[16/10]
                        lg:aspect-[16/8]
                      "
                    >
                      <Image
                        src={featuredProject.image}
                        alt={`${featuredProject.titleZh}｜${featuredProject.titleEn}`}
                        fill
                        priority={activeCategory === "all"}
                        sizes="(max-width: 1024px) 100vw, 90vw"
                        className="
                          object-cover
                          transition-transform
                          duration-[1000ms]
                          ease-out
                          group-hover:scale-[1.025]
                        "
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/[0.03] to-transparent" />

                      <div
                        className="
                          absolute
                          inset-x-0
                          bottom-0
                          flex
                          items-end
                          justify-between
                          gap-6
                          p-6
                          sm:p-8
                          lg:p-10
                          xl:p-12
                        "
                      >
                        <div>
                          <div className="flex items-center gap-4">
                            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/75 sm:text-[10px]">
                              {
                                categoryNames[
                                  featuredProject.category
                                ].en
                              }
                            </p>

                            <span className="h-px w-10 bg-white/50 sm:w-14" />
                          </div>

                          <h3 className="mt-3 text-[27px] font-extralight tracking-[-0.025em] text-white sm:text-[34px] lg:text-[42px]">
                            {featuredProject.titleZh}
                          </h3>

                          <p className="mt-2 text-[11px] font-light uppercase tracking-[0.2em] text-white/70 sm:text-[12px]">
                            {featuredProject.titleEn}
                          </p>
                        </div>

                        <span
                          className="
                            hidden
                            items-center
                            gap-4
                            text-[10px]
                            uppercase
                            tracking-[0.26em]
                            text-white/80
                            sm:flex
                          "
                        >
                          View Project

                          <span
                            className="
                              inline-block
                              transition-transform
                              duration-500
                              group-hover:translate-x-2
                            "
                          >
                            →
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dcd8cf] py-5">
                      <div className="flex items-center gap-3">
                        <p className="text-[13px] font-light text-[#45433f]">
                          {
                            categoryNames[
                              featuredProject.category
                            ].zh
                          }
                        </p>

                        <span className="h-3 w-px bg-[#d2ccc2]" />

                        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                          Featured Project
                        </p>
                      </div>

                      {getProjectMeta(
                        featuredProject
                      ).length > 0 && (
                        <p className="text-[11px] font-light tracking-[0.08em] text-neutral-500 sm:text-[12px]">
                          {getProjectMeta(
                            featuredProject
                          ).join(" · ")}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              </Reveal>

              {/* Remaining projects */}
              {remainingProjects.length > 0 && (
                <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-20 lg:gap-x-10 lg:gap-y-20">
                  {remainingProjects.map(
                    (project, index) => (
                      <Reveal
                        key={project.id}
                        delay={index * 0.06}
                      >
                        <Link
                          href={project.href}
                          className="group block"
                        >
                          <article>
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e5de]">
                              <Image
                                src={project.image}
                                alt={`${project.titleZh}｜${project.titleEn}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="
                                  object-cover
                                  transition-transform
                                  duration-[900ms]
                                  ease-out
                                  group-hover:scale-[1.035]
                                "
                              />

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  inset-0
                                  bg-black/0
                                  transition-colors
                                  duration-500
                                  group-hover:bg-black/[0.08]
                                "
                              />

                              <div
                                className="
                                  absolute
                                  bottom-5
                                  right-5
                                  flex
                                  h-11
                                  w-11
                                  translate-y-2
                                  items-center
                                  justify-center
                                  rounded-full
                                  border
                                  border-white/50
                                  bg-black/10
                                  text-lg
                                  text-white
                                  opacity-0
                                  backdrop-blur-md
                                  transition-all
                                  duration-500
                                  group-hover:translate-y-0
                                  group-hover:opacity-100
                                "
                              >
                                →
                              </div>
                            </div>

                            <div className="border-b border-[#dcd8cf] py-5">
                              <div className="flex items-start justify-between gap-5">
                                <div>
                                  <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#9a7d56]">
                                    {
                                      categoryNames[
                                        project.category
                                      ].en
                                    }
                                  </p>

                                  <h3
                                    className="
                                      mt-2
                                      text-[23px]
                                      font-light
                                      tracking-[-0.025em]
                                      text-[#292929]
                                      transition-colors
                                      duration-300
                                      group-hover:text-[#9a7b54]
                                      sm:text-[26px]
                                    "
                                  >
                                    {project.titleZh}
                                  </h3>

                                  <p className="mt-1 text-[11px] font-light uppercase tracking-[0.16em] text-neutral-400">
                                    {project.titleEn}
                                  </p>
                                </div>

                                <p className="pt-1 text-[12px] font-light text-neutral-500">
                                  {String(index + 2).padStart(
                                    2,
                                    "0"
                                  )}
                                </p>
                              </div>

                              {getProjectMeta(project).length >
                                0 && (
                                <p className="mt-4 text-[11px] font-light tracking-[0.08em] text-neutral-500 sm:text-[12px]">
                                  {getProjectMeta(
                                    project
                                  ).join(" · ")}
                                </p>
                              )}
                            </div>
                          </article>
                        </Link>
                      </Reveal>
                    )
                  )}
                </div>
              )}
            </>
          ) : (
            /* Empty category */
            <Reveal>
              <div className="border-y border-[#dcd8cf] py-24 text-center sm:py-28 lg:py-32">
                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#9a7d56]">
                  Coming Soon
                </p>

                <h3 className="mt-5 text-[27px] font-extralight tracking-[-0.025em] text-[#292929] sm:text-[34px]">
                  作品整理中
                </h3>

                <p className="mx-auto mt-4 max-w-[460px] text-[14px] font-light leading-7 text-neutral-500 sm:text-[15px]">
                  此分類的完整作品內容正在整理，
                  敬請期待 MM Studio 最新空間案例。
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}