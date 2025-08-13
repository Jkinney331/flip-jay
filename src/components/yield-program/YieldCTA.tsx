"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { LiquidButton } from "@/components/ui/Liquid-button";
import { Download, Clock } from "lucide-react";

export function YieldCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set target date (30 days from now)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-400 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Data Into an Asset?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Only 50 companies will be selected for the 2025 cohort. 
            Don't miss your opportunity to join the exclusive group monetizing their business intelligence.
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-blue-300" />
            <span className="text-blue-300 font-medium">Application Deadline</span>
          </div>
          
          <div className="flex justify-center gap-4 md:gap-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-blue-200 capitalize">
                    {unit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <LiquidButton className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100">
            Schedule Confidential Consultation
          </LiquidButton>
          
          <button className="flex items-center gap-2 px-6 py-4 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors">
            <Download className="w-5 h-5" />
            Download Executive Brief
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-6 text-blue-200"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">SOC 2 Type II Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">100% Data Ownership</span>
          </div>
        </motion.div>

        {/* Urgency Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-red-400/30">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-200 text-sm font-medium">
              Limited Availability - Only 3 Spots Remaining
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
