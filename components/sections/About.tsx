import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

export default function About() {
  return (
    <Section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center bg-white py-20 lg:py-32"
    >
      <Container>
        <div className="grid items-center gap-12 lg:gap-16 xl:gap-24 lg:grid-cols-12">
          
          {/* 左側：滿版與防裁切圖片 */}
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-sm">
                <Image
                  src="/images/about/about.jpg"
                  alt="MM Studio Interior Architecture"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition duration-1000 ease-out hover:scale-105"
                />
              </div>
            </Reveal>
          </div>

          {/* 右側：內文區塊 (解決文字重疊與響應式排版) */}
          <div className="lg:col-span-6 xl:col-span-7">
            <Reveal delay={0.1}>
              <div className="flex flex-col justify-center">
                
                {/* 頂部標籤與中英懸停切換 */}
                <div className="group inline-flex items-center space-x-2 cursor-default">
                  <p className="text-xs uppercase tracking-[0.35em] text-neutral-400 font-light transition-colors duration-300 group-hover:text-[#a38252]">
                    ABOUT
                  </p>
                  <span className="text-xs text-neutral-300">/</span>
                  <p className="text-xs tracking-[0.2em] text-neutral-500 font-light transition-colors duration-300 group-hover:text-[#a38252]">
                    關於我們
                  </p>
                </div>

                {/* 主標題 (流暢自適應，不使用硬性固定高度) */}
                <div className="mt-6 sm:mt-8">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight leading-[1.15] tracking-tight text-[#2c2825]">
                    打造歷久彌新的空間美學
                  </h2>
                  <p className="mt-2 text-sm sm:text-base tracking-[0.15em] font-extralight text-[#a38252] uppercase">
                    Timeless Simplicity
                  </p>
                </div>

                {/* 第一段落 */}
                <div className="mt-6 sm:mt-8 space-y-4 max-w-2xl">
                  <p className="text-base sm:text-lg leading-relaxed text-neutral-600 font-light">
                    我們專注於住宅與商業空間設計，透過自然材質、光線、比例與細節，創造兼具機能與美感的空間體驗。
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-neutral-400 font-light">
                    We create residential and commercial interiors through natural materials, light, proportion, and refined craftsmanship.
                  </p>
                </div>

                {/* 第二段落 */}
                <div className="mt-6 space-y-4 max-w-2xl">
                  <p className="text-base sm:text-lg leading-relaxed text-neutral-600 font-light">
                    我們相信設計不只是風格，更是生活方式與品牌價值的延伸，每一件作品都值得被細細雕琢。
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-neutral-400 font-light">
                    We believe great design is more than aesthetics—it reflects lifestyle, identity, and lasting value.
                  </p>
                </div>

                {/* 數據統計區塊 (Statistics Grid) */}
                <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-6 sm:gap-10 border-t border-neutral-100 pt-8 sm:pt-10">
                  <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-[#2c2825]">
                      15+
                    </h3>
                    <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-400 font-light">
                      Years
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-[#2c2825]">
                      120+
                    </h3>
                    <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-400 font-light">
                      Projects
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-[#2c2825]">
                      100%
                    </h3>
                    <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-400 font-light">
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