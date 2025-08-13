"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, Users, DollarSign, Database } from "lucide-react";

export function RealImpactMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [metrics, setMetrics] = useState({
    companies: 0,
    revenue: 0,
    dataProcessed: 0,
    growthRate: 0,
  });

  const impactData = [
    {
      company: "TechCorp Solutions",
      industry: "Technology",
      revenueIncrease: 89,
      dataValue: 2400000,
      status: "Active",
    },
    {
      company: "HealthFlow Systems",
      industry: "Healthcare",
      revenueIncrease: 156,
      dataValue: 3800000,
      status: "Active",
    },
    {
      company: "FinTech Dynamics",
      industry: "Finance",
      revenueIncrease: 234,
      dataValue: 5200000,
      status: "Active",
    },
    {
      company: "RetailMax Pro",
      industry: "Retail",
      revenueIncrease: 67,
      dataValue: 1800000,
      status: "Active",
    },
    {
      company: "ManufactureAI",
      industry: "Manufacturing",
      revenueIncrease: 123,
      dataValue: 3100000,
      status: "Active",
    },
  ];

  // Animate metrics on scroll
  useEffect(() => {
    if (isInView) {
      const targets = {
        companies: 47,
        revenue: 156,
        dataProcessed: 89,
        growthRate: 234,
      };

      Object.entries(targets).forEach(([key, target]) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setMetrics(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 50);
      });
    }
  }, [isInView]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-background to-gray-50/50 dark:to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real Impact Metrics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See the actual results from companies already participating in the Yield Equity Program.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-8 mb-16"
        >
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-white/20 dark:border-gray-700/50">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {metrics.companies}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Companies Enrolled</div>
          </div>
          
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-white/20 dark:border-gray-700/50">
            <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              ${metrics.revenue}M
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Revenue Generated</div>
          </div>
          
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-white/20 dark:border-gray-700/50">
            <Database className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {metrics.dataProcessed}TB
            </div>
            <div className="text-gray-600 dark:text-gray-300">Data Processed</div>
          </div>
          
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-white/20 dark:border-gray-700/50">
            <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {metrics.growthRate}%
            </div>
            <div className="text-gray-600 dark:text-gray-300">Average Growth Rate</div>
          </div>
        </motion.div>

        {/* Impact Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Company Performance Data
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Industry
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Revenue Increase
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Data Value
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {impactData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {row.company}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {row.industry}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        +{row.revenueIncrease}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(row.dataValue)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {row.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">$16.3M</div>
            <div className="text-gray-600 dark:text-gray-300">Average Annual Revenue</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">142%</div>
            <div className="text-gray-600 dark:text-gray-300">Average ROI</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">3.2 Months</div>
            <div className="text-gray-600 dark:text-gray-300">Average Time to Revenue</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
