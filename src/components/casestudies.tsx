"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { LiquidCard, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

const caseStudies = [
  {
    title: "F-Bot - Fascia Health AI Assistant",
    image: "/robot.webp",
    description:
      "Revolutionary fascia-focused chatbot trained on extensive medical and wellness data. F-Bot provides personalized guidance for fascia health, movement patterns, and pain relief. Handles thousands of user queries daily with medical-grade accuracy while maintaining an approachable, supportive tone.",
  },
  {
    title: "CryptoEdge - Trading Intelligence Agent",
    image: "/screen.webp",
    description:
      "Built a sophisticated crypto trading agent analyzing market patterns 24/7. Executes trades based on predictive models with 73% accuracy rate. Processes millions of data points per second across multiple exchanges.",
  },
  {
    title: "ViralVoice - Social Media AI Manager",
    image: "/socialmedia.webp",
    description:
      "Created an AI agent managing content across 6 platforms simultaneously. Generates engaging posts, responds to comments, and identifies trending topics. Increased engagement by 340% in the first month.",
  },
];

const CaseStudiesSection = () => {
  return (
    <section className="w-full px-8 py-16 max-w-full 2xl:px-24 mx-auto cursor-pointer">
      <h2 className="text-3xl font-bold mb-10 text-center dark:text-white text-gray-900">
        Case Studies
      </h2>
      <h2 className="text-xl  mb-10 text-center dark:text-white text-gray-400">
     See how {`we've`} transformed businesses with AI in just 14 days. Real results, real impact.</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((project, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-visible group"
          >
            <LiquidCard className="h-full">
              <CardHeader>
                {/* Image */}
                <div className="w-full h-60 2xl:h-96 relative rounded-lg overflow-hidden mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
                
                <CardTitle className="text-lg font-semibold mb-2">
                  {project.title}
                </CardTitle>
                
                <CardDescription className="text-sm opacity-80 line-clamp-4 group-hover:line-clamp-none transition-all duration-300 ease-in-out">
                  {project.description}
                </CardDescription>
              </CardHeader>
            </LiquidCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
