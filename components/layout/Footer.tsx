import Link from "next/link";

import BrandLogo from "@/components/brand/BrandLogo";
import Container from "@/components/ui/Container";

const footerNavigation = [
  {
    zh: "關於我們",
    en: "About",
    href: "/#about",
  },
  {
    zh: "設計服務",
    en: "Services",
    href: "/#services",
  },
  {
    zh: "作品案例",
    en: "Projects",
    href: "/#portfolio",
  },
  {
    zh: "聯絡我們",
    en: "Contact",
    href: "/#contact",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e2ded7] bg-white">
      <Container>
        {/* 主要資訊 */}
        <div
          className="
            grid
            gap-8
            py-10
            sm:py-12
            lg:grid-cols-12
            lg:items-start
            lg:gap-10
            lg:py-11
          "
        >
          {/* 品牌 */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="返回 MM Studio 首頁"
              className="
                group/brand
                relative
                inline-flex
                overflow-hidden
                rounded-sm
                pr-5
                text-[#24231f]
                focus-visible:outline-none
                focus-visible:ring-1
                focus-visible:ring-[#b6925d]
                focus-visible:ring-offset-4
              "
            >
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-3
                  left-0
                  h-px
                  w-full
                  origin-left
                  scale-x-0
                  bg-[#b6925d]/35
                  transition-transform
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover/brand:scale-x-100
                  motion-reduce:transition-none
                "
              />

              <BrandLogo
                variant="footer"
                className="
                  relative
                  z-10
                  h-auto
                  w-[218px]
                  sm:w-[246px]
                  lg:w-[268px]
                "
              />
            </Link>

            <p className="mt-2 text-[12px] font-light tracking-[0.08em] text-neutral-500">
              工厘室內裝修設計有限公司
            </p>

            <p className="mt-2 text-[12px] font-light leading-6 text-neutral-500">
              以細膩規劃與專業執行，打造舒適且長久的空間。
            </p>
          </div>

          {/* 導覽 */}
          <div className="lg:col-span-5">
            <p className="text-[8px] font-medium uppercase tracking-[0.32em] text-neutral-400">
              Navigation
            </p>

            <nav
              aria-label="頁尾導覽"
              className="
                mt-4
                grid
                grid-cols-2
                gap-x-6
                gap-y-3
                sm:flex
                sm:flex-wrap
                sm:gap-x-8
                sm:gap-y-3
                lg:mt-5
              "
            >
              {footerNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group/link
                    inline-flex
                    items-center
                    gap-2
                    text-[13px]
                    font-light
                    text-[#44413d]
                    transition-colors
                    duration-300
                    hover:text-[#9a7b54]
                  "
                >
                  <span>{item.zh}</span>

                  <span
                    className="
                      hidden
                      text-[7px]
                      uppercase
                      tracking-[0.16em]
                      text-neutral-400
                      transition-colors
                      duration-300
                      group-hover/link:text-[#9a7b54]
                      xl:inline
                    "
                  >
                    {item.en}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* 聯絡資訊 */}
          <div className="lg:col-span-3 lg:text-right">
            <p className="text-[8px] font-medium uppercase tracking-[0.32em] text-neutral-400">
              Contact
            </p>

            <div
              className="
                mt-4
                flex
                flex-col
                items-start
                gap-2.5
                lg:mt-5
                lg:items-end
              "
            >
              <a
                href="mailto:mm.interdesign@gmail.com"
                className="
                  text-[12px]
                  font-light
                  text-[#44413d]
                  transition-colors
                  duration-300
                  hover:text-[#9a7b54]
                  sm:text-[13px]
                "
              >
                mm.interdesign@gmail.com
              </a>

              <a
                href="tel:+886912379200"
                className="
                  text-[12px]
                  font-light
                  tracking-[0.04em]
                  text-[#44413d]
                  transition-colors
                  duration-300
                  hover:text-[#9a7b54]
                  sm:text-[13px]
                "
              >
                +886 912 379 200
              </a>
            </div>
          </div>
        </div>

        {/* 最底部合法登記與版權 */}
        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-[#e2ded7]
            py-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-6
          "
        >
          {/* 登記資訊 */}
          <div
            className="
              flex
              flex-col
              gap-1.5
              text-[9px]
              font-light
              tracking-[0.09em]
              text-neutral-400
              sm:flex-row
              sm:flex-wrap
              sm:items-center
              sm:gap-3
              sm:text-[10px]
            "
          >
            <div className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#c6b18e] text-[#9a7b54]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3 19 6v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6z" />
                  <path d="m8.5 12 2.2 2.2 4.8-5" />
                </svg>
              </span>

              <span>依法登記之建築物室內裝修業</span>
            </div>

            <span className="hidden h-3 w-px bg-[#d7d0c6] sm:block" />

            <span>設計及施工</span>

            <span className="hidden h-3 w-px bg-[#d7d0c6] sm:block" />

            <span>登記證字號 40E2009807</span>
          </div>

          {/* 版權與回到頂端 */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-6
              sm:shrink-0
              sm:justify-end
            "
          >
            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
              © {year} MM Studio
            </p>

            <a
              href="#"
              aria-label="回到頁面頂端"
              className="
                group/top
                inline-flex
                items-center
                gap-2
                text-[9px]
                tracking-[0.16em]
                text-neutral-500
                transition-colors
                duration-300
                hover:text-[#9a7b54]
              "
            >
              <span>回到頂端</span>

              <span className="transition-transform duration-500 group-hover/top:-translate-y-1">
                ↑
              </span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
