"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { LiquidButton } from "@/components/ui/Liquid-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, X } from "lucide-react";

export function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    annualRevenue: "",
    dataVolume: "",
    fullName: "",
    email: "",
    phone: "",
    contactTime: "",
    timeline: "",
    questions: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
    "Manufacturing",
    "Other",
  ];

  const timelines = [
    "Immediate",
    "Q2 2025",
    "Exploring",
  ];

  const contactTimes = [
    "Morning (9 AM - 12 PM)",
    "Afternoon (12 PM - 5 PM)",
    "Evening (5 PM - 8 PM)",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        setFormData({
          companyName: "",
          industry: "",
          annualRevenue: "",
          dataVolume: "",
          fullName: "",
          email: "",
          phone: "",
          contactTime: "",
          timeline: "",
          questions: "",
        });
      }, 3000);
    }, 1000);
  };

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
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Schedule a confidential consultation to discuss how the Yield Equity Program 
            can transform your business data into a seven-figure asset.
          </p>
          
          <LiquidButton 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 text-lg font-semibold"
          >
            Request Consultation
          </LiquidButton>
        </motion.div>

        {/* Contact Form Modal */}
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Schedule Confidential Consultation
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Company Information
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Company Name *
                          </label>
                          <Input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Industry *
                          </label>
                          <select
                            value={formData.industry}
                            onChange={(e) => handleInputChange("industry", e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Industry</option>
                            {industries.map((industry) => (
                              <option key={industry} value={industry}>
                                {industry}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Annual Revenue *
                          </label>
                          <select
                            value={formData.annualRevenue}
                            onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Range</option>
                            <option value="1-10M">$1M - $10M</option>
                            <option value="10-50M">$10M - $50M</option>
                            <option value="50-100M">$50M - $100M</option>
                            <option value="100M+">$100M+</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Data Volume Estimate
                          </label>
                          <Input
                            type="text"
                            value={formData.dataVolume}
                            onChange={(e) => handleInputChange("dataVolume", e.target.value)}
                            placeholder="e.g., 1TB per month"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Contact Details
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name *
                          </label>
                          <Input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone
                          </label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Preferred Contact Time
                          </label>
                          <select
                            value={formData.contactTime}
                            onChange={(e) => handleInputChange("contactTime", e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Time</option>
                            {contactTimes.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Interest Level */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Interest Level
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Timeline
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {timelines.map((timeline) => (
                              <label key={timeline} className="flex items-center">
                                <input
                                  type="radio"
                                  name="timeline"
                                  value={timeline}
                                  checked={formData.timeline === timeline}
                                  onChange={(e) => handleInputChange("timeline", e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {timeline}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Specific Questions
                          </label>
                          <Textarea
                            value={formData.questions}
                            onChange={(e) => handleInputChange("questions", e.target.value)}
                            placeholder="Any specific questions about the program..."
                            rows={4}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <LiquidButton
                        type="submit"
                        className="w-full py-4 text-lg font-semibold"
                      >
                        Request Consultation
                      </LiquidButton>
                    </div>
                  </form>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      Consultation Requested!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Thank you for your interest in the Yield Equity Program. 
                      We'll be in touch within 24 hours to schedule your confidential consultation.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Next Steps:</strong> Our team will review your information and 
                        prepare a personalized analysis of your data monetization potential.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
