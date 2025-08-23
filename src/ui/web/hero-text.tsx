import { TextUpAnimation } from "@/animations/text-animation";
import { useEffect, useState } from "react";

interface HeroTextProps {
  isVisible: boolean;
}

export default function HeroText({ isVisible }: HeroTextProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

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
        <TextUpAnimation as="h1" shouldAnimate={shouldAnimate}>
          WELCOME TO THE VAST
        </TextUpAnimation> <br />
        <TextUpAnimation as="h1" shouldAnimate={shouldAnimate}>
          <span className="yellow-underline">UNEXPLORED</span> <br />
        </TextUpAnimation>
        <TextUpAnimation as="h1" className="max-md:mt-2" shouldAnimate={shouldAnimate}>
          WORLD OF WEB3
        </TextUpAnimation>
      </div>

      <p className="w-full max-w-xl">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur saepe nostrum quo optio veritatis natus eligendi quidem modi dignissimos hic, facilis error molestias provident perspiciatis iste vero totam quaerat excepturi.
      </p>
    </div>
  )
}
