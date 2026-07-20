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
        scroll-mt-28
        py-20
        md:py-28
        lg:py-36
        xl:py-44
        2xl:py-52
        ${className}
      `}
    >
      {children}
    </section>
  );
}