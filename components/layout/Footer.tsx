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

            <div className="group mt-5 inline-block h-6 overflow-hidden">

              <div className="transition-transform duration-500 ease-out group-hover:-translate-y-6">

                <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 h-6">
                  Boutique Interior Design
                </p>

                <p className="text-[11px] tracking-[0.2em] text-[#b6925d] h-6">
                  精品室內設計
                </p>

              </div>

            </div>

            <p className="mt-10 max-w-md leading-8 text-neutral-600">
              Creating timeless residential and commercial interiors
              through thoughtful planning, refined materials and
              meticulous craftsmanship.
            </p>

          </div>

          {/* Navigation */}

          <div className="lg:col-span-2">

            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
              Navigation
            </p>

            <nav className="mt-8 flex flex-col gap-5">

              <Link href="#about" className="group h-6 overflow-hidden">

                <div className="transition duration-300 group-hover:-translate-y-6">

                  <div className="h-6">ABOUT</div>

                  <div className="h-6 text-[#b6925d]">關於我們</div>

                </div>

              </Link>

              <Link href="#services" className="group h-6 overflow-hidden">

                <div className="transition duration-300 group-hover:-translate-y-6">

                  <div className="h-6">SERVICES</div>

                  <div className="h-6 text-[#b6925d]">設計服務</div>

                </div>

              </Link>

              <Link href="#portfolio" className="group h-6 overflow-hidden">

                <div className="transition duration-300 group-hover:-translate-y-6">

                  <div className="h-6">PROJECTS</div>

                  <div className="h-6 text-[#b6925d]">作品案例</div>

                </div>

              </Link>

              <Link href="#contact" className="group h-6 overflow-hidden">

                <div className="transition duration-300 group-hover:-translate-y-6">

                  <div className="h-6">CONTACT</div>

                  <div className="h-6 text-[#b6925d]">聯絡我們</div>

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
                href="mailto:hello@mmstudio.tw"
                className="block transition hover:text-[#b6925d]"
              >
                hello@mmstudio.tw
              </Link>

              <Link
                href="tel:+886912345678"
                className="block transition hover:text-[#b6925d]"
              >
                +886 912 345 678
              </Link>

              <p className="leading-8 text-neutral-600">
                Taoyuan City
                <br />
                Taiwan
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