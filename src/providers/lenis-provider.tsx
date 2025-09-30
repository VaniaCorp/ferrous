"use client";
import { ReactLenis } from "@/lib/lenis";
import { ReactNode, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Only create Lenis instance on the client side
    if (typeof window === "undefined") return;

    const lenisInstance = new Lenis();
    setLenis(lenisInstance);
    
    // Throttle ScrollTrigger updates to once per frame
    let rafId: number | null = null;
    lenisInstance.on('scroll', () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        ScrollTrigger.update();
        rafId = null;
      });
    });

    // Drive Lenis with native rAF to reduce coupling
    const loop = (time: number) => {
      lenisInstance.raf(time);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  // Don't render ReactLenis until lenis is initialized
  if (!lenis) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
