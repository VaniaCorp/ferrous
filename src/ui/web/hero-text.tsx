import { TextUpAnimation } from "@/animations/text-animation";
import useDeviceSize from "@/hooks/useDeviceSize";
import { useEffect, useState } from "react";

interface HeroTextProps {
  isVisible: boolean;
}

export default function HeroText({ isVisible }: HeroTextProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { isMobile } = useDeviceSize();

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure smooth transition after page fade-in
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div className="w-full max-w-7xl h-screen max-h-[50em] lg:px-16 mx-auto mt-72 flex flex-col gap-4">
      <div className="leading-none -space-y-4">
        {isMobile ? (
          <span>
            <TextUpAnimation as="h1" className="!font-mono mb-6" shouldAnimate={shouldAnimate}>
              WELCOME TO THE
            </TextUpAnimation>
            <TextUpAnimation as="h1" className="!font-mono -mt-6 mb-7" shouldAnimate={shouldAnimate}>
              VAST
            </TextUpAnimation> <br />
          </span>
        ) : (
          <>
            <TextUpAnimation as="h1" className="!font-mono" shouldAnimate={shouldAnimate}>
              WELCOME TO THE VAST
            </TextUpAnimation> <br />
          </>
        )}
        <TextUpAnimation as="h1" className={`!font-mono ${isMobile ? "mb-2 -mt-2" : ""}`} shouldAnimate={shouldAnimate}>
          <span className="yellow-underline">UNEXPLORED</span> <br />
        </TextUpAnimation>
        <TextUpAnimation as="h1" className="!font-mono max-md:mt-2" shouldAnimate={shouldAnimate}>
          WORLD OF WEB3
        </TextUpAnimation>
      </div>

      <p className="w-full max-w-xl">
      Ferrous is the platform that bridges local currency to a diverse portfolio of tokenized real-world assets.  We offer access to a selection of assets like gold, treasuries, bonds, and stablecoin yields, empowering them to invest with zero required crypto expertise.
      </p>
    </div>
  )
}
