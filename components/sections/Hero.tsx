"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import LanguageReveal from "@/components/ui/LanguageReveal";

const slides = [
  "/images/hero/hero-home.jpg",
  "/images/hero/hero-home1.jpg",
  "/images/hero/hero-home2.jpg",
  "/images/hero/hero-home3.jpg",
  "/images/hero/hero-home4.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((v) => (v + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f8f8f5] pt-36 lg:pt-44 2xl:pt-52 pb-24 lg:pb-32">
      <Container>

        <div className="grid items-center gap-16 xl:gap-24 2xl:gap-32 lg:grid-cols-12">

          {/* Left */}
          <div className="lg:col-span-5 2xl:pr-12">

            <p className="caption tracking-[0.30em] text-neutral-500">
              MM STUDIO ・ BOUTIQUE INTERIOR DESIGN
            </p>

            {/* Title */}

            <div className="mt-10 max-w-[720px]">

              <LanguageReveal
                className="min-h-[220px]"
                zh={
                  <h1 className="text-[44px] md:text-[58px] xl:text-[72px] 2xl:text-[82px] font-extralight leading-[1.15] tracking-[0.06em] text-[#222222]">
                    打造歷久彌新的空間
                  </h1>
                }
                en={
                  <h1 className="text-[44px] md:text-[58px] xl:text-[72px] 2xl:text-[82px] font-extralight leading-[1.02] tracking-[-0.04em] text-[#b6925d]">
                    Designing
                    <br />
                    Timeless
                    <br />
                    Spaces.
                  </h1>
                }
              />

            </div>

            {/* Description */}

            <div className="mt-10 max-w-[640px]">

              <LanguageReveal
                className="min-h-[140px]"
                zh={
                  <p className="text-[18px] leading-10 text-neutral-600">
                    我們專注於住宅與商業空間設計，
                    <br />
                    透過光線、材質、比例與細節，
                    <br />
                    打造歷久彌新的空間體驗。
                  </p>
                }
                en={
                  <p className="text-[18px] leading-10 text-[#a98b63]">
                    We specialize in residential and commercial interiors,
                    <br />
                    shaping timeless spaces through
                    <br />
                    light, materials, proportion and detail.
                  </p>
                }
              />

            </div>

            {/* Buttons */}

            <div className="mt-14 flex flex-wrap gap-5">

              <Link
                href="#portfolio"
                className="group relative inline-flex h-14 w-[200px] items-center justify-center overflow-hidden rounded-full border border-[#c9b08a] bg-white transition-all duration-500 hover:bg-[#f5f3ee]"
              >
                <span className="absolute text-[13px] tracking-[0.30em] text-neutral-800 transition-opacity duration-500 opacity-100 group-hover:opacity-0">
                  作 品 案 例
                </span>

                <span className="absolute text-[13px] uppercase tracking-[0.25em] text-[#9d8462] transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                  VIEW PROJECTS
                </span>
              </Link>

              <Link
                href="#contact"
                className="inline-flex h-14 items-center text-[13px] tracking-[0.28em] text-neutral-600 transition hover:text-[#b6925d]"
              >
                聯絡我們 →
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="relative lg:col-span-7 2xl:pl-8">

            <div className="relative aspect-[5/6] overflow-hidden rounded-sm">

              {slides.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt="MM Studio"
                  fill
                  priority={index === 0}
                  className={`object-cover transition-opacity duration-1000 ${
                    current === index
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              ))}

            </div>

            {/* Dots */}

            <div className="mt-10 flex gap-4">

              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Slide ${index + 1}`}
                  className={`h-[3px] transition-all duration-300 ${
                    current === index
                      ? "w-10 bg-[#b6925d]"
                      : "w-6 bg-neutral-300 hover:bg-neutral-500"
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