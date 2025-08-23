import { TextUpAnimation } from "@/animations/text-animation";

export default function HeroText() {
  return (
    <div className="w-full max-w-7xl h-screen max-h-[50em] mx-auto mt-72 flex flex-col gap-4">
      <div className="leading-none -space-y-4">
        <TextUpAnimation as="h1">
          WELCOME TO THE VAST
        </TextUpAnimation> <br />
        <TextUpAnimation as="h1">
          <span className="yellow-underline">UNEXPLORED</span> <br />
        </TextUpAnimation>
        <TextUpAnimation as="h1" className="max-md:mt-2">
          WORLD OF WEB3
        </TextUpAnimation>
      </div>

      <p className="w-full max-w-xl">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur saepe nostrum quo optio veritatis natus eligendi quidem modi dignissimos hic, facilis error molestias provident perspiciatis iste vero totam quaerat excepturi.
      </p>
    </div>
  )
}
