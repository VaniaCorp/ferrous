import AnimatedCard from "@/components/animated-card";
import features from "@/data/features.json";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Features() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardToggle = (featureTitle: string) => {
    setExpandedCard(featureTitle);
  };

  const handleClose = () => {
    setExpandedCard(null);
  };

  return (
    <div className="relative w-full h-[50em] my-52 py-[25em] flex gap-8 items-center justify-between">
      <AnimatePresence mode="wait">
        {expandedCard === null ? (
          features.map((feature) => (
            <motion.div
              key={feature.title}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 40 }}
              transition={{ type: "keyframes", stiffness: 300, damping: 30 }}
            >
              <AnimatedCard
                imageSrc={feature.image}
                title={feature.title}
                content={feature.description}
                isExpanded={false}
                onToggle={() => handleCardToggle(feature.title)}
              />
            </motion.div>
          ))
        ) : (
          (() => {
            const feature = features.find(f => f.title === expandedCard);
            if (!feature) return null;
            return (
              <motion.div
                key={feature.title}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 40 }}
                transition={{ type: "keyframes", stiffness: 300, damping: 30 }}
                className="w-full flex items-center justify-center"
              >
                <AnimatedCard
                  imageSrc={feature.image}
                  title={feature.title}
                  content={feature.description}
                  isExpanded={true}
                  onToggle={handleClose}
                />
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>
    </div>
  );
}
