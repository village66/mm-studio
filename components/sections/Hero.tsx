"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const currentRef = useRef(0);
  const pendingRef = useRef<number | null>(null);
  const loadedSlidesRef = useRef(new Set<number>());
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    section.classList.add("mm-hero-motion-ready");

    return () => section.classList.remove("mm-hero-motion-ready");
  }, []);

  const commitSlide = useCallback((index: number) => {
    if (index === currentRef.current) return;

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    setOutgoing(currentRef.current);
    currentRef.current = index;
    setCurrent(index);
    pendingRef.current = null;
    setPending(null);

    transitionTimerRef.current = setTimeout(() => {
      setOutgoing(null);
    }, 1550);
  }, []);

  const selectSlide = useCallback((index: number) => {
    if (index === currentRef.current || index === pendingRef.current) return;

    if (loadedSlidesRef.current.has(index)) {
      commitSlide(index);
      return;
    }

    pendingRef.current = index;
    setPending(index);
  }, [commitSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      selectSlide((currentRef.current + 1) % slides.length);
    }, 6500);

    return () => {
      clearInterval(timer);

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [selectSlide]);

  const next = (current + 1) % slides.length;
  const renderedSlides = Array.from(
    new Set(
      [current, outgoing, next, pending].filter(
        (index): index is number => index !== null
      )
    )
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full lg:min-h-screen flex flex-col justify-center overflow-hidden bg-[#f8f8f5] pt-[112px] pb-10 lg:pb-16"
    >
      <Container>
        <div className="grid items-center gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-5">
            {/* Eyebrow：中文為主要顯示，電腦版 hover 才切換為英文，中間用細直線分隔 */}
            <div className="mm-hero-intro mm-hero-intro-eyebrow group relative h-5 lg:h-6 cursor-default overflow-hidden">
              <p className="absolute inset-0 flex items-center gap-3 caption text-xs tracking-[0.25em] lg:tracking-[0.3em] uppercase text-neutral-500 font-light transition-opacity duration-700 opacity-100 lg:group-hover:opacity-0">
                <span>台中在地</span>
                <span className="h-3 w-px bg-neutral-300" />
                <span>工厘室內設計</span>
              </p>
              <p className="absolute inset-0 hidden lg:flex items-center gap-3 caption text-xs tracking-[0.3em] uppercase text-[#a38252] font-light transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                <span>Taichung, Taiwan</span>
                <span className="h-3 w-px bg-[#a38252]/40" />
                <span>Interior Design</span>
              </p>
            </div>

            {/* Main Title */}
            <div className="mt-4 lg:mt-6">
              <h1 className="group relative grid cursor-default text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[58px] 2xl:text-[68px] font-extralight leading-[1.25] lg:leading-[1.08] tracking-tight text-[#2c2825]">
                {/* 中文：預設顯示 */}
                <span className="col-start-1 row-start-1 transition-opacity duration-700 opacity-100 lg:group-hover:opacity-0">
                  <span className="mm-hero-title-line mm-hero-title-line-1 inline lg:block">打造 </span>
                  <span className="mm-hero-title-line mm-hero-title-line-2 inline lg:block">屬於你的 </span>
                  <span className="mm-hero-title-line mm-hero-title-line-3 inline lg:block text-[#a38252]">理想空間。</span>
                </span>

                {/* 英文：電腦版 hover 才顯示 */}
                <span className="col-start-1 row-start-1 hidden lg:block transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                  <span className="mm-hero-title-line mm-hero-title-line-1 block">Designing</span>
                  <span className="mm-hero-title-line mm-hero-title-line-2 block">Timeless</span>
                  <span className="mm-hero-title-line mm-hero-title-line-3 block text-[#a38252]">Spaces.</span>
                </span>
              </h1>
            </div>

            {/* Description Paragraph */}
            <div className="mm-hero-intro mm-hero-intro-copy mt-4 lg:mt-6 max-w-xl">
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
            <div className="mm-hero-intro mm-hero-intro-actions mt-6 lg:mt-8 flex flex-wrap items-center gap-4 lg:gap-6">
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
              {renderedSlides.map((index) => {
                const isCurrent = current === index;
                const isOutgoing = outgoing === index;
                const keepImageMotion = isCurrent || isOutgoing;

                return (
                  <div
                    key={slides[index]}
                    aria-hidden={!isCurrent}
                    className={`absolute inset-0 transition-opacity duration-[1500ms] [transition-timing-function:var(--motion-ease-cinematic)] ${
                      isCurrent
                        ? "z-20 opacity-100"
                        : isOutgoing
                          ? "z-10 opacity-100"
                          : "z-0 opacity-0"
                    } ${keepImageMotion && !prefersReducedMotion ? `mm-hero-image-active ${index % 2 === 1 ? "mm-hero-image-active-reverse" : ""}` : ""}`}
                  >
                    <Image
                      src={slides[index]}
                      alt="MM Studio Interior Architecture"
                      fill
                      preload={index === 0}
                      loading={
                        index === 0
                          ? undefined
                          : index === next || index === pending
                            ? "eager"
                            : "lazy"
                      }
                      sizes="(max-width: 1024px) 100vw, 756px"
                      className="object-cover"
                      onLoad={() => {
                        loadedSlidesRef.current.add(index);

                        if (pendingRef.current === index) {
                          commitSlide(index);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Slider Dots Indicator */}
            <div className="mt-4 lg:mt-6 flex items-center justify-start gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectSlide(index)}
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
