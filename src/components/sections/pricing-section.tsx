"use client";

import React from "react";
import { motion } from "motion/react";
import { LiquidButton } from "../ui/Liquid-button";
import { usePricingContent } from "@/hooks/useDomainContent";
import { CheckCircle } from "lucide-react";

const PricingSection = () => {
  const pricingData = usePricingContent();

  return (
    <section id="pricing" className="py-16 lg:py-32 dark:bg-zinc-900 bg-white">
      <div className="mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            No contracts, no minimums, no nonsense
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Hourly Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Hourly Rate
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                  $75
                </span>
                <span className="text-xl text-gray-600 dark:text-gray-300">/hour</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Best for: ongoing support, bug fixes, small features
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Pay only for time used",
                "Detailed time tracking",
                "Weekly invoicing",
                "No minimum hours",
                "Pause anytime",
                "Flexible scheduling"
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <LiquidButton
              onClick={() => {
                window.open("https://calendly.com/jay-flip-tech/flip-tech-pro-introduction-call", "_blank", "noopener,noreferrer");
              }}
              className="w-full py-4 text-lg"
            >
              Book a Call
            </LiquidButton>
          </motion.div>

          {/* Project-Based */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Project-Based
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                  Custom
                </span>
                <span className="text-xl text-gray-600 dark:text-gray-300"> quote</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Best for: clearly defined projects
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Fixed price certainty",
                "Milestone payments",
                "Defined deliverables",
                "Timeline guarantee",
                "Post-launch support included",
                "Change order process"
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <LiquidButton
              onClick={() => {
                window.open("https://calendly.com/jay-flip-tech/flip-tech-pro-introduction-call", "_blank", "noopener,noreferrer");
              }}
              className="w-full py-4 text-lg"
            >
              Book a Call
            </LiquidButton>
          </motion.div>
        </div>

        {/* Common Project Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Common Project Ranges
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Landing Page", price: "$1,500 - $3,500" },
              { name: "WordPress Site", price: "$2,500 - $7,500" },
              { name: "E-commerce Store", price: "$5,000 - $15,000" },
              { name: "Web App MVP", price: "$10,000 - $30,000" },
              { name: "Mobile App", price: "$15,000 - $50,000" }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {project.name}
                </h4>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {project.price}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
