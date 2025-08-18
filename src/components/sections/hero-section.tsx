"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { LiquidButton } from "../ui/Liquid-button";
import { useDomainContent } from "@/hooks/useDomainContent";

const HeroSection = () => {
  const heroData = useDomainContent().getContent('hero');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const rotatingWords = ["Web Development", "AI Integrations", "UX/UI Design", "QA", "Mobile Development", "Maintenance", "Mobile Design", "Marketing"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-900 pt-32">
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for work
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-black dark:text-white mb-6 leading-tight"
        >
          On-Demand{" "}
          <span className="inline-block">
            <motion.span
              key={currentWordIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-blue-600 dark:text-blue-400"
            >
              {rotatingWords[currentWordIndex]}
            </motion.span>
          </span>
          , Done Right
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-black dark:text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          From quick fixes to complete builds, I deliver. Whether you need a bug squashed or an MVP launched, I'm your guy. Hourly or fixed-fee—your project, your choice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => {
              window.open("https://calendly.com/jay-flip-tech/flip-tech-pro-introduction-call", "_blank", "noopener,noreferrer");
            }}
            className="px-8 py-4 text-lg font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            Book a Call
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("contact");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 text-lg font-medium bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            Start Your Project
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;