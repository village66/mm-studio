import Link from "next/link";

import BrandLogo from "@/components/brand/BrandLogo";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="返回 MM Studio 首頁"
      className="
        group/logo
        block
        shrink-0
        text-[#24231f]
        focus-visible:outline-none
        focus-visible:ring-1
        focus-visible:ring-[#b6925d]
        focus-visible:ring-offset-4
      "
    >
      <BrandLogo
        animateOnView
        className="
          block
          h-auto
          w-[clamp(160px,calc(100vw-160px),240px)]
          sm:w-[260px]
          lg:w-[260px]
          xl:w-[300px]
          2xl:w-[320px]
        "
      />
    </Link>
  );
}
