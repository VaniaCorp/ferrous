"use client";
import Lottie from 'lottie-react';
import React, { useEffect, useState, useRef } from 'react';
import glowAnimation from "@/lottie/glow.json";
import blackWorldAnimation from "@/lottie/black-world-lottie.json";
import colouredWorldAnimation from "@/lottie/coloured-world-lottie.json";
import HeroText from '@/ui/web/hero-text';
import Info from '@/ui/web/info';
import MiniGame from '@/ui/web/mini-game';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import socials from '@/data/socials.json';
import Navbar from '@/layout/navbar';
import WaitlistDisplay from '@/ui/web/wailtist';
import Features from '@/ui/web/features';
import About from '@/ui/web/about';
import Details from '@/ui/web/details';
import Image from 'next/image';
import Partner from '@/ui/web/partner';
import InitialLoader from '@/layout/loader';
import { gsap } from 'gsap';
import useDeviceSize from '@/hooks/useDeviceSize';
import MobileMenu from '@/layout/mobile-menu';
import { FooterTrack } from '@/layout/mobile-footer';

export default function Home() {
  const [hideSocials, setHideSocials] = useState<boolean>(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceSize();

  useEffect(() => {
    if (typeof document === "undefined") return;

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

  useEffect(() => {
    if (isLoaderComplete) {
      setIsPageVisible(true);
      // Re-enable scroll after loader completes
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isLoaderComplete]);

  const handleLoaderComplete = () => {
    setIsLoaderComplete(true);
  };

  if (!isLoaderComplete) {
    return <InitialLoader onComplete={handleLoaderComplete} pageRef={pageRef} />;
  }

  return (
    <div
      ref={pageRef}
      className="relative w-full"
    >
      {isMobile ? <MobileMenu /> : <Navbar />}

      <HeroText isVisible={isPageVisible} />

      <Info />

      <MiniGame onGameComplete={setIsGameComplete} />

      <Features />

      <About />

      <Details />

      <Partner />

      <nav
        className={`fixed top-1/2 -translate-y-1/2 right-[5%] hidden md:flex flex-col gap-4 transition-all duration-500 z-50 ${hideSocials
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


      {isMobile ? (
        <Image
          src="/images/mobile-black-world.gif"
          alt='Black World'
          width={0}
          height={0}
          className={`fixed bottom-0 left-0 inset-0 w-full h-full object-cover -z-10 transition-all ease-in-out duration-300
            ${isGameComplete ? "opacity-0" : "opacity-40"}
            `}
        />
      ) : (
        <Lottie
          animationData={blackWorldAnimation}
          alt="Rotating gray earth"
          width={0}
          height={0}
          className={`w-full lg:h-full object-fill fixed top-[0%] lg:top-56 -left-[0%] inset-0 -z-10 transition-opacity ease-in-out duration-300 
          ${isGameComplete ? "opacity-0" : "opacity-100"
            }`}
        />
      )}

      {isMobile ? <FooterTrack /> : null}

      <WaitlistDisplay />


      {isMobile ? (
        <Image
          src="/images/mobile-color-world.gif"
          alt='Colour World'
          width={0}
          height={0}
          className={`fixed bottom-0 left-0 inset-0 w-full h-full object-cover -z-10 transition-all ease-in-out duration-300
            ${isGameComplete ? "opacity-50" : "opacity-0"}
            `}
        />
      ) : (
        <Lottie
          animationData={colouredWorldAnimation}
          alt="Rotating colour earth"
          width={0}
          height={0}
          className={`w-full h-full object-cover fixed top-[74%] lg:top-[20%] -left-[0%] inset-0 -z-10 transition-all ease-in-out duration-300 
            ${isGameComplete ? "opacity-50" : "opacity-0"
            }`}
        />
      )}

      <Lottie
        animationData={glowAnimation}
        loop
        width={0}
        height={0}
        className='fixed w-[60em] h-[60em] lg:w-max lg:h-max top-[50%] translate-y-[-50%] left-[-20%] xl:right-[-70%] inset-0 -z-10 pointer-events-none'
      />
    </div>
  )
}
