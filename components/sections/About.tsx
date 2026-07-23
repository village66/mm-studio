import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

export default function About() {
  return (
    <Section id="about" className="bg-white">
      <Container>
        <div className="grid items-center gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-12">
          
          {/* 左側圖片：限制最大高度防止把整個版面撐開 */}
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] max-h-[500px] lg:max-h-[580px] w-full overflow-hidden rounded-sm mx-auto">
                <Image
                  src="/images/about/about.jpg"
                  alt="MM Studio"
                  fill
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          </div>

          {/* 右側文字內容 (保留動畫) */}
          <div className="lg:col-span-6 xl:col-span-7">
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
                  <div className="relative h-[130px] lg:h-[150px]">
                    <div className="absolute inset-0 flex items-center transition-opacity duration-700 opacity-100 group-hover:opacity-0">
                      <h2 className="max-w-[520px] text-[36px] lg:text-[42px] xl:text-[48px] font-extralight leading-[1.18] tracking-[0.06em] text-[#b6925d]">
                        打造
                        <br />
                        歷久彌新的
                        <br />
                        空間美學
                      </h2>
                    </div>

                    <div className="absolute inset-0 flex items-center transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                      <h2 className="max-w-[520px] text-[36px] lg:text-[42px] xl:text-[48px] font-extralight leading-[1.08] tracking-[-0.03em] text-[#222]">
                        Timeless
                        <br />
                        Simplicity
                      </h2>
                    </div>
                  </div>

                  {/* 第一段 */}
                  <div className="relative mt-6 lg:mt-8 h-[80px]">
                    <p className="absolute inset-0 text-[15px] lg:text-[16px] leading-7 lg:leading-8 text-neutral-600 transition-opacity duration-700 opacity-100 group-hover:opacity-0">
                      我們專注於住宅與商業空間設計，
                      <br />
                      透過自然材質、光線、比例與細節，
                      <br />
                      創造兼具機能與美感的空間體驗。
                    </p>

                    <p className="absolute inset-0 text-[15px] lg:text-[16px] leading-7 lg:leading-8 text-[#9d8462] transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                      We create residential and commercial interiors
                      <br />
                      through natural materials, light,
                      <br />
                      proportion and refined craftsmanship.
                    </p>
                  </div>

                  {/* 第二段 */}
                  <div className="relative mt-4 lg:mt-6 h-[75px]">
                    <p className="absolute inset-0 text-[15px] lg:text-[16px] leading-7 lg:leading-8 text-neutral-600 transition-opacity duration-700 opacity-100 group-hover:opacity-0">
                      我們相信設計不只是風格，
                      <br />
                      更是生活方式與品牌價值的延伸，
                      <br />
                      每一件作品都值得被細細雕琢。
                    </p>

                    <p className="absolute inset-0 text-[15px] lg:text-[16px] leading-7 lg:leading-8 text-[#9d8462] transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                      We believe great design is more than aesthetics—
                      <br />
                      it reflects lifestyle, identity
                      <br />
                      and lasting value.
                    </p>
                  </div>
                </div>

                {/* Statistics */}
                <div className="mt-8 lg:mt-10 grid grid-cols-3 gap-6 border-t border-neutral-200 pt-6">
                  <div>
                    <h3 className="text-[32px] lg:text-[38px] font-extralight text-neutral-900">
                      15+
                    </h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                      Years
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[32px] lg:text-[38px] font-extralight text-neutral-900">
                      120+
                    </h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                      Projects
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[32px] lg:text-[38px] font-extralight text-neutral-900">
                      100%
                    </h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                      Custom
                    </p>
                  </div>
                </div>

              </div>
            </Reveal>
          </div>

        </div>
      </Container>
    </Section>
  );
}