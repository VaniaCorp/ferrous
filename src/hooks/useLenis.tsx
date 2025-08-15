"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

export function useOptimizedLenis() {
  const lenis = useLenis();
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!lenis) return;

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
    });

    // Smooth RAF integration
    function raf(time: number) {
      lenis?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
    };
  }, [lenis]);

  return lenis;
}