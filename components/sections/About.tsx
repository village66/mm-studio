import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="py-40 bg-white">

      <Container>
  <Reveal>

        <div className="grid md:grid-cols-2 gap-20">

          <div>

            <p className="uppercase tracking-[0.35em] text-sm text-neutral-400 mb-6">
              About
            </p>

            <h2 className="text-5xl font-extralight leading-tight">
              Designing spaces
              <br />
              that feel calm,
              <br />
              timeless,
              <br />
              and personal.
            </h2>

          </div>

          <div>

            <p className="text-neutral-500 leading-9">

              MM Studio believes that every space should reflect
              the lifestyle of its owner. We create minimalist,
              timeless interiors through light, materials,
              proportion and thoughtful details.

            </p>

          </div>

        </div>

      </Reveal>
</Container>

    </section>
  )
}