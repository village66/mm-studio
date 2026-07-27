"use client";

import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const process = [
  {
    number: "01",
    title: "理解生活與需求",
    text: "了解生活方式與空間期待，建立真正適合屋主的設計方向。",
  },
  {
    number: "02",
    title: "整合格局與機能",
    text: "兼顧動線、採光與收納，讓美感自然融入日常使用。",
  },
  {
    number: "03",
    title: "掌握材質與施工",
    text: "嚴選合適材質並落實施工細節，降低設計與現場落差。",
  },
  {
    number: "04",
    title: "持續溝通與陪伴",
    text: "清楚說明每個階段與重要決定，陪伴屋主安心完成理想的家。",
  },
];

export default function About() {
  return (
    <Section
      id="about"
      className="overflow-x-clip bg-[#faf9f6] py-20 sm:py-24 lg:flex lg:min-h-[calc(100svh-96px)] lg:items-center lg:py-10 xl:py-12"
    >
      <Container>
        <Reveal>
          <div className="overflow-hidden border border-[#e4e0d8] bg-[#fdfcf9]">
            <div className="grid lg:grid-cols-[56%_44%]">
              {/* Left */}
              <div className="flex flex-col border-[#e4e0d8] lg:border-r">
                {/* Image */}
                <div className="relative overflow-hidden bg-[#e9e6df]">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]">
                    <Image
                      src="/images/about/about.jpg"
                      alt="MM Studio 室內設計作品與空間細節"
                      fill
                      priority={false}
                      sizes="(max-width: 1024px) 100vw, 56vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 lg:bottom-8 lg:left-8">
                      <div className="flex items-center gap-4">
                        <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white sm:text-[10px]">
                          Thoughtful Space
                        </p>

                        <span className="h-px w-10 bg-white/70 sm:w-16" />
                      </div>

                      <p className="mt-3 text-[13px] font-light tracking-[0.08em] text-white/90 sm:text-[14px]">
                        每一個細節，都是為了讓生活更好。
                      </p>
                    </div>
                  </div>
                </div>

                {/* About Content */}
                <div className="relative flex flex-1 flex-col justify-between px-6 py-10 sm:px-9 sm:py-12 lg:min-h-[300px] lg:px-10 lg:py-10 xl:min-h-[320px] xl:px-12 xl:py-12">
                  {/* Decorative drawing */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 right-0 hidden h-[82%] w-[43%] opacity-[0.055] lg:block"
                  >
                    <svg
                      viewBox="0 0 480 360"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
                    >
                      <path
                        d="M28 250L210 146L452 236M210 146V322M452 236V342M28 250V328M74 270L236 184L408 250M128 300V242M278 330V218M350 325V237M165 267H347M165 267V329M347 267V329M165 329H347"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <path
                        d="M116 207L210 154L316 205M245 188L245 118M258 118H232M346 219V128M360 128H332"
                        stroke="currentColor"
                        strokeWidth="0.8"
                      />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-[#9a7d56] sm:text-[11px]">
                      About MM Studio
                    </p>

                    <h2 className="mt-5 max-w-[720px] text-[32px] font-extralight leading-[1.35] tracking-[-0.03em] text-[#292929] sm:text-[39px] md:text-[44px] lg:text-[38px] xl:text-[46px]">
                      我們相信，
                      <br />
                      好的設計來自理解生活。
                    </h2>

                    <div className="mt-7 h-px w-full max-w-[520px] bg-[#dcd7ce]" />

                    <div className="mt-7 max-w-[610px] space-y-2 text-[15px] font-light leading-[1.9] text-[#625f59] sm:text-[16px] lg:text-[15px] xl:text-[16px]">
                      <p>我們不以風格定義設計，而是從真實需求出發。</p>

                      <p>
                        兼顧美感、動線與機能，讓空間自然融入生活。
                      </p>

                      <p>每一個決定，都是為了讓家更舒適、更長久。</p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-10">
                    <p className="text-[17px] font-light italic tracking-[0.08em] text-[#a28761]">
                      mm studio
                    </p>

                    <span className="hidden h-5 w-px bg-[#d8d2c8] sm:block" />

                    <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 sm:text-[10px]">
                      Boutique Interior Design
                    </p>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col px-6 py-10 sm:px-9 sm:py-12 lg:px-9 lg:py-9 xl:px-12 xl:py-11">
                {/* Process Heading */}
                <div className="shrink-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-[#9a7d56] sm:text-[11px]">
                    Our Approach
                  </p>

                  <h3 className="mt-4 text-[27px] font-extralight leading-[1.4] tracking-[-0.025em] text-[#292929] sm:text-[32px] lg:text-[29px] xl:text-[34px]">
                    清楚的流程，
                    <br className="sm:hidden lg:block xl:hidden" />
                    安心的設計體驗。
                  </h3>
                </div>

                {/* Process List */}
                <div className="mt-7 border-t border-[#ddd8cf] sm:mt-9 lg:mt-7 xl:mt-9">
                  {process.map((item) => (
                    <article
                      key={item.number}
                      className="group grid grid-cols-[44px_1fr] gap-3 border-b border-[#ddd8cf] py-5 sm:grid-cols-[58px_1fr] sm:gap-5 sm:py-6 lg:grid-cols-[50px_1fr] lg:py-5 xl:grid-cols-[62px_1fr] xl:py-6"
                    >
                      <span className="pt-[3px] text-[18px] font-extralight tracking-[0.06em] text-[#ad926d] transition-colors duration-500 group-hover:text-[#755b39] sm:text-[22px] lg:text-[20px] xl:text-[24px]">
                        {item.number}
                      </span>

                      <div>
                        <h4 className="text-[19px] font-light tracking-[-0.015em] text-[#302f2c] transition-transform duration-500 group-hover:translate-x-1 sm:text-[21px] lg:text-[19px] xl:text-[22px]">
                          {item.title}
                        </h4>

                        <p className="mt-2 max-w-[470px] text-[14px] font-light leading-[1.75] text-[#68645f] sm:text-[15px] sm:leading-[1.8] lg:text-[14px] xl:text-[15px]">
                          {item.text}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Trust Statement */}
                <div className="mt-7 bg-[#f2efe8] px-5 py-5 sm:px-7 sm:py-6 lg:mt-6 lg:px-6 lg:py-5 xl:mt-7 xl:px-7 xl:py-6">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-[-2px] shrink-0 font-serif text-[34px] leading-none text-[#aa8d64]"
                    >
                      “
                    </span>

                    <p className="text-[14px] font-light leading-[1.85] text-[#625d56] sm:text-[15px] lg:text-[14px] xl:text-[15px]">
                      我們重視的不只是完工時的畫面，更是入住多年後，
                      空間依然符合生活並值得信任。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}