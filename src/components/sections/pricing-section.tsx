"use client";

import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/lib/config";
import { motion } from "motion/react";
import { LiquidButton } from "../ui/Liquid-button";
import { Shield, Users, Star } from "lucide-react";
import { SavingsCalculator } from "../ui/SavingCalculator";

const PricingSection = () => {
  const tier = siteConfig.pricing.pricingItems[0];

  const PriceDisplay = ({ price }: { price: string | number }) => (
    <motion.span
      key={price}
      className="text-5xl font-bold text-center"
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      ${price}
    </motion.span>
  );

  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center gap-10 py-20 px-6 sm:px-4 md:px-8 w-full relative"
    >
      <SectionHeader>
        <h2 className="text-xl md:text-4xl font-semibold tracking-tight text-center">
          {siteConfig.pricing.title}
        </h2>
        <p className="text-muted-foreground text-center font-medium max-w-2xl mx-auto">
          {siteConfig.pricing.description}
        </p>
      </SectionHeader>

      {/* Row 1 - Price card + Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
        {/* Pricing Card */}
        <div className="w-full rounded-xl border border-border dark:border-white/10 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md p-8 shadow-xl">
          <div className="mb-6 flex flex-col items-center">
            <PriceDisplay price={tier.price} />
            <p className="text-base text-muted-foreground mt-2 text-center">{tier.name}</p>
            <p className="text-sm text-muted-foreground mt-2 text-center">{tier.description}</p>
          </div>

          {/* Features List */}
          <ul className="space-y-3 text-sm mb-8 flex flex-col items-center justify-start">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-center lg:text-left">
                <div className="w-5 h-5 rounded-full border border-primary/20 flex items-center justify-center">
                  <svg
                    width="8"
                    height="7"
                    viewBox="0 0 8 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="block dark:hidden"
                  >
                    <path
                      d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                      stroke="#101828"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="8"
                    height="7"
                    viewBox="0 0 8 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden dark:block"
                  >
                    <path
                      d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                      stroke="#FAFAFA"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="flex flex-col gap-2 justify-center items-center">
            <LiquidButton className="cursor-pointer">
              Book Your Demo Today
            </LiquidButton>
            <div className="mt-3 text-sm text-green-500 inline-flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Only 3 spots left this month
            </div>
          </div>
        </div>

        {/* Calculator - Smaller card */}
        <div className="mx-auto w-full max-w-md rounded-xl border border-border dark:border-white/10 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md p-6 shadow-lg">
          <SavingsCalculator />
        </div>
      </div>

      {/* Row 2 - Trust Badges */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-3xl">
        <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-center">
          <Shield className="w-5 h-5 mx-auto text-green-600" />
          <p className="text-xs mt-2">30-Day Guarantee</p>
        </div>
        <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-center">
          <Users className="w-5 h-5 mx-auto text-blue-600" />
          <p className="text-xs mt-2">500+ Clients</p>
        </div>
        <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-center">
          <Star className="w-5 h-5 mx-auto text-yellow-500" />
          <p className="text-xs mt-2">4.9/5 Rating</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
