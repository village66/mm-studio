import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

export default function Contact() {
  return (
    <Section
      id="contact"
      className="bg-[#f8f8f5]"
    >
      <Container>

        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">

          {/* Left - Image */}

          <Reveal>

            <div className="relative aspect-[4/5] max-h-[420px] xl:max-h-[480px] w-full overflow-hidden rounded-sm">

              <Image
                src="/images/contact/contact.jpg"
                alt="MM Studio"
                fill
                sizes="(max-width:1024px)100vw,50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />

            </div>

          </Reveal>

          {/* Right - Content */}

          <Reveal delay={0.1}>

            <div className="flex flex-col justify-center">

              <div className="group">

                {/* Title */}

                <div className="relative h-[110px] lg:h-[120px]">

                  {/* 中文 */}

                  <div className="absolute inset-0 flex items-center transition-opacity duration-700 opacity-100 group-hover:opacity-0">

                    <h2 className="text-[34px] sm:text-[40px] lg:text-[46px] font-extralight leading-[1.2] tracking-[0.06em] text-[#b6925d]">
                      與我們一起
                      <br />
                      開始您的設計旅程
                    </h2>

                  </div>

                  {/* English */}

                  <div className="absolute inset-0 flex items-center transition-opacity duration-700 opacity-0 group-hover:opacity-100">

                    <h2 className="text-[34px] sm:text-[40px] lg:text-[46px] font-extralight leading-[1.1] tracking-[-0.02em] text-[#222]">
                      Let's Start
                      <br />
                      Your Project
                    </h2>

                  </div>

                </div>

                {/* Description */}

                <div className="relative mt-6 lg:mt-8 h-[80px] lg:h-[90px]">

                  <p className="absolute inset-0 text-sm lg:text-[16px] leading-7 lg:leading-8 text-neutral-600 transition-opacity duration-700 opacity-100 group-hover:opacity-0">
                    無論是住宅、商業空間或品牌規劃，
                    <br />
                    我們期待與您深入交流，
                    <br />
                    一同打造專屬於您的理想空間。
                  </p>

                  <p className="absolute inset-0 text-sm lg:text-[16px] leading-7 lg:leading-8 text-[#9d8462] transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                    Whether residential, commercial or hospitality,
                    <br />
                    we look forward to creating
                    <br />
                    a timeless space with you.
                  </p>

                </div>

                {/* Contact Info */}

                <div className="mt-8 space-y-4 border-t border-neutral-200/60 pt-6">

                  <div className="group/item relative h-7">

                    <div className="absolute inset-0 flex items-center justify-between text-sm transition-opacity duration-500 opacity-100 group-hover/item:opacity-0 text-neutral-600">
                      <span className="text-neutral-400">電子信箱</span>
                      <span>info@mmstudio.com</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-between text-sm transition-opacity duration-500 opacity-0 group-hover/item:opacity-100 text-[#9d8462]">
                      <span className="text-[#9d8462]/70">Email</span>
                      <span>info@mmstudio.com</span>
                    </div>

                  </div>

                  <div className="group/item relative h-7">

                    <div className="absolute inset-0 flex items-center justify-between text-sm transition-opacity duration-500 opacity-100 group-hover/item:opacity-0 text-neutral-600">
                      <span className="text-neutral-400">聯絡電話</span>
                      <span>+886 2 1234 5678</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-between text-sm transition-opacity duration-500 opacity-0 group-hover/item:opacity-100 text-[#9d8462]">
                      <span className="text-[#9d8462]/70">Phone</span>
                      <span>+886 2 1234 5678</span>
                    </div>

                  </div>

                  <div className="group/item relative h-7">

                    <div className="absolute inset-0 flex items-center justify-between text-sm transition-opacity duration-500 opacity-100 group-hover/item:opacity-0 text-neutral-600">
                      <span className="text-neutral-400">公司地址</span>
                      <span>Taipei, Taiwan</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-between text-sm transition-opacity duration-500 opacity-0 group-hover/item:opacity-100 text-[#9d8462]">
                      <span className="text-[#9d8462]/70">Address</span>
                      <span>Taipei, Taiwan</span>
                    </div>

                  </div>

                </div>

              </div>

              {/* Action Button */}

              <div className="mt-8 lg:mt-10">
                <Link
                  href="#contact"
                  className="group relative inline-flex h-12 lg:h-14 w-[200px] lg:w-[220px] items-center justify-center overflow-hidden rounded-full border border-[#c9b08a] bg-white transition duration-500 hover:bg-[#f6f4ef] shadow-sm"
                >

                  {/* 中文 */}
                  <span
                    className="absolute inset-0 flex items-center justify-center text-xs lg:text-[13px] tracking-[0.28em] text-neutral-800 transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                  >
                    開始您的專案
                  </span>

                  {/* English */}
                  <span
                    className="absolute inset-0 flex items-center justify-center text-xs lg:text-[13px] uppercase tracking-[0.20em] text-[#9d8462] transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  >
                    START YOUR PROJECT
                  </span>

                </Link>
              </div>

            </div>

          </Reveal>

        </div>

      </Container>
    </Section>
  );
}