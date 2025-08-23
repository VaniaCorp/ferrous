"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

export default function InitialLoader() {
  const containerRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const firstCursorRef = useRef(null);
  const secondCursorRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !firstTextRef.current || !secondTextRef.current || !firstCursorRef.current || !secondCursorRef.current) return;

    const firstSplit = new SplitText(firstTextRef.current, { type: "chars" });
    const secondSplit = new SplitText(secondTextRef.current, { type: "chars" });

    gsap.set([firstSplit.chars, secondSplit.chars], { opacity: 0 });
    gsap.set(secondTextRef.current, { opacity: 0 });
    gsap.set(firstCursorRef.current, { x: 0 });
    gsap.set(secondCursorRef.current, { x: 0 });

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
    });

  }, []);

  const texts = {
    first: "THEY BUILT A POWERFUL SYSTEM",
    second: "JUST NOT ONE FOR PEOPLE LIKE US"
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="p-4">
        <div ref={containerRef} className="text-white font-mono flex flex-col text-center space-y-4">
          <div ref={firstTextRef} className="relative inline-block underline text-2xl md:text-3xl">
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