"use client";

// import AnimatedEllipses from "@/animations/animated-ellipses";
import Navbar from "@/layout/navbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import socials from "@/data/socials.json";
import HeroText from "@/ui/web/hero-text";
import About from "@/ui/web/about";
import MiniGame from "@/ui/web/mini-game";
import Features from "@/ui/web/features";
import Link from "next/link";
import { useState } from "react";
import { ReactLenis } from "lenis/react";
import Info from "@/ui/web/info";

export default function Home() {
  const [isGameComplete, setIsGameComplete] = useState(false);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <div className="relative w-full transition-colors duration-300">
        <Image
          src="/videos/earth-gray.gif"
          alt="Rotating gray earth"
          width={0}
          height={0}
          fetchPriority="high"
          className={`w-full h-full object-fill fixed top-56 -left-[30%] inset-0 z-0 transition-opacity duration-300 ${
            isGameComplete ? "opacity-0" : "opacity-100"
          }`}
          draggable={false}
        />
        <Image
          src="/videos/earth-colour.gif"
          alt="Rotating colour earth"
          width={0}
          height={0}
          fetchPriority="high"
          className={`w-full h-full object-cover fixed top-[40%] -left-[35%] inset-0 z-0 transition-opacity duration-300 ${
            isGameComplete ? "opacity-100" : "opacity-0"
          }`}
          draggable={false}
        />

        <div className="relative w-full max-w-[75em] mt-48 mx-auto h-screen flex flex-col z-10 snap-mandatory">
          <Navbar />
          <HeroText />
          <Info />
          <MiniGame onGameComplete={setIsGameComplete} />
          <Features />
          <About />

          <nav
            className="fixed top-[50%] translate-y-[50%] right-[10%] flex flex-col gap-4"
            aria-label="Social media links"
          >
            {socials.map((social) => (
              <Link
                key={social.title}
                href={social.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-max border rounded-lg p-2 transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                aria-label={social.title}
                tabIndex={0}
              >
                <Icon
                  icon={social.icon}
                  width={18}
                  height={18}
                  aria-hidden="true"
                  focusable="false"
                />
              </Link>
            ))}
          </nav>
        </div>

        <Image
          src="/images/gradient.svg"
          width={0}
          height={0}
          alt="Gradient"
          className="w-full h-full object-fill fixed top-0 right-0 inset-0 z-0"
          draggable={false}
        />

        {/* <div className="fixed top-0 right-0 w-max h-fit z-0">
          <AnimatedEllipses />
        </div> */}
      </div>
    </ReactLenis>
  );
}
