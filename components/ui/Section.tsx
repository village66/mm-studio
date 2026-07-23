import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export default function Section({
  id,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`
        relative
        w-full
        /* 電腦與平板上：剛好等於「一螢幕高度」，垂直置中 */
        lg:h-screen lg:max-h-[1080px] lg:flex lg:flex-col lg:justify-center
        /* 避免低解析度螢幕擠壓，設定最小高度 */
        lg:min-h-[680px]
        /* 手動置中與錨點偏移 */
        scroll-mt-20
        /* 上下留白縮小，防止擠壓內容 */
        py-12 lg:py-0
        ${className}
      `}
    >
      {children}
    </section>
  );
}