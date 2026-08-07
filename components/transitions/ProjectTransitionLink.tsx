"use client";

import { type ReactNode } from "react";
import Link from "next/link";

type ProjectTransitionLinkProps = {
  href: string;
  title: string;
  className?: string;
  children: ReactNode;
};

export default function ProjectTransitionLink({
  href,
  title,
  className = "",
  children,
}: ProjectTransitionLinkProps) {
  return (
    <Link
      href={href}
      aria-label={`查看作品：${title}`}
      className={className}
    >
      {children}
    </Link>
  );
}
