"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Shield, Lock, Scale, Eye } from "lucide-react";

export function TrustSafety() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const trustFeatures = [
    {
      icon: Shield,
      title: "100% Data Ownership",
      description: "You retain full control over your data at all times",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lock,
      title: "SOC 2 Type II Certified",
      description: "Enterprise-grade security with industry-leading standards",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Scale,
      title: "Ethics-First Design",
      description: "Granular permissions and ethical data handling",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Eye,
      title: "Complete Transparency",
      description: "Real-time audit trails and full visibility",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-background to-gray-50/50 dark:to-gray-900/50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trust & Safety Framework
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your data security and privacy are our top priorities. We've built enterprise-grade 
            protections to ensure your business intelligence remains safe and under your control.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 hover:shadow-xl">
                {/* Animated Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Progress bar for security metrics */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>Security Score</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : {}}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className={`h-2 rounded-full bg-gradient-to-r ${feature.color}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Security Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">99.99%</div>
            <div className="text-gray-600 dark:text-gray-300">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">256-bit</div>
            <div className="text-gray-600 dark:text-gray-300">Encryption</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Security Monitoring</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
