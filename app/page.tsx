import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

import AutoPlayUnlock from "@/components/audio/AutoPlayUnlock";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f5] text-[#111111]">
      <AutoPlayUnlock />

      <Header />
      <Hero />
      <About />
      <Services />
      <FeaturedProjects />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}