"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
// import { cn } from "@/lib/utils";
import { LiquidCard, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { LiquidButton } from "./ui/Liquid-button";
import { useDomainContent } from "@/hooks/useDomainContent";

const caseStudies = [
  {
    id: "f-bot-fascia-health",
    title: "F-Bot - Fascia Health AI Assistant",
    image: "/robot.webp",
    description:
      "Revolutionary fascia-focused chatbot trained on extensive medical and wellness data. F-Bot provides personalized guidance for fascia health, movement patterns, and pain relief. Handles thousands of user queries daily with medical-grade accuracy while maintaining an approachable, supportive tone.",
    slug: "f-bot-fascia-health-ai-assistant"
  },
  {
    id: "cryptoedge-trading-agent",
    title: "CryptoEdge - Trading Intelligence Agent",
    image: "/screen.webp",
    description:
      "Built a sophisticated crypto trading agent analyzing market patterns 24/7. Executes trades based on predictive models with 73% accuracy rate. Processes millions of data points per second across multiple exchanges.",
    slug: "cryptoedge-trading-intelligence-agent"
  },
  {
    id: "viralvoice-social-media",
    title: "ViralVoice - Social Media AI Manager",
    image: "/socialmedia.webp",
    description:
      "Created an AI agent managing content across 6 platforms simultaneously. Generates engaging posts, responds to comments, and identifies trending topics. Increased engagement by 340% in the first month.",
    slug: "viralvoice-social-media-ai-manager"
  },
];

const CaseStudiesSection = () => {
  const { config } = useDomainContent();
  const timeframe = config?.branding?.name === 'FlipTech Pro' ? '30 days' : '14 days';

  return (
    <section className="w-full px-8 py-16 max-w-full 2xl:px-24 mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center dark:text-white text-gray-900">
        Case Studies
      </h2>
      <h2 className="text-xl mb-10 text-center dark:text-white text-gray-400">
        See how {`we've`} transformed businesses with AI in just {timeframe}. Real results, real impact.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((project, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-visible"
          >
            <LiquidCard className="h-[520px] flex flex-col">
              <CardHeader className="flex flex-col h-full">
                {/* Image */}
                <div className="w-full h-[240px] relative rounded-lg overflow-hidden mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <CardTitle className="text-lg font-semibold mb-2">
                  {project.title}
                </CardTitle>
                
                <CardDescription className="text-sm opacity-80 mb-4 flex-grow">
                  {project.description}
                </CardDescription>

                {/* Learn More Button */}
                <div className="mt-auto">
                  <Link href={`/case-studies/${project.slug}`}>
                    <LiquidButton className="w-full text-sm py-2 px-4">
                      Learn More
                    </LiquidButton>
                  </Link>
                </div>
              </CardHeader>
            </LiquidCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
