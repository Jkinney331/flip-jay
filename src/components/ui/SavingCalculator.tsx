"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";

interface SavingsCalculatorProps {
  className?: string;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ className }) => {
  const [hours, setHours] = useState(40);
  const [teamSize, setTeamSize] = useState(1);

  // Calculate costs
  const flipTechCost = hours * 75; // $75/hour
  const traditionalCost = hours * 150 * teamSize; // $150/hour for multiple people
  const savings = traditionalCost - flipTechCost;
  const savingsPercentage = ((savings / traditionalCost) * 100).toFixed(0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        ROI Calculator
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hours Needed
          </label>
          <input
            type="range"
            min="10"
            max="200"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {hours} hours
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Traditional Team Size
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {teamSize} developer{teamSize > 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">${flipTechCost.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">FlipTech Dev</div>
            <div className="text-xs text-gray-500">$75/hour</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">${traditionalCost.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Traditional Agency</div>
            <div className="text-xs text-gray-500">$150/hour × {teamSize}</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">${savings.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">You Save</div>
            <div className="text-xs text-gray-500">{savingsPercentage}% less</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 