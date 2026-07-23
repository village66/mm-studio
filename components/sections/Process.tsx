import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/design/SectionTitle";

const steps = [
  {
    no: "01",
    en: "Consultation",
    zh: "設計諮詢",
    image: "/images/process/process01.jpg",
    enDescription:
      "Understanding your vision, lifestyle and project goals through detailed consultation.",
    zhDescription:
      "深入了解您的需求、生活方式與預算，建立完整的設計方向。",
  },
  {
    no: "02",
    en: "Concept Design",
    zh: "概念設計",
    image: "/images/process/process02.jpg",
    enDescription:
      "Developing layouts, materials and lighting into a complete design proposal.",
    zhDescription:
      "完成平面配置、材質、燈光與整體風格，形成完整設計提案。",
  },
  {
    no: "03",
    en: "Construction",
    zh: "工程執行",
    image: "/images/process/process03.jpg",
    enDescription:
      "Managing execution and every construction detail to ensure exceptional quality.",
    zhDescription:
      "全程監工與工程整合，確保施工品質與設計細節完美落實。",
  },
];

export default function Process() {
  return (
    <Section
      id="process"
      className="bg-white"
    >
      <Container>

        <Reveal>
          <SectionTitle
            eyebrow="OUR PROCESS"
            title="From Vision to Reality"
          />
        </Reveal>

        <div className="mt-8 lg:mt-12 space-y-12 lg:space-y-16">

          {steps.map((step, index) => (

            <Reveal
              key={step.no}
              delay={index * 0.08}
            >

              <div
                className={`grid items-center gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-2 ${
                  index % 2 === 1
                    ? "lg:[&>*:first-child]:order-2"
                    : ""
                }`}
              >

                {/* Image */}

                <div className="relative aspect-[4/3] max-h-[300px] lg:max-h-[360px] w-full overflow-hidden rounded-sm">

                  <Image
                    src={step.image}
                    alt={step.en}
                    fill
                    sizes="(max-width:1024px)100vw,50vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />

                </div>

                {/* Content */}

                <div className="group">

                  <p className="text-[52px] lg:text-[60px] font-extralight leading-none text-[#c8a06b]">
                    {step.no}
                  </p>

                  <div className="mt-3 lg:mt-4 h-12 overflow-hidden">

                    <div className="transition-transform duration-300 group-hover:-translate-y-12">

                      <h3 className="h-12 text-[30px] lg:text-[36px] font-light leading-[48px] text-neutral-900">
                        {step.en}
                      </h3>

                      <h3 className="h-12 text-[26px] lg:text-[32px] font-light leading-[48px] text-[#b6925d]">
                        {step.zh}
                      </h3>

                    </div>

                  </div>

                  <div className="mt-4 lg:mt-6 h-[80px] lg:h-[90px] overflow-hidden">

                    <div className="transition-transform duration-300 group-hover:-translate-y-[80px] lg:group-hover:-translate-y-[90px]">

                      <p className="h-[80px] lg:h-[90px] max-w-lg text-sm lg:text-base leading-7 lg:leading-8 text-neutral-600">
                        {step.enDescription}
                      </p>

                      <p className="h-[80px] lg:h-[90px] max-w-lg text-sm lg:text-base leading-7 lg:leading-8 text-[#8a7356]">
                        {step.zhDescription}
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 lg:mt-8 h-px w-20 bg-[#c8a06b]" />

                </div>

              </div>

            </Reveal>

          ))}

        </div>

      </Container>
    </Section>
  );
}