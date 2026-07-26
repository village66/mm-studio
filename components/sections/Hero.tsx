"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

  useEffect(() => {
    setShowText(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((v) => (v + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full lg:min-h-screen flex flex-col justify-center overflow-hidden bg-[#f8f8f5] pt-[112px] pb-10 lg:pb-16">
      <Container>
        <div className="grid items-center gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-5">
            {/* Eyebrow：中文為主要顯示，電腦版 hover 才切換為英文，中間用細直線分隔 */}
            <div className="group relative h-5 lg:h-6 cursor-default overflow-hidden">
              <p className="absolute inset-0 flex items-center gap-3 caption text-xs tracking-[0.25em] lg:tracking-[0.3em] uppercase text-neutral-500 font-light transition-opacity duration-700 opacity-100 lg:group-hover:opacity-0">
                <span>台中在地</span>
                <span className="h-3 w-px bg-neutral-300" />
                <span>精品室內設計工作室</span>
              </p>
              <p className="absolute inset-0 hidden lg:flex items-center gap-3 caption text-xs tracking-[0.3em] uppercase text-[#a38252] font-light transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                <span>Taichung, Taiwan</span>
                <span className="h-3 w-px bg-[#a38252]/40" />
                <span>Boutique Interior Design</span>
              </p>
            </div>

            {/* Main Title */}
            <div
              className={`mt-4 lg:mt-6 transition-all duration-1000 ${
                showText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h1 className="group relative grid cursor-default text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[58px] 2xl:text-[68px] font-extralight leading-[1.25] lg:leading-[1.08] tracking-tight text-[#2c2825]">
                {/* 中文：預設顯示 */}
                <span className="col-start-1 row-start-1 transition-opacity duration-700 opacity-100 lg:group-hover:opacity-0">
                  <span className="inline lg:block">打造 </span>
                  <span className="inline lg:block">屬於你的 </span>
                  <span className="inline lg:block text-[#a38252]">理想空間。</span>
                </span>

                {/* 英文：電腦版 hover 才顯示 */}
                <span className="col-start-1 row-start-1 hidden lg:block transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                  Designing
                  <span className="block">Timeless</span>
                  <span className="block text-[#a38252]">Spaces.</span>
                </span>
              </h1>
            </div>

            {/* Description Paragraph */}
            <div
              className={`mt-4 lg:mt-6 max-w-xl transition-all duration-1000 delay-300 ${
                showText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="group relative grid cursor-default text-sm sm:text-base lg:text-[15px] xl:text-base leading-relaxed text-neutral-600 font-light">
                {/* 中文：預設顯示 */}
                <span className="col-start-1 row-start-1 transition-opacity duration-700 opacity-100 lg:group-hover:opacity-0">
                  我們專注於住宅與商業空間設計，透過光線、材質、比例與細節，打造歷久彌新的空間體驗。
                </span>

                {/* 英文：電腦版 hover 才顯示 */}
                <span className="col-start-1 row-start-1 hidden lg:block transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                  We specialize in residential and commercial interiors, shaping timeless spaces through light, materials, proportion, and detail.
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className={`mt-6 lg:mt-8 flex flex-wrap items-center gap-4 lg:gap-6 transition-all duration-1000 delay-500 ${
                showText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="#portfolio"
                className="group relative inline-flex h-11 lg:h-12 w-[160px] lg:w-[180px] items-center justify-center overflow-hidden rounded-full border border-[#b6925d]/40 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:border-[#b6925d] hover:bg-white shadow-sm"
              >
                <span className="absolute text-xs tracking-[0.25em] text-neutral-800 transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
                  作 品 案 例
                </span>

                <span className="absolute text-xs uppercase tracking-[0.2em] text-[#a38252] transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  VIEW PROJECTS
                </span>
              </Link>

              <Link
                href="#contact"
                className="inline-flex h-11 lg:h-12 items-center text-xs tracking-[0.25em] text-neutral-600 transition duration-300 hover:text-[#a38252] hover:translate-x-1"
              >
                聯絡我們 <span className="ml-2 font-serif">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Slider */}
          <div className="relative lg:col-span-7">
            {/* 動態調整圖片比例，防止把頁面撐爆 */}
            <div className="relative aspect-[4/3] lg:aspect-[16/11] xl:aspect-[4/3] max-h-[520px] w-full overflow-hidden rounded-sm bg-neutral-200 shadow-sm">
              {slides.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt="MM Studio Interior Architecture"
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 756px"
                  className={`object-cover transition-all duration-1000 ease-out ${
                    current === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                />
              ))}
            </div>

            {/* Slider Dots Indicator */}
            <div className="mt-4 lg:mt-6 flex items-center justify-start gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Slide ${index + 1}`}
                  className={`h-[2px] transition-all duration-500 ease-out ${
                    current === index
                      ? "w-10 bg-[#a38252]"
                      : "w-5 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}