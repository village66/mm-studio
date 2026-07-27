import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const services = [
  {
    number: "01",
    en: "Residential Design",
    zh: "住宅空間設計",
    image: "/images/services/service01-v1.jpg",
    enDescription:
      "Thoughtfully designed homes balancing natural materials, proportion and timeless aesthetics.",
    zhDescription:
      "依據生活方式規劃住宅空間，透過自然材質、光線與比例，打造舒適且歷久彌新的居住環境。",
  },
  {
    number: "02",
    en: "Commercial Design",
    zh: "商業空間設計",
    image: "/images/services/service02-v4.jpg",
    enDescription:
      "Boutique commercial environments crafted to strengthen brand identity and customer experience.",
    zhDescription:
      "整合品牌定位、空間策略與動線規劃，塑造兼具辨識度與使用體驗的商業空間。",
  },
  {
    number: "03",
    en: "Renovation",
    zh: "老屋翻新工程",
    image: "/images/services/service03-v1.jpg",
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
      className="
        scroll-mt-[92px]
        bg-[#f8f8f5]
        !py-16
        sm:!py-20
        lg:!py-10
        xl:!py-12
      "
    >
      <Container>
        {/* Compact section heading */}
        <Reveal>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#9a7d56] sm:text-[11px]">
              Our Services
            </p>

            <h2
              className="
                mt-3
                text-[32px]
                font-extralight
                leading-[1.25]
                tracking-[-0.035em]
                text-[#292929]
                sm:text-[38px]
                lg:text-[40px]
                xl:text-[44px]
              "
            >
              專業設計服務
            </h2>
          </div>
        </Reveal>

        {/* Service cards */}
        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:mt-9 lg:grid-cols-3 lg:gap-8 xl:mt-10">
          {services.map((service, index) => (
            <Reveal
              key={service.number}
              delay={index * 0.08}
            >
              <article
                className="group outline-none"
                tabIndex={0}
              >
                {/* Responsive image height */}
                <div
                  className="
                    relative
                    h-[260px]
                    w-full
                    overflow-hidden
                    rounded-sm
                    bg-[#ebe8e1]
                    sm:h-[300px]
                    md:h-[280px]
                    lg:h-[clamp(250px,28vh,310px)]
                  "
                >
                  <Image
                    src={service.image}
                    alt={`${service.zh}｜MM Studio`}
                    fill
                    sizes="
                      (max-width: 768px) 100vw,
                      (max-width: 1024px) 50vw,
                      33vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      lg:group-hover:scale-[1.035]
                      lg:group-focus:scale-[1.035]
                    "
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div
                  className="
                    mt-4
                    border-t
                    border-neutral-200
                    pt-4
                    transition-colors
                    duration-500
                    lg:group-hover:border-[#b6925d]
                    lg:group-focus:border-[#b6925d]
                  "
                >
                  <p
                    className="
                      text-[34px]
                      font-extralight
                      leading-none
                      text-[#c8a06b]
                      lg:text-[38px]
                      xl:text-[40px]
                    "
                  >
                    {service.number}
                  </p>

                  {/* Chinese title → English title */}
                  <div className="mt-2 h-9 overflow-hidden">
                    <div
                      className="
                        transition-transform
                        duration-500
                        ease-out
                        lg:group-hover:-translate-y-9
                        lg:group-focus:-translate-y-9
                      "
                    >
                      <h3 className="h-9 text-[20px] font-light leading-9 tracking-[-0.02em] text-neutral-900 lg:text-[21px]">
                        {service.zh}
                      </h3>

                      <h3 className="h-9 whitespace-nowrap text-[19px] font-light leading-9 tracking-[-0.015em] text-[#9a7b54] lg:text-[20px]">
                        {service.en}
                      </h3>
                    </div>
                  </div>

                  {/* Chinese description → English description */}
                  <div className="mt-2 h-[80px] overflow-hidden">
                    <div
                      className="
                        transition-transform
                        duration-500
                        ease-out
                        lg:group-hover:-translate-y-[80px]
                        lg:group-focus:-translate-y-[80px]
                      "
                    >
                      <p className="h-[80px] text-[13px] font-light leading-[1.75] text-neutral-600 xl:text-[14px]">
                        {service.zhDescription}
                      </p>

                      <p className="h-[80px] text-[13px] font-light leading-[1.75] text-[#8a7356] xl:text-[14px]">
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