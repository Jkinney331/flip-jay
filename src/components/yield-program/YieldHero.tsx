"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { LiquidButton } from "@/components/ui/Liquid-button";
import { Badge } from "@/components/ui/badge";
import { Play, ChevronDown } from "lucide-react";

export function YieldHero() {
  const [counterValue, setCounterValue] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterValue(prev => {
        if (prev < 50) {
          return prev + 1;
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const trustLogos = [
    { name: "OpenAI", logo: "/openai.svg" },
    { name: "Google", logo: "/google.svg" },
    { name: "Anthropic", logo: "/anthropoid.svg" },
    { name: "Microsoft", logo: "/microsoft.svg" },
    { name: "Perplexity", logo: "/perplexity.svg" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
        <div className="absolute inset-0 opacity-20">
          {/* Particle system - simplified for now */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-white rounded-full animate-pulse delay-2000" />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-3000" />
        </div>
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Badge className="bg-accent/20 text-accent-foreground border-accent/30 px-4 py-2 text-sm font-medium">
            Limited to 50 Companies
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          THE YIELD EQUITY PROGRAM
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
        >
          Transform Your Business Intelligence Into a Seven-Figure Asset
        </motion.p>

        {/* Dynamic Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <div className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-blue-400">$50B</span> Data Gap
          </div>
          <div className="text-2xl md:text-3xl font-bold text-green-400">
            $1M+ Your Annual Value
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <LiquidButton className="px-8 py-4 text-lg font-semibold">
            Calculate Your Data Value
          </LiquidButton>
          <button className="flex items-center gap-2 px-6 py-4 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors">
            <Play className="w-5 h-5" />
            Watch 2-Min Overview
          </button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-8"
        >
          <p className="text-gray-400 text-sm mb-4">Trusted by leading AI companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {trustLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="w-16 h-8 relative"
              >
                <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {logo.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
