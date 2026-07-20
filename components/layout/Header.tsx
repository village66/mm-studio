"use client";

import { useEffect, useState } from "react";

import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

import { useMusic } from "@/components/audio/BackgroundMusic";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  const { playing, toggle } = useMusic();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-[120]
        transition-all
        duration-500
        ${
          scrolled
            ? "bg-[#f8f8f5]/92 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,.06)]"
            : "bg-transparent"
        }
      `}
    >
      <div className="mx-auto w-full max-w-[1800px] px-6 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24">

        <div
          className={`
            flex
            items-center
            justify-between
            border-b
            border-black/10
            transition-all
            duration-500
            ${scrolled ? "h-[78px]" : "h-[96px]"}
          `}
        >
          <Logo />

          <div className="hidden lg:flex items-center gap-10">

            <DesktopNav />

            <button
              type="button"
              onClick={toggle}
              aria-label="Background Music"
              className="
                flex
                items-center
                gap-3
                text-[11px]
                uppercase
                tracking-[0.32em]
                transition-all
                duration-300
                hover:text-[#b6925d]
              "
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-all duration-500 ${
                  playing
                    ? "text-[#b6925d] animate-pulse"
                    : "text-neutral-400"
                }`}
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />

                {playing ? (
                  <>
                    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                  </>
                ) : (
                  <>
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </>
                )}
              </svg>

              <span>
                {playing ? "Sound On" : "Sound Off"}
              </span>
            </button>

          </div>

          <div className="lg:hidden">
            <MobileNav />
          </div>

        </div>

      </div>
    </header>
  );
}