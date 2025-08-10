import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import React, { useRef, useEffect, useState } from "react";

type AnimatedCardProps = {
  imageSrc: string;
  title: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
};

export default function AnimatedCard({
  imageSrc,
  title,
  content,
  isExpanded,
  onToggle,
}: AnimatedCardProps) {
  // Truncate content for collapsed state
  const truncatedContent =
    content.length > 360 ? content.slice(0, 360) + "..." : content;

  // For auto-scroll and fade-in effect
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);

  // Split content into paragraphs
  const paragraphs = String(content)
    .split('\n')
    .filter(line => line.trim() !== '');

  // Auto-scroll logic
  useEffect(() => {
    if (!isExpanded) return;
    if (!scrollRef.current) return;
    if (isHovered) return;

    let cancelled = false;
    const container = scrollRef.current;
    const totalScroll = container.scrollHeight - container.clientHeight;
    if (totalScroll <= 0) return;

    // Duration for full scroll (ms)
    const duration = 6000 + totalScroll * 2; // a bit slower for longer content
    const start = performance.now();
    const initialScroll = container.scrollTop;

    function step(now: number) {
      if (cancelled) return;
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = initialScroll + totalScroll * progress;
      if (progress < 1 && !isHovered) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);

    return () => {
      cancelled = true;
    };
  }, [isExpanded, isHovered, content]);

  // Fade-in paragraphs as they come into view
  useEffect(() => {
    if (!isExpanded) return;
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const handleScroll = () => {
      const newVisible: number[] = [];
      const paraNodes = Array.from(container.querySelectorAll("p"));
      paraNodes.forEach((node, idx) => {
        const rect = (node as HTMLElement).getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        // If at least 40% of the paragraph is visible in the container
        const visibleHeight = Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top);
        if (visibleHeight > 0.4 * rect.height) {
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
  }, [isExpanded, content]);

  return (
    <AnimatePresence>
      {!isExpanded ? (
        <motion.div
          key="card-collapsed"
          className={`relative flex flex-col glass rounded-xl shadow-lg w-[370px] min-h-[600px] text-white transition-all duration-300 cursor-pointer overflow-hidden`}
          onClick={onToggle}
          style={{
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          layout
        >
          <motion.div className="absolute top-0 left-0 w-full h-full bg-olive-transparent px-8 py-12 flex items-center justify-center">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex flex-col items-start gap-8"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="flex flex-row gap-4 mt-2 mb-8 ml-2"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="relative w-max h-max"
                >
                  <Image
                    src={imageSrc}
                    alt={title}
                    title={title}
                    width={120}
                    height={120}
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <motion.h3
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="text-2xl font-bold leading-tight mb-4"
                >
                  {title}
                </motion.h3>
                <motion.article
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="text-base font-normal leading-relaxed tracking-wide opacity-90 space-y-4"
                >
                  {truncatedContent}
                </motion.article>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="card-expanded"
          className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center transition-all duration-500"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          onClick={onToggle}
          style={{
            background: "rgba(0,0,0,0)", // No overlay
          }}
          layout
        >
          <motion.div
            layoutId={`image-${title}`}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="relative w-max h-max"
          >
            <Image
              src={imageSrc}
              alt={title}
              title={title}
              width={700}
              height={700}
              className="object-contain inset-0 opacity-25 z-0 pointer-events-none"
              priority
            />
          </motion.div>

          <motion.div className="absolute top-0 left-0 w-full max-w-4xl h-full translate-x-[17%] z-10 flex flex-col gap-12">
            <motion.header className="w-full h-max flex items-center justify-between">
              <motion.h3 className="font-semibold text-3xl w-max max-w-72">{title}</motion.h3>
              <motion.button
                className="flex items-center justify-center p-3 border rounded-full"
                onClick={onToggle}
              >
                <Icon icon="mdi:arrow-left" className="text-white" width={32} height={32} />
              </motion.button>
            </motion.header>

            <motion.article
              className="w-full h-72 flex items-center justify-center overflow-hidden my-auto"
            >
              <div
                ref={scrollRef}
                className="prose prose-invert max-w-2xl text-lg opacity-90 space-y-4 text-left relative w-full h-full overflow-y-auto"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <style jsx>{`
                  div[ref]::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {paragraphs.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0.3, y: 20 }}
                    animate={{
                      opacity: visibleParagraphs.includes(idx) ? 1 : 0.3,
                      y: visibleParagraphs.includes(idx) ? 0 : 20,
                      transition: { duration: 0.5, delay: visibleParagraphs.includes(idx) ? 0.1 * idx : 0 }
                    }}
                    style={{
                      transition: "opacity 0.5s, transform 0.5s",
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.article>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
