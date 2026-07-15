"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f8f8f5]/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-8 lg:px-16 py-6">

        <Link
          href="/"
          className="text-2xl tracking-[0.3em] font-light hover:opacity-70 transition"
        >
          MM Studio
        </Link>

        <nav className="hidden md:flex items-center gap-12 uppercase text-sm tracking-[0.25em]">

          <a href="/" className="hover:opacity-60 transition">
            Home
          </a>

          <a href="#portfolio" className="hover:opacity-60 transition">
            Portfolio
          </a>

          <a href="#about" className="hover:opacity-60 transition">
            About
          </a>

          <a href="#contact" className="hover:opacity-60 transition">
            Contact
          </a>

        </nav>

      </div>
    </header>
  );
}