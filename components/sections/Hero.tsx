"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

import Container from "@/components/ui/Container";

const slides = [
  "/images/hero/hero-home.jpg",
  "/images/hero/hero-home1.jpg",
  "/images/hero/hero-home2.jpg",
  "/images/hero/hero-home3.jpg",
  "/images/hero/hero-home4.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [showText, setShowText] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setShowText(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrent((v) => (v + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative flex w-full flex-col justify-center overflow-hidden bg-[#f8f8f5] pb-14 pt-[108px] lg:min-h-screen lg:pb-12 lg:pt-[108px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[82px] h-px bg-black/[0.07]" />
      <Container>
        <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column: Text Content */}
          <div className="relative z-10 min-w-0 lg:col-span-5 lg:pr-3 xl:pr-7">
            {/* Eyebrow */}
            <p className="flex items-center gap-3 text-[12px] font-medium tracking-[0.18em] text-[#78716a] sm:text-[14px]">
              <span>台中在地</span>
              <span aria-hidden="true" className="h-3 w-px bg-[#b9ad9d]" />
              <span>工厘室內設計</span>
            </p>

            <div aria-hidden="true" className="editorial-rule mt-5 w-12 opacity-80 lg:mt-6 lg:w-16" />

            {/* Main Title */}
            <div
              className={`mt-5 transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] lg:mt-6 ${
                showText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h1 className="hero-title text-[clamp(2.75rem,13vw,4.5rem)] font-extralight leading-[1.16] text-[#282522] lg:text-[clamp(3.5rem,5.2vw,5.5rem)]">
                <span className="block whitespace-nowrap">打造屬於你的</span>
                <span className="mt-1 block whitespace-nowrap text-[#9a7b54]">理想空間。</span>
              </h1>
            </div>

            {/* Description Paragraph */}
            <div
              className={`mt-5 max-w-[31rem] transition-all delay-150 duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] lg:mt-7 lg:max-w-[24rem] ${
                showText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-[16px] font-light leading-[1.9] tracking-[0.04em] text-[#65605a] xl:text-[18px]">
                以光線、材質與比例，回應每一種生活尺度。專注住宅與商業空間，讓設計安靜地留在日常裡。
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className={`mt-7 flex flex-wrap items-center gap-7 transition-all delay-300 duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] lg:mt-9 ${
                showText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="#portfolio"
                className="group inline-flex h-12 items-center gap-7 border-b border-[#2f2b27] text-[14px] font-medium uppercase tracking-[0.16em] text-[#2f2b27] transition-colors duration-500 hover:border-[#9a7b54] hover:text-[#9a7b54]"
              >
                作品案例
                <span aria-hidden="true" className="text-sm transition-transform duration-500 group-hover:translate-x-1">↗</span>
              </Link>

              <Link
                href="#contact"
                className="inline-flex h-12 items-center text-[14px] font-medium uppercase tracking-[0.16em] text-[#77716a] transition-colors duration-500 hover:text-[#9a7b54]"
              >
                聯絡我們
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Slider */}
          <div className="relative min-w-0 lg:col-span-7">
            {/* 動態調整圖片比例，防止把頁面撐爆 */}
            <div className="relative aspect-[5/4] w-full overflow-hidden bg-neutral-200 lg:h-[min(70vh,700px)] lg:min-h-[540px] lg:aspect-auto">
              {slides.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt="MM Studio Interior Architecture"
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 756px"
                  className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                    current === index ? "opacity-100 scale-100" : "opacity-0 scale-[1.018]"
                  }`}
                />
              ))}

              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/[0.03]" />

              <p className="absolute bottom-5 left-5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 sm:bottom-7 sm:left-7 sm:text-[11px]">
                MM Studio · Selected Interior
              </p>

            </div>

            {/* Slider control rail */}
            <div className="mt-3 flex min-h-8 items-center justify-between gap-6">
              <div className="flex items-center gap-1" aria-label="Hero slides">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    aria-label={`Slide ${index + 1}`}
                    className="group/slide flex h-8 items-center px-1"
                  >
                    <span
                      className={`block h-px transition-all duration-500 ease-out ${
                        current === index
                          ? "w-10 bg-[#9a7b54]"
                          : "w-5 bg-[#d4cec5] group-hover/slide:bg-[#9e968c]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex shrink-0 items-center gap-3 text-[12px] font-medium tracking-[0.16em] text-[#8c857d]">
                <span className="text-[#9a7b54]">
                  {String(current + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px w-8 bg-[#c8bfb3]" />
                <span>{String(slides.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
