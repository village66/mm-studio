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
    en: "Initial Consultation",
    zhDescription:
      "了解空間現況、生活需求、預算範圍與預計時程，確認適合的合作方向。",
    enDescription:
      "Understanding your space, lifestyle, budget and timeline to define the right direction.",
    icon: "consultation",
  },
  {
    no: "02",
    zh: "現場勘查",
    en: "Site Survey",
    zhDescription:
      "實際丈量空間並確認屋況與設備條件，整理設計及工程需要面對的問題。",
    enDescription:
      "Surveying the site and reviewing existing conditions, dimensions and technical requirements.",
    icon: "survey",
  },
  {
    no: "03",
    zh: "概念規劃",
    en: "Concept Planning",
    zhDescription:
      "提出格局、動線、收納與風格方向，透過配置與參考影像建立設計共識。",
    enDescription:
      "Developing layouts, circulation, storage and visual direction into a clear design concept.",
    icon: "planning",
  },
  {
    no: "04",
    zh: "設計深化",
    en: "Design Development",
    zhDescription:
      "確認材質、色彩、照明、櫃體與空間細節，同步整合設計內容與預算。",
    enDescription:
      "Refining materials, lighting, joinery and details while aligning design with the budget.",
    icon: "development",
  },
  {
    no: "05",
    zh: "工程執行",
    en: "Construction",
    zhDescription:
      "完成工程準備並協調工種、進度與現場細節，確保設計正確落實。",
    enDescription:
      "Coordinating trades, schedule and site details to deliver the approved design with clarity.",
    icon: "construction",
  },
  {
    no: "06",
    zh: "完工交付",
    en: "Final Handover",
    zhDescription:
      "進行完工檢查與細節修整，確認每項內容後，安心交付完成的空間。",
    enDescription:
      "Completing final inspections and refinements before the finished space is formally handed over.",
    icon: "handover",
  },
];

function ProcessIcon({
  type,
}: {
  type: ProcessStep["icon"];
}) {
  const iconClassName =
    "h-9 w-9 transition-all duration-500 group-hover:scale-110 group-hover:text-[#8b6b43] md:h-10 md:w-10";

  const commonProps = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
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
              pb-9
              lg:grid-cols-12
              lg:items-end
              lg:pb-11
            "
          >
            <div className="lg:col-span-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#9a7d56] sm:text-[11px]">
                Our Process
              </p>

              <h2
                className="
                  mt-3
                  text-[34px]
                  font-extralight
                  leading-[1.25]
                  tracking-[-0.04em]
                  text-[#292929]
                  sm:text-[40px]
                  lg:text-[46px]
                  xl:text-[50px]
                "
              >
                從理解需求，
                <br className="sm:hidden" />
                到安心交付。
              </h2>
            </div>

            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <div className="max-w-[480px]">
                <p className="text-[14px] font-light leading-7 text-[#68645f] sm:text-[15px] sm:leading-8">
                  以清楚的階段、持續的溝通與完整的工程協調，
                  陪伴每個空間從想法逐步成為可以安心使用的日常。
                </p>

                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    "需求透明",
                    "預算同步",
                    "施工協調",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#a4865d]" />

                      <span className="text-[10px] font-light tracking-[0.14em] text-neutral-500">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 流程項目 */}
        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-7
            md:mt-12
            md:grid-cols-2
            md:gap-x-8
            md:gap-y-12
            lg:grid-cols-3
            lg:gap-x-10
            xl:gap-x-14
          "
        >
          {steps.map((step, index) => (
            <Reveal
              key={step.no}
              delay={index * 0.07}
            >
              <article
                className="
                  group
                  relative
                  grid
                  grid-cols-[42px_1fr]
                  gap-4
                  border-l
                  border-[#d6d0c7]
                  pl-5
                  md:block
                  md:border-l-0
                  md:border-t
                  md:pl-0
                  md:pt-7
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

                {/* 編號 */}
                <div className="relative z-10 md:flex md:items-center md:justify-between">
                  <p
                    className="
                      text-[20px]
                      font-extralight
                      leading-none
                      tracking-[0.05em]
                      text-[#b6925d]
                      transition-transform
                      duration-500
                      group-hover:-translate-y-1
                      md:text-[24px]
                    "
                  >
                    {step.no}
                  </p>

                  <p className="hidden text-[8px] uppercase tracking-[0.24em] text-neutral-400 lg:block">
                    Step {step.no}
                  </p>
                </div>

                <div className="min-w-0">
                  {/* 線性圖示 */}
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      text-[#a4865d]
                      transition-colors
                      duration-500
                      group-hover:bg-[#f0ece4]
                      md:mt-8
                      md:h-16
                      md:w-16
                    "
                  >
                    <ProcessIcon type={step.icon} />
                  </div>

                  {/* 中英文標題 */}
                  <div className="relative mt-5 grid min-h-8 cursor-default">
                    <h3
                      className="
                        col-start-1
                        row-start-1
                        text-[20px]
                        font-light
                        leading-8
                        tracking-[-0.02em]
                        text-[#2f2e2b]
                        opacity-100
                        transition-all
                        duration-500
                        lg:group-hover:-translate-y-1
                        lg:group-hover:opacity-0
                        xl:text-[22px]
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
                        text-[17px]
                        font-light
                        leading-8
                        tracking-[-0.01em]
                        text-[#9a7b54]
                        opacity-0
                        transition-all
                        duration-500
                        lg:group-hover:translate-y-0
                        lg:group-hover:opacity-100
                        xl:text-[19px]
                      "
                    >
                      {step.en}
                    </h3>
                  </div>

                  {/* 中英文說明 */}
                  <div className="relative mt-3 grid min-h-[84px] cursor-default">
                    <p
                      className="
                        col-start-1
                        row-start-1
                        text-[14px]
                        font-light
                        leading-7
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
                        text-[13px]
                        font-light
                        leading-7
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

        {/* 信任說明 */}
        <Reveal delay={0.18}>
          <div
            className="
              mt-14
              grid
              gap-7
              border-y
              border-[#d7d2ca]
              py-7
              sm:mt-16
              sm:grid-cols-12
              sm:items-center
              sm:py-8
              lg:mt-20
            "
          >
            <div className="sm:col-span-3">
              <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-[#9a7d56]">
                Clear Collaboration
              </p>

              <p className="mt-2 text-[15px] font-light tracking-[0.08em] text-[#34322f]">
                清楚合作，安心推進
              </p>
            </div>

            <div className="sm:col-span-7">
              <p className="max-w-[760px] text-[13px] font-light leading-7 text-neutral-600 sm:text-[14px]">
                每個階段都會確認重要內容與下一步，
                讓屋主了解目前進度、需要做出的選擇，以及設計如何逐步落實。
              </p>
            </div>

            <div className="sm:col-span-2 sm:text-right">
              <a
                href="#contact"
                className="
                  group/contact
                  inline-flex
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
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}