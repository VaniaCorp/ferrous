import { TextUpAnimation } from "@/animations/text-animation";


export default function Info() {
  return (
    <div id="info" className="w-full max-w-7xl h-screen max-h-[50em] lg:px-16 mx-auto flex flex-col gap-12">
      <div className="leading-none max-md:space-y-1">
        <TextUpAnimation as="h1" className="!font-mono uppercase">
          Your <span className="yellow-underline">gateway </span><br />
        </TextUpAnimation>
        <TextUpAnimation as="h1" className="!font-mono uppercase">
          to a borderless <br />
        </TextUpAnimation>
        <TextUpAnimation as="h1" className="!font-mono uppercase">
          financial future.
        </TextUpAnimation>
      </div>

      <article className="w-full max-w-lg h-max max-h-96 overflow-y-auto flex flex-col gap-8">
        <p>
          <strong>Ferrous</strong> connects the emerging market to the global blockchain
          economy. We offer financial empowerment by bridging your local currency directly to world-class assets.
        </p>

        <p>
          We eliminate the practical barriers and technical friction that previously made
          high-yield opportunities inaccessible, giving you direct access to a curated
          selection of yields and tokenized real-world assets. Deposit local, invest global: Discover your financial liberation.
        </p>
      </article>
    </div>
  )
}
