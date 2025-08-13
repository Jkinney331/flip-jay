"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

export function YieldFAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What exactly is the Yield Equity Program?",
      answer: "The Yield Equity Program transforms your business data into a licensable seven-figure asset. We help you monetize your operational intelligence by licensing it to AI companies while maintaining 100% ownership and control of your data."
    },
    {
      question: "How much can my company earn from this program?",
      answer: "Earnings vary based on your industry, company size, and data volume. Most companies generate between $500K to $5M annually. Use our calculator above to get a personalized estimate for your business."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption, SOC 2 Type II certification, and granular permissions. Your data is anonymized and structured with privacy layers while preserving business value. You retain full ownership and control."
    },
    {
      question: "What types of data can be monetized?",
      answer: "We can monetize authentic business reasoning, decision-making patterns, workflow intelligence, and problem-solving frameworks. This includes customer service data, operations workflows, sales frameworks, and more."
    },
    {
      question: "How long does it take to start generating revenue?",
      answer: "Most companies see their first revenue within 3-4 months. The process includes intelligent extraction, ethical structuring, managed licensing, and continuous monitoring. We handle the entire process for you."
    },
    {
      question: "Why is the program limited to 50 companies?",
      answer: "We maintain exclusivity to ensure premium value for our partners and maintain the highest quality standards. This limited approach allows us to provide personalized attention and maximize each company's data value."
    },
    {
      question: "What industries are eligible for the program?",
      answer: "We work with companies across technology, healthcare, finance, retail, manufacturing, and other data-rich industries. If your business generates operational data, you likely qualify for the program."
    },
    {
      question: "Do I need to change my current operations?",
      answer: "No operational changes are required. We extract value from your existing data without disrupting your current workflows. The program is designed to be completely non-intrusive to your business operations."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-background to-gray-50/50 dark:to-gray-900/50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get answers to the most common questions about the Yield Equity Program.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-700/50 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </motion.div>
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2, delay: 0.1 },
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-semibold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our team is here to help. Schedule a confidential consultation to discuss 
              how the Yield Equity Program can work for your business.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
