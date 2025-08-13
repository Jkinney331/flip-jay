"use client";

import { motion } from "motion/react";
import { YieldHero } from "@/components/yield-program/YieldHero";
import { ValueRevelation } from "@/components/yield-program/ValueRevelation";
import { RevenueCalculator } from "@/components/yield-program/RevenueCalculator";
import { TrustSafety } from "@/components/yield-program/TrustSafety";
import { HowItWorks } from "@/components/yield-program/HowItWorks";
import { RealImpactMetrics } from "@/components/yield-program/RealImpactMetrics";
import { SocialProof } from "@/components/yield-program/SocialProof";
import { YieldFAQ } from "@/components/yield-program/YieldFAQ";
import { YieldCTA } from "@/components/yield-program/YieldCTA";
import { ContactForm } from "@/components/yield-program/ContactForm";

export default function YieldProgramPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <YieldHero />
      
      {/* Value Revelation Section */}
      <ValueRevelation />
      
      {/* Revenue Calculator Section */}
      <RevenueCalculator />
      
      {/* Trust & Safety Framework */}
      <TrustSafety />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Real Impact Metrics */}
      <RealImpactMetrics />
      
      {/* Social Proof Section */}
      <SocialProof />
      
      {/* FAQ Section */}
      <YieldFAQ />
      
      {/* CTA Section */}
      <YieldCTA />
      
      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}
