"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef, useEffect } from "react";

gsap.registerPlugin(SplitText);

interface InitialLoaderProps {
  onComplete: () => void;
  pageRef?: React.RefObject<HTMLDivElement | null>;
}

export default function InitialLoader({ onComplete, pageRef }: InitialLoaderProps) {
  const loaderRef = useRef(null);
  const containerRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const firstCursorRef = useRef(null);
  const secondCursorRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !firstTextRef.current || !secondTextRef.current || !firstCursorRef.current || !secondCursorRef.current) return;

    // Prevent scroll during loader animation
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const firstSplit = new SplitText(firstTextRef.current, { type: "chars" });
    const secondSplit = new SplitText(secondTextRef.current, { type: "chars" });

    gsap.set([firstSplit.chars, secondSplit.chars], { opacity: 0 });
    gsap.set(secondTextRef.current, { opacity: 0 });
    gsap.set(firstCursorRef.current, { x: 0 });
    gsap.set(secondCursorRef.current, { x: 0 });
    
    // Ensure page starts at opacity 0
    if (pageRef?.current) {
      gsap.set(pageRef.current, { opacity: 0 });
    }

    const durations = {
      first: 4,
      pause: 0.2,
      second: 5.8
    };

    const charWidth = 18; // Approximate pixel width per character (adjust based on font)

    const tl = gsap.timeline({
      onComplete: () => {
        firstSplit.revert();
        secondSplit.revert();
        // Don't call onComplete here - call it after loader fades out
      }
    });

    tl.to(firstSplit.chars, {
      opacity: 1,
      duration: 0,
      stagger: durations.first / firstSplit.chars.length,
      onUpdate: function() {
        const progress = this.progress();
        const charIndex = Math.floor(progress * firstSplit.chars.length);
        gsap.set(firstCursorRef.current, { x: charIndex * charWidth });
      }
    })
    .to(firstCursorRef.current, { opacity: 0, duration: 0 })
    .to({}, durations.pause, {})
    .to(secondTextRef.current, { opacity: 1, duration: 0 })
    .to(secondSplit.chars, {
      opacity: 1,
      duration: 0,
      stagger: durations.second / secondSplit.chars.length,
      onUpdate: function() {
        const progress = this.progress();
        const charIndex = Math.floor(progress * secondSplit.chars.length);
        gsap.set(secondCursorRef.current, { x: charIndex * charWidth });
      }
    })
    .to(secondCursorRef.current, {
      x: `+=4`,
      width: 8,
      duration: 0.2
    })
    .to({}, { duration: 0.8 }) // Longer pause for dramatic effect
    .to(loaderRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power1.inOut",
      onComplete: () => {
        // Small delay before calling onComplete to ensure smooth transition
        setTimeout(() => {
          // Ensure loader is completely hidden and doesn't block interactions
          if (loaderRef.current) {
            gsap.set(loaderRef.current, { 
              display: "none",
              pointerEvents: "none"
            });
          }
          // Call the completion callback after loader is fully hidden
          onComplete();
        }, 100);
      }
    });

    // Add page fade-in to timeline only if pageRef exists - start earlier for subtle crossfade
    if (pageRef?.current) {
      tl.to(pageRef.current, {
        opacity: 1,
        duration: 1.6,
        ease: "power1.inOut"
      }, "-=0.8"); // Start 0.8 seconds before loader fade completes for smooth crossfade
    }

  }, [onComplete, pageRef]);

  // Cleanup effect to ensure scroll is restored if component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const texts = {
    first: "FERROUS",
    second: "LOCAL MONEY. GLOBAL ACCESS"
  };

  return (
    <div ref={loaderRef} className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="p-4">
        <div ref={containerRef} className="text-white font-mono flex flex-col text-center space-y-4">
          <div ref={firstTextRef} className="relative inline-block text-2xl md:text-3xl">
            {texts.first}
            <span ref={firstCursorRef} className="cursor absolute animate-blink">|</span>
          </div>
          <div ref={secondTextRef} className="relative inline-block mt-2 text-3xl md:text-4xl lg:text-5xl font-black">
            {texts.second}
            <span ref={secondCursorRef} className="cursor absolute animate-blink">|</span>
          </div>
        </div>
      </div>
    </div>
  );
}