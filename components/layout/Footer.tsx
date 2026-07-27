import Link from "next/link";

import Container from "@/components/ui/Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white">

      <Container>

        <div className="grid gap-20 py-20 lg:grid-cols-12">

          {/* Brand */}

          <div className="lg:col-span-5">

            {/*
              TODO：公司中文名稱待確認。
              「工厘室內設計」疑似模板殘留，與 MM Studio 發音對不上，
              請確認正確中文名稱後再套用「中文為主、hover 顯示英文」的順序。
            */}
            <div className="group inline-block h-[54px] overflow-hidden cursor-default">

              <div className="transition-transform duration-500 ease-out group-hover:-translate-y-[54px]">

                <h2 className="font-serif text-[40px] font-light uppercase tracking-[0.18em] text-[#181818] leading-[54px]">
                  MM Studio
                </h2>

                <h2 className="font-serif text-[36px] font-light tracking-[0.12em] text-[#b6925d] leading-[54px]">
                  工厘室內設計
                </h2>

              </div>

            </div>

            <div className="group mt-5 inline-block h-6 overflow-hidden cursor-default">

              <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">

                <p className="text-[11px] tracking-[0.2em] text-[#b6925d] h-6">
                  精品室內設計
                </p>

                <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 h-6">
                  Boutique Interior Design
                </p>

              </div>

            </div>

            {/* 中文為主，hover 才切換成英文 */}
            <div className="group relative mt-10 max-w-md grid cursor-default">

              <p className="col-start-1 row-start-1 leading-8 text-neutral-600 transition-opacity duration-700 opacity-100 group-hover:opacity-0">
                我們專注於住宅與商業空間設計，透過細膩規劃、精選材質與精湛工藝，
                打造歷久彌新的生活空間。
              </p>

              <p className="col-start-1 row-start-1 leading-8 text-neutral-600 transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                Creating timeless residential and commercial interiors
                through thoughtful planning, refined materials and
                meticulous craftsmanship.
              </p>

            </div>

          </div>

          {/* Navigation */}

          <div className="lg:col-span-2">

            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
              Navigation
            </p>

            <nav className="mt-8 flex flex-col gap-5">

              <Link href="#about" className="group h-6 overflow-hidden">

                <div className="transition duration-300 group-hover:-translate-y-6">

                  <div className="h-6">關於我們</div>

                  <div className="h-6 text-[#b6925d]">ABOUT</div>

                </div>

              </Link>

              <Link href="#services" className="group h-6 overflow-hidden">

                <div className="transition duration-300 group-hover:-translate-y-6">

                  <div className="h-6">設計服務</div>

                  <div className="h-6 text-[#b6925d]">SERVICES</div>

                </div>

              </Link>

              <Link href="#portfolio" className="group h-6 overflow-hidden">

                <div className="transition duration-300 group-hover:-translate-y-6">

                  <div className="h-6">作品案例</div>

                  <div className="h-6 text-[#b6925d]">PROJECTS</div>

                </div>

              </Link>

              <Link href="#contact" className="group h-6 overflow-hidden">

                <div className="transition duration-300 group-hover:-translate-y-6">

                  <div className="h-6">聯絡我們</div>

                  <div className="h-6 text-[#b6925d]">CONTACT</div>

                </div>

              </Link>

            </nav>

          </div>

          {/* Contact */}

          <div className="lg:col-span-3">

            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
              Contact
            </p>

            <div className="mt-8 space-y-5">

              <Link
                href="mailto:mm.interdesign@gmail.com"
                className="block transition hover:text-[#b6925d]"
              >
                mm.interdesign@gmail.com
              </Link>

              <Link
                href="tel:+886912379200"
                className="block transition hover:text-[#b6925d]"
              >
                +886 912 379 200
              </Link>

              <p className="leading-8 text-neutral-600">
                台中市
                <br />
                及鄰近地區
              </p>

            </div>

          </div>

          {/* Copyright */}

          <div className="flex flex-col justify-between lg:col-span-2 lg:items-end">

            <Link
              href="/"
              className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 transition hover:text-[#b6925d]"
            >
              Back to Top ↑
            </Link>

            <p className="mt-16 text-[11px] uppercase tracking-[0.25em] text-neutral-400 lg:mt-0">
              © {year}
              <br />
              MM Studio
            </p>

          </div>

        </div>

      </Container>

    </footer>
  );
}