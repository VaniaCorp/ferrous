import { useRef, useCallback, useState } from "react";
import moneyLottie from "@/lottie/money-lottie.json";
import walletLottie from "@/lottie/wallet-lottie.json";
import fireLottie from "@/lottie/fire-lottie.json";
import phoneLottie from "@/lottie/phone-lottie.json";
import ExpandableCard from "@/components/expandable-card";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

const data = [
  {
    id: 1,
    title: "Mobile Money Integration",
    content:
      "Ferrous integrates with mobile wallets like M-Pesa, MTN Mobile Money, and bank transfers enabling local deposits with no banking barriers or international card limitations. The platform removes the complexity of Web3—no wallets, no gas fees, no seed phrases. Just tap, invest, and grow. All the tech is abstracted under the hood.",
    truncatedContent:
      "Ferrous integrates with mobile wallets like M-Pesa, MTN Mobile Money, and bank transfers enabling local deposits with no banking barriers or international card limitations.",
    animationData: moneyLottie,
  },
  {
    id: 2,
    title: "AI-Driven Investment Engine",
    content:
      "The platform removes the complexity of Web3—no wallets, no gas fees, no seed phrases. Just tap, invest, and grow. All the tech is abstracted under the hood. Gas fees? Seed phrases? Wallet addresses? We handle all of that for you so you can focus on what matters: growing your investment.",
    truncatedContent:
      "A powerful AI guides users through personalized investment strategies based on their income, goals, and risk tolerance automating decisions previously reserved for expert advisors.",
    animationData: walletLottie,
  },
  {
    id: 3,
    title: "Stablecoin-Powered Asset Access",
    content:
      "The platform removes the complexity of Web3—no wallets, no gas fees, no seed phrases. Just tap, invest, and grow. All the tech is abstracted under the hood. Gas fees? Seed phrases? Wallet addresses? We handle all of that for you so you can focus on what matters: growing your investment.",
    truncatedContent:
      "Ferrous enables seamless deposits via mobile money and local banks, eliminating foreign exchange barriers and making global investment accessible with the currencies people already use and trust.",
    animationData: fireLottie,
  },
  {
    id: 4,
    title: "Zero Jargon User Experience",
    content:
      "The platform removes the complexity of Web3—no wallets, no gas fees, no seed phrases. Just tap, invest, and grow. All the tech is abstracted under the hood. Gas fees? Seed phrases? Wallet addresses? We handle all of that for you so you can focus on what matters: growing your investment.",
    truncatedContent:
      "The platform removes the complexity of Web3 no wallets, no gas fees, no seed phrases. Just tap, invest, and grow. All the tech is abstracted under the hood.",
    animationData: phoneLottie,
  },
];

interface CardWithAnimationProps {
  item: typeof data[0];
}

function CardWithAnimation({ item }: CardWithAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardToggle = useCallback((newExpandedState: boolean) => {
    // Update state and trigger animation simultaneously
    setIsExpanded(newExpandedState);

    // Trigger animation immediately without any delay
    if (lottieRef.current) {
      if (newExpandedState) {
        // Play animation forward when expanding
        lottieRef.current.setDirection(1);
        lottieRef.current.goToAndPlay(0, true); // Start from beginning and play
      } else {
        // Play animation backward when collapsing
        lottieRef.current.setDirection(-1);
        lottieRef.current.goToAndPlay(lottieRef.current.getDuration(true) || 0, true); // Start from end and play backward
      }
    }
  }, []);

  return (
    <div
      className={`relative w-max mx-auto h-screen max-h-[75em] flex items-center gap-8
        ${item.id % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"}
        flex-col-reverse 
        `}
    >
      <div className="flex-1">
        <ExpandableCard
          title={item.title}
          content={item.content}
          truncatedContent={item.truncatedContent}
          expanded={isExpanded}
          onToggle={handleCardToggle}
        />
      </div>
      <div className="flex-1 w-[15em] h-[15em] lg:w-[30em] lg:h-[30em]">
        <Lottie
          lottieRef={lottieRef}
          animationData={item.animationData}
          loop={false}
          autoplay={false}
          width={0}
          height={0}
          className="w-full h-full object-fit inset-0 pointer-events-none"
        />
      </div>
    </div>
  );
}

export default function Details() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12">
      {data?.map((item) => (
        <CardWithAnimation key={item.id} item={item} />
      ))}
    </div>
  );
}