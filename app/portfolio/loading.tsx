import BrandLogo from "@/components/brand/BrandLogo";

export default function PortfolioLoading() {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-label="正在載入作品案例"
      className="
        fixed
        inset-0
        z-[199999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#f3f0e9]
        px-6
      "
    >
      <div className="relative flex w-full flex-col items-center text-center">
        <p className="mm-project-transition-kicker text-[9px] font-medium uppercase tracking-[0.42em] text-[#8e7654] sm:text-[10px]">
          Selected Project
        </p>

        <BrandLogo
          variant="footer"
          transitioning
          className="
            mm-project-transition-logo
            mt-4
            h-auto
            w-[min(88vw,620px)]
            text-[#24231f]
            sm:mt-6
          "
        />

        <div className="mt-8 h-px w-[min(68vw,360px)] overflow-hidden bg-[#d8d2c8] sm:mt-10">
          <span className="mm-project-transition-progress block h-full origin-left bg-[#b6925d]" />
        </div>
      </div>
    </main>
  );
}
