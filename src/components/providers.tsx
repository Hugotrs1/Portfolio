"use client";

import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -64 } });
    return () => lenis.destroy();
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
