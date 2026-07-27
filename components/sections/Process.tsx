import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/design/SectionTitle";

const steps = [
  {
    no: "01",
    zh: "設計諮詢",
    en: "Consultation",
    zhDescription: "深入了解您的需求、生活方式與預算，建立完整的設計方向。",
    enDescription:
      "Understanding your vision, lifestyle and project goals through detailed consultation.",
    image: "/images/process/process01.jpg",
  },
  {
    no: "02",
    zh: "概念設計",
    en: "Concept Design",
    zhDescription: "完成平面配置、材質、燈光與整體風格，形成完整設計提案。",
    enDescription:
      "Developing layouts, materials and lighting into a complete design proposal.",
    image: "/images/process/process02.jpg",
  },
  {
    no: "03",
    zh: "工程執行",
    en: "Construction",
    zhDescription: "全程監工與工程整合，確保施工品質與設計細節完美落實。",
    enDescription:
      "Managing execution and every construction detail to ensure exceptional quality.",
    image: "/images/process/process03.jpg",
  },
  {
    no: "04",
    zh: "完工交付",
    en: "Handover",
    zhDescription: "逐項驗收每個細節，正式將理想空間交付到您手上。",
    enDescription:
      "Final walkthrough and handover of your completed space.",
    image: null,
  },
];

export default function Process() {
  return (
    <Section id="process" className="bg-[#f8f8f5]" fullScreen={false}>
      <Container>

        <Reveal>
          <SectionTitle
            eyebrow="OUR PROCESS"
            title="設計流程"
          />
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => (

            <Reveal
              key={step.no}
              delay={index * 0.08}
            >

              <div className="group">

                {/* Image / 佔位圖示 */}

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-neutral-200 shadow-sm">

                  {step.image ? (
                    <Image
                      src={step.image}
                      alt={step.zh}
                      fill
                      sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#ece7de]">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#b6925d"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 12l2 2 4-4" />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                    </div>
                  )}

                </div>

                {/* Number */}

                <p className="mt-6 text-[32px] font-extralight leading-none text-[#c8a06b]">
                  {step.no}
                </p>

                {/* Title：中文為主，hover 才切換英文 */}

                <div className="relative mt-2 grid cursor-default">

                  <h3 className="col-start-1 row-start-1 text-xl font-light text-neutral-900 transition-opacity duration-500 opacity-100 group-hover:opacity-0">
                    {step.zh}
                  </h3>

                  <h3 className="col-start-1 row-start-1 text-xl font-light text-[#b6925d] transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                    {step.en}
                  </h3>

                </div>

                {/* Description：中文為主，hover 才切換英文 */}

                <div className="relative mt-3 grid cursor-default">

                  <p className="col-start-1 row-start-1 text-sm leading-7 text-neutral-600 font-light transition-opacity duration-500 opacity-100 group-hover:opacity-0">
                    {step.zhDescription}
                  </p>

                  <p className="col-start-1 row-start-1 text-sm leading-7 text-[#8a7356] font-light transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                    {step.enDescription}
                  </p>

                </div>

                <div className="mt-5 h-px w-12 bg-[#c8a06b]" />

              </div>

            </Reveal>

          ))}

        </div>

      </Container>
    </Section>
  );
}