import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function Button({
  href,
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className="
        inline-flex
        h-14
        items-center
        justify-center
        rounded-full
        border
        border-black
        px-8
        text-[12px]
        font-medium
        uppercase
        tracking-[0.28em]
        transition-all
        duration-300
        hover:bg-black
        hover:text-white
      "
    >
      {children}
    </Link>
  );
}