import Image from "next/image";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20">
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center text-neutral-500">
  <span className="text-xs tracking-[0.4em] uppercase mb-3">
    Scroll
  </span>

  <div className="w-px h-12 bg-neutral-400 animate-pulse"></div>
</div>
      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div>
            <p className="uppercase tracking-[0.45em] text-xs text-neutral-500 mb-5">
              MM STUDIO ・ INTERIOR DESIGN
            </p>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-light leading-[1.05] tracking-tight">
              Designing
              <br />
              Timeless
              <br />
              Spaces.
            </h1>

            <p className="mt-10 max-w-lg text-neutral-600 leading-8 text-lg">
              We create timeless interiors through thoughtful planning,
              refined materials, and the harmony of natural light.
            </p>

            <div className="mt-12">
              <a
                href="#portfolio"
                className="inline-flex items-center border border-black px-8 py-3 text-sm uppercase tracking-[0.25em] hover:bg-black hover:text-white transition duration-300"
              >
                View Projects
              </a>
            </div>

          </div>

          {/* Right */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl">
            <Image
              src="/images/hero/hero-home.jpg"
              alt="MM Studio Interior Design"
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>
      </Container>
    </section>
  );
}