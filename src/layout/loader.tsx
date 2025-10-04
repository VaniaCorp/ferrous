"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

interface InitialLoaderProps {
  onComplete: () => void;
  pageRef?: React.RefObject<HTMLDivElement | null>;
}

export default function InitialLoader({ onComplete, pageRef }: InitialLoaderProps) {
  const loaderRef = useRef(null);
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const textRef4 = useRef(null);
  const cursorRef1 = useRef(null);
  const cursorRef2 = useRef(null);
  const cursorRef3 = useRef(null);
  const cursorRef4 = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef1.current || !textRef2.current || !textRef3.current || !textRef4.current || !cursorRef1.current || !cursorRef2.current || !cursorRef3.current || !cursorRef4.current) return;

    const elements = [textRef1.current, textRef2.current, textRef3.current, textRef4.current];
    const cursors = [cursorRef1.current, cursorRef2.current, cursorRef3.current, cursorRef4.current];
    
    // Split first 3 texts by characters, last text by words AND chars for proper wrapping
    const splits = [
      new SplitText(textRef1.current, { type: "chars" }),
      new SplitText(textRef2.current, { type: "chars" }),
      new SplitText(textRef3.current, { type: "chars" }),
      new SplitText(textRef4.current, { type: "words,chars" })
    ];

    // Start hidden
    gsap.set(elements, { opacity: 0 });
    gsap.set(splits.slice(0, 3).map(s => s.chars).flat(), { opacity: 0 });
    gsap.set(splits[3].chars, { opacity: 0 });
    gsap.set(cursors, { x: 0, opacity: 1, width: 2 });

    const charWidth = 18; // Approximate pixel width per character

    const perLineDurations = [3.0, 3.0, 2.5, 4.0];

    const tl = gsap.timeline({
      onComplete: () => {
        splits.forEach(s => s.revert());
        // Don't call onComplete here - call it after loader fades out
      }
    });

    elements.forEach((el, idx) => {
      const split = splits[idx];
      const cursor = cursors[idx];
      const isLast = idx === elements.length - 1;
      const typeDuration = perLineDurations[idx];
      // const isLastText = idx === 3;

      tl.to(el, { opacity: 1, duration: 0 })
        .to(split.chars, {
          opacity: 1,
          duration: 0,
          stagger: typeDuration / split.chars.length,
          onUpdate: function() {
            const progress = this.progress();
            const charIndex = Math.floor(progress * split.chars.length);
            gsap.set(cursor, { x: charIndex * charWidth });
          }
        })
        .to(cursor, { x: "+=4", width: 8, duration: 0.25 })
        .to({}, { duration: 0.35 })
        .to(cursor, { opacity: isLast ? 1 : 0, duration: 0 })
        // Hide the current text before showing the next one (except for the last text)
        .to(el, { opacity: isLast ? 1 : 0, duration: 0 });
    });

    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power1.inOut",
      onComplete: () => {
        setTimeout(() => {
          if (loaderRef.current) {
            gsap.set(loaderRef.current, {
              display: "none",
              pointerEvents: "none"
            });
          }
          onComplete();
        }, 100);
      }
    });

  }, [onComplete, pageRef]);

  // No global scroll locking or page opacity manipulation to avoid blocking LCP

  const texts = {
    line1: "THE SYSTEM WAS NOT BROKEN.",
    line2: "IT WAS SIMPLY NOT YOURS.",
    line3: "UNTIL NOW.",
    line4: "FERROUS. Local Money. Global Access."
  };

  return (
    <div ref={loaderRef} className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="p-4">
        <div ref={containerRef} className="text-white font-mono flex flex-col text-center space-y-3 md:space-y-4">
          <div ref={textRef1} className="relative inline-block text-xl md:text-2xl">
            {texts.line1}
            <span ref={cursorRef1} className="cursor absolute animate-blink">|</span>
          </div>
          <div ref={textRef2} className="relative inline-block text-xl md:text-2xl">
            {texts.line2}
            <span ref={cursorRef2} className="cursor absolute animate-blink">|</span>
          </div>
          <div ref={textRef3} className="relative inline-block text-xl md:text-2xl">
            {texts.line3}
            <span ref={cursorRef3} className="cursor absolute animate-blink">|</span>
          </div>
          <div ref={textRef4} className="relative mt-1 md:mt-2 text-3xl md:text-4xl lg:text-5xl font-black max-w-xs md:max-w-none text-center whitespace-normal">
            {texts.line4}
            <span ref={cursorRef4} className="cursor absolute animate-blink">|</span>
          </div>
        </div>
      </div>
    </div>
  );
}