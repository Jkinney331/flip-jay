"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Database, Shield, FileText, BarChart3 } from "lucide-react";

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: Database,
      title: "Intelligent Extraction",
      description: "Our AI systems analyze your business data to identify valuable patterns and insights",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Ethical Structuring",
      description: "Data is anonymized and structured with privacy layers while preserving business value",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FileText,
      title: "Managed Licensing",
      description: "We handle all licensing agreements with AI companies on your behalf",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Continuous Monitoring",
      description: "Real-time tracking of data usage and revenue generation with detailed analytics",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50/50 dark:from-gray-900/50 to-background">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From data extraction to revenue generation, we handle the entire process 
            while you maintain complete control and ownership.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-600 h-full hidden md:block">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 2, delay: 0.5 }}
              className="w-full bg-gradient-to-b from-blue-500 to-purple-600"
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col`}
              >
                {/* Content */}
                <div className="flex-1 md:text-left text-center">
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Additional details that appear on hover */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>Automated processing</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span>Real-time validation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          <span>Quality assurance</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  {/* Connector line for mobile */}
                  <div className="md:hidden w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 mx-auto mt-4" />
                </div>

                {/* Spacer for desktop */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-semibold mb-4">
              Ready to Start Your Data Monetization Journey?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join the exclusive group of companies already generating seven-figure revenue 
              from their business intelligence.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
