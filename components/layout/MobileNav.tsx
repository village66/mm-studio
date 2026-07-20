"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { navigation } from "@/constants/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="relative z-[110] flex h-11 w-11 items-center justify-center lg:hidden"
      >
        <div className="relative h-5 w-6">

          <span
            className={`absolute left-0 top-0 h-px w-full bg-black transition-all duration-300 ${
              open ? "top-2 rotate-45" : ""
            }`}
          />

          <span
            className={`absolute left-0 top-2 h-px w-full bg-black transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />

          <span
            className={`absolute left-0 top-4 h-px w-full bg-black transition-all duration-300 ${
              open ? "top-2 -rotate-45" : ""
            }`}
          />

        </div>
      </button>

      <aside
        className={`fixed inset-0 z-[100] bg-[#f8f8f5] transition-all duration-500 lg:hidden ${
          open
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto pt-32 pb-12 px-8">

          <nav className="space-y-8">

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-neutral-200 pb-5 text-[34px] font-light tracking-[0.03em] text-[#181818]"
              >
                {item.name}
              </Link>
            ))}

          </nav>

          <div className="mt-auto pt-16">

            <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-400">
              MM STUDIO
            </p>

            <p className="mt-8 text-lg text-[#181818]">
              hello@mmstudio.tw
            </p>

            <p className="mt-3 text-neutral-600">
              +886 912 345 678
            </p>

          </div>

        </div>
      </aside>
    </>
  );
}