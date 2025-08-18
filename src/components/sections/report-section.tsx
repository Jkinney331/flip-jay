"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Calculator, DollarSign, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { LiquidButton } from "../ui/Liquid-button";

const PricingCalculator = () => {
  const [projectType, setProjectType] = useState("");
  const [timeline, setTimeline] = useState("");
  const [complexity, setComplexity] = useState("");
  const [pricingModel, setPricingModel] = useState("");
  const [estimate, setEstimate] = useState<{ hours?: number; price?: string; range?: string } | null>(null);

  const calculateEstimate = () => {
    if (!projectType || !timeline || !complexity || !pricingModel) return;

    // Simple estimation logic
    let baseHours = 0;
    let basePrice = 0;

    // Project type multipliers
    const typeMultipliers = {
      "quick-fix": { hours: 2, price: 150 },
      "landing-page": { hours: 20, price: 1500 },
      "full-website": { hours: 60, price: 4500 },
      "web-app": { hours: 120, price: 9000 },
      "mobile-app": { hours: 200, price: 15000 }
    };

    // Complexity multipliers
    const complexityMultipliers = {
      "simple": 0.8,
      "moderate": 1.0,
      "complex": 1.5
    };

    // Timeline multipliers
    const timelineMultipliers = {
      "asap": 1.3,
      "1-week": 1.1,
      "2-4-weeks": 1.0,
      "1-2-months": 0.9
    };

    const base = typeMultipliers[projectType as keyof typeof typeMultipliers] || { hours: 40, price: 3000 };
    const complexityMultiplier = complexityMultipliers[complexity as keyof typeof complexityMultipliers] || 1.0;
    const timelineMultiplier = timelineMultipliers[timeline as keyof typeof timelineMultipliers] || 1.0;

    const totalHours = Math.round(base.hours * complexityMultiplier * timelineMultiplier);
    const totalPrice = Math.round(base.price * complexityMultiplier * timelineMultiplier);

    if (pricingModel === "hourly") {
      setEstimate({ hours: totalHours, price: `$${totalHours * 75}` });
    } else {
      setEstimate({ price: `$${totalPrice}`, range: `$${Math.round(totalPrice * 0.8)} - $${Math.round(totalPrice * 1.2)}` });
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Pricing Calculator
                </span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Estimate your project
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Get a realistic ballpark based on scope and timeline.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Project type assessment",
                  "Timeline considerations", 
                  "Complexity evaluation",
                  "Hourly vs fixed pricing",
                  "Transparent cost breakdown"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Get Your Estimate
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fill in the details below for an instant estimate
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Type
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select project type</option>
                  <option value="quick-fix">Quick Fix</option>
                  <option value="landing-page">Landing Page</option>
                  <option value="full-website">Full Website</option>
                  <option value="web-app">Web Application</option>
                  <option value="mobile-app">Mobile App</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP</option>
                  <option value="1-week">1 Week</option>
                  <option value="2-4-weeks">2-4 Weeks</option>
                  <option value="1-2-months">1-2 Months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Complexity
                </label>
                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select complexity</option>
                  <option value="simple">Simple</option>
                  <option value="moderate">Moderate</option>
                  <option value="complex">Complex</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pricing Preference
                </label>
                <select
                  value={pricingModel}
                  onChange={(e) => setPricingModel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select pricing model</option>
                  <option value="hourly">Hourly ($75/hr)</option>
                  <option value="fixed">Fixed Price</option>
                </select>
              </div>

              <LiquidButton
                onClick={calculateEstimate}
                disabled={!projectType || !timeline || !complexity || !pricingModel}
                className="w-full py-4 text-lg flex items-center justify-center gap-2"
              >
                Calculate Estimate
              </LiquidButton>

              {estimate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center"
                >
                  <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    Your Estimate
                  </h4>
                  {estimate.hours && (
                    <p className="text-sm text-green-700 dark:text-green-300 mb-1">
                      Estimated Hours: {estimate.hours}
                    </p>
                  )}
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                    {estimate.price}
                  </p>
                  {estimate.range && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Range: {estimate.range}
                    </p>
                  )}
                </motion.div>
              )}

              <div className="text-center">
                <LiquidButton
                  onClick={() => {
                    window.open("https://calendly.com/jay-flip-tech/flip-tech-pro-introduction-call", "_blank", "noopener,noreferrer");
                  }}
                  className="w-full py-3 text-base"
                >
                  Book a Call
                </LiquidButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
