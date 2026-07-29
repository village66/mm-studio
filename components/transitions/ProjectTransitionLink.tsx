"use client";

import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

import BrandLogo from "@/components/brand/BrandLogo";

type ProjectTransitionLinkProps = {
  href: string;
  title: string;
  className?: string;
  children: ReactNode;
};

const TRANSITION_DURATION = 1050;
const REDUCED_MOTION_DURATION = 120;

export default function ProjectTransitionLink({
  href,
  title,
  className = "",
  children,
}: ProjectTransitionLinkProps) {
  const router = useRouter();
  const timerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );
  const [transitioning, setTransitioning] =
    useState(false);

  useEffect(() => {
    router.prefetch(href);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [href, router]);

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (transitioning) {
      return;
    }

    setTransitioning(true);

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    timerRef.current = setTimeout(
      () => router.push(href),
      prefersReducedMotion
        ? REDUCED_MOTION_DURATION
        : TRANSITION_DURATION
    );
  };

  return (
    <>
      <Link
        href={href}
        onClick={handleClick}
        aria-label={`查看作品：${title}`}
        className={className}
      >
        {children}
      </Link>

      {transitioning &&
        createPortal(
          <div
          role="status"
          aria-live="polite"
          aria-label={`正在開啟作品：${title}`}
          className="
            mm-project-transition-overlay
            fixed
            inset-0
            z-[200000]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-[#f3f0e9]
            px-6
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-0
              top-0
              h-px
              bg-[#b6925d]/45
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-1/2
              h-[32vh]
              w-px
              bg-gradient-to-t
              from-[#b6925d]/35
              to-transparent
            "
          />

          <div className="relative flex w-full flex-col items-center text-center">
            <p
              className="
                mm-project-transition-kicker
                text-[9px]
                font-medium
                uppercase
                tracking-[0.42em]
                text-[#8e7654]
                sm:text-[10px]
              "
            >
              Selected Project
            </p>

            <BrandLogo
              variant="footer"
              transitioning
              className="
                mm-project-transition-logo
                mt-4
                h-auto
                w-[min(88vw,620px)]
                text-[#24231f]
                sm:mt-6
              "
            />

            <div className="mt-3 flex items-center gap-4 sm:mt-5">
              <span className="h-px w-8 bg-[#b6925d]/55 sm:w-12" />

              <p
                className="
                  mm-project-transition-title
                  text-[13px]
                  font-light
                  tracking-[0.16em]
                  text-[#514d46]
                  sm:text-[15px]
                "
              >
                正在開啟・{title}
              </p>

              <span className="h-px w-8 bg-[#b6925d]/55 sm:w-12" />
            </div>

            <div className="mt-8 h-px w-[min(68vw,360px)] overflow-hidden bg-[#d8d2c8] sm:mt-10">
              <span className="mm-project-transition-progress block h-full origin-left bg-[#b6925d]" />
            </div>
          </div>
          </div>,
          document.body
        )}
    </>
  );
}
