"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechFlow Solutions",
      company: "Technology",
      revenue: "$2.4M",
      increase: "89%",
      content: "The Yield Equity Program transformed our data strategy. We're now generating $2.4M annually from data we previously considered operational overhead.",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Michael Rodriguez",
      role: "CEO, HealthData Pro",
      company: "Healthcare",
      revenue: "$3.8M",
      increase: "156%",
      content: "Our healthcare data is now our most valuable asset. The program's ethical approach and security measures gave us complete confidence.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Jennifer Park",
      role: "VP Operations, FinTech Dynamics",
      company: "Finance",
      revenue: "$5.2M",
      increase: "234%",
      content: "We've seen a 234% increase in revenue from our data assets. The program's managed licensing approach is seamless and professional.",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    {
      name: "David Thompson",
      role: "Founder, RetailMax Pro",
      company: "Retail",
      revenue: "$1.8M",
      increase: "67%",
      content: "Our retail analytics data is now generating $1.8M annually. The program's transparency and real-time monitoring are exceptional.",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    {
      name: "Lisa Wang",
      role: "COO, ManufactureAI",
      company: "Manufacturing",
      revenue: "$3.1M",
      increase: "123%",
      content: "The manufacturing insights we've monetized through this program have become our primary revenue stream. Outstanding results.",
      image: "https://randomuser.me/api/portraits/women/41.jpg",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
            What Our Partners Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hear from companies already generating seven-figure revenue through the Yield Equity Program.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500 ease-in-out">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/20 dark:border-gray-700/50">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      {/* Testimonial Content */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        
                        <blockquote className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                          "{testimonial.content}"
                        </blockquote>
                        
                        <div className="space-y-2">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>

                      {/* Stats Card */}
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                        <div className="text-center space-y-4">
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {testimonial.revenue}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Annual Revenue Generated
                          </div>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                              +{testimonial.increase}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Revenue Increase
                            </div>
                          </div>
                          
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-blue-600 dark:bg-blue-400"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Trusted by leading companies across industries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["OpenAI", "Google", "Anthropic", "Microsoft", "Perplexity"].map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="w-20 h-10 bg-white/10 dark:bg-gray-800/10 rounded-lg backdrop-blur-sm flex items-center justify-center"
              >
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {company}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
