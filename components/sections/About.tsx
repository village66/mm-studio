import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

export default function About() {
  return (
    <Section
      id="about"
      className="bg-white py-28 lg:py-36"
    >
      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Image */}

          <Reveal>

            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">

              <Image
                src="/images/about/about.jpg"
                alt="MM Studio"
                fill
                sizes="(max-width:1024px)100vw,50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />

            </div>

          </Reveal>

          {/* Content */}

          <Reveal delay={0.1}>

            <div>

              <div className="group inline-block h-5 overflow-hidden">

                <div className="transition-transform duration-300 group-hover:-translate-y-5">

                  <p className="h-5 text-[11px] uppercase tracking-[0.35em] text-neutral-500">
                    ABOUT
                  </p>

                  <p className="h-5 text-[11px] tracking-[0.2em] text-[#b6925d]">
                    關於我們
                  </p>

                </div>

              </div>

              <div className="group">

  {/* 大標題 */}

  <div className="relative h-[180px]">

    {/* 中文 */}

    <div className="absolute inset-0 flex items-center transition-opacity duration-700 opacity-100 group-hover:opacity-0">

      <h2 className="max-w-[520px] text-[44px] md:text-[52px] font-extralight leading-[1.18] tracking-[0.06em] text-[#b6925d]">
        打造
        <br />
        歷久彌新的
        <br />
        空間美學
      </h2>

    </div>

    {/* English */}

    <div className="absolute inset-0 flex items-center transition-opacity duration-700 opacity-0 group-hover:opacity-100">

      <h2 className="max-w-[520px] text-[44px] md:text-[52px] font-extralight leading-[1.08] tracking-[-0.03em] text-[#222]">
        Timeless
        <br />
        Simplicity
      </h2>

    </div>

  </div>



  {/* 第一段 */}

  <div className="relative mt-10 h-[92px]">

    <p className="absolute inset-0 text-[18px] leading-9 text-neutral-600 transition-opacity duration-700 opacity-100 group-hover:opacity-0">
      我們專注於住宅與商業空間設計，
      <br />
      透過自然材質、光線、比例與細節，
      <br />
      創造兼具機能與美感的空間體驗。
    </p>

    <p className="absolute inset-0 text-[18px] leading-9 text-[#9d8462] transition-opacity duration-700 opacity-0 group-hover:opacity-100">
      We create residential and commercial interiors
      <br />
      through natural materials, light,
      <br />
      proportion and refined craftsmanship.
    </p>

  </div>



  {/* 第二段 */}

  <div className="relative mt-8 h-[80px]">

    <p className="absolute inset-0 text-[18px] leading-9 text-neutral-600 transition-opacity duration-700 opacity-100 group-hover:opacity-0">
      我們相信設計不只是風格，
      更是生活方式與品牌價值的延伸，
      每一件作品都值得被細細雕琢。
    </p>

    <p className="absolute inset-0 text-[18px] leading-9 text-[#9d8462] transition-opacity duration-700 opacity-0 group-hover:opacity-100">
      We believe great design is more than aesthetics—
      it reflects lifestyle, identity
      and lasting value.
    </p>

  </div>

</div>

              {/* Statistics */}

              <div className="mt-16 grid grid-cols-3 gap-10 border-t border-neutral-200 pt-10">

                <div>

                  <h3 className="text-[42px] font-extralight text-neutral-900">
                    15+
                  </h3>

                  <p className="mt-2 text-[12px] uppercase tracking-[0.25em] text-neutral-500">
                    Years
                  </p>

                </div>

                <div>

                  <h3 className="text-[42px] font-extralight text-neutral-900">
                    120+
                  </h3>

                  <p className="mt-2 text-[12px] uppercase tracking-[0.25em] text-neutral-500">
                    Projects
                  </p>

                </div>

                <div>

                  <h3 className="text-[42px] font-extralight text-neutral-900">
                    100%
                  </h3>

                  <p className="mt-2 text-[12px] uppercase tracking-[0.25em] text-neutral-500">
                    Custom
                  </p>

                </div>

              </div>

            </div>

          </Reveal>

        </div>

      </Container>
    </Section>
  );
}