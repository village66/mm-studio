import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  fullScreen?: boolean; // 新增全螢幕切換開關
};

export default function Section({
  id,
  className = "",
  children,
  fullScreen = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`
        relative w-full scroll-mt-20
        ${
          fullScreen
            ? "lg:h-screen lg:max-h-[1080px] lg:min-h-[680px] lg:flex lg:flex-col lg:justify-center py-12 lg:py-0"
            : "py-24 lg:py-32"
        }
        ${className}
      `}
    >
      {children}
    </section>
  );
}