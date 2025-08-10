"use client";

import React, { useEffect, useState } from "react";
import { FlippingCard } from "../sections/flipping-card";
import { Code2, TrendingUp, Zap, Settings } from "lucide-react";

// Unified gradient for all "Hidden Advantage" cards
const CARD_GRADIENT = "from-blue-600 via-blue-500 to-indigo-600";

const hiddenAdvantageData = [
  {
    front: {
      icon: <Code2 size={56} className="text-white drop-shadow-lg" />,
      title: "Technical Expertise",
      gradient: CARD_GRADIENT
    },
    back: {
      description: "We speak both languages—complex AI and practical business. Our engineers don't just build, they build what matters."
    }
  },
  {
    front: {
      icon: <TrendingUp size={56} className="text-white drop-shadow-lg" />,
      title: "Business Acumen",
      gradient: CARD_GRADIENT
    },
    back: {
      description: "We've been in your shoes. We know what keeps you up at night and what moves the needle. Every solution is designed for real-world impact."
    }
  },
  {
    front: {
      icon: <Zap size={56} className="text-white drop-shadow-lg" />,
      title: "Rapid Execution",
      gradient: CARD_GRADIENT
    },
    back: {
      description: "While others plan, we deliver. Our 14-day promise isn't a gimmick—it's our proven methodology that gets you results before competitors finish their first meeting."
    }
  },
  {
    front: {
      icon: <Settings size={56} className="text-white drop-shadow-lg" />,
      title: "Future-Ready Solutions",
      gradient: CARD_GRADIENT
    },
    back: {
      description: "We don't just solve today's problems. Our AI solutions are built to evolve with your business and stay ahead of the curve."
    }
  }
];

export default function GlowCard() {
  // cardWidth is computed on client to allow responsive numeric width prop for FlippingCard
  const [cardWidth, setCardWidth] = useState<number>(400);

  useEffect(() => {
    function computeWidth() {
      const w = window.innerWidth;

      // tuned breakpoints — tweak numbers as you like
      if (w >= 1600) return 520; // very large monitors -> biggest cards
      if (w >= 1280) return 480; // xl
      if (w >= 1024) return 420; // lg
      if (w >= 768) return 380; // md / tablet
      // mobile: use almost full width but keep some padding (px-4 -> 32)
      return Math.max(300, w - 48);
    }

    // set initial + listen to resize
    const handler = () => setCardWidth(computeWidth());
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // height keeps card proportional — adjust ratio if you want taller/shorter
  const cardHeight = Math.round(cardWidth * 0.72);

  return (
    <section className="w-full px-8 md:px-10 lg:px-16 xl:px-24 py-20 border-t border-border relative z-10">
      {/* Section Heading */}
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 dark:text-white text-gray-900">
        The Hidden Advantage
      </h2>

      {/* Responsive Grid:
          - 1 col on mobile
          - 2 cols on small/medium
          - 3 cols on large
          - 4 cols on xlarge (if space)
          We center items with justify-items-center so each card sits nicely even if grid is wide.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {hiddenAdvantageData.map((card, i) => (
          <div key={i} className="w-full flex justify-center">
            {/* wrapper enforces max width (cardWidth) but stays responsive via maxWidth 100% */}
            <div style={{ width: cardWidth, maxWidth: "100%" }} className="w-full">
              <FlippingCard
                frontContent={
                  <div
                    className={`flex flex-col items-center justify-center h-full p-8 text-center bg-gradient-to-br ${card.front.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
                    </div>

                    <div className="relative z-10">
                      <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
                        {card.front.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                        {card.front.title}
                      </h3>
                      <div className="w-20 h-1 bg-white/30 rounded-full mx-auto" />
                    </div>
                  </div>
                }
                backContent={
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {card.front.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {card.back.description}
                    </p>
                  </div>
                }
                height={cardHeight}
                width={cardWidth}
                className="w-full shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 transform hover:-translate-y-2"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
