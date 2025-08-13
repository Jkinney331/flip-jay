"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { LiquidButton } from "@/components/ui/Liquid-button";
import { Card } from "@/components/ui/card";

interface CalculatorState {
  industry: string;
  companySize: number;
  dataVolume: number;
}

export function RevenueCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    industry: "technology",
    companySize: 100,
    dataVolume: 1000,
  });

  const [calculatedValues, setCalculatedValues] = useState({
    customerService: 0,
    operations: 0,
    sales: 0,
    total: 0,
  });

  const industries = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
  ];

  // Calculate values based on inputs
  useEffect(() => {
    const baseMultiplier = {
      technology: 1.2,
      healthcare: 1.5,
      finance: 1.8,
      retail: 1.0,
      manufacturing: 1.3,
    }[calculatorState.industry] || 1.0;

    const sizeMultiplier = calculatorState.companySize / 100;
    const volumeMultiplier = calculatorState.dataVolume / 1000;

    const customerService = Math.round(150000 * baseMultiplier * sizeMultiplier * volumeMultiplier);
    const operations = Math.round(200000 * baseMultiplier * sizeMultiplier * volumeMultiplier);
    const sales = Math.round(250000 * baseMultiplier * sizeMultiplier * volumeMultiplier);
    const total = customerService + operations + sales;

    setCalculatedValues({ customerService, operations, sales, total });
  }, [calculatorState]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50/50 dark:from-gray-900/50 to-background">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Calculate Your Yield Equity Potential
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how much your business data could be worth to AI companies. 
            Adjust the parameters below to see your potential annual revenue.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Your Business Profile
              </h3>

              {/* Industry Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Industry
                </label>
                <select
                  value={calculatorState.industry}
                  onChange={(e) => setCalculatorState(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company Size Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Company Size: {calculatorState.companySize} employees
                </label>
                <input
                  type="range"
                  min="10"
                  max="10000"
                  value={calculatorState.companySize}
                  onChange={(e) => setCalculatorState(prev => ({ ...prev, companySize: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10</span>
                  <span>10,000</span>
                </div>
              </div>

              {/* Data Volume Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Data Volume: {calculatorState.dataVolume.toLocaleString()} GB per month
                </label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  value={calculatorState.dataVolume}
                  onChange={(e) => setCalculatorState(prev => ({ ...prev, dataVolume: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100 GB</span>
                  <span>10,000 GB</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Live Calculation Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Your Annual Data Value
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Customer Service Data</span>
                  <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(calculatedValues.customerService)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Operations Workflows</span>
                  <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {formatCurrency(calculatedValues.operations)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Sales Frameworks</span>
                  <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                    {formatCurrency(calculatedValues.sales)}
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Annual Value</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(calculatedValues.total)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 5-Year Projection Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                5-Year Revenue Projection
              </h3>
              <div className="h-32 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg flex items-end justify-between p-4">
                {[1, 2, 3, 4, 5].map((year) => (
                  <div key={year} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-gradient-to-t from-green-500 to-blue-500 rounded-t"
                      style={{ height: `${(year * 20) + 20}px` }}
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Y{year}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                Projected growth based on market trends and data value appreciation
              </p>
            </Card>

            <LiquidButton className="w-full py-4 text-lg font-semibold">
              Schedule Confidential Consultation
            </LiquidButton>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3B82F6, #10B981);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3B82F6, #10B981);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
}
