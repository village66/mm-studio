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
          w-[205px]
          sm:w-[238px]
          lg:w-[250px]
          xl:w-[270px]
          2xl:w-[382px]
        "
      />
    </Link>
  );
}
