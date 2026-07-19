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
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#f8f8f5]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-8 lg:px-12 xl:px-16">

        <div
          className={`flex items-center justify-between border-b border-black/10 transition-all duration-500 ${
            scrolled ? "h-20" : "h-24"
          }`}
        >
          <Logo />

          <div className="flex items-center gap-8">

            <DesktopNav />

            <button
              type="button"
              onClick={toggle}
              className="
                hidden
                lg:flex
                items-center
                gap-3
                text-[11px]
                uppercase
                tracking-[0.32em]
                text-neutral-500
                transition
                hover:text-[#b6925d]
              "
            >
              <span
                className={`h-2 w-2 rounded-full transition ${
                  playing
                    ? "bg-[#b6925d] shadow-[0_0_12px_#b6925d]"
                    : "bg-neutral-300"
                }`}
              />

              {playing ? "Sound On" : "Sound Off"}
            </button>

          </div>

          <MobileNav />

        </div>

      </div>
    </header>
  );
}