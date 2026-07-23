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
    <section className="relative overflow-hidden bg-[#f8f8f5] pt-28 sm:pt-36 lg:pt-44 2xl:pt-52 pb-16 sm:pb-24 lg:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:gap-16 xl:gap-24 2xl:gap-32 lg:grid-cols-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-5 2xl:pr-8">
            <p className="caption text-xs sm:text-sm tracking-[0.3em] uppercase text-neutral-500 font-light">
              MM STUDIO ・ BOUTIQUE INTERIOR DESIGN
            </p>

            {/* Main Title */}
            <div
              className={`mt-6 sm:mt-8 transition-all duration-1000 ${
                showText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[60px] xl:text-[72px] 2xl:text-[80px] font-extralight leading-[1.08] tracking-tight text-[#2c2825]">
                Designing
                <span className="block">Timeless</span>
                <span className="block text-[#a38252]">Spaces.</span>
              </h1>
            </div>

            {/* Description Paragraph */}
            <div
              className={`mt-6 sm:mt-8 max-w-xl transition-all duration-1000 delay-300 ${
                showText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-base sm:text-lg leading-relaxed text-neutral-600 font-light">
                We specialize in residential and commercial interiors, shaping timeless spaces through light, materials, proportion, and detail.
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className={`mt-10 sm:mt-12 flex flex-wrap items-center gap-6 transition-all duration-1000 delay-500 ${
                showText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="#portfolio"
                className="group relative inline-flex h-13 sm:h-14 w-[180px] sm:w-[200px] items-center justify-center overflow-hidden rounded-full border border-[#b6925d]/40 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:border-[#b6925d] hover:bg-white shadow-sm"
              >
                <span className="absolute text-xs sm:text-[13px] tracking-[0.25em] text-neutral-800 transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
                  作 品 案 例
                </span>

                <span className="absolute text-xs sm:text-[13px] uppercase tracking-[0.2em] text-[#a38252] transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  VIEW PROJECTS
                </span>
              </Link>

              <Link
                href="#contact"
                className="inline-flex h-13 sm:h-14 items-center text-xs sm:text-[13px] tracking-[0.25em] text-neutral-600 transition duration-300 hover:text-[#a38252] hover:translate-x-1"
              >
                聯絡我們 <span className="ml-2 font-serif">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Slider */}
          <div className="relative lg:col-span-7">
            {/* Image Frame with Aspect Ratio */}
            <div className="relative aspect-[4/3] sm:aspect-[5/6] w-full overflow-hidden rounded-sm bg-neutral-200 shadow-sm">
              {slides.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt="MM Studio Interior Architecture"
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={`object-cover transition-all duration-1000 ease-out ${
                    current === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                />
              ))}
            </div>

            {/* Slider Dots Indicator */}
            <div className="mt-6 sm:mt-8 flex items-center justify-start gap-3">
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