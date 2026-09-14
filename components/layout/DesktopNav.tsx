"use client";

import Link from "next/link";

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
  return (
    <nav className="hidden items-center gap-3 lg:flex xl:gap-6 2xl:gap-8">
      {navigation.map((item) => {
        return (
          <Link
  key={item.name}
  href={item.href}
  className="group relative flex h-10 items-center justify-center"
>
  <span className="relative grid min-w-[66px] place-items-center xl:min-w-[76px]">
    <span className="col-start-1 row-start-1 whitespace-nowrap text-[14px] font-medium tracking-[0.16em] text-[#5f5a54] opacity-100 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1 group-hover:opacity-0">
      {zhMap[item.name]}
    </span>

    <span
      aria-hidden="true"
      className="col-start-1 row-start-1 translate-y-1 whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.12em] text-[#9a7b54] opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
    >
      {item.name}
    </span>
  </span>

  <span
  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#9a7b54] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
/>

</Link>
        );
      })}
    </nav>
  );
}
