"use client";

import Navbar from "@/layout/navbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import socials from "@/data/socials.json";
import HeroText from "@/ui/web/hero-text";
import About from "@/ui/web/about";
import MiniGame from "@/ui/web/mini-game";
import Features from "@/ui/web/features";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Info from "@/ui/web/info";
import Lottie from "lottie-react";
import animationData from "@/lottie/glow.json";
import Details from "@/ui/web/details";
import WaitlistDisplay from "@/ui/web/wailtist";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import { useOptimizedLenis } from "@/hooks/useLenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HomeContent() {
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [hideSocials, setHideSocials] = useState(false);
  const lenis = useOptimizedLenis();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const waitlistEl = document.getElementById("waitlist");
    if (!waitlistEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHideSocials(entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0.01,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(waitlistEl);

    return () => observer.disconnect();
  }, []);

  // Scroll snap functionality
  useEffect(() => {
    if (!lenis || !mainRef.current) return;

    const sections = mainRef.current.querySelectorAll('[data-scroll-section]');
    
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          // Smooth scroll to section center when entering
          if (lenis) {
            const sectionRect = section.getBoundingClientRect();
            const sectionTop = sectionRect.top + window.scrollY;
            lenis.scrollTo(sectionTop - window.innerHeight * 0.1, {
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [lenis]);

  return (
    <div 
      ref={mainRef}
      className="relative w-full max-w-7xl mx-auto transition-colors duration-300"
    >
      <Navbar />
      
      <div data-scroll-section>
        <HeroText />
      </div>
      
      <div data-scroll-section>
        <Info />
      </div>
      
      <div data-scroll-section>
        <MiniGame onGameComplete={setIsGameComplete} />
      </div>
      
      <div data-scroll-section>
        <Features />
      </div>
      
      <div data-scroll-section>
        <About />
      </div>
      
      <div data-scroll-section>
        <Details />
      </div>

      {/* Social Navigation */}
      <nav
        className={`fixed top-1/2 -translate-y-1/2 right-[5%] flex flex-col gap-4 transition-all duration-500 z-50 ${
          hideSocials 
            ? "opacity-0 pointer-events-none translate-x-8" 
            : "opacity-100 pointer-events-auto translate-x-0"
        }`}
        aria-label="Social media links"
      >
        {socials.map((social) => (
          <Link
            key={social.title}
            href={social.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-max border border-white/20 backdrop-blur-sm rounded-lg p-3 transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            aria-label={social.title}
          >
            <Icon
              icon={social.icon}
              width={18}
              height={18}
              aria-hidden="true"
              className="text-white"
            />
          </Link>
        ))}
      </nav>

      {/* Background Elements */}
      <Image
        src="/videos/earth-gray.gif"
        alt="Rotating gray earth"
        width={0}
        height={0}
        fetchPriority="high"
        className={`w-full h-full object-fill fixed top-56 -left-[30%] inset-0 -z-10 transition-opacity duration-300 ${isGameComplete ? "opacity-0" : "opacity-100"
          }`}
        draggable={false}
        unoptimized
      />
      <Image
        src="/videos/earth-colour.gif"
        alt="Rotating colour earth"
        width={0}
        height={0}
        fetchPriority="high"
        className={`w-full h-full object-cover fixed top-[40%] -left-[35%] inset-0 -z-10 transition-opacity duration-300 ${isGameComplete ? "opacity-100" : "opacity-0"
          }`}
        draggable={false}
        unoptimized
      />

      <div>
        <Lottie
          animationData={animationData}
          loop={true}
          width={0}
          height={0}
          className="fixed w-max h-max top-[50%] translate-y-[-50%] right-[-60%] object-fill inset-0 -z-10 pointer-events-none"
        />
      </div>


    </div>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="w-full min-h-screen">
        <HomeContent />
        <WaitlistDisplay />
      </div>
    </SmoothScrollProvider>
  );
}