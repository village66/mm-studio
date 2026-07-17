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
      className={`relative w-full py-24 md:py-32 xl:py-40 ${className}`}
    >
      {children}
    </section>
  );
}