"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, useSyncExternalStore } from "react";

import {
  motionTokens,
  revealVariants,
  type RevealVariant,
} from "@/lib/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
  once?: boolean;
  amount?: number;
  duration?: number;
};

const subscribeToHydration = () => () => undefined;

export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "rise",
  once = true,
  amount = 0.15,
  duration,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReducedMotion = useReducedMotion();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  const motionEnabled = isHydrated && !prefersReducedMotion;
  const resolvedDuration =
    duration ??
    (variant === "image"
      ? motionTokens.duration.image
      : variant === "text" || variant === "section"
        ? motionTokens.duration.elegant
        : motionTokens.duration.base);
  const resolvedEase =
    variant === "image" || variant === "section"
      ? motionTokens.easing.cinematic
      : variant === "text"
        ? motionTokens.easing.editorial
        : motionTokens.easing.ui;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={motionEnabled && !isInView ? "hidden" : "visible"}
      variants={revealVariants[variant]}
      transition={{
        duration: motionEnabled ? resolvedDuration : 0,
        delay: motionEnabled && isInView ? delay : 0,
        ease: resolvedEase,
      }}
    >
      {children}
    </motion.div>
  );
}
