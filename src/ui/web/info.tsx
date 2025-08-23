import { TextUpAnimation } from "@/animations/text-animation";


export default function Info() {
  return (
    <div id="info" className="w-full max-w-7xl h-screen max-h-[50em] mx-auto flex flex-col gap-12">
      <div className="leading-none -space-y-4">
        <TextUpAnimation as="h1">
          <span className="yellow-underline">UNEXPLORED</span> AND <br />
        </TextUpAnimation>
        <TextUpAnimation as="h1">
          PURPOSELY <br />
        </TextUpAnimation>
        <TextUpAnimation as="h1">
          HIDDEN FROM REACH
        </TextUpAnimation>
      </div>

      <article className="w-full max-w-lg h-max max-h-96 overflow-y-auto flex flex-col gap-8">
        <p>
          <strong>AFRICA</strong> ipsum dolor sit amet consectetur. Id facilisi arcu nec ac dui ut a non.
          Pharetra orci egestas sed sit in interdum mauris nulla
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur. Id facilisi arcu nec ac dui ut a non.
          Pharetra orci egestas sed sit in interdum mauris nulla
        </p>
      </article>
    </div>
  )
}
