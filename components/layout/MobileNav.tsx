"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { navigation } from "@/constants/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Toggle */}

      <button
        type="button"
        aria-label="Open Menu"
        onClick={() => setOpen(!open)}
        className="relative z-[60] flex h-11 w-11 items-center justify-center lg:hidden"
      >
        <div className="relative h-5 w-6">

          <span
            className={`absolute left-0 top-0 h-px w-6 bg-[#181818] transition-all duration-300 ${
              open ? "top-2 rotate-45" : ""
            }`}
          />

          <span
            className={`absolute left-0 top-2 h-px w-6 bg-[#181818] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />

          <span
            className={`absolute left-0 top-4 h-px w-6 bg-[#181818] transition-all duration-300 ${
              open ? "top-2 -rotate-45" : ""
            }`}
          />

        </div>
      </button>

      {/* Overlay */}

      <div
        className={`fixed inset-0 z-50 bg-[#f8f8f5] transition-all duration-500 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >

        <div className="flex h-full flex-col justify-center px-10">

          <nav className="space-y-8">

            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-neutral-200 pb-5"
              >

                <span className="text-[34px] font-extralight tracking-tight transition group-hover:text-[#b6925d]">
                  {item.name}
                </span>

                <span className="text-neutral-400 transition group-hover:translate-x-1 group-hover:text-[#b6925d]">
                  →
                </span>

              </Link>
            ))}

          </nav>

          <div className="mt-20 border-t border-neutral-200 pt-8">

            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
              Contact
            </p>

            <a
              href="mailto:hello@mmstudio.tw"
              className="mt-5 block text-lg font-light"
            >
              hello@mmstudio.tw
            </a>

            <a
              href="tel:+886912345678"
              className="mt-3 block text-lg font-light"
            >
              +886 912 345 678
            </a>

            <button
              type="button"
              className="mt-10 text-[11px] uppercase tracking-[0.35em] text-neutral-500 transition hover:text-[#b6925d]"
            >
              繁｜EN
            </button>

          </div>

        </div>

      </div>
    </>
  );
}