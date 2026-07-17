import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Footer from "@/components/layout/Footer";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f5] text-[#111111]">
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