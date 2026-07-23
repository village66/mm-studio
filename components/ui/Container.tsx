import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  cleanPadding?: boolean; // 新增選項：若特定版面想要完全無邊框貼邊可設為 true
};

export default function Container({
  children,
  className = "",
  cleanPadding = false,
}: Props) {
  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-[100vw]
        ${cleanPadding ? "px-0" : "px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}