import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

type ProcessStep = {
  no: string;
  zh: string;
  en: string;
  zhDescription: string;
  enDescription: string;
  icon:
    | "consultation"
    | "survey"
    | "planning"
    | "development"
    | "construction"
    | "handover";
};

const steps: ProcessStep[] = [
  {
    no: "01",
    zh: "初步洽談",
    en: "Consultation",
    zhDescription:
      "確認需求、預算與預計時程，建立清楚的合作範圍。",
    enDescription:
      "Aligning needs, budget and timeline to define a clear project scope.",
    icon: "consultation",
  },
  {
    no: "02",
    zh: "現場勘查",
    en: "Site Survey",
    zhDescription:
      "丈量空間並確認屋況與設備條件，整理設計限制。",
    enDescription:
      "Surveying the space and reviewing existing technical conditions.",
    icon: "survey",
  },
  {
    no: "03",
    zh: "概念規劃",
    en: "Concept Planning",
    zhDescription:
      "確認格局、動線、收納與風格方向，建立設計共識。",
    enDescription:
      "Defining layout, circulation, storage and the overall design direction.",
    icon: "planning",
  },
  {
    no: "04",
    zh: "設計深化",
    en: "Design Development",
    zhDescription:
      "整合材質、照明、櫃體細節與預算，完成設計內容。",
    enDescription:
      "Refining materials, lighting, joinery details and project budget.",
    icon: "development",
  },
  {
    no: "05",
    zh: "工程執行",
    en: "Construction",
    zhDescription:
      "協調工種、工程進度與現場細節，落實設計品質。",
    enDescription:
      "Coordinating trades, schedule and site details throughout construction.",
    icon: "construction",
  },
  {
    no: "06",
    zh: "完工交付",
    en: "Final Handover",
    zhDescription:
      "進行完工檢查與細節修整，確認後正式交付。",
    enDescription:
      "Completing final inspections and refinements before handover.",
    icon: "handover",
  },
];

function ProcessIcon({
  type,
}: {
  type: ProcessStep["icon"];
}) {
  const iconClassName =
    "h-7 w-7 transition-all duration-500 group-hover:scale-110 group-hover:text-[#765a38]";

  const commonProps = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: iconClassName,
    "aria-hidden": true,
  };

  if (type === "consultation") {
    return (
      <svg {...commonProps}>
        <path d="M8 11.5h32v21H21l-8.5 6v-6H8z" />
        <path d="M15 19h18" />
        <path d="M15 25h12" />
      </svg>
    );
  }

  if (type === "survey") {
    return (
      <svg {...commonProps}>
        <path d="M10 35 34.5 10.5l4 4L14 39z" />
        <path d="m29 16 4 4" />
        <path d="m24 21 3 3" />
        <path d="m19 26 4 4" />
        <path d="m14 31 3 3" />
        <path d="M9 10h12v12H9z" />
        <path d="M13 14h8" />
        <path d="M13 18h4" />
      </svg>
    );
  }

  if (type === "planning") {
    return (
      <svg {...commonProps}>
        <path d="M8 9h32v30H8z" />
        <path d="M20 9v13H8" />
        <path d="M20 22h20" />
        <path d="M30 22v17" />
        <path d="M14 30h8" />
        <path d="M14 34h8" />
        <circle cx="35" cy="15.5" r="3.5" />
      </svg>
    );
  }

  if (type === "development") {
    return (
      <svg {...commonProps}>
        <rect
          x="8"
          y="12"
          width="19"
          height="25"
          rx="1"
        />
        <rect
          x="16"
          y="8"
          width="19"
          height="25"
          rx="1"
        />
        <rect
          x="24"
          y="16"
          width="16"
          height="23"
          rx="1"
        />
        <circle cx="32" cy="31" r="3" />
        <path d="M21 15h7" />
        <path d="M21 20h7" />
      </svg>
    );
  }

  if (type === "construction") {
    return (
      <svg {...commonProps}>
        <path d="M11 36h26" />
        <path d="M15 36V25a9 9 0 0 1 18 0v11" />
        <path d="M12 27h24" />
        <path d="M20 25v-8" />
        <path d="M28 25v-8" />
        <path d="M9 39h30" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="24" cy="24" r="16" />
      <path d="m16.5 24 5 5 10-11" />
      <path d="M24 8v4" />
      <path d="M40 24h-4" />
      <path d="M24 40v-4" />
      <path d="M8 24h4" />
    </svg>
  );
}

export default function Process() {
  return (
    <Section
      id="process"
      fullScreen={false}
      className="
        scroll-mt-[92px]
        overflow-hidden
        bg-[#f8f8f5]
        !py-14
        sm:!py-16
        lg:!py-14
        xl:!py-16
      "
    >
      <Container>
        {/* 精簡標題區 */}
        <Reveal>
          <div
            className="
              grid
              gap-6
              border-b
              border-[#dcd8cf]
              pb-7
              lg:grid-cols-12
              lg:items-end
              lg:pb-8
            "
          >
            <div className="lg:col-span-7">
              <p className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#9a7d56] sm:text-[10px]">
                Our Process
              </p>

              <h2
                className="
                  mt-3
                  text-[30px]
                  font-extralight
                  leading-[1.25]
                  tracking-[-0.035em]
                  text-[#292929]
                  sm:text-[34px]
                  lg:text-[38px]
                  xl:text-[42px]
                "
              >
                從洽談到交付，
                <br className="sm:hidden" />
                清楚每一步。
              </h2>
            </div>

            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <p className="max-w-[460px] text-[13px] font-light leading-7 text-[#68645f] sm:text-[14px]">
                以清楚的階段與持續溝通，
                讓設計、預算及施工進度都能安心掌握。
              </p>
            </div>
          </div>
        </Reveal>

        {/* 精簡流程 */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-6
            md:mt-9
            md:grid-cols-2
            md:gap-x-8
            md:gap-y-9
            lg:grid-cols-3
            lg:gap-x-10
            xl:gap-x-12
          "
        >
          {steps.map((step, index) => (
            <Reveal
              key={step.no}
              delay={index * 0.055}
            >
              <article
                className="
                  group
                  relative
                  grid
                  grid-cols-[36px_1fr]
                  gap-4
                  border-l
                  border-[#d6d0c7]
                  py-1
                  pl-4
                  md:block
                  md:border-l-0
                  md:border-t
                  md:py-0
                  md:pl-0
                  md:pt-5
                "
              >
                {/* 動態流程線 */}
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    left-[-1px]
                    top-0
                    h-0
                    w-px
                    bg-[#a4865d]
                    transition-all
                    duration-700
                    group-hover:h-full
                    md:left-0
                    md:top-[-1px]
                    md:h-px
                    md:w-0
                    md:group-hover:h-px
                    md:group-hover:w-full
                  "
                />

                {/* 編號與步驟 */}
                <div className="relative z-10 md:flex md:items-center md:justify-between">
                  <p className="text-[18px] font-extralight leading-none tracking-[0.04em] text-[#b6925d] md:text-[20px]">
                    {step.no}
                  </p>

                  <p className="hidden text-[7px] uppercase tracking-[0.22em] text-neutral-400 lg:block">
                    Step {step.no}
                  </p>
                </div>

                <div className="min-w-0">
                  {/* 圖示與標題 */}
                  <div className="flex items-center gap-4 md:mt-5">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        text-[#a4865d]
                        transition-colors
                        duration-500
                        group-hover:bg-[#f0ece4]
                      "
                    >
                      <ProcessIcon type={step.icon} />
                    </div>

                    {/* 中文標題／英文切換 */}
                    <div className="relative grid min-h-7 flex-1 cursor-default">
                      <h3
                        className="
                          col-start-1
                          row-start-1
                          text-[17px]
                          font-light
                          leading-7
                          tracking-[-0.015em]
                          text-[#2f2e2b]
                          opacity-100
                          transition-all
                          duration-500
                          lg:group-hover:-translate-y-1
                          lg:group-hover:opacity-0
                          xl:text-[18px]
                        "
                      >
                        {step.zh}
                      </h3>

                      <h3
                        aria-hidden="true"
                        className="
                          col-start-1
                          row-start-1
                          translate-y-1
                          text-[15px]
                          font-light
                          leading-7
                          text-[#9a7b54]
                          opacity-0
                          transition-all
                          duration-500
                          lg:group-hover:translate-y-0
                          lg:group-hover:opacity-100
                        "
                      >
                        {step.en}
                      </h3>
                    </div>
                  </div>

                  {/* 中文說明／英文切換 */}
                  <div className="relative mt-3 grid min-h-[56px] cursor-default md:mt-4">
                    <p
                      className="
                        col-start-1
                        row-start-1
                        text-[13px]
                        font-light
                        leading-6
                        text-[#68645f]
                        opacity-100
                        transition-all
                        duration-500
                        lg:group-hover:-translate-y-1
                        lg:group-hover:opacity-0
                      "
                    >
                      {step.zhDescription}
                    </p>

                    <p
                      aria-hidden="true"
                      className="
                        col-start-1
                        row-start-1
                        translate-y-1
                        text-[12px]
                        font-light
                        leading-6
                        text-[#8a7356]
                        opacity-0
                        transition-all
                        duration-500
                        lg:group-hover:translate-y-0
                        lg:group-hover:opacity-100
                      "
                    >
                      {step.enDescription}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* 精簡信任說明 */}
        <Reveal delay={0.15}>
          <div
            className="
              mt-10
              flex
              flex-col
              gap-5
              border-y
              border-[#d7d2ca]
              py-5
              sm:mt-12
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:py-6
            "
          >
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#9a7d56]">
                Clear Collaboration
              </p>

              <p className="mt-2 text-[13px] font-light leading-6 text-neutral-600">
                每個階段清楚確認，讓設計與工程安心向前。
              </p>
            </div>

            <a
              href="#contact"
              className="
                group/contact
                inline-flex
                shrink-0
                items-center
                gap-3
                text-[11px]
                font-light
                tracking-[0.14em]
                text-[#8a6d48]
              "
            >
              開始洽談

              <span className="transition-transform duration-500 group-hover/contact:translate-x-2">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}