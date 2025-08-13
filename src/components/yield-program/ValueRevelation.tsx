"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Check } from "lucide-react";

export function ValueRevelation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [revealedItems, setRevealedItems] = useState<number[]>([]);

  const valuePoints = [
    "Authentic business reasoning",
    "Decision-making patterns",
    "Workflow intelligence",
    "Problem-solving frameworks",
  ];

  // Simulate progressive reveal
  useState(() => {
    if (isInView) {
      valuePoints.forEach((_, index) => {
        setTimeout(() => {
          setRevealedItems(prev => [...prev, index]);
        }, index * 500);
      });
    }
  });

  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-50/50 dark:to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Interactive Globe */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative h-96 lg:h-[500px]"
          >
            {/* Simplified 3D Globe Visualization */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Globe Base */}
              <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl">
                {/* Data Flow Lines */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                  >
                    <div className="absolute top-0 left-1/2 w-1 h-8 bg-green-400 transform -translate-x-1/2" />
                    <div className="absolute bottom-0 left-1/2 w-1 h-8 bg-blue-400 transform -translate-x-1/2" />
                    <div className="absolute left-0 top-1/2 w-8 h-1 bg-purple-400 transform -translate-y-1/2" />
                    <div className="absolute right-0 top-1/2 w-8 h-1 bg-cyan-400 transform -translate-y-1/2" />
                  </motion.div>
                </div>

                {/* Connection Nodes */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-500" />
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-1000" />
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-1500" />

                {/* Center Value Counter */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-white">$1M+</div>
                    <div className="text-sm text-white/80">Annual Value</div>
                  </motion.div>
                </div>
              </div>

              {/* Floating Data Points */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 left-8 w-4 h-4 bg-green-400 rounded-full opacity-60"
              />
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-16 right-16 w-3 h-3 bg-blue-400 rounded-full opacity-60"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                className="absolute bottom-12 left-12 w-2 h-2 bg-purple-400 rounded-full opacity-60"
              />
            </div>
          </motion.div>

          {/* Right Side - Value Points */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Your Data Has Been Undervalued. Until Now.
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Discover the hidden value in your business intelligence that AI companies are willing to pay millions for.
              </p>
            </div>

            <div className="space-y-4">
              {valuePoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={revealedItems.includes(index) ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={revealedItems.includes(index) ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="pt-4"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
                <h3 className="text-xl font-semibold mb-2">Ready to Unlock Your Data's True Value?</h3>
                <p className="text-blue-100 mb-4">
                  Join the exclusive group of companies monetizing their business intelligence.
                </p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Calculate Your Value
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
