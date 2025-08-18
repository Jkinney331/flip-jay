"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { LiquidButton } from "../ui/Liquid-button";
import { useDomainContent } from "@/hooks/useDomainContent";
import { motion } from "framer-motion";

const CTASection = () => {
  const { getContent } = useDomainContent();
  const ctaData = getContent('cta');

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${ctaData?.backgroundImage || '/agent-cta-background.webp'})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to build something great?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Quick call. Honest advice. No pressure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <LiquidButton
              onClick={() => {
                window.open("https://calendly.com/jay-flip-tech/flip-tech-pro-introduction-call", "_blank", "noopener,noreferrer");
              }}
              className="px-8 py-4 text-lg"
            >
              Book a Call
            </LiquidButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;