"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/constants/navigation";

const zhMap: Record<string, string> = {
  Home: "首頁",
  About: "關於我們",
  Services: "設計服務",
  Projects: "作品案例",
  Process: "設計流程",
  Contact: "聯絡我們",
};

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center ml-20 gap-14 xl:ml-28 xl:gap-16">
      {navigation.map((item) => {
        const active = false;

        return (
          <Link
  key={item.name}
  href={item.href}
  className="group relative flex h-12 items-center justify-center px-2"
>

  <div className="relative h-5 w-[92px]">

    <span
      className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[11px] tracking-[0.20em] text-[#b6925d] transition-opacity duration-500 opacity-100 group-hover:opacity-0"
    >
      {zhMap[item.name]}
    </span>

    <span
      className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[11px] uppercase tracking-[0.30em] text-neutral-700 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
    >
      {item.name}
    </span>

  </div>

  <span
  className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[#b6925d] transition-all duration-500 group-hover:w-10"
/>

</Link>
        );
      })}
    </nav>
  );
}