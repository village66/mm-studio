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
      "依據生活方式打造住宅空間，透過自然材質、光線與比例，創造歷久彌新的居住環境。",
  },
  {
    number: "02",
    en: "Commercial Design",
    zh: "商業空間設計",
    image: "/images/services/service02.jpg",
    enDescription:
      "Boutique commercial environments crafted to strengthen brand identity and customer experience.",
    zhDescription:
      "結合品牌定位、空間策略與動線規劃，塑造具有辨識度的商業空間體驗。",
  },
  {
    number: "03",
    en: "Renovation",
    zh: "老屋翻新工程",
    image: "/images/services/service03.jpg",
    enDescription:
      "Transforming existing spaces through refined detailing, spatial planning and premium materials.",
    zhDescription:
      "透過空間重整、細部設計與高品質施工，讓舊有空間重新展現新的生命力。",
  },
];

export default function Services() {
  return (
    <Section
      id="services"
      className="bg-[#f8f8f5]"
    >
      <Container>

        <Reveal>
          <SectionTitle
            eyebrow="OUR SERVICES"
            title="Design Expertise"
          />
        </Reveal>

        <div className="mt-8 lg:mt-12 grid gap-8 lg:grid-cols-3">

          {services.map((service, index) => (

            <Reveal
              key={service.number}
              delay={index * 0.08}
            >

              <article className="group">

                {/* Image (限制最大高度防止下方文字被擠出畫面) */}

                <div className="relative aspect-[4/5] max-h-[280px] xl:max-h-[340px] w-full overflow-hidden rounded-sm">

                  <Image
                    src={service.image}
                    alt={service.en}
                    fill
                    sizes="(max-width:1024px)100vw,33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                </div>

                {/* Content */}

                <div className="mt-5 border-t border-neutral-200 pt-4 transition-all duration-300 group-hover:border-[#b6925d]">

                  <p className="text-[40px] lg:text-[46px] font-extralight leading-none text-[#c8a06b]">
                    {service.number}
                  </p>

                  {/* Title */}

                  <div className="mt-3 h-10 overflow-hidden">

                    <div className="transition-transform duration-300 ease-out group-hover:-translate-y-10">

                      <h3 className="h-10 text-[24px] lg:text-[26px] font-light leading-10 text-neutral-900">
                        {service.en}
                      </h3>

                      <h3 className="h-10 text-[22px] lg:text-[24px] font-light leading-10 text-[#b6925d]">
                        {service.zh}
                      </h3>

                    </div>

                  </div>

                  {/* Description */}

                  <div className="mt-3 h-[96px] overflow-hidden">

                    <div className="transition-transform duration-300 ease-out group-hover:-translate-y-[96px]">

                      <p className="h-[96px] text-sm lg:text-base leading-7 lg:leading-8 text-neutral-600">
                        {service.enDescription}
                      </p>

                      <p className="h-[96px] text-sm lg:text-base leading-7 lg:leading-8 text-[#8a7356]">
                        {service.zhDescription}
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