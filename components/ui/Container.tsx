import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-[1800px]
        px-6
        sm:px-8
        md:px-10
        lg:px-14
        xl:px-20
        2xl:px-24
        ${className}
      `}
    >
      {children}
    </div>
  );
}