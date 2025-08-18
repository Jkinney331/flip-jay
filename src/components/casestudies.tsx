"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
// import { cn } from "@/lib/utils";
import { LiquidCard, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { LiquidButton } from "./ui/Liquid-button";
import { useDomainContent } from "@/hooks/useDomainContent";
import { motion } from "framer-motion";

const caseStudies = [
  {
    id: "sunbum-ux-ui",
    title: "Sun Bum - UX/UI Design & Optimization",
    image: "/robot.webp",
    description:
      "I improved UX for higher conversions, ensured mobile responsiveness, and hardened the site for Q4 traffic spikes.",
    slug: "sunbum-ux-ui",
    link: "https://www.sunbum.com/",
    category: "UX/UI Design",
    results: "Higher conversions, mobile ready, Q4 traffic handled"
  },
  {
    id: "hollywood-bowl-platform",
    title: "Hollywood Bowl - Platform Development",
    image: "/screen.webp",
    description:
      "I developed and maintained the platform supporting ticketing, events, and a smooth UX.",
    slug: "hollywood-bowl-platform",
    link: "https://www.hollywoodbowl.com/",
    category: "Platform Development",
    results: "Smooth ticketing, improved UX"
  },
  {
    id: "airship-maintenance",
    title: "Airship - Web Development & Maintenance",
    image: "/socialmedia.webp",
    description:
      "I delivered hot fixes, monthly maintenance, and special projects to keep systems flowing.",
    slug: "airship-maintenance",
    link: "https://www.airship.com",
    category: "Web Development & Maintenance",
    results: "Systems optimized, issues resolved"
  },
];

const CaseStudiesSection = () => {
  const { config } = useDomainContent();
  const timeframe = "flexible timeline";

  return (
    <section className="w-full px-8 py-16 max-w-full 2xl:px-24 mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center dark:text-white text-gray-900">
        Problems solved, clients happy
      </h2>
      <h2 className="text-xl mb-10 text-center dark:text-white text-gray-400">
        Real projects, real results, real testimonials
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {study.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {study.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                {study.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {study.results}
                </div>
                <a
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold transition-colors"
                >
                  Visit Site →
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
