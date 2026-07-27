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
    text: "兼顧動線、採光與收納，讓空間自然融入日常使用。",
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
      className="
        scroll-mt-[92px]
        overflow-hidden
        bg-[#faf9f6]
        py-16
        sm:py-20
        lg:py-8
        xl:py-10
      "
    >
      <Container>
        <Reveal>
          <div className="overflow-hidden border border-[#e2ded6] bg-[#fdfcf9]">
            <div className="grid lg:grid-cols-[57%_43%]">
              {/* Left */}
              <div className="border-[#e2ded6] lg:border-r">
                {/* Image */}
                <div className="relative overflow-hidden bg-[#e9e6df]">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:h-[390px] lg:aspect-auto xl:h-[430px]">
                    <Image
                      src="/images/about/about.jpg"
                      alt="MM Studio 室內設計作品與空間細節"
                      fill
                      sizes="(max-width: 1024px) 100vw, 57vw"
                      className="
                        object-cover
                        transition-transform
                        duration-[1200ms]
                        ease-out
                        hover:scale-[1.02]
                      "
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/[0.03] to-transparent" />

                    <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 lg:bottom-7 lg:left-8">
                      <div className="flex items-center gap-4">
                        <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white sm:text-[10px]">
                          Thoughtful Space
                        </p>

                        <span className="h-px w-10 bg-white/65 sm:w-14" />
                      </div>

                      <p className="mt-2 text-[12px] font-light tracking-[0.06em] text-white/90 sm:text-[13px]">
                        每一個細節，都是為了讓生活更好。
                      </p>
                    </div>
                  </div>
                </div>

                {/* About Text */}
                <div className="relative px-6 py-8 sm:px-9 sm:py-10 lg:min-h-[265px] lg:px-10 lg:py-8 xl:min-h-[285px] xl:px-12 xl:py-9">
                  {/* Decorative drawing */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
                      right-0
                      hidden
                      h-[78%]
                      w-[42%]
                      text-[#8b7558]
                      opacity-[0.045]
                      lg:block
                    "
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

                  <div className="relative z-10 max-w-[700px]">
                    <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-[#9a7d56] sm:text-[11px]">
                      About MM Studio
                    </p>

                    <h2 className="mt-4 text-[30px] font-extralight leading-[1.35] tracking-[-0.03em] text-[#292929] sm:text-[37px] md:text-[42px] lg:text-[35px] xl:text-[41px]">
                      我們相信，
                      <br />
                      好的設計來自理解生活。
                    </h2>

                    <div className="mt-5 h-px w-full max-w-[500px] bg-[#ddd8cf]" />

                    <div className="mt-5 max-w-[610px] space-y-1.5 text-[14px] font-light leading-[1.85] text-[#625f59] sm:text-[15px] lg:text-[14px] xl:text-[15px]">
                      <p>我們不以風格定義設計，而是從真實需求出發。</p>

                      <p>兼顧美感、動線與機能，讓空間自然融入生活。</p>

                      <p>讓每一個家，都能舒適、耐看並長久使用。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col px-6 py-8 sm:px-9 sm:py-10 lg:px-8 lg:py-7 xl:px-10 xl:py-8">
                {/* Heading */}
                <div className="shrink-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#9a7d56] sm:text-[11px]">
                    Our Approach
                  </p>

                  <h3 className="mt-3 text-[25px] font-extralight leading-[1.4] tracking-[-0.025em] text-[#292929] sm:text-[30px] lg:text-[27px] xl:text-[31px]">
                    清楚的流程，安心的設計體驗。
                  </h3>
                </div>

                {/* Process */}
                <div className="mt-5 border-t border-[#ddd8cf] lg:mt-4 xl:mt-5">
                  {process.map((item) => (
                    <article
                      key={item.number}
                      className="
                        group
                        grid
                        grid-cols-[42px_1fr]
                        gap-3
                        border-b
                        border-[#ddd8cf]
                        py-4
                        sm:grid-cols-[54px_1fr]
                        sm:gap-4
                        sm:py-5
                        lg:grid-cols-[46px_1fr]
                        lg:py-[18px]
                        xl:grid-cols-[54px_1fr]
                        xl:py-5
                      "
                    >
                      <span className="pt-[2px] text-[18px] font-extralight tracking-[0.05em] text-[#ad926d] transition-colors duration-500 group-hover:text-[#755b39] sm:text-[21px] lg:text-[19px] xl:text-[22px]">
                        {item.number}
                      </span>

                      <div>
                        <h4 className="text-[18px] font-light tracking-[-0.015em] text-[#302f2c] transition-transform duration-500 group-hover:translate-x-1 sm:text-[20px] lg:text-[18px] xl:text-[20px]">
                          {item.title}
                        </h4>

                        <p className="mt-1.5 max-w-[460px] text-[13px] font-light leading-[1.75] text-[#68645f] sm:text-[14px] sm:leading-[1.8] lg:text-[13px] xl:text-[14px]">
                          {item.text}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Trust Statement */}
                <div className="mt-5 bg-[#f2efe8] px-5 py-4 sm:px-6 sm:py-5 lg:mt-4 lg:px-5 lg:py-4 xl:mt-5 xl:px-6 xl:py-5">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[-2px] shrink-0 font-serif text-[30px] leading-none text-[#aa8d64]"
                    >
                      “
                    </span>

                    <p className="text-[13px] font-light leading-[1.75] text-[#625d56] sm:text-[14px] lg:text-[13px] xl:text-[14px]">
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