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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((v) => (v + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f8f8f5] pt-40 pb-24">

      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-12">

          {/* Left */}

          <div className="lg:col-span-5">

            <p className="caption tracking-[0.28em] text-neutral-500">
              MM STUDIO ・ BOUTIQUE INTERIOR DESIGN
            </p>

            {/* Hero Title */}

            <div className="group relative mt-8 h-[170px] max-w-[560px]">

              {/* 中文 */}

              <div className="absolute inset-0 flex items-center justify-start transition-opacity duration-700 opacity-100 group-hover:opacity-0">

                <h1 className="text-[42px] md:text-[52px] xl:text-[60px] font-extralight leading-[1.25] tracking-[0.08em] text-[#222222]">
                  打造歷久彌新的空間
                </h1>

              </div>

              {/* English */}

              <div className="absolute inset-0 flex items-center justify-start transition-opacity duration-700 opacity-0 group-hover:opacity-100">

                <h1 className="text-[42px] md:text-[52px] xl:text-[60px] font-extralight leading-[1.08] tracking-[-0.03em] text-[#b6925d]">
                  Designing
                  <br />
                  Timeless
                  <br />
                  Spaces.
                </h1>

              </div>

            </div>

            {/* Description */}

            <div className="group relative mt-8 h-[120px] max-w-[520px]">

              {/* 中文 */}

              <p className="absolute inset-0 text-[18px] leading-10 text-neutral-600 transition-opacity duration-700 opacity-100 group-hover:opacity-0">
                我們專注於住宅與商業空間設計，
                <br />
                透過光線、材質、比例與細節，
                <br />
                打造歷久彌新的空間體驗。
              </p>

              {/* English */}

              <p className="absolute inset-0 text-[18px] leading-10 text-[#a98b63] transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                We specialize in residential and commercial interiors,
                <br />
                shaping timeless spaces through
                <br />
                light, materials, proportion and detail.
              </p>

            </div>

            {/* Buttons */}

            <div className="mt-12 flex flex-wrap gap-5">

              <Link
  href="#portfolio"
  className="group relative inline-flex h-14 w-[190px] items-center justify-center overflow-hidden rounded-full border border-[#c9b08a] bg-white transition-all duration-500 hover:bg-[#f6f4ef]"
>
  <span
    className="absolute transition-opacity duration-500 opacity-100 group-hover:opacity-0 text-[13px] tracking-[0.28em] text-neutral-800"
  >
    作 品 案 例
  </span>

  <span
    className="absolute transition-opacity duration-500 opacity-0 group-hover:opacity-100 text-[13px] uppercase tracking-[0.22em] text-[#9d8462]"
  >
    VIEW PROJECTS
  </span>
</Link>

              <Link
                href="#contact"
                className="inline-flex h-14 items-center text-[13px] tracking-[0.25em] text-[#555] transition hover:text-[#b6925d]"
              >
                聯絡我們 →
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="relative lg:col-span-7">

            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">

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

            <div className="mt-8 flex gap-4">

              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-[3px] transition-all duration-300 ${
                    current === index
                      ? "w-10 bg-[#b6925d]"
                      : "w-6 bg-neutral-300"
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