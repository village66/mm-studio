import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/design/SectionTitle";

const services = [
  {
    number: "01",
    en: "Residential Design",
    zh: "住宅空間設計",
    image: "/images/services/service01.jpg",
    enDescription:
      "Thoughtfully designed homes balancing natural materials, proportion and timeless aesthetics.",
    zhDescription:
      "依據生活方式規劃住宅空間，透過自然材質、光線與比例，打造舒適且歷久彌新的居住環境。",
  },
  {
    number: "02",
    en: "Commercial Design",
    zh: "商業空間設計",
    image: "/images/services/service02.jpg",
    enDescription:
      "Boutique commercial environments crafted to strengthen brand identity and customer experience.",
    zhDescription:
      "整合品牌定位、空間策略與動線規劃，塑造兼具辨識度與使用體驗的商業空間。",
  },
  {
    number: "03",
    en: "Renovation",
    zh: "老屋翻新工程",
    image: "/images/services/service03.jpg",
    enDescription:
      "Transforming existing spaces through refined detailing, spatial planning and premium materials.",
    zhDescription:
      "重新梳理格局、機能與工程細節，改善老屋條件，讓既有空間展現新的生活價值。",
  },
];

export default function Services() {
  return (
    <Section
      id="services"
      className="scroll-mt-[92px] bg-[#f8f8f5]"
    >
      <Container>
        {/* Section Heading */}
        <Reveal>
          <SectionTitle
            eyebrow="OUR SERVICES"
            title="專業設計服務"
          />
        </Reveal>

        {/* Services */}
        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <Reveal
              key={service.number}
              delay={index * 0.08}
            >
              <article
                className="group"
                tabIndex={0}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] max-h-[280px] w-full overflow-hidden rounded-sm bg-[#ebe8e1] xl:max-h-[340px]">
                  <Image
                    src={service.image}
                    alt={`${service.zh}｜MM Studio`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      lg:group-hover:scale-105
                      lg:group-focus:scale-105
                    "
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div
                  className="
                    mt-5
                    border-t
                    border-neutral-200
                    pt-4
                    transition-colors
                    duration-500
                    lg:group-hover:border-[#b6925d]
                    lg:group-focus:border-[#b6925d]
                  "
                >
                  <p className="text-[40px] font-extralight leading-none text-[#c8a06b] lg:text-[46px]">
                    {service.number}
                  </p>

                  {/* Title: Chinese first, English on desktop hover */}
                  <div className="mt-3 h-10 overflow-hidden">
                    <div
                      className="
                        transition-transform
                        duration-500
                        ease-out
                        lg:group-hover:-translate-y-10
                        lg:group-focus:-translate-y-10
                      "
                    >
                      <h3 className="h-10 text-[22px] font-light leading-10 tracking-[-0.02em] text-neutral-900 lg:text-[24px]">
                        {service.zh}
                      </h3>

                      <h3 className="h-10 whitespace-nowrap text-[20px] font-light leading-10 tracking-[-0.015em] text-[#9a7b54] lg:text-[22px]">
                        {service.en}
                      </h3>
                    </div>
                  </div>

                  {/* Description: Chinese first, English on desktop hover */}
                  <div className="mt-3 h-[96px] overflow-hidden">
                    <div
                      className="
                        transition-transform
                        duration-500
                        ease-out
                        lg:group-hover:-translate-y-[96px]
                        lg:group-focus:-translate-y-[96px]
                      "
                    >
                      <p className="h-[96px] text-[14px] font-light leading-7 text-neutral-600 lg:text-[15px] lg:leading-8">
                        {service.zhDescription}
                      </p>

                      <p className="h-[96px] text-[14px] font-light leading-7 text-[#8a7356] lg:text-[15px] lg:leading-8">
                        {service.enDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}