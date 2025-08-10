import { TextParagraphAnimation, TextWithImageAnimation } from "@/animations/text-animation";


export default function About() {
  return (
    <div className="w-full h-screen flex flex-col gap-12 items-center justify-center py-36">
      <span>Simple. Secure. designed for you</span>

      <div className="flex flex-col items-center justify-center gap-4 font-light">
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
      </div>
    </div>
  )
}
