import { TextParagraphAnimation, TextWithImageAnimation } from "@/animations/text-animation";
import { motion } from "motion/react";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useLenis } from "lenis/react";

const aboutParagraphs = [
  `Over 350 million adults in Africa alone remain unbanked, a staggering number that represents more than just statistics. It reflects real people, real dreams, and real barriers. And Africa isn't alone. Across many emerging economies in Latin America, Southeast Asia, and the Middle East, millions more face the same systemic challenges: limited access to formal banking, high transaction costs, restrictive international policies, and outdated financial infrastructures that were never built with them in mind.`,
  `By leveraging the widespread adoption of mobile money and combining it with the intelligence of advanced AI, Ferrous breaks through the walls that have kept billions locked out of meaningful financial growth. The platform enables users to deposit local currency through familiar mobile channels—no international cards, no complex KYC, no friction.`,
  `Once inside, AI does the heavy lifting—guiding users with personalized investment strategies, managing risk, and handling all the technical complexity of the global financial system in the background. No need to understand crypto. No need to study charts. Just access—seamless, transparent, and designed for inclusion.`,
  `This is how Ferrous bridges economies once blocked by infrastructure gaps, high fees, and bureaucracy. It's not just unlocking access to global investment markets—it's rewriting the rules so that underserved populations can finally participate, prosper, and preserve their wealth on their own terms.`
];

export default function About() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const upperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [upperHidden, setUpperHidden] = useState(false);
  const lenis = useLenis();

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(media.matches);
      const handler = () => setIsReducedMotion(media.matches);
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, []);

  // Optimized auto-scroll with Lenis integration
  useEffect(() => {
    if (isReducedMotion || !scrollRef.current || isHovered || isFocused) return;

    let animationId: number;
    let startTime: number;
    const container = scrollRef.current;
    const totalScroll = container.scrollHeight - container.clientHeight;
    
    if (totalScroll <= 0) return;

    // Slower, more readable scroll speed
    const duration = 20000 + totalScroll * 6;

    function smoothScroll(timestamp: number) {
      if (!startTime) startTime = timestamp;
      if (isHovered || isFocused) return;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      container.scrollTop = totalScroll * easeProgress;

      if (progress < 1 && !isHovered && !isFocused) {
        animationId = requestAnimationFrame(smoothScroll);
      }
    }

    animationId = requestAnimationFrame(smoothScroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isHovered, isFocused, isReducedMotion]);

  // Enhanced scroll visibility detection
  useEffect(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const handleScroll = () => {
      const newVisible: number[] = [];
      const paraNodes = Array.from(container.querySelectorAll("p"));
      
      paraNodes.forEach((node, idx) => {
        const rect = (node as HTMLElement).getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top);
        
        // More sensitive visibility detection
        if (visibleHeight > 0.2 * rect.height) {
          newVisible.push(idx);
        }
      });
      
      setVisibleParagraphs(newVisible);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial visibility check
    const timeoutId = setTimeout(handleScroll, 100);
    
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Smooth mouse wheel handling
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    
    if (isHovered || isFocused) {
      // Allow native smooth scrolling when user is interacting
      e.stopPropagation();
      const container = scrollRef.current;
      container.scrollBy({
        top: e.deltaY * 0.5, // Smoother scroll speed
        behavior: 'auto'
      });
    } else {
      e.preventDefault();
    }
  }, [isHovered, isFocused]);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  // Enhanced intersection observer for upper section
  useEffect(() => {
    if (!upperRef.current || !scrollRef.current) return;

    const upper = upperRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setUpperHidden(!entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observer.observe(upper);

    return () => observer.disconnect();
  }, []);

  const autoScrollStatus = isHovered || isFocused
    ? "Article scrolling paused. You can now scroll manually."
    : isReducedMotion
      ? "Auto-scrolling disabled due to reduced motion preference."
      : "Article auto-scrolling. Hover or focus to pause.";

  return (
    <main
      className="relative w-full flex flex-col gap-12 items-center justify-center py-36"
      aria-label="About Ferrous"
      id="about-section"
    >
      <span className="sr-only" aria-live="polite">
        {autoScrollStatus}
      </span>
      
      <span className="text-sm text-white/70" aria-hidden="true">
        Simple. Secure. designed for you
      </span>

      <motion.div
        ref={upperRef}
        className="flex flex-col items-center justify-center gap-4 font-light"
        animate={{ 
          opacity: upperHidden ? 0 : 1,
          y: upperHidden ? -20 : 0
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <TextParagraphAnimation className="text-4xl text-center">
          Ferrous bridges blocked
        </TextParagraphAnimation>
        <TextParagraphAnimation className="text-4xl text-center">
          economies to the global money pool turning
        </TextParagraphAnimation>
        <TextWithImageAnimation
          leftText="local"
          rightText="currency into smart investments using"
          imageSrc="/images/money-bar.svg"
          imageAlt="money bar"
          className="text-4xl text-center"
        />
        <TextParagraphAnimation className="text-4xl text-center">
          AI and DeFi
        </TextParagraphAnimation>
      </motion.div>

      <motion.article
        className="relative w-full max-w-4xl h-80 flex items-center justify-center overflow-hidden py-6"
        aria-label="About Ferrous details"
        role="region"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <div
          ref={scrollRef}
          className="prose prose-invert max-w-2xl text-lg opacity-90 space-y-6 text-left relative w-full h-full overflow-y-auto focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg no-smooth-scroll"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.3) transparent",
          }}
          tabIndex={0}
          aria-label="About Ferrous article content"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onWheel={handleWheel}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 6px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background: rgba(255,255,255,0.3);
              border-radius: 3px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: rgba(255,255,255,0.5);
            }
          `}</style>
          
          {aboutParagraphs.map((line, idx) => (
            <motion.p
              key={idx}
              initial={isReducedMotion ? false : { opacity: 0.4, y: 15 }}
              animate={
                isReducedMotion
                  ? undefined
                  : {
                      opacity: visibleParagraphs.includes(idx) ? 1 : 0.4,
                      y: visibleParagraphs.includes(idx) ? 0 : 15,
                    }
              }
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: visibleParagraphs.includes(idx) ? idx * 0.1 : 0 
              }}
              className="leading-relaxed"
            >
              {line}
            </motion.p>
          ))}
        </div>
        
        {/* Enhanced status indicator */}
        <div
          className={`absolute bottom-3 right-3 px-3 py-1.5 text-xs rounded-full transition-all duration-300 pointer-events-none select-none backdrop-blur-sm ${
            isHovered || isFocused
              ? "bg-orange-500/90 text-white scale-105"
              : isReducedMotion
                ? "bg-gray-500/70 text-white/90"
                : "bg-blue-500/70 text-white/90 animate-pulse"
          }`}
          aria-hidden="true"
        >
          {isHovered || isFocused
            ? "Manual"
            : isReducedMotion
              ? "Static"
              : "Auto"}
        </div>
      </motion.article>
    </main>
  );
}