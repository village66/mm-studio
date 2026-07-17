"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,.06)]"
          : "bg-transparent"
      }`}
    >
      <Container>

        <div
          className={`flex items-center justify-between border-b transition-all duration-500 ${
            scrolled
              ? "h-20 border-neutral-200"
              : "h-28 border-black/10"
          }`}
        >
          <Logo />

          <DesktopNav />

          <MobileNav />
        </div>

      </Container>
    </header>
  );
}