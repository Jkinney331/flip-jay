"use client";

import React from "react";
import { GlowingEffect } from "./ui/AcetrinityGlowCard";
import { TrendingUp, Puzzle, Rocket } from "lucide-react";
import { motion } from "motion/react";

const reasons = [
  {
    title: "No Agency Overhead",
    description:
      "You're not paying for account managers—just senior hands-on work at $75/hr.",
    icon: <TrendingUp size={28} className="text-green-500 dark:text-green-400" />,
  },
  {
    title: "Flexible Engagement",
    description:
      "2 hours or 2 months; no retainers or minimums.",
    icon: <Puzzle size={28} className="text-blue-500 dark:text-blue-400" />,
  },
  {
    title: "Real Human, Real Fast",
    description:
      "I answer in hours, not days—Slack, email, text, or a quick call. Yes, I still pick up the phone.",
    icon: <Rocket size={28} className="text-purple-500 dark:text-purple-400" />,
  },
];

const WhyNowSection = () => {
  return (
    <section className="w-full px-6 py-20 max-w-full 2xl:px-24 mx-auto cursor-pointer">
      <h2 className="text-3xl font-bold text-center mb-12 dark:text-white text-gray-900">
        Why Now?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative group rounded-xl overflow-visible"
          >
            <GlowingEffect
              blur={14}
              glow
              spread={28}
              borderWidth={2}
              movementDuration={1.5}
              disabled={false}
            />

            <div className="relative z-10 rounded-xl border p-6 backdrop-blur-md bg-white/60 dark:bg-zinc-900/70 border-gray-300 dark:border-white/20 shadow-lg h-full min-h-[200px] flex flex-col">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyNowSection;
