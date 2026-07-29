"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import type {
  ProjectCase,
  ProjectPhase,
  ProjectPhaseKey,
} from "@/data/projects";

type Props = {
  title: string;
  cases: ProjectCase[];
};

type LightboxSelection = {
  caseIndex: number;
  phaseKey: ProjectPhaseKey;
  imageIndex: number;
};

const phaseOrder: ProjectPhaseKey[] = [
  "before",
  "progress",
  "completed",
];

const phaseMeta: Record<
  ProjectPhaseKey,
  {
    number: string;
    titleZh: string;
    titleEn: string;
    emptyZh: string;
  }
> = {
  before: {
    number: "01",
    titleZh: "原始空間",
    titleEn: "Before",
    emptyZh: "影像整理中",
  },
  progress: {
    number: "02",
    titleZh: "設計實現",
    titleEn: "In Progress",
    emptyZh: "影像整理中",
  },
  completed: {
    number: "03",
    titleZh: "完成空間",
    titleEn: "Completed",
    emptyZh: "影像整理中",
  },
};

function ProjectStory({
  projectCase,
  caseIndex,
  collectionTitle,
  onOpenImage,
}: {
  projectCase: ProjectCase;
  caseIndex: number;
  collectionTitle: string;
  onOpenImage: (
    selection: LightboxSelection
  ) => void;
}) {
  const availablePhases = useMemo(
    () =>
      phaseOrder
        .map((key) =>
          projectCase.phases.find(
            (phase) =>
              phase.key === key &&
              phase.images.length > 0
          )
        )
        .filter(
          (phase): phase is ProjectPhase =>
            phase !== undefined
        ),
    [projectCase.phases]
  );

  const [activeKey, setActiveKey] =
    useState<ProjectPhaseKey>(
      availablePhases[0]?.key ?? "completed"
    );

  const activePhase =
    availablePhases.find(
      (phase) => phase.key === activeKey
    ) ??
    availablePhases[0];

  if (!activePhase) {
    return null;
  }

  return (
    <article
      aria-labelledby={`${projectCase.id}-title`}
      className="border-b border-[#d8d3ca] pb-16 sm:pb-20 lg:pb-24"
    >
      <header className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="text-[9px] tracking-[0.24em] text-[#9a7d56]">
              PROJECT{" "}
              {String(caseIndex + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-10 bg-[#c7b79f]" />
            <span className="text-[9px] tracking-[0.2em] text-neutral-400">
              同一案場 · 完整紀錄
            </span>
          </div>

          <h3
            id={`${projectCase.id}-title`}
            className="mt-5 text-[30px] font-extralight leading-[1.25] tracking-[-0.035em] text-[#292929] sm:text-[38px] lg:text-[42px]"
          >
            {projectCase.titleZh}
          </h3>

          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#a08661]">
            {projectCase.titleEn}
          </p>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <p className="max-w-[720px] text-[14px] font-light leading-8 text-[#68645f] sm:text-[15px]">
            {projectCase.storyZh}
          </p>
        </div>
      </header>

      <div className="relative mt-9 sm:mt-11">
        <div className="pointer-events-none absolute left-[8%] right-[8%] top-[31px] hidden h-px bg-[#d9d3c9] sm:block" />

        <nav
          aria-label={`${projectCase.titleZh} 空間轉變階段`}
          className="relative grid gap-px bg-[#ddd8d0] border-y border-[#ddd8d0] sm:grid-cols-3"
        >
          {phaseOrder.map((phaseKey) => {
            const meta = phaseMeta[phaseKey];
            const phase = projectCase.phases.find(
              (item) =>
                item.key === phaseKey &&
                item.images.length > 0
            );
            const isAvailable = Boolean(phase);
            const isActive =
              phaseKey === activePhase.key;

            return (
              <button
                key={phaseKey}
                type="button"
                disabled={!isAvailable}
                aria-pressed={
                  isAvailable ? isActive : undefined
                }
                onClick={() => {
                  if (phase) {
                    setActiveKey(phaseKey);
                  }
                }}
                className={`
                  group/phase
                  relative
                  flex
                  min-h-[92px]
                  items-center
                  gap-4
                  bg-[#f8f8f5]
                  px-5
                  py-5
                  text-left
                  transition-colors
                  duration-500
                  sm:flex-col
                  sm:items-start
                  sm:justify-between
                  sm:px-6
                  ${
                    isAvailable
                      ? "cursor-pointer hover:bg-[#f0ece3]"
                      : "cursor-default opacity-45"
                  }
                  ${
                    isActive
                      ? "bg-[#eee9df]"
                      : ""
                  }
                `}
              >
                <span
                  className={`
                    relative
                    z-10
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    bg-[#f8f8f5]
                    text-[8px]
                    tracking-[0.12em]
                    transition-all
                    duration-500
                    ${
                      isActive
                        ? "border-[#9a7d56] bg-[#9a7d56] text-white"
                        : "border-[#c9c0b3] text-[#927653]"
                    }
                  `}
                >
                  {meta.number}
                </span>

                <span className="flex-1 sm:flex-none">
                  <span className="block text-[14px] font-light tracking-[0.08em] text-[#34322f]">
                    {meta.titleZh}
                  </span>
                  <span className="mt-1 block text-[8px] uppercase tracking-[0.23em] text-neutral-400">
                    {meta.titleEn}
                  </span>
                </span>

                <span className="ml-auto text-right text-[8px] tracking-[0.14em] text-neutral-400 sm:absolute sm:bottom-5 sm:right-6">
                  {phase
                    ? `${String(
                        phase.images.length
                      ).padStart(2, "0")} IMAGES`
                    : meta.emptyZh}
                </span>

                <span
                  className={`
                    absolute
                    inset-x-0
                    bottom-0
                    h-px
                    origin-left
                    bg-[#9a7d56]
                    transition-transform
                    duration-500
                    ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0"
                    }
                  `}
                />
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-medium tracking-[0.16em] text-[#9a7d56]">
            {activePhase.titleZh}
          </p>
          <p className="mt-2 max-w-[680px] text-[13px] font-light leading-7 text-neutral-500 sm:text-[14px]">
            {activePhase.summaryZh}
          </p>
        </div>

        <p className="text-[8px] uppercase tracking-[0.2em] text-neutral-400">
          {collectionTitle} ·{" "}
          {String(caseIndex + 1).padStart(2, "0")}
        </p>
      </div>

      <div
        key={activePhase.key}
        className="mt-7 grid animate-[phase-gallery-in_650ms_ease-out_both] grid-cols-1 gap-x-5 gap-y-8 sm:mt-9 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10 2xl:grid-cols-4"
      >
        {activePhase.images.map(
          (image, imageIndex) => (
            <button
              key={`${image.src}-${imageIndex}`}
              type="button"
              aria-label={`查看 ${projectCase.titleZh} ${activePhase.titleZh}第 ${
                imageIndex + 1
              } 張圖片`}
              onClick={() =>
                onOpenImage({
                  caseIndex,
                  phaseKey: activePhase.key,
                  imageIndex,
                })
              }
              className="group/image block w-full text-left outline-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e5de]">
                <Image
                  src={image.src}
                  alt={`${projectCase.titleZh} ${activePhase.titleZh} ${
                    image.captionZh ??
                    `影像 ${imageIndex + 1}`
                  }`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover/image:scale-[1.04] group-focus-visible/image:scale-[1.04]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-25 transition-opacity duration-500 group-hover/image:opacity-100 group-focus-visible/image:opacity-100" />

                <div className="absolute left-4 top-4 bg-[#f8f8f5]/90 px-3 py-2 backdrop-blur-md">
                  <span className="text-[9px] font-light tracking-[0.2em] text-[#796446]">
                    {String(imageIndex + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 flex translate-y-2 items-center gap-3 opacity-0 transition-all duration-500 group-hover/image:translate-y-0 group-hover/image:opacity-100 group-focus-visible/image:translate-y-0 group-focus-visible/image:opacity-100">
                  <span className="hidden text-[9px] tracking-[0.18em] text-white sm:block">
                    進入作品
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-black/10 text-[16px] font-extralight text-white backdrop-blur-md transition-transform duration-500 group-hover/image:scale-110">
                    +
                  </span>
                </div>
              </div>

              <div className="flex min-h-[58px] items-start justify-between gap-4 border-b border-[#ddd8d0] py-3 transition-colors duration-500 group-hover/image:border-[#a4865d]">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.18em] text-[#9a7d56]">
                    {activePhase.titleEn}
                  </p>
                  <p className="mt-1 text-[11px] font-light leading-5 text-neutral-500 sm:text-[12px]">
                    {image.captionZh ??
                      activePhase.titleZh}
                  </p>
                </div>

                <p className="shrink-0 text-[9px] font-light tracking-[0.15em] text-neutral-400">
                  {String(imageIndex + 1).padStart(
                    2,
                    "0"
                  )}
                  {" / "}
                  {String(
                    activePhase.images.length
                  ).padStart(2, "0")}
                </p>
              </div>
            </button>
          )
        )}
      </div>
    </article>
  );
}

export default function ProjectLightbox({
  title,
  cases,
}: Props) {
  const [selection, setSelection] =
    useState<LightboxSelection | null>(null);
  const [open, setOpen] = useState(false);

  const selectedCase = selection
    ? cases[selection.caseIndex]
    : undefined;
  const selectedPhase =
    selectedCase && selection
      ? selectedCase.phases.find(
          (phase) =>
            phase.key === selection.phaseKey
        )
      : undefined;

  const selectedIndex =
    selection?.imageIndex ?? 0;

  const handleOpenImage = (
    nextSelection: LightboxSelection
  ) => {
    setSelection(nextSelection);
    setOpen(true);
  };

  return (
    <>
      <section
        aria-labelledby="project-gallery-title"
        className="mt-14 sm:mt-16 lg:mt-20"
      >
        <div className="flex flex-col gap-6 border-b border-[#dcd8cf] pb-7 sm:flex-row sm:items-end sm:justify-between lg:pb-9">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.36em] text-[#9a7d56] sm:text-[10px]">
              Transformation Stories
            </p>

            <h2
              id="project-gallery-title"
              className="mt-3 text-[28px] font-extralight tracking-[-0.03em] text-[#292929] sm:text-[34px] lg:text-[38px]"
            >
              空間轉變故事
            </h2>

            <p className="mt-3 max-w-[650px] text-[13px] font-light leading-7 text-neutral-500 sm:text-[14px]">
              每一件作品獨立記錄原始條件、設計落實與完成成果，清楚看見空間如何因設計而改變。
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#c7b79f]" />
            <p className="text-[9px] uppercase tracking-[0.22em] text-neutral-400">
              {String(cases.length).padStart(2, "0")}{" "}
              PROJECT STORIES
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-16 sm:mt-12 sm:space-y-20 lg:mt-14 lg:space-y-24">
          {cases.map((projectCase, caseIndex) => (
            <ProjectStory
              key={projectCase.id}
              projectCase={projectCase}
              caseIndex={caseIndex}
              collectionTitle={title}
              onOpenImage={handleOpenImage}
            />
          ))}
        </div>
      </section>

      {selectedCase && selectedPhase && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={selectedIndex}
          className="mm-project-lightbox"
          plugins={[Captions, Counter]}
          slides={selectedPhase.images.map(
            (image, imageIndex) => ({
              src: image.src,
              alt: `${selectedCase.titleZh} ${selectedPhase.titleZh} ${
                image.captionZh ??
                `影像 ${imageIndex + 1}`
              }`,
              title: `${selectedCase.titleZh} · ${selectedPhase.titleZh}`,
              description:
                image.captionZh ??
                selectedPhase.summaryZh,
            })
          )}
          on={{
            view: ({ index: currentIndex }) => {
              setSelection((current) =>
                current
                  ? {
                      ...current,
                      imageIndex: currentIndex,
                    }
                  : current
              );
            },
          }}
          carousel={{
            finite:
              selectedPhase.images.length <= 1,
            padding: "7%",
            spacing: "4%",
          }}
          controller={{
            closeOnBackdropClick: true,
            closeOnPullDown: true,
          }}
          captions={{
            showToggle: false,
            descriptionTextAlign: "start",
            descriptionMaxLines: 3,
          }}
          counter={{
            separator: " / ",
          }}
          labels={{
            Close: "關閉作品",
            Next: "下一張",
            Previous: "上一張",
          }}
          render={{
            controls: () => (
              <div className="mm-lightbox-story-mark">
                <span className="mm-lightbox-story-number">
                  PROJECT{" "}
                  {String(
                    (selection?.caseIndex ?? 0) + 1
                  ).padStart(2, "0")}
                </span>
                <span className="mm-lightbox-story-line" />
                <span className="mm-lightbox-story-stage">
                  {selectedPhase.titleZh}
                </span>
              </div>
            ),
          }}
          animation={{
            fade: 450,
            swipe: 550,
          }}
          styles={{
            root: {
              "--yarl__color_backdrop":
                "rgba(18, 17, 15, 0.975)",
            },
            container: {
              zIndex: 99999,
            },
          }}
        />
      )}

      <style jsx global>{`
        @keyframes phase-gallery-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mm-lightbox-image-in {
          from {
            opacity: 0;
            transform: scale(0.965);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        @keyframes mm-lightbox-text-in {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mm-project-lightbox .yarl__slide_image {
          animation: mm-lightbox-image-in 850ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .mm-project-lightbox
          .yarl__captions_container {
          left: clamp(20px, 5vw, 72px);
          right: auto;
          bottom: clamp(18px, 4vw, 52px);
          width: min(520px, calc(100vw - 40px));
          padding: 0;
          background: transparent;
          animation: mm-lightbox-text-in 700ms 180ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .mm-project-lightbox
          .yarl__captions_title {
          font-size: clamp(15px, 1.3vw, 20px);
          font-weight: 300;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.92);
        }

        .mm-project-lightbox
          .yarl__captions_description {
          margin-top: 8px;
          font-size: clamp(11px, 0.9vw, 14px);
          font-weight: 300;
          line-height: 1.8;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.58);
        }

        .mm-project-lightbox .yarl__counter {
          left: auto;
          right: clamp(20px, 5vw, 72px);
          top: auto;
          bottom: clamp(24px, 4vw, 58px);
          padding: 0;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.24em;
          color: rgba(255, 255, 255, 0.55);
          background: transparent;
          text-shadow: none;
        }

        .mm-lightbox-story-mark {
          pointer-events: none;
          position: absolute;
          left: clamp(20px, 5vw, 72px);
          top: clamp(20px, 4vw, 52px);
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 14px;
          color: rgba(255, 255, 255, 0.6);
          animation: mm-lightbox-text-in 700ms 100ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .mm-lightbox-story-number,
        .mm-lightbox-story-stage {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .mm-lightbox-story-stage {
          color: #c5a979;
        }

        .mm-lightbox-story-line {
          width: 38px;
          height: 1px;
          background: rgba(197, 169, 121, 0.7);
        }

        @media (max-width: 640px) {
          .mm-project-lightbox .yarl__slide {
            padding-top: 104px;
            padding-bottom: 142px;
          }

          .mm-project-lightbox
            .yarl__slide_image {
            max-height: calc(100svh - 246px) !important;
            max-width: calc(100vw - 40px) !important;
          }

          .mm-project-lightbox
            .yarl__captions_container {
            bottom: 22px;
            width: calc(100vw - 92px);
          }

          .mm-project-lightbox .yarl__counter {
            right: 20px;
            bottom: 26px;
          }

          .mm-lightbox-story-line {
            width: 24px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mm-project-lightbox .yarl__slide_image,
          .mm-project-lightbox
            .yarl__captions_container,
          .mm-lightbox-story-mark {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
