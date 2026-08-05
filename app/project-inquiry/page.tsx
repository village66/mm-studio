import type { Metadata } from "next";
import Link from "next/link";

import ProjectInquiryForm from "@/components/forms/ProjectInquiryForm";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "專案初步評估",
  description:
    "填寫 MM Studio 專案初步評估表，讓我們了解您的空間、預算與時程需求。",
  alternates: {
    canonical: "/project-inquiry",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ProjectInquiryPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f5] text-[#111111]">
      <Header />

      <section className="pb-20 pt-36 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
        <Container>
          <div className="mx-auto max-w-[1120px]">
            <Reveal>
              <div className="grid gap-8 border-b border-[#dcd4c9] pb-10 lg:grid-cols-[1fr_320px] lg:items-end lg:gap-16 lg:pb-12">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.36em] text-[#a4865d]">
                    Project Inquiry
                  </p>
                  <h1 className="mt-5 text-[36px] font-extralight leading-[1.25] tracking-[0.055em] text-[#b6925d] sm:text-[44px] lg:text-[52px]">
                    專案初步評估
                  </h1>
                  <p className="mt-5 max-w-2xl text-[14px] font-light leading-7 text-neutral-600 sm:text-[15px]">
                    請用約 2～3 分鐘分享您的空間需求。這些資訊將幫助我們在首次聯繫前，
                    更完整地理解專案方向。
                  </p>
                </div>

                <div className="border-l border-[#d8d0c4] pl-5 text-[12px] font-light leading-6 text-neutral-500">
                  <p>共 10 題・無需上傳檔案</p>
                  <p>資料僅用於專案聯繫與初步評估</p>
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[260px_1fr] lg:items-start lg:gap-14">
              <Reveal>
                <aside className="lg:sticky lg:top-28">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#a4865d]">
                    Before We Begin
                  </p>
                  <h2 className="mt-4 text-[22px] font-extralight tracking-[0.06em] text-[#302c27]">
                    填寫前的小提醒
                  </h2>
                  <div className="mt-6 space-y-5 text-[13px] font-light leading-6 text-neutral-500">
                    <p>
                      預算與時程可先提供大致範圍，後續仍會依實際需求共同討論。
                    </p>
                    <p>
                      送出後，我們會先閱讀您的資料，再以您留下的聯絡方式回覆。
                    </p>
                  </div>
                  <Link
                    href="/#contact"
                    className="mt-7 inline-flex items-center gap-3 text-[11px] tracking-[0.16em] text-[#806b50] transition hover:text-[#b6925d]"
                  >
                    <span aria-hidden="true">←</span>
                    返回聯絡資訊
                  </Link>
                </aside>
              </Reveal>

              <Reveal delay={0.08}>
                <ProjectInquiryForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
