import type { Variants } from "framer-motion";

export const motionTokens = {
  duration: {
    instant: 0.18,
    micro: 0.22,
    fast: 0.36,
    base: 0.58,
    elegant: 0.82,
    slow: 0.82,
    image: 1.12,
    cinematic: 1.45,
  },
  easing: {
    ui: [0.25, 0.1, 0.25, 1],
    editorial: [0.16, 1, 0.3, 1],
    cinematic: [0.45, 0, 0.15, 1],
    standard: [0.25, 0.1, 0.25, 1],
    entrance: [0.16, 1, 0.3, 1],
    exit: [0.4, 0, 1, 1],
  },
  distance: {
    subtle: 12,
    base: 20,
    section: 32,
  },
} as const;

export const revealVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  rise: {
    hidden: { opacity: 0, y: motionTokens.distance.base },
    visible: { opacity: 1, y: 0 },
  },
  text: {
    hidden: { opacity: 0, y: motionTokens.distance.subtle },
    visible: { opacity: 1, y: 0 },
  },
  image: {
    hidden: { opacity: 0, scale: 1.015 },
    visible: { opacity: 1, scale: 1 },
  },
  section: {
    hidden: { opacity: 0, y: motionTokens.distance.section },
    visible: { opacity: 1, y: 0 },
  },
} satisfies Record<string, Variants>;

export type RevealVariant = keyof typeof revealVariants;
