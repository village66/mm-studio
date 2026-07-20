"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

import { navigation } from "@/constants/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* Button */}

      <button
        onClick={() => setOpen(true)}
        className="
          fixed
          top-8
          right-6
          z-[99999]
          flex
          h-10
          w-10
          items-center
          justify-center
          lg:hidden
        "
      >
        <div className="flex flex-col gap-1.5">
          <span className="block h-px w-6 bg-black" />
          <span className="block h-px w-6 bg-black" />
          <span className="block h-px w-6 bg-black" />
        </div>
      </button>

      {createPortal(
        <div
          className={`
            fixed
            inset-0
            z-[999999]
            bg-[#f8f8f5]
            transition-all
            duration-500
            ${
              open
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }
          `}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute right-8 top-8 text-5xl font-light"
          >
            ×
          </button>

          <div className="flex h-full flex-col justify-center px-10">

            <nav className="space-y-8">

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-[34px] font-light tracking-[0.05em]"
                >
                  {item.name}
                </Link>
              ))}

            </nav>

            <div className="mt-20 border-t border-black/10 pt-10">

              <p className="text-[11px] tracking-[0.35em] text-neutral-500">
                MM STUDIO
              </p>

              <p className="mt-6 text-lg">
                hello@mmstudio.tw
              </p>

              <p className="mt-2">
                +886 912 345 678
              </p>

            </div>

          </div>

        </div>,
        document.body
      )}
    </>
  );
}