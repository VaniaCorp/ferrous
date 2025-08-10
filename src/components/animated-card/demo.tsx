"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedCard from "./index";

export default function AnimatedCardDemo() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardToggle = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const cards = [
    {
      id: "currency",
      imageSrc: "/images/coins.png",
      imageAlt: "Currency coins",
      title: "Native Currency On-Ramps",
      content: `Over 350 million adults in Africa alone remain unbanked, facing systemic challenges that include limited access to traditional banking services, high transaction costs, and outdated financial infrastructures that fail to meet the needs of emerging economies.

By leveraging the widespread adoption of mobile money and combining it with the intelligence of advanced AI, Ferrous breaks through the walls that have kept millions excluded from global financial opportunities. Users can now deposit local currency through familiar mobile channels without needing international cards, complex KYC processes, or facing the friction of traditional banking systems.

Once inside, AI does the heavy lifting—guiding users with personalized investment strategies, managing risk, and handling all the technical complexity of the financial system in the background. This creates a seamless experience where users can focus on their financial goals while the platform handles the complexities of global finance.`
    },
    {
      id: "calculator",
      imageSrc: "/images/calculator.png",
      imageAlt: "Financial calculator",
      title: "Smart Investment Tools",
      content: `Our advanced AI-powered calculator provides real-time investment insights, portfolio optimization, and risk assessment. Get personalized recommendations based on your financial goals and market conditions.`
    },
    {
      id: "fitness",
      imageSrc: "/images/dumbell.png",
      imageAlt: "Fitness and wellness",
      title: "Health & Wellness Tracking",
      content: `Monitor your physical and financial health with our integrated wellness platform. Track your fitness goals while building wealth through smart financial planning.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-white text-center mb-12"
          animate={{
            opacity: expandedCard ? 0.3 : 1,
            scale: expandedCard ? 0.9 : 1
          }}
          transition={{ duration: 0.4 }}
        >
          Animated Cards Demo
        </motion.h1>
        
        <div className="relative">
          {/* Show all cards in grid when none are expanded */}
          <AnimatePresence mode="wait">
            {!expandedCard && (
              <motion.div 
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.5,
                  staggerChildren: 0.1,
                  delayChildren: 0.1
                }}
              >
                {cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    <AnimatedCard
                      imageSrc={card.imageSrc}
                      imageAlt={card.imageAlt}
                      title={card.title}
                      content={card.content}
                      isExpanded={false}
                      onToggle={() => handleCardToggle(card.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show only the expanded card when one is selected */}
          <AnimatePresence mode="wait">
            {expandedCard && (
              <motion.div 
                key="expanded"
                className="w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 25
                }}
              >
                {cards
                  .filter(card => card.id === expandedCard)
                  .map((card) => (
                    <AnimatedCard
                      key={card.id}
                      imageSrc={card.imageSrc}
                      imageAlt={card.imageAlt}
                      title={card.title}
                      content={card.content}
                      isExpanded={true}
                      onToggle={() => handleCardToggle(card.id)}
                    />
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
