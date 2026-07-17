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
      className={`w-full max-w-[1440px] mx-auto px-8 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}