import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

export default function Contact() {
  return (
    <Section
      id="contact"
      className="
        scroll-mt-[92px]
        bg-[#f8f8f5]
        !py-16
        sm:!py-20
        lg:!py-16
        xl:!py-20
      "
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {/* 左側圖片 */}
          <Reveal>
            <div
              className="
                relative
                aspect-[4/5]
                max-h-[420px]
                w-full
                overflow-hidden
                rounded-sm
                bg-[#e9e6df]
                xl:max-h-[480px]
              "
            >
              <Image
                src="/images/contact/contact.jpg"
                alt="MM Studio 室內設計與空間細節"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  hover:scale-[1.025]
                "
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </Reveal>

          {/* 右側內容 */}
          <Reveal delay={0.1}>
            <div className="flex flex-col justify-center">
              {/* 標題與說明的中英文切換區 */}
              <div className="group/contact">
                {/* 標題 */}
                <div className="relative h-[96px] sm:h-[104px] lg:h-[106px]">
                  {/* 中文 */}
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      opacity-100
                      transition-all
                      duration-700
                      lg:group-hover/contact:-translate-y-1
                      lg:group-hover/contact:opacity-0
                    "
                  >
                    <h2
                      className="
                        text-[32px]
                        font-extralight
                        leading-[1.25]
                        tracking-[0.055em]
                        text-[#b6925d]
                        sm:text-[38px]
                        lg:text-[42px]
                        xl:text-[44px]
                      "
                    >
                      與我們一起
                      <br />
                      開始您的設計旅程
                    </h2>
                  </div>

                  {/* 英文 */}
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      translate-y-1
                      items-center
                      opacity-0
                      transition-all
                      duration-700
                      lg:group-hover/contact:translate-y-0
                      lg:group-hover/contact:opacity-100
                    "
                  >
                    <h2
                      className="
                        text-[32px]
                        font-extralight
                        leading-[1.15]
                        tracking-[-0.025em]
                        text-[#222]
                        sm:text-[38px]
                        lg:text-[42px]
                        xl:text-[44px]
                      "
                    >
                      Let&apos;s Start
                      <br />
                      Your Project
                    </h2>
                  </div>
                </div>

                {/* 說明 */}
                <div className="relative mt-5 h-[72px] sm:h-[78px] lg:mt-6">
                  {/* 中文 */}
                  <p
                    className="
                      absolute
                      inset-0
                      text-[14px]
                      font-light
                      leading-7
                      text-neutral-600
                      opacity-100
                      transition-all
                      duration-700
                      lg:text-[15px]
                      lg:group-hover/contact:-translate-y-1
                      lg:group-hover/contact:opacity-0
                    "
                  >
                    無論是住宅、商業空間或品牌規劃，
                    <br />
                    我們期待與您深入交流，
                    <br />
                    一同打造專屬於您的理想空間。
                  </p>

                  {/* 英文 */}
                  <p
                    className="
                      absolute
                      inset-0
                      translate-y-1
                      text-[13px]
                      font-light
                      leading-7
                      text-[#9d8462]
                      opacity-0
                      transition-all
                      duration-700
                      lg:text-[14px]
                      lg:group-hover/contact:translate-y-0
                      lg:group-hover/contact:opacity-100
                    "
                  >
                    Whether residential, commercial or hospitality,
                    <br />
                    we look forward to creating
                    <br />
                    a timeless space with you.
                  </p>
                </div>
              </div>

              {/* 聯絡資料 */}
              <div className="mt-6 space-y-3 border-t border-neutral-200/70 pt-5">
                {/* 電子信箱 */}
                <div className="group/item relative h-7">
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-between
                      gap-5
                      text-[13px]
                      font-light
                      text-neutral-600
                      opacity-100
                      transition-opacity
                      duration-500
                      lg:text-[14px]
                      lg:group-hover/item:opacity-0
                    "
                  >
                    <span className="shrink-0 text-neutral-400">
                      電子信箱
                    </span>

                    <a
                      href="mailto:mm.interdesign@gmail.com"
                      className="truncate transition-colors hover:text-[#9d8462]"
                    >
                      mm.interdesign@gmail.com
                    </a>
                  </div>

                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-between
                      gap-5
                      text-[13px]
                      font-light
                      text-[#9d8462]
                      opacity-0
                      transition-opacity
                      duration-500
                      lg:text-[14px]
                      lg:group-hover/item:opacity-100
                    "
                  >
                    <span className="shrink-0 text-[#9d8462]/70">
                      Email
                    </span>

                    <a
                      href="mailto:mm.interdesign@gmail.com"
                      className="truncate"
                    >
                      mm.interdesign@gmail.com
                    </a>
                  </div>
                </div>

                {/* 聯絡電話 */}
                <div className="group/item relative h-7">
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-between
                      gap-5
                      text-[13px]
                      font-light
                      text-neutral-600
                      opacity-100
                      transition-opacity
                      duration-500
                      lg:text-[14px]
                      lg:group-hover/item:opacity-0
                    "
                  >
                    <span className="shrink-0 text-neutral-400">
                      聯絡電話
                    </span>

                    <a
                      href="tel:+886912379200"
                      className="transition-colors hover:text-[#9d8462]"
                    >
                      +886 912 379 200
                    </a>
                  </div>

                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-between
                      gap-5
                      text-[13px]
                      font-light
                      text-[#9d8462]
                      opacity-0
                      transition-opacity
                      duration-500
                      lg:text-[14px]
                      lg:group-hover/item:opacity-100
                    "
                  >
                    <span className="shrink-0 text-[#9d8462]/70">
                      Phone
                    </span>

                    <a href="tel:+886912379200">
                      +886 912 379 200
                    </a>
                  </div>
                </div>

                {/* 服務地區 */}
                <div className="group/item relative h-7">
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-between
                      gap-5
                      text-[13px]
                      font-light
                      text-neutral-600
                      opacity-100
                      transition-opacity
                      duration-500
                      lg:text-[14px]
                      lg:group-hover/item:opacity-0
                    "
                  >
                    <span className="shrink-0 text-neutral-400">
                      服務地區
                    </span>

                    <span>台中市及鄰近地區</span>
                  </div>

                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-between
                      gap-5
                      text-[13px]
                      font-light
                      text-[#9d8462]
                      opacity-0
                      transition-opacity
                      duration-500
                      lg:text-[14px]
                      lg:group-hover/item:opacity-100
                    "
                  >
                    <span className="shrink-0 text-[#9d8462]/70">
                      Service Area
                    </span>

                    <span>Taichung &amp; Nearby</span>
                  </div>
                </div>
              </div>

              {/* 專業資格與合法登記 */}
              <div
                className="
                  group/credential
                  relative
                  mt-6
                  overflow-hidden
                  border-y
                  border-[#d8d0c4]
                  py-5
                "
              >
                {/* Hover 背景 */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    origin-left
                    scale-x-0
                    bg-[#f2eee7]
                    transition-transform
                    duration-700
                    ease-out
                    lg:group-hover/credential:scale-x-100
                  "
                />

                <div className="relative z-10 grid grid-cols-[42px_1fr] gap-4">
                  {/* 認證圖示 */}
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#c7b28f]
                      text-[#9a7b54]
                      transition-all
                      duration-500
                      lg:group-hover/credential:border-[#9a7b54]
                      lg:group-hover/credential:bg-[#9a7b54]
                      lg:group-hover/credential:text-white
                    "
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 3 19 6v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6z" />
                      <path d="m8.5 12 2.2 2.2 4.8-5" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    {/* 中文／英文小標 */}
                    <div className="relative grid min-h-5">
                      <p
                        className="
                          col-start-1
                          row-start-1
                          text-[9px]
                          font-medium
                          uppercase
                          tracking-[0.28em]
                          text-[#9a7b54]
                          opacity-100
                          transition-all
                          duration-500
                          lg:group-hover/credential:-translate-y-1
                          lg:group-hover/credential:opacity-0
                        "
                      >
                        專業資格與合法登記
                      </p>

                      <p
                        aria-hidden="true"
                        className="
                          col-start-1
                          row-start-1
                          translate-y-1
                          text-[8px]
                          font-medium
                          uppercase
                          tracking-[0.26em]
                          text-[#9a7b54]
                          opacity-0
                          transition-all
                          duration-500
                          lg:group-hover/credential:translate-y-0
                          lg:group-hover/credential:opacity-100
                        "
                      >
                        Professional Registration
                      </p>
                    </div>

                    <p className="mt-2 text-[14px] font-light tracking-[0.04em] text-[#33312e]">
                      工厘室內裝修設計有限公司
                    </p>

                    {/* 中文登記資訊 */}
                    <div
                      className="
                        mt-2
                        space-y-1
                        text-[11px]
                        font-light
                        leading-5
                        text-neutral-500
                        opacity-100
                        transition-all
                        duration-500
                        sm:text-[12px]
                        lg:group-hover/credential:-translate-y-1
                        lg:group-hover/credential:opacity-0
                      "
                    >
                      <p>依法登記之建築物室內裝修業</p>

                      <div className="flex flex-wrap gap-x-5 gap-y-1">
                        <p>
                          專業技術資格
                          <span className="mx-2 text-[#b29a76]">
                            |
                          </span>
                          設計及施工
                        </p>

                        <p>
                          登記證字號
                          <span className="mx-2 text-[#b29a76]">
                            |
                          </span>
                          40E2009807
                        </p>
                      </div>
                    </div>

                    {/* 英文輔助資訊 */}
                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-0
                        left-[58px]
                        right-0
                        translate-y-1
                        space-y-1
                        text-[10px]
                        font-light
                        leading-5
                        text-[#806b50]
                        opacity-0
                        transition-all
                        duration-500
                        sm:text-[11px]
                        lg:group-hover/credential:translate-y-0
                        lg:group-hover/credential:opacity-100
                      "
                    >
                      <p>
                        Registered Interior Renovation Practice
                      </p>

                      <div className="flex flex-wrap gap-x-5 gap-y-1">
                        <p>Design &amp; Construction</p>
                        <p>Registration No. 40E2009807</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 信任說明 */}
              <p className="mt-4 max-w-[610px] text-[11px] font-light leading-6 text-neutral-500 sm:text-[12px]">
                從設計規劃到工程執行，由具專業資格人員負責，
                以清楚流程與專業標準，確保每個階段安心落實。
              </p>

              {/* 行動按鈕 */}
              <div className="mt-6 lg:mt-7">
                <a
                  href="mailto:mm.interdesign@gmail.com"
                  className="
                    group/button
                    relative
                    inline-flex
                    h-12
                    w-[200px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    border-[#c9b08a]
                    bg-white
                    shadow-sm
                    transition
                    duration-500
                    hover:bg-[#f6f4ef]
                    lg:h-13
                    lg:w-[215px]
                  "
                >
                  {/* 中文 */}
                  <span
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      text-[12px]
                      tracking-[0.26em]
                      text-neutral-800
                      opacity-100
                      transition-all
                      duration-500
                      group-hover/button:-translate-y-1
                      group-hover/button:opacity-0
                    "
                  >
                    開始您的專案
                  </span>

                  {/* 英文 */}
                  <span
                    className="
                      absolute
                      inset-0
                      flex
                      translate-y-1
                      items-center
                      justify-center
                      text-[11px]
                      uppercase
                      tracking-[0.18em]
                      text-[#9d8462]
                      opacity-0
                      transition-all
                      duration-500
                      group-hover/button:translate-y-0
                      group-hover/button:opacity-100
                    "
                  >
                    Start Your Project
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}