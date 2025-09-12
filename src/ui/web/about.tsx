import { TextParagraphAnimation } from "@/animations/text-animation";
import useDeviceSize from "@/hooks/useDeviceSize";
import { motion } from "motion/react";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

const aboutParagraphs = [
  `Over 350 million adults in Africa alone remain unbanked, a staggering number that represents more than just statistics. It reflects real people, real dreams, and real barriers. And Africa isn't alone. Across many emerging economies in Latin America, Southeast Asia, and the Middle East, millions more face the same systemic challenges: limited access to formal banking, high transaction costs, restrictive international policies, and outdated financial infrastructures that were never built with them in mind.`,
  `By leveraging the widespread adoption of mobile money and combining it with the intelligence of advanced AI, Ferrous breaks through the walls that have kept billions locked out of meaningful financial growth. The platform enables users to deposit local currency through familiar mobile channels—no international cards, no complex KYC, no friction.`,
  `Once inside, AI does the heavy lifting—guiding users with personalized investment strategies, managing risk, and handling all the technical complexity of the global financial system in the background. No need to understand crypto. No need to study charts. Just access—seamless, transparent, and designed for inclusion.`,
  `This is how Ferrous bridges economies once blocked by infrastructure gaps, high fees, and bureaucracy. It's not just unlocking access to global investment markets—it's rewriting the rules so that underserved populations can finally participate, prosper, and preserve their wealth on their own terms.`
];

export default function About() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const upperRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);

  // State for upper section
  const [upperInView, setUpperInView] = useState(false);

  // State for article section
  const [articleInView, setArticleInView] = useState(false);

  // State for article scrolling functionality (from animated card)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'none'>('none');
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);
  const scrollAnimationRef = useRef<number | null>(null);
  const autoScrollRef = useRef<number | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Split content into paragraphs
  const paragraphs = aboutParagraphs.filter(line => line.trim() !== '');
  const isMobile = useDeviceSize();

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

  // Intersection observer for upper section - scrolls in first
  useEffect(() => {
    if (!upperRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setUpperInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    observer.observe(upperRef.current);
    return () => observer.disconnect();
  }, []);

  // Intersection observer for article section - scrolls in after upper
  useEffect(() => {
    if (!articleRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setArticleInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(articleRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle mouse position for scroll direction (from animated card)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    setIsAutoScrolling(false);

    const container = scrollRef.current;
    const rect = container.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const containerHeight = rect.height;

    if (mouseY < containerHeight * 0.2) {
      setScrollDirection('up');
    } else if (mouseY > containerHeight * 0.8) {
      setScrollDirection('down');
    } else {
      setScrollDirection('none');
    }
  };

  const handleMouseLeave = () => {
    setScrollDirection('none');
    setIsAutoScrolling(true);
  };

  // Smooth scrolling animation (manual via mouse)
  useEffect(() => {
    if (!scrollRef.current || scrollDirection === 'none') {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
        scrollAnimationRef.current = null;
      }
      return;
    }

    const container = scrollRef.current;
    const scrollSpeed = 2;

    const animate = () => {
      if (scrollDirection === 'up') {
        container.scrollTop = Math.max(0, container.scrollTop - scrollSpeed);
      } else if (scrollDirection === 'down') {
        container.scrollTop = Math.min(
          container.scrollHeight - container.clientHeight,
          container.scrollTop + scrollSpeed
        );
      }
      scrollAnimationRef.current = requestAnimationFrame(animate);
    };

    scrollAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
        scrollAnimationRef.current = null;
      }
    };
  }, [scrollDirection]);

  // Auto scroll effect (from animated card)
  useEffect(() => {
    if (!articleInView || !scrollRef.current || isReducedMotion) {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    if (!isAutoScrolling) {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    const container = scrollRef.current;
    const autoScrollSpeed = 0.5;
    let direction: "down" | "up" = "down";

    const autoScroll = () => {
      if (!container) return;

      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 1) {
        direction = "up";
      }
      if (container.scrollTop <= 0) {
        direction = "down";
      }

      if (direction === "down") {
        container.scrollTop = Math.min(
          container.scrollHeight - container.clientHeight,
          container.scrollTop + autoScrollSpeed
        );
      } else {
        container.scrollTop = Math.max(
          0,
          container.scrollTop - autoScrollSpeed
        );
      }

      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    autoScrollRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };
  }, [articleInView, isAutoScrolling, isReducedMotion]);

  // Handle user scroll to pause auto scroll
  useEffect(() => {
    if (!articleInView || !scrollRef.current) return;

    let timeout: NodeJS.Timeout | null = null;

    const handleUserScroll = () => {
      setIsAutoScrolling(false);
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 3000);
    };

    const container = scrollRef.current;
    container.addEventListener("wheel", handleUserScroll, { passive: true });
    container.addEventListener("touchmove", handleUserScroll, { passive: true });

    return () => {
      if (timeout) clearTimeout(timeout);
      container.removeEventListener("wheel", handleUserScroll);
      container.removeEventListener("touchmove", handleUserScroll);
    };
  }, [articleInView]);

  // Fade-in paragraphs as they come into view
  useEffect(() => {
    if (!articleInView || !scrollRef.current) return;

    const container = scrollRef.current;
    const handleScroll = () => {
      const newVisible: number[] = [];
      const paraNodes = Array.from(container.querySelectorAll("p"));

      paraNodes.forEach((node, idx) => {
        const rect = (node as HTMLElement).getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const visibleTop = Math.max(rect.top, containerRect.top);
        const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > 0.1 * rect.height) {
          newVisible.push(idx);
        }
      });

      setVisibleParagraphs(newVisible);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [articleInView]);

  // Calculate paragraph opacity based on position
  const getParagraphOpacity = (idx: number) => {
    if (!scrollRef.current) return visibleParagraphs.includes(idx) ? 1 : 0.3;

    const container = scrollRef.current;
    const paraNodes = Array.from(container.querySelectorAll("p"));
    const node = paraNodes[idx] as HTMLElement;

    if (!node) return 0.3;

    const rect = node.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const nodeCenter = rect.top + rect.height / 2;
    const containerCenter = containerRect.top + containerRect.height / 2;
    const distance = Math.abs(nodeCenter - containerCenter);
    const maxDistance = containerRect.height / 2;

    const opacity = Math.max(0.2, 1 - (distance / maxDistance) * 0.8);
    return opacity;
  };

  const autoScrollStatus = !isAutoScrolling
    ? "Article scrolling paused. Move mouse away to resume."
    : isReducedMotion
      ? "Auto-scrolling disabled due to reduced motion preference."
      : "Article auto-scrolling. Hover to control manually.";

  return (
    <main
      className="relative w-full h-screen max-h-[70em] my-12 flex flex-col gap-20 items-center justify-center"
      aria-label="About Ferrous"
      id="about-section"
    >
      <span className="sr-only" aria-live="polite">
        {autoScrollStatus}
      </span>

      <span className="text-base text-white/70" aria-hidden="true">
        Simple. Secure. designed for you
      </span>

      {/* Upper section - animates in first */}
      <motion.div
        ref={upperRef}
        className="flex flex-col items-center justify-center md:gap-4 font-light"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: upperInView ? 1 : 0,
          y: upperInView ? 0 : 50
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <TextParagraphAnimation as={isMobile ? "h3" : "h2"} className="!font-light">
          Ferrous bridges blocked
        </TextParagraphAnimation>
        <TextParagraphAnimation as={isMobile ? "h3" : "h2"} className="!font-light">
          economies to the global money pool turning
        </TextParagraphAnimation>
        <span className="flex items-center space-x-1 md:space-x-3">
          <TextParagraphAnimation as={isMobile ? "h3" : "h2"} className="!font-light">
            local
          </TextParagraphAnimation>
          <Image src={'/images/money-bar.svg'} width={isMobile ? 0 : 58} height={isMobile ? 0 : 58} alt="" />
          <TextParagraphAnimation as={isMobile ? "h3" : "h2"} className="!font-light">
            currency into smart investments using
          </TextParagraphAnimation>
        </span>
        <TextParagraphAnimation as={isMobile ? "h3" : "h2"} className="!font-light">
          AI and DeFi
        </TextParagraphAnimation>
      </motion.div>

      {/* Article section - animates in after upper */}
      <motion.article
        ref={articleRef}
        className="relative w-full max-w-4xl xl:max-w-6xl h-96 flex items-center justify-center overflow-hidden py-6"
        aria-label="About Ferrous details"
        role="region"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: articleInView ? 1 : 0,
          y: articleInView ? 0 : 50
        }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <div
          ref={scrollRef}
          className="prose prose-invert prose-base md:prose-2xl text-white/90 space-y-12 text-center relative w-full h-full overflow-y-auto focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          tabIndex={0}
          aria-label="About Ferrous article content"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {paragraphs.map((line, idx) => (
            <motion.p
              key={idx}
              className="!text-md lg:!text-lg leading-relaxed transition-all duration-300 text-center"
              style={{
                opacity: isReducedMotion ? 1 : getParagraphOpacity(idx),
                transform: `translateY(${visibleParagraphs.includes(idx) ? 0 : 10}px)`,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.article>
    </main>
  );
}