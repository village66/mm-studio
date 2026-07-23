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
        min-h-screen
        flex
        flex-col
        justify-center
        scroll-mt-28
        py-16
        lg:py-24
        ${className}
      `}
    >
      {children}
    </section>
  );
}